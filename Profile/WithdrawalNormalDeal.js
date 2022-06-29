import React,{useState,useEffect} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
 import { MaterialCommunityIcons } from '@expo/vector-icons';
 import AnimatedLoader from "react-native-animated-loader";
import { Text, View , StyleSheet ,TextInput,TouchableOpacity,Alert,ScrollView,FlatList,SafeAreaView,Modal} from 'react-native';
import {useSelector} from "react-redux";

const WithdrawalNormalDeal=({route,navigation})=>{
 console.log(route.params);
 const userDetails =useSelector(state=>state.counter);
    var access = userDetails.headers.accesstoken ;
    var id = userDetails.data.id;
    const [dealname,setdealname]=useState(route.params.dealname);
    const [dealid,setdealid]=useState(route.params.dealId);
    const [roi,setroi]=useState(route.params.roi);
    const [participate,setparticipate]=useState(route.params.participate);
    const [requestedAmount,setrequestedAmount]=useState(route.params.requestedAmount);
    const [amount,setAmount]=useState();
    const [loading,setloading]=useState(false);

    const postrequest=()=>{
     setloading(true)
     axios({
        method:'post',
        url:'http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/withdrawalFundsFromDeals',
        data:{
            userId:id,
            dealId:dealid,
            currentAmount:participate,
            requestedAmount:requestedAmount,
            withDrawalFunds:amount
        },
        headers:{
              accessToken:access,
             }
       })
       .then(function (response) {
        //console.log(response.data)
        setTimeout(function(){
         setloading(false)
         Alert.alert(
        "Initiated successfully",
        "You will receive mobile and email"
     [
     { text: "OK", onPress:() => navigation.navigate('LenderDrawer') }
    ]
    );
         Alert.alert()
      },4000);
                })
        .catch(function (error) {
         console.log('error',error);
         Alert.alert(
    "Warring",
    error.response.data.errorMessage,
    [
     { text: "OK", onPress: () => setLoading(false) }
    ]
   );
       });

    }
return(
<View style={{marginTop:25}}>
<View style={styles.container1}>
<View style={styles.inputbox}>
 <Text style={{fontSize:18}}>Deal Name:</Text>
 <Text>{dealname}</Text>
</View>
<View style={styles.inputbox}>
 <Text style={{fontSize:18}}>Deal Id:</Text>
 <Text>{dealid}</Text>
</View>
<View style={styles.inputbox}>
 <Text style={{fontSize:18}}>ROI:</Text>
 <Text>{roi}</Text>
</View>
<View style={styles.inputbox}>
 <Text style={{fontSize:18}}>Participated Amount:</Text>
 <Text>{participate}</Text>
</View>
<View style={styles.inputbox}>
 <Text style={{fontSize:18}}>Withdraw Amount:</Text>
 <TextInput placeholder="Enter Withdraw Amount" value={amount} keyboardType="numeric"
 onChangeText={(number)=>setAmount(number)}/>
</View>
<Text style={{width:300}}><Text style={{color:'red'}}>Note</Text><Text> : Funds Will be Credited to your bank account within 30 working days.</Text></Text>
<View style={styles.btn1}>
<TouchableOpacity onPress={postrequest}>
<Text style={styles.txt}>Submit</Text>
</TouchableOpacity >
</View>
</View>
<AnimatedLoader
 visible={loading}
 overlayColor="rgba(255,255,255,0.75)"
 source={require("../assets/loading-state.json")}
 animationStyle={styles.lottie}
 speed={1}>
<Text style={{fontSize:18,fontWeight:'bold'}}>Loading.....</Text>
</AnimatedLoader>
</View>
)
}
const styles = StyleSheet.create({
 btn:{
  marginTop:10,
  borderWidth:1,
  padding:10,
  borderRadius:20,
  backgroundColor:'#569F40',
 },
 btn1:{
  marginTop:10,
  borderWidth:1,
  padding:10,
  borderRadius:20,
  backgroundColor:'#569F40',
  width:150,
  justifyContent:'center'
 },
 txt:{
  color:'white',
  fontSize:18,
  fontWeight:'bold',
  alignSelf:'center'
 },
 flatmain:{
   flexDirection:"row",
   alignItems:'center',
   borderBottomColor:'grey',
   borderBottomWidth:1,
   paddingVertical:5,
   width:350,
 },

 Txt1:{
     fontWeight:'bold',
     color:'#569F40',
     fontSize:15

 },

 Txt2:{
     fontWeight:'bold',
     color:'black',
     fontSize:15,
     marginLeft:30
 },
 Txt3:{
     fontWeight:'bold',
     color:'white',
     fontSize:15,
     alignSelf:'center'
 },

 TxtView1:{
     width:150,
 },
 container1: {
   alignItems:'center',
   marginTop:20
 },
 inputbox:{
     position:'relative',
     backgroundColor:'#E8E8E8',
     borderRadius: 16,
     width:310,
     height:'auto',
     alignItems: 'flex-start',
     paddingLeft:25,
     paddingVertical:5,
     margin:10,
     marginTop:5,
     marginLeft:25,
     marginBottom:20,
 },
 lottie: {
   width: 150,
   height: 150
 },
})

export default WithdrawalNormalDeal;
