import React,{useState,useEffect} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
 import { MaterialCommunityIcons } from '@expo/vector-icons';
 import AnimatedLoader from "react-native-animated-loader";
import { Text, View , StyleSheet ,TextInput,TouchableOpacity,Alert,ScrollView,FlatList,SafeAreaView,Modal} from 'react-native';
import {useSelector} from "react-redux";
import WithdrawalNormalDeal from './WithdrawalNormalDeal';

const Withdrawal=({navigation})=>{
 const userDetails =useSelector(state=>state.counter);
    var access = userDetails.headers.accesstoken ;
    var id = userDetails.data.id;
    const [History,setHistory]=useState([]);
    const [modal1,setmodal1]=useState(false);
    const [dealname,setdealname]=useState();
    const [dealid,setdealid]=useState();
    const [roi,setroi]=useState();
    const [participate,setparticipate]=useState();
    const [amount,setAmount]=useState();
    const [loading,setloading]=useState(false);
    const getnormal=()=>{
    axios({
       method:'post',
       url:'http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/lenderPaticipatedDealBasedOnDealType',
       data:{
        dealType: "NORMAL",
        pageNo: 1,
        pageSize: 10,
       },
       headers:{
             accessToken:access,
            }
      })
      .then(function (response) {
       //console.log("=================================");
       //console.log(response.data)
       setHistory(response.data.lenderPaticipatedResponseDto)
       setTimeout(function(){
        setloading(false)
     },888);
               })
       .catch(function (error) {
        console.log('error',error);
      });
}
const getescrow=()=>{
   axios({
      method:'post',
      url:'http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/lenderPaticipatedDealBasedOnDealType',
      data:{
       dealType: "ESCROW",
       pageNo: 1,
       pageSize: 10,
      },
      headers:{
            accessToken:access,
           }
     })
     .then(function (response) {
      console.log("=================================");
      console.log(response.data)
      setHistory(response.data.lenderPaticipatedResponseDto)
      setTimeout(function(){
       setloading(false)
    },1000);
              })
      .catch(function (error) {
       console.log('error',error);
     });

}

function Save(){
 setmodal1(!modal1);
}
const renderList = ({ item }) => {
    return (
     <View style={{backgroundColor:'white',marginHorizontal:8,height:"auto",padding:10,marginVertical:8,borderLeftColor:'green',borderLeftWidth:4.5}}>
          <View style={styles.flatmain}>
          <View style={styles.TxtView1}><Text style={styles.Txt1}>Deal Name</Text></View>
          <View><Text style={styles.Txt2}>{item.dealName}</Text></View>
          </View>

          <View style={styles.flatmain}>
          <View style={styles.TxtView1}><Text style={styles.Txt1}>Deal Type </Text></View>
          <View><Text style={styles.Txt2}>{item.dealType}</Text></View>
          </View>

          <View style={styles.flatmain}>
          <View style={styles.TxtView1}><Text style={styles.Txt1}>Paticipated Amount </Text></View>
          <View><Text style={styles.Txt2}>{item.paticipatedAmount}</Text></View>
          </View>

          <View style={styles.flatmain}>
          <View style={styles.TxtView1}><Text style={styles.Txt1}>ROI </Text></View>
          <View><Text style={styles.Txt2}>{item.rateOfInterest}</Text></View>
          </View>

          <View style={styles.flatmain}>
          <View style={styles.TxtView1}><Text style={styles.Txt1}>Duration in Months </Text></View>
          <View><Text style={styles.Txt2}>{item.dealDuration}</Text></View>
          </View>

          <View style={styles.flatmain}>
          <View style={styles.TxtView1}><Text style={styles.Txt1}>Deal Status </Text></View>
          <View><Text style={styles.Txt2}>{item.currentStatus}</Text></View>
          </View>

          <View style={styles.flatmain}>
          <View style={styles.TxtView1}><Text style={styles.Txt1}>Requested Amount </Text></View>
          <View><Text style={styles.Txt2}>{item.requestedAmount}</Text></View>
          </View>

          <View style={styles.flatmain}>
          <View style={styles.TxtView1}><Text style={styles.Txt1}>Select</Text></View>
          <TouchableOpacity
          onPress={()=>navigation.navigate('WithdrawalNormalDeal',{
           dealId:item.dealId,dealname:item.dealName,participate:item.paticipatedAmount,roi:item.rateOfInterest,requestedAmount:item.requestedAmount}
          )}>
          <View style={{borderWidth:0.2,width:120,height:30,borderRadius:20,backgroundColor:'#569F40',justifyContent:'center',marginLeft:20}}>
          <Text style={styles.Txt3}>WITHDRAW</Text></View></TouchableOpacity>
          </View>


          </View>
         )}
         useEffect(()=>{
          getnormal();
          setloading(true);
         },[])

return(
 <SafeAreaView style={{paddingTop:2,flex:1,marginBottom:0}}>
 <View style={{alignItems:'center',marginTop:20}}>
 <View style={{flexDirection:'row',alignItems:'space-between',justifyContent:'space-around'}}>
 <View style={{marginTop:10,
 borderWidth:1,
 borderRadius:5,
 backgroundColor:'black',
 width:180,
 padding:5,
 alignSelf:'center'}}>
 <TouchableOpacity onPress={getescrow}><Text style={styles.txt}>From an ESCROW Deal</Text></TouchableOpacity>
 </View>
 <View style={{marginTop:10,
  marginLeft:10,
  padding:5,
 borderWidth:1,
 borderRadius:5,
 backgroundColor:'black',
 width:180,
 alignSelf:'center'}}>
 <TouchableOpacity onPress={getnormal}><Text style={styles.txt}>From a NORMAL Deal</Text></TouchableOpacity>
  </View>
  </View>
  <View style={{flexDirection:'row'}}>
  <View style={styles.btn}>
  <TouchableOpacity onPress={()=>navigation.navigate('Withdrawalfromwallet')}><Text style={styles.txt}>From a Wallet</Text></TouchableOpacity>
   </View>
   <View style={styles.btn}>
   <TouchableOpacity onPress={()=>navigation.navigate('Withdrawalhistory')}><Text style={styles.txt}>Transaction History</Text></TouchableOpacity>
    </View>
    </View>
  <FlatList
      data={History}
      renderItem={renderList}
      keyExtractor={item => item.dealId}
 />
   </View>
   <AnimatedLoader
    visible={loading}
    overlayColor="rgba(255,255,255,0.75)"
    source={require("../assets/loading-state.json")}
    animationStyle={styles.lottie}
    speed={1}>
<Text style={{fontSize:18,fontWeight:'bold'}}>Loading.....</Text>
</AnimatedLoader>
   </SafeAreaView>
)

}
const styles = StyleSheet.create({
 btn:{
  marginTop:10,
  borderWidth:1,
  borderRadius:5,
  backgroundColor:'black',//#569F40
  width:150,
  alignSelf:'center',
  padding:6,
  justifyContent:'space-around',
  marginLeft:20
 },
 btn1:{
  marginTop:10,
  borderWidth:1,
  padding:5,
  borderRadius:20,
  backgroundColor:'#569F40',
  width:30,
  justifyContent:'center'
 },
 txt:{
  color:'white',
  fontSize:15,
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
   flex: 1,
   backgroundColor: '#fff',
   alignItems:'center',
   marginTop:80
 },
 inputbox:{
     position:'relative',
     backgroundColor:'#E8E8E8',
     borderRadius: 16,
     width:310,
     height:'auto',
     alignItems: 'flex-start',
     paddingLeft:15,
     paddingVertical:5,
     margin:10,
     marginTop:5,
     marginLeft:15,
     marginBottom:20
 },
 lottie: {
   width: 150,
   height: 150
 },
})
export default Withdrawal;
