import {useState,useEffect} from 'react'
import {View,Button,StyleSheet,Alert,Text,Image} from 'react-native'
import { useNavigation,useRoute,useIsFocused} from '@react-navigation/native';
import { getCurrentPositionAsync, useForegroundPermissions,PermissionStatus } from 'expo-location'
function LocationPicker(){
  const [pickedLocation,setPickedLoacation] = useState();
  const isFocused = useIsFocused();

  const navigation = useNavigation();
  const route = useRoute();
  const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

   useEffect(()=>{
    if(isFocused &&  route.params){
     const mapPickedLocation =  {
      lat: route.params.pickedLat, lng: route.params.pickedlng
     };
     setPickedLoacation(mapPickedLocation)
    }
   },[route, isFocused])
   console.log(pickedLocation);
    async function verifyPermissions() {
 if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED){
  const  permissionResponse = await requestPermission();

  return permissionResponse.granted;
 }
 if(locationPermissionInformation.status === PermissionStatus.DENIED){
  Alert.alert(
   'Insufficient Permissions',
  );
  return false;
 }
 return true;
}

  async function getLocationHandler() {
   const hasPermission = await verifyPermissions();

   if(!hasPermission){
    return ;
   }
    const location = await getCurrentPositionAsync();
    console.log(location);
    setPickedLoacation({
     lat: location.coords.latitude,
     lng: location.coords.longitude
    })
  }
  function pickOnMapHandler(){
    navigation.navigate('Maps');
  }

  let locationPreview = <Text style={{alignSelf:'center',marginTop:40}}>No Location Picked Yet.</Text>

     if (pickedLocation) {
      locationPreview =  (
       <View style={{marginTop:50,marginLeft:10}}>
         <Text style={{fontWeight:'bold'}}>Latitude: {pickedLocation.lat},Longitude: {pickedLocation.lng}</Text>
         </View>
     //   <Image source={{uri: getMapPreview(pickedLocation.lat ,pickedLocation.lng)}} style={styles.image} />
      );
     }
 return(
  <View>
<View style={styles.mapPreview}>
  {locationPreview}
</View>
<View style={{flexDirection:'row',justifyContent:'space-around'}}>
<Button title="Locate User" onPress={getLocationHandler}/>
<Button title="Pick on Map" onPress={pickOnMapHandler}/>
</View>
  </View>

 )
}
export default LocationPicker;

const styles = StyleSheet.create({
 mapPreview:{
  width:300,
  height:100,
  marginLeft:35
 },
 image:{
  width:300,
  height:100,
 }
})
