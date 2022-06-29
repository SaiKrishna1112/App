import React,{useState,useLayoutEffect,useCallback} from 'react'
import MapView ,{ Marker } from 'react-native-maps'
import { StyleSheet, Text, View, Dimensions,Event } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Maps=({navigation}) =>{
const [selectedLocation,setSelecterLocation] = useState();

 const region = {
  latitude: 17.387140,
  longitude: 78.491684,
  latitudeDelta:13.7040,
  longitudeDelta:30.0624
 };

function selectLocationHandler(event){
 const lat = event.nativeEvent.coordinate.latitude;
 const lng = event.nativeEvent.coordinate.longitude;
 console.log(lat,lng);

 setSelecterLocation({lat:lat , lng:lng});
}

const savepickedLocationHandler= useCallback(()=>{
 if(!selectedLocation){
  Alert.alert('No location picked',
 'you Have to pick a Location (by tapping on the map) first!'
);
return;
 }

 navigation.navigate('Location',{
  pickedLat: selectedLocation.lat,
  pickedlng:selectedLocation.lng
 });
},[navigation,selectedLocation]);

useLayoutEffect(()=>{
 navigation.setOptions({
  headerRight: () => (
   <Icon name="save" size={24} color='black' onPress={savepickedLocationHandler}/>
  ),
 });
},[navigation, savepickedLocationHandler]);
 return (
  <View style={styles.container}>
 <MapView style={styles.map}  onPress={selectLocationHandler}>
 {selectedLocation && (
 <Marker title="Picker" initialRegion={region} coordinate={{
  latitude: selectedLocation.lat,
  longitude: selectedLocation.lng,
 }}
 />
 )}
 </MapView>
 </View>
)
}

export default Maps;

const styles = StyleSheet.create({
 container: {
     flex: 1,
     backgroundColor: '#fff',
     alignItems: 'center',
     justifyContent: 'center',
   },
   map: {
     width: Dimensions.get('window').width,
     height: Dimensions.get('window').height,
   },
})
