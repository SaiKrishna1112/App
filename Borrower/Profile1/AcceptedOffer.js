import React,{useState,useEffect} from "react";
import { View,Text ,StyleSheet,FlatList,TextInput,ScrollView,TouchableOpacity,Alert,Image} from "react-native";
import axios from "axios";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useSelector} from 'react-redux';
import AnimatedLoader from "react-native-animated-loader";


const AcceptedOffer=({navigation})=>{
 const userDetails = useSelector(state=>state.counter);
 const userDetail = useSelector(state=>state.logged);
 var access = userDetails.headers.accesstoken;
 var id = userDetails.data.id;
 var loanId=userDetail.loanRequestId;
  const [loading,setLoading]=useState();
  const[loanofferamount,setloanofferamount]=useState();
  const[duration,setduration]=useState();
  const[emiamount,setemiamount]=useState();
  const[durationtype,setdurationtype]=useState();
  const[processing,setprocessing]=useState();
  const[disbursement,setdisbursement]=useState();
  const[requestId,setrequestId]=useState();


function getfunction(){
 axios({
    method:'get',
    url:'http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/'+loanId+'/loanofferdetails',
    headers:{
          accessToken:access,
         }
   })
   .then(function (response) {
    // console.log(response.data)
    setloanofferamount(response.data.loanOfferedAmount);
    setduration(response.data.duaration);
    setdurationtype(response.data.durationType);
    setdisbursement(response.data.netDisbursementAmount);
    setemiamount(response.data.emiAmount);
    setprocessing(response.data.borrowerFee);
    setrequestId(response.data.loanRequestId);
    setTimeout(function(){
     setLoading(false)
            })
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

 function AcceptFunction(){
  axios({
     method:'post',
     url:'http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/loanOfferAccepetence',
     data:{
           id:id,
           loanRequestId:requestId,
           loanOfferStatus:"LOANOFFERACCEPTED"
          },
     headers:{
           accessToken:access,
          }
    })
    .then(function (response) {
     setTimeout(function(){
             Alert.alert(
        "Accept",
        "You Accept the offer",
        [
         { text: "OK", onPress: () => navigation.navigate('AgreedLoans') }
        ]
        );
      setLoading(false)
             })
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

 function RejectFunction(){
  axios({
     method:'post',
     url:'http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/loanOfferAccepetence',
     data:{
           id:id,
           loanRequestId:requestId,
           loanOfferStatus:"LOANOFFERREJECTED"
          },
     headers:{
           accessToken:access,
          }
    })
    .then(function (response) {
     setTimeout(function(){
      setLoading(false)
            Alert.alert(
       "Reject",
       "You Reject the offer",
       [
        { text: "OK", onPress: () => navigation.navigate('AgreedLoans')}
       ]
       );
             })
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

 useEffect(()=>{
    getfunction();

  },[])


 return(
  <View style={{borderWidth:2,height:500,margin:10,marginTop:20}}>
  <View style={{marginTop:20,alignSelf:'center'}}>
   <Image source={require('../OxyloansMasterLogo.png')} style={{height:80,width:300,marginBottom:20}} />
  </View>
  <View style={{borderBottomWidth:2,marginBottom:10}}></View>
  <View style={{marginTop:10,marginLeft:10,width:350}}>
  <Text style={{marginBottom:10,fontWeight:"bold"}}>Below is the Loan Offer Request, Please <Text style={{color:"green"}}>Accept</Text> or <Text style={{color:"red"}}>Reject</Text> the loan offer.</Text>
  </View>
     <View style={{backgroundColor:'white',marginHorizontal:8,height:"auto",padding:8,marginVertical:8,borderLeftColor:'#0096FF',borderLeftWidth:4.5}}>
          <View style={styles.flatmain}>
              <View style={styles.TxtView1}><Text style={styles.Txt1}>Loan Amount</Text></View>
              <View><Text style={styles.Txt2}>INR {loanofferamount}</Text></View>
          </View>
          <View style={styles.flatmain}>
              <View style={styles.TxtView1}><Text style={styles.Txt1}>Processing Fee:(Including GST & Documentation charges)RS/-</Text></View>
              <View><Text style={styles.Txt2}>INR {processing}</Text></View>
          </View>
          <View style={styles.flatmain}>
              <View style={styles.TxtView1}><Text style={styles.Txt1}>Net Disbursement to Customer</Text></View>
              <View><Text style={styles.Txt2}>INR {disbursement}</Text></View>
          </View>
          <View style={styles.flatmain}>
              <View style={styles.TxtView1}><Text style={styles.Txt1}>Tenure</Text></View>
              <View><Text style={styles.Txt2}>{duration} {durationtype}</Text></View>
          </View>
          <View style={styles.flatmain}>
              <View style={styles.TxtView1}><Text style={styles.Txt1}>Interest Amount</Text></View>
              <View><Text style={styles.Txt2}>INR {emiamount}</Text></View>
          </View>
          <View style={styles.flatmain}>
          <View style={{marginLeft:160,flexDirection:'row'}}>
          <TouchableOpacity onPress={AcceptFunction}>
              <View style={styles.btn1}><Text style={styles.Txt3}>Accept</Text></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={RejectFunction}>
              <View style={styles.btn}><Text style={styles.Txt3}>Reject</Text></View>
          </TouchableOpacity>
          </View>
          </View>
     </View>

     <AnimatedLoader
      visible={loading}
      overlayColor="rgba(255,255,255,0.75)"
      source={require("../loading-state.json")}
      animationStyle={styles.lottie}
      speed={1}>
<Text>Loading...</Text>
</AnimatedLoader>

  </View>
 )
 }

export default AcceptedOffer;

const styles = StyleSheet.create({
    flatmain:{
      flexDirection:"row",
      alignItems:'center',
      borderBottomColor:'grey',
      borderBottomWidth:1,
      paddingVertical:5
    },

    Txt1:{
        fontWeight:'bold',
        color:'#0096FF',
        fontSize:15

    },

    Txt2:{
        fontWeight:'bold',
        color:'black',
        fontSize:15,
        marginLeft:25

    },
    Txt3:{
        fontWeight:'bold',
        color:'white',
        fontSize:15,

    },

    TxtView1:{
        width:180,
    },
    btn:{
      padding:5,
      width:60,
      justifyContent:"center",
      alignItems:"center",
      borderRadius:5,
      backgroundColor:"#FF0000",
      marginLeft:10,
      },
      btn1:{
        padding:5,
        width:60,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:5,
        backgroundColor:"#4CAF50",
        marginLeft:10
        },

  })
