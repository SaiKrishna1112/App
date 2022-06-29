import React,{useState,useEffect,useCallback} from 'react'
import { StyleSheet, Text, View,Button ,TextInput,FlatList,Modal,Alert} from 'react-native';
import axios from 'axios';
import {useSelector} from 'react-redux';
import * as Contacts from 'expo-contacts'

const BorrowerHome=({navigation}) =>{
 const userDetails = useSelector(state=>state.counter);
 var access = userDetails.headers.accesstoken;
 var id = userDetails.data.id;
 const userDetail = useSelector(state=>state.logged);
 const [Count,setCount]=useState()

 const [Closed,setclosed]=useState()
 const[ClosedLoans,setclosedLoans]=useState()
 const[Amount,setAmount]=useState()
 const [Active,setActive]=useState()
 const[ActiveLoans,setActiveLoans]=useState()

 const [Disbursed,setDisbursed]=useState()
 const [DisbursedAmt,setDisbursedAmt]=useState()
 const [Greeting,setGreeting]=useState();
 const [contacts,setContacts]=useState();

 var prod='https://fintech.oxyloans.com/oxyloans/v1/user';
 var local='http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user';

 async function ContactInfo() {
     const {status}=await Contacts.requestPermissionsAsync();
     if(status==='granted'){
       const{data}=await Contacts.getContactsAsync({
         fields:[Contacts.Fields.PhoneNumbers]
       })
       if(data.length>0){
         console.log(data)

       }
     }
   }
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

function getfunction(){

axios({
   method:'get',
   url:'http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/borrowerdashboard/BORROWER',
   headers:{
     accessToken: access,
   }
 })

 .then(function (response) {


   setCount(response.data.noOfApplications)
   setActive(response.data.noOfActiveApplications)
   setAmount(response.data.loanOfferedAmount)
   setActiveLoans(response.data.activeLoansAmount)
   setclosed(response.data.noOfClosedApplications)
   setclosedLoans(response.data.closedLoansAmount)
   setDisbursed(response.data.noOfDisbursedApplications)
   setDisbursedAmt(response.data.amountDisbursed)

 })
 .catch(function(error){
   console.log('error',error)
 });
}

useEffect(()=>{
 getfunction();
 greeting();
 redirectUsertoProfile();
 redirectUsertoRequestpage();
 ContactInfo();
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
        { text: "View Offer", onPress: () => navigation.navigate('AcceptedOffer')},
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
       { text: "OK", onPress: () => navigation.navigate('Enach') }
      ]
     );
  	}
  }
  }

////////////////////////////////////////////////////////////////
  function redirectUsertoRequestpage() {
  	var inLoanRequestPage = false;

  	if (rateOfInterest === false) {
  		setTimeout(function () {
  			rateofInterestCheck = true;
  		}, 1000);
  	}

  	var nowyoucancheckROI = true;


  	if (nowyoucancheckROI) {
  		if (inLoanRequestPage == true && rateOfInterest === false) {
  		  alert("Submit your lending commitment");
  		}
  		if (inLoanRequestPage != true) {
  			if (rateOfInterest === false) {
  				alert("Submit Loan Application");
  			}

  			if (rateOfInterest === false) {

  				if (userkycStatus != false) {

  					if(sprimaryType == "BORROWER" && (userUtm =="WEB" ||  userUtm ==null ||  userUtm =="Web")){

        Alert.alert(
         "Alert",
          "Please Update your Loan Request.",
          [
           { text: "OK", onPress: () => navigation.navigate('MyloanRequest',{status:'Requested'}) }
          ]
         );
  					}

  					else if(sprimaryType == "BORROWER" && (userUtm !="WEB" && userUtm!=null)){

         Alert.alert(
          "Alert",
           "Please Update your Loan Request.",
           [
            { text: "OK", onPress: () => navigation.navigate('MyloanRequest',{status:'Requested'}) }
           ]
          );
  					}

  				};
  			};

  		}
  	}
  }

 return (
 <View style={styles.container}>
   <View style={{flexDirection:'row'}}>
        <Text style={{fontSize:16,fontWeight:'bold'}}>{Greeting}  </Text>
        <Text style={{fontSize:16,fontWeight:'bold'}}>{userDetail.firstName}</Text>
     </View>
      <View style={styles.container1}>

      <View style={{flexDirection:"row"}}>
      <View style={styles.box1}>
        <Text style={styles.txt1}>{Amount}</Text>
        <View style={{backgroundColor:'#008B8B',width:165,marginHorizontal:20,paddingVertical:10,bottom:-1,alignItems:'center'}}>
          <Text style={{color:'white'}}>No of applications : {Count} </Text>
        </View>
      </View>
      <View style={styles.box2}>
        {/* <Text style={styles.txt1}></Text> */}
        <Text style={styles.txt1}>{ActiveLoans}</Text>
        <View style={{backgroundColor:'#34A56F',width:165,marginHorizontal:20,paddingVertical:10,bottom:2,alignItems:'center'}}>
          <Text style={{color:'white'}}> No of Active Applications : {Active}</Text>
        </View>
      </View>
      </View>

      <View style={{flexDirection:"row"}}>
      <View style={styles.box3}>
        <Text style={styles.txt1}>{ClosedLoans}</Text>
        <View style={{backgroundColor:'#9F000F',width:165,marginHorizontal:20,paddingVertical:10,bottom:-1,alignItems:'center'}}>
             <Text style={{color:'white'}}>Closed Applications : {Closed}</Text>
        </View>
      </View>
      <View style={styles.box4}>
        <Text style={styles.txt}>INR :{DisbursedAmt}</Text>
        <View style={{backgroundColor:'#E66C2C',width:165,marginHorizontal:20,paddingVertical:10,bottom:-8,alignItems:'center'}}>
        <Text style={{color:'white'}}>No.of Disbursed Applications : {Disbursed}</Text>
        </View>
      </View>
      </View>
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
    fontSize:40,
    margin:2
  },
  txt2:{
    backgroundColor:'blue',
    color:'white',
    marginTop:5,
    paddingTop:5,
  },
  txt:{
    color:'white',
    fontSize:30,
    margin:2
  },
});
export default BorrowerHome;
