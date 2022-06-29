import React,{useState,useEffect} from "react"
import {View,Text,FlatList,StyleSheet,SafeAreaView,TouchableHighlight} from "react-native"
import axios from "axios";
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';


const MappingUsers=props=>{
    const userDetails = useSelector(state=>state.counter);
    var id = userDetails.data.id;
    var access = userDetails.headers.accesstoken;
    const[map,setmap]=useState([]);

const mappedUsers=()=>{
axios.post('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/mappedUsers',{
    city:"YES",
    state:"YES",
    pincode:"YES",
    locality:"YES",
    education:"YES",
    passion:"YES",
    pageSize:10,
    pageNo:1
},{
headers:{
    accessToken:access
}})

.then(function(response){
    console.log(response.data)
    setmap(response.data.userDetails)
})
.catch(function(error){
    console.log(error)
})
}
useEffect(()=>{
 mappedUsers();
},[])

const renderList = ({ item }) => {
    return (
    <View style={{backgroundColor:'white',marginHorizontal:8,height:"auto",padding:8,marginVertical:8,borderLeftColor:'green',borderLeftWidth:4.5}}>
         <View style={styles.flatmain}>
         <View style={styles.TxtView1}><Text style={styles.Txt1}>User Name</Text></View>
         <View><Text style={styles.Txt2}>{item.name}</Text></View>

         </View>

         <View style={styles.flatmain}>
         <View style={styles.TxtView1}><Text style={styles.Txt1}>City</Text></View>
         <View><Text style={styles.Txt2}>{item.city}</Text></View>
         </View>

         <View style={styles.flatmain}>
         <View style={styles.TxtView1}><Text style={styles.Txt1}>State</Text></View>
         <View><Text style={styles.Txt2}>{item.state}</Text></View>
         </View>

         <View style={styles.flatmain}>
         <View style={styles.TxtView1}><Text style={styles.Txt1}>Pincode</Text></View>
         <View><Text style={styles.Txt2}>{item.pinCode}</Text></View>
         </View>

         <View style={styles.flatmain}>
         <View style={styles.TxtView1}><Text style={styles.Txt1}>Locality</Text></View>
         <View><Text style={styles.Txt2}>{item.locality}</Text></View>
         </View>

         <View style={styles.flatmain}>
         <View style={styles.TxtView1}><Text style={styles.Txt1}>Education</Text></View>
         <View><Text style={styles.Txt2}>{item.education}</Text></View>
         </View>

         <View style={styles.flatmain}>
         <View style={styles.TxtView1}><Text style={styles.Txt1}>Passion</Text></View>
         <View><Text style={styles.Txt2}>{item.passion}</Text></View>
         </View>

         <View style={styles.flatmain}>
            <View style={styles.TxtView1}><Text style={styles.Txt1}>Loan Request Info</Text></View>
            <View>
                <View><Text style={styles.Txt2}>Amount : {item.requestedAmount}</Text></View>
                <View><Text style={styles.Txt2}>ROI : {item.rateOfInterest}%</Text></View>
                <View><Text style={styles.Txt2}>Duration : {item.duration}</Text></View>
            </View>
        </View>
    </View>

    )}


return(
        <SafeAreaView style={{paddingTop:5,flex:1,marginBottom:0}}>

       <FlatList
           data={map}

           renderItem={renderList}

           keyExtractor={item => item.id}
           />
  </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    flatmain:{
        flexDirection:"row",
        alignItems:'center',
        borderBottomColor:'grey',
        borderBottomWidth:1,
        paddingVertical:5
      },

      Txt1:{
          fontWeight:'bold',
          color:'#2E86C1',
          fontSize:15

      },

      Txt2:{
          fontWeight:'bold',
          color:'black',
          fontSize:15

      },

      TxtView1:{
          width:200,
      }
})
export default MappingUsers;
