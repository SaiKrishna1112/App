import React,{useState,useEffect} from "react";
import { View,Text ,StyleSheet,FlatList,TextInput,ScrollView,TouchableOpacity,Alert} from "react-native";
import Slider from '@react-native-community/slider';
import { RadioButton } from 'react-native-paper';
import DatePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import {useSelector} from 'react-redux';
import AnimatedLoader from "react-native-animated-loader";


const Borrowings=({navigation})=>{
  const userDetails = useSelector(state=>state.counter);
  const userDetail = useSelector(state=>state.logged);
  var access = userDetails.headers.accesstoken;
  var id = userDetails.data.id;
  var loanOfferedStatus = userDetails.data.loanOfferedStatus;
  var loansExists = userDetails.data.loansExists;
    const[LoanRequest,setLoanRequest]=useState();
    const [sliderValue, setSliderValue] = useState(8);
    const[LoanDuration,setLoanDuration]=useState();
    const[LoanPurpose,setLoanPurpose]=useState();
    const [value, setValue] = useState();
    const[payment,setpayment]=useState();
    const[show,setshow]=useState(false);
    const[date,setDate]=useState(new Date());
    const[mode,setMode]=useState('date');
    const[text,setText]=useState('08/06/2022');
    const[loading,setLoading]=useState(false);
    const[loanEligibility,setloanEligibility]=useState();
    const[requestId,setrequestId]=useState([]);
    const[status,setStatus]=useState();


const getfunction=props=>{
 axios.get('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/borrowerdashboard/BORROWER',
 {
   headers:{
   accessToken: access,
}})
.then(function (response) {
  //console.log("=========get function loan borrowerdashboard============");
  //console.log(response.data);

})
.catch(function (error) {
  console.log(error);
  console.log(error.response.status);
  Alert.alert(
"Warning",
"Something went wrong",
[
{ text: "OK", onPress: () => setLoading(false) }
]
);

}
);
}

var data={
         leftOperand:
          {
            leftOperand:
             {
              fieldName:"userPrimaryType",
              fieldValue:"LENDER",
              operator:"EQUALS"
             },
             logicalOperator:"AND",
             rightOperand:{
                 fieldName:"user.status",
                 fieldValue:"ACTIVE",
                 operator:"EQUALS"
              }
           },
              logicalOperator:"AND",
              rightOperand:{
                 leftOperand:{
                    fieldName:"parentRequestId",
                    operator:"NULL"
                    },
                 logicalOperator:"AND",
                 rightOperand:{
                     fieldName:"user.emailVerified",
                     fieldValue:"true",
                     operator:"EQUALS"
                     }
                  },
              page:{
                 pageNo:1,
                 pageSize:3
               },
             sortBy:"loanRequestedDate",
             sortOrder:"DESC"
            }
  const searchfunction=()=>{
   //console.log('===================loan search call===================');
   axios({
      method:'post',
      url:'http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/loan/BORROWER/request/search',
      data:data,
      headers:{
            accessToken:access,
           }
     })
     .then(function (response) {
      //console.log(response.data)
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
var admindata={
                  leftOperand:{
                      fieldName:"userId",
                      fieldValue:id,
                      operator:"EQUALS"
                     },
                     logicalOperator:"AND",
                     rightOperand:{
                        fieldName:"parentRequestId",
                        operator:"NULL"
                     }
               }

  const adminsearchfunction=()=>{
   setLoading(true)
   //console.log('===================admin loan search call===================');
   axios({
      method:'post',
      url:'http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/loan/ADMIN/request/search',
      data:admindata,
      headers:{
            accessToken:access,
           }
     })
     .then(function (response) {
     // console.log("====================================================");
      //console.log(response.data.results)
      setrequestId(response.data.results)
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

const getEligibility=()=>{
 axios.get('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/borrowerEligibilityDetails',
 {

   headers:{
   accessToken: access,

}})
.then(function (response) {
  //console.log("============================loan  Eligibility============================");
//console.log(response.data);
setloanEligibility(response.data.loanEligibility)
})
.catch(function (error) {
  console.log(error);
  console.log(error.response.status);

  console.log(error.response.data.errorMessage);
  Alert.alert(
"Warning",
"Something went Wrong",
[
{ text: "OK", onPress: () => setLoading(false) }
]
);

}
);

}

useEffect(()=>{
 getEligibility();
 getfunction();
 searchfunction();
 adminsearchfunction();
},[]);


//////////////////////////////////////////////////////////////////////////////////

const submitfunction=()=>{
 console.log(sliderValue);
 console.log(LoanRequest);
 console.log(LoanDuration,LoanPurpose,value,payment);
  axios.patch('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/loan/BORROWER/updateLoanRequest',{
    loanRequestAmount:LoanRequest,
    rateOfInterest:sliderValue,
    duration:LoanDuration,
    repaymentMethod:payment,
    loanPurpose:LoanPurpose,
    expectedDate:text,
    durationType:value,
    status:'Requested',
  },{

    headers:{
    accessToken: access,

}})

  .then(function (response) {
console.log(response.data);
    setTimeout(function(){
        Alert.alert("Your Loan Application is Sucessfully Submited");
  }, 3000);
  })
  .catch(function (error) {
    console.log(error);
    console.log(error.response.status);

    console.log(error.response.data.errorMessage);
    Alert.alert(
"Warning",
error.response.data.errorMessage,
[
{ text: "OK", onPress: () => setLoading(false) }
]
);
}
);
}

const HoldFunction=()=>{
 axios.patch('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/loan/BORROWER/updateLoanRequest',{
   status:"Hold",
 },{

   headers:{
   accessToken: access,

}})

 .then(function (response) {
console.log(response.data);
   setTimeout(function(){
       Alert.alert("Your Loan Application will be hold");
 }, 3000);
 })
 .catch(function (error) {
   console.log(error);
   console.log(error.response.status);

   console.log(error.response.data.errorMessage);
   Alert.alert(
"Warning",
error.response.data.errorMessage,
[
{ text: "OK", onPress: () => setLoading(false) }
]
);

}
);
}

const DeleteFunction=()=>{
 axios.patch('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/loan/BORROWER/updateLoanRequest',{
   status:"Rejected",
 },{

   headers:{
   accessToken: access,

}})

 .then(function (response) {
console.log(response.data);
   setTimeout(function(){
       Alert.alert("Your Loan Application will be Delete");
 }, 3000);
 })
 .catch(function (error) {
   console.log(error);
   console.log(error.response.status);

   console.log(error.response.data.errorMessage);
   Alert.alert(
"Warning",
error.response.data.errorMessage,
[
{ text: "OK", onPress: () => setLoading(false) }
]
);

}
);
}

 const renderList = ({item})=>{
  return (
       <View>
            <View style={{borderColor:'grey',borderWidth:1.8,marginHorizontal:15,height:"auto",padding:8,borderTopWidth:8,borderTopColor:'#569F40',borderBottomWidth:0.5}}>
                <View style={styles.flatmain}>
                   <View style={styles.TxtView1}><Text style={styles.Txt1}>Loan Request Amount</Text></View>
                   <View><Text style={styles.Txt2}>{item.loanRequestAmount}</Text></View>
                </View>
                <View style={styles.flatmain}>
                   <View style={styles.TxtView1}><Text style={styles.Txt1}>Loan Request ID</Text></View>
                   <View><Text style={styles.Txt2}>{item.loanRequest}</Text></View>
                </View>
                <View style={styles.flatmain}>
                   <View style={styles.TxtView1}><Text style={styles.Txt1}>ROI</Text></View>
                   <View><Text style={styles.Txt2}>{item.rateOfInterest}</Text></View>
                </View>
                <View style={styles.flatmain}>
                   <View style={styles.TxtView1}><Text style={styles.Txt1}>Loan Request Date</Text></View>
                   <View><Text style={styles.Txt2}>{item.loanRequestedDate}</Text></View>
                </View>
                <View style={styles.flatmain}>
                   <View style={styles.TxtView1}><Text style={styles.Txt1}>Loan Purpose</Text></View>
                   <View><Text style={styles.Txt2}>{item.loanPurpose}</Text></View>
                </View>
                <View style={styles.flatmain}>
                   <View style={styles.TxtView1}><Text style={styles.Txt1}>Loan Status</Text></View>
                   <View><Text style={styles.Txt2}>{item.loanStatus}</Text></View>
                </View>
                  <View style={styles.flatmain}>
                    <View style={styles.TxtView}><Text style={styles.Txt1}>Modify</Text></View>
                    {item.loanStatus=="LOANOFFERACCEPTED" ?
                    <View>
                    <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={styles.btn}><Text style={{color:"black"}}>Edit</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.btn}><Text style={{color:"black"}}>Hold</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.btn}><Text style={{color:"black"}}>Delete</Text></TouchableOpacity>
                    </View>
                    </View>   :
                    <View>
                    <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={styles.btn1} onPress={()=>{navigation.navigate('MyloanRequest',{status:'Edit'})}}><Text style={{color:"black"}}>Edit</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.btn1} onPress={HoldFunction}><Text style={{color:"black"}}>Hold</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.btn1} onPress={DeleteFunction}><Text style={{color:"black"}}>Delete</Text></TouchableOpacity>
                    </View>
                    </View>}
                  </View>
           </View>
           </View>
     )
    };
    return(
        <View style={{flex:9,marginTop:20}}>
               <View style={{marginLeft:100}}><Text style={{fontWeight:'bold'}}>Your Loan Eligibility is : INR {loanEligibility}  <Text style={{color:'blue'}}>Know more</Text></Text></View>
               <View style={{marginTop:20}}>
               <FlatList
                    data={requestId}
                    renderItem={renderList}
               />
               </View>
               <AnimatedLoader
                visible={loading}
                overlayColor="rgba(255,255,255,0.75)"
                source={require("../loading-state.json")}
                animationStyle={styles.lottie}
                speed={1}>
            <Text style={{fontSize:18,fontWeight:'bold'}}>Loading.....</Text>
            </AnimatedLoader>
          </View>

    )
}
const styles=StyleSheet.create({
    renderview:
    {
        marginBottom:10,
        borderColor:"grey",
        alignSelf:"center",
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        width:350,
    },
  btn:{
    padding:5,
    width:60,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:5,
    backgroundColor:"#FF2E2E",
    marginLeft:10,
    opacity:0.1
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
      lottie: {
        width: 150,
        height: 150
      },flatmain:{
        flexDirection:"row",
        alignItems:'center',
        borderBottomColor:'grey',
        borderBottomWidth:1,
        paddingVertical:5
      },

      Txt1:{
          fontWeight:'bold',
          color:'#569F40',
          fontSize:15

      },

      Txt2:{
          fontWeight:'bold',
          color:'black',
          fontSize:15

      },

      TxtView1:{
          width:180,
      },
      TxtView:{
          width:100,
      }
})


export default Borrowings;
