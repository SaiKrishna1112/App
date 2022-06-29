import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,Button ,TextInput,FlatList,Modal,TouchableOpacity} from 'react-native';
import axios from 'axios';
import {useSelector} from 'react-redux';
import OngoingDeals from './OngoingDeals';

const Home=({navigation}) =>{
 const userDetails = useSelector(state=>state.counter);
 var access = userDetails.headers.accesstoken;
 var id = userDetails.data.id;
 const userDetail = useSelector(state=>state.logged);
  const [Amount,setAmount]=useState()

  const [Count,setCount]=useState()
  const [Deals,setDeals]=useState()

  const [Closed,setclosed]=useState()
  const [ClosedAmt,setclosedAmt]=useState()

  const [Disbursed,setDisbursed]=useState()
  const [DisbursedAmt,setDisbursedAmt]=useState()
  const [Greeting,setGreeting]=useState("Good Morning")

  const [Dates,setDate]=useState()
  var prod='https://fintech.oxyloans.com/oxyloans/v1/user';
  var local='http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user';
  function greeting(){
  const day = new Date();
       const hr = day.getHours();
       if (hr >= 0 && hr < 12) {
           setGreeting("Good Morning!");
       } else if (hr == 12) {
           setGreeting("Good Noon!");
       } else if (hr >= 12 && hr <= 17) {
           setGreeting("Good Afternoon!");
       } else {
           setGreeting("Good Evening!");
       }
}
  const Getfunction=()=>{
axios({
    method:'get',
    url:local+'/'+id+'/dealsStatistics',
    headers:{
      accessToken: access,
    }
  })

  .then(function (response) {

    setAmount(response.data.totalWalletDebitedAmount)

    setCount(response.data.numberOfActiveDealsCount)
    setDeals(response.data.activeDealsAmount)

    setclosed(response.data.numberOfClosedDealsCount)
    setclosedAmt(response.data.closedDealsAmount)

    setDisbursed(response.data.numberOfDisbursedDealsCount)
    setDisbursedAmt(response.data.disbursedDealsAmount)

    setDate(response.data.validityDate)
  })
  .catch(function(error){
    console.log('error',error)
  });
 }
useEffect(()=>{
 Getfunction();
 greeting();
 redirectUsertoProfile();
},[])
  var loan = userDetail.loansExists;
   var userpersonalinfo = userDetail.personalDetailsInfo;
   var userbankDetailsInfo = userDetail.bankDetailsInfo;
   var userkycStatus = userDetail.kycStatus;
   var sprimaryType = userDetail.primaryType;
   var rateOfInterest = userDetail.rateOfInterestUpdated;
   var loanOfferedStatus = userDetail.loanOfferedStatus;
   var loanExist = userDetail.loansExists;
   var userWhatsappUpdateStatus = userDetail.whatsAppNumberUpdated;
   var userwhatsappVerifiedStatus = userDetail.whatsappVerified;
   var esginStatus = userDetail.esignedStatus;
   var enachStatus = userDetail.enachStatus;
   var citizenship = userDetail.citizenship;



   var prod='https://fintech.oxyloans.com/oxyloans/v1/user';
   var local='http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user';


  function redirectUsertoProfile() {
  	if (
  		userpersonalinfo == false &&
  		userbankDetailsInfo == false &&
  		userkycStatus == false
  	) {
  		if (sprimaryType == "LENDER") {
  		Alert.alert(
     "Alert",
  			"Please complete your profile and upload the valid documents",
      [
       { text: "OK", onPress: () => navigation.navigate('Profile') }
      ]
  			);
  		} else {
     Alert.alert(
      "Alert",
       "Please complete your profile and upload the valid documents",
       [
        { text: "OK", onPress: () => navigation.navigate('Profile') }
       ]
      );
  		}
  	}

  	if (
  		userpersonalinfo == false &&
  		userbankDetailsInfo == false &&
  		userkycStatus == true
  	) {
  		if (sprimaryType == "LENDER") {
     Alert.alert(
      "Alert",
   				"Please complete your profile and upload all valid documents to Add a Loan Offer.",
       [
        { text: "OK", onPress: () => navigation.navigate('Profile') }
       ]
   			);
  		} else {
     Alert.alert(
      "Alert",
   				"Please complete your profile and upload all valid documents to raise a Loan Request.",
       [
        { text: "OK", onPress: () => navigation.navigate('Profile') }
       ]
   			);
  		}
  	}

  	if (
  		userpersonalinfo == true &&
  		userbankDetailsInfo == false &&
  		userkycStatus == true
  	) {
  		if (sprimaryType == "LENDER") {
     Alert.alert(
      "Alert",
       "Please complete your Bank Details.",
       [
        { text: "OK", onPress: () => navigation.navigate('Profile') }
       ]
      );
  		} else {
     Alert.alert(
      "Alert",
       "Please complete your Bank Details.",
       [
        { text: "OK", onPress: () => navigation.navigate('Profile') }
       ]
      );
  		}
  	}

  	if (
  		userpersonalinfo == true &&
  		userbankDetailsInfo == false &&
  		userkycStatus == false
  	) {
  		if (sprimaryType == "LENDER") {
     Alert.alert(
      "Alert",
       "Please complete your Bank Details.",
       [
        { text: "OK", onPress: () => navigation.navigate('Profile') }
       ]
      );
  		} else {
     Alert.alert(
      "Alert",
       "Please complete your Bank Details.",
       [
        { text: "OK", onPress: () => navigation.navigate('Profile') }
       ]
      );
  		}
  	}



  	if (
  		userpersonalinfo == true &&
  		userbankDetailsInfo == true &&
  		userkycStatus == true &&
  		rateOfInterest == true &&
  		loanOfferedStatus == true
  	) {
  		if (sprimaryType == "BORROWER") {
     Alert.alert(
      "Alert",
       "Are you sure to accept this offer.",
       [
        { text: "View Offer", onPress: () => navigation.navigate('SendOffer')},
        { text: "Close",onPress: () => console.log("Cancel Pressed") }
       ]
      );
  		}
  	}

  if(userWhatsappUpdateStatus==true &&  userwhatsappVerifiedStatus==false && citizenship== "NONNRI" && userpersonalinfo == true &&
  		userbankDetailsInfo == true &&
  		userkycStatus == true){
     	   if (sprimaryType == "LENDER") {
          Alert.alert(
           "Alert",
            "Please complete Whatsapp Verification.",
            [
             { text: "OK", onPress: () => navigation.navigate('Profile') }
            ]
           );
  		}

  }
     if(userWhatsappUpdateStatus==true && userwhatsappVerifiedStatus==false && rateOfInterest == true && userpersonalinfo == true &&
  		userbankDetailsInfo == true &&
  		userkycStatus == true){
     	   if (sprimaryType == "BORROWER") {
          Alert.alert(
           "Alert",
            "Please complete Whatsapp Verification.",
            [
             { text: "OK", onPress: () => navigation.navigate('Profile') }
            ]
           );
  		}

  }

    if(loanExist==true && userwhatsappVerifiedStatus==true&&esginStatus==false){
  	if(sprimaryType == "BORROWER"){
    Alert.alert(
     "Alert",
      "Please complete Esign.",
      [
       { text: "OK", onPress: () => navigation.navigate('AgreedLoans') }
      ]
     );
  	}
  }

  if(loanExist==true && esginStatus==true && userwhatsappVerifiedStatus==true &&enachStatus==false ){
  	if(sprimaryType == "BORROWER"){
    Alert.alert(
     "Alert",
      "Please complete eNACH.",
      [
       { text: "OK", onPress: () => navigation.navigate('AgreedLoans') }
      ]
     );
  	}
  }
  }

  return (

    <View style={styles.container}>
    <View style={{flexDirection:'row'}}>
         <Text style={{fontSize:16,fontWeight:'bold'}}>{Greeting}  </Text>
         <Text style={{fontSize:16,fontWeight:'bold'}}>{userDetail.firstName}</Text></View>
         <View style={{flexDirection:'row',marginVertical:15,alignItems:'center',justifyContent:"center"}}>
            <TouchableOpacity style={{backgroundColor:'#50C878',width:165,height:30,marginRight:10,alignItems:'center',justifyContent:'center',borderRadius:5}}
               onPress={()=>navigation.navigate('Running Deals')}>
              <Text>Ongoing Deals</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Participated Deals')} style={{backgroundColor:'#008B8B',width:165,height:30,marginLeft:10,alignItems:'center',justifyContent:'center',borderRadius:5}}>
              <Text>Participated Deals</Text>
            </TouchableOpacity>
          </View>
       <View style={styles.container1}>

       <View style={{flexDirection:"row"}}>
       <View style={styles.box1}>
         <Text style={styles.txt1}>{Amount}</Text>
         <View style={{backgroundColor:'#008B8B',width:165,marginHorizontal:20,paddingVertical:10,bottom:-8,alignItems:'center'}}>
           <Text style={{color:'white'}}>Earnings</Text>
         </View>
       </View>
       <View style={styles.box2}>
         <Text style={styles.txt1}>{Count}</Text>
         <Text style={{color:'white'}}>{Deals}</Text>
         <View style={{backgroundColor:'#34A56F',width:165,marginHorizontal:20,paddingVertical:10,top:0,alignItems:'center'}}>
           <Text style={{color:'white'}}>Active Deals</Text>
         </View>
       </View>
       </View>

       <View style={{flexDirection:"row"}}>
       <View style={styles.box3}>
         <Text style={styles.txt1}>{Closed}</Text>
         <Text style={{color:'white'}}>{ClosedAmt}</Text>
         <View style={{backgroundColor:'#9F000F',width:165,marginHorizontal:20,paddingVertical:10,top:0,alignItems:'center'}}>
              <Text style={{color:'white'}}>No.of closed Deals</Text>
         </View>
       </View>
       <View style={styles.box4}>
         <Text style={styles.txt1}>{Disbursed}</Text>
         <Text style={{color:'white'}}>INR :{DisbursedAmt}</Text>
         <View style={{backgroundColor:'#E66C2C',width:165,marginHorizontal:20,paddingVertical:10,top:0,alignItems:'center'}}>
         <Text style={{color:'white'}}>No.of Disbursed Deals</Text>
         </View>
       </View>
       </View>
        </View>
       <View >
         <Text>MemberShip Validity Date:  {Dates}</Text>
       </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop:10,
  },

  container1: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop:0,
    marginLeft:1
  },

  box1:{
    backgroundColor:'#40E0D0',
    width:165,
    height:130,
    margin:10,
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center',
    display:'flex',

  },

  box2:{
    backgroundColor:'#50C878',
    width:165,
    height:130,
    margin:10,
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center',
  },

  box3:{
    backgroundColor:'#F75D59',
    width:165,
    height:130,
    margin:10,
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center',
  },

  box4:{
    backgroundColor:'#FF8C00',
    width:165,
    height:130,
    margin:10,
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center',
  },

  txt1:{
    color:'white',
    fontSize:30,
    margin:2
  },
  txt2:{
    backgroundColor:'blue',
    color:'white',
    marginTop:5,
    paddingTop:5,


  }
});
export default Home;
