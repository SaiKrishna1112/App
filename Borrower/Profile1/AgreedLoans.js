import React, { useState,useEffect } from 'react'
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from "axios";

import { StyleSheet, Text, View,Button ,TextInput,FlatList,Modal,SafeAreaView,Alert,TouchableOpacity} from 'react-native';


const AgreedLoans = props => {

    const userDetails = useSelector(state=>state.counter);
    var name=userDetails.data.firstName;
    // console.log(name);
  const userDetail = useSelector(state=>state.logged);
    var access = userDetails.headers.accesstoken;
    var id = userDetails.data.id;
    var primarytype=userDetails.data.primaryType;
    // console.log(primarytype)
const [status,setstatus]=useState();
const[load,setLoading]=useState();
const[result,setresults]=useState();
const[otp,setotp]=useState();
const[loanRequestId,setloanRequestId]=useState();

const getcall=props=>{
  axios.post('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/loan/'+primarytype+'/search',{
    leftOperand:{fieldName:"borrowerUserId",
                  fieldValue:id,
                  operator:"EQUALS"},
    logicalOperator:"AND",
    rightOperand:{fieldName:"loanStatus",
                    fieldValues:["Agreed","Active","Closed"],
                    operator:"IN"},
    page:{pageNo:1,pageSize:10},
    sortBy:"loanId",
    sortOrder:"DESC"
  },{
    headers:{
      accessToken:access,
    }
  })
  .then(function (response) {
    console.log("==========================")
    // console.log(response.data.results);
    setresults(response.data.results);
    setloanRequestId(response.data.results[0].loanRequestId)

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


const esignotp=()=>{
  axios.post('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/loan/BORROWER/'+loanRequestId+'/esign',{
    eSignType: "MOBILE"
  },
  {
    headers:{
      accessToken:access,
    }
  })
  .then(function (response) {
    console.log("======================")
    console.log(response.data);
    // setresults(response.data.results);

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

const submitfunction=()=>{
  axios.post('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/loan/'+primarytype +'/'+loanRequestId+'/uploadAgreement',
  {
    eSignType: "MOBILE",
    otpValue: otp
  },{
      headers:{
        accessToken:access
      }
    }
  )
  .then(function (response) {
    console.log(response.data);
    // setresults(response.data.results);

    setTimeout(function(){
     setLoading(false)
     Alert.alert("E-Sign Verification completed Succesfully");
     console.log(response.data);
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
  getcall();

},[])

    const renderList = ({ item }) => {


      return (

      <View style={{backgroundColor:'white',marginHorizontal:8,height:"auto",padding:8,marginVertical:8,borderLeftColor:'green',borderLeftWidth:4.5}}>
        <View style={styles.flatmain}>
        <View style={styles.TxtView1}><Text style={styles.Txt1}>Lender Name</Text></View>
        <View><Text style={styles.Txt2}>{item.lenderUser.firstName}</Text></View>
        </View>

        <View style={styles.flatmain}>
        <View style={styles.TxtView1}><Text style={styles.Txt1}>Loan Id</Text></View>
        <View><Text style={styles.Txt2}>{item.loanId}</Text></View>
        </View>

        <View style={styles.flatmain}>
        <View style={styles.TxtView1}><Text style={styles.Txt1}>Application Id</Text></View>
        <View><Text style={styles.Txt2}>{item.loanRequest}</Text></View>
        </View>

        <View style={styles.flatmain}>
        <View style={styles.TxtView1}><Text style={styles.Txt1}>Loan Amount</Text></View>
        <View><Text style={styles.Txt2}>{item.loanRequestAmount}</Text></View>
        </View>

        <View style={styles.flatmain}>
        <View style={styles.TxtView1}><Text style={styles.Txt1}>EMI/Interest Type </Text></View>
        <View><Text style={styles.Txt2}>{item.repaymentMethod}</Text></View>
        </View>

        <View style={styles.flatmain}>
        <View style={styles.TxtView1}><Text style={styles.Txt1}>ROI </Text></View>
        <View><Text style={styles.Txt2}>{item.rateOfInterest}%</Text></View>
        </View>

        <View style={styles.flatmain}>
        <View style={styles.TxtView1}><Text style={styles.Txt1}>Duration </Text></View>
        <View><Text style={styles.Txt2}>{item.duration}</Text></View>
        </View>

        <View style={styles.flatmain}>
        <View style={styles.TxtView1}><Text style={styles.Txt1}>Loan Status  </Text></View>
        <View><Text style={styles.Txt2}>{item.loanStatus}</Text></View>
        </View>

        <View style={styles.flatmain}>
        <View style={styles.TxtView1}><Text style={styles.Txt1}>Download Agreement  </Text></View>
        <View><TouchableOpacity style={styles.Txt2}><Icon name="download" size={20} color={"green"}/></TouchableOpacity></View>
        </View>


        <View style={styles.flatmain}>
        <View style={styles.TxtView1}><Text style={styles.Txt1}>Esign</Text></View>
        <View><TouchableOpacity style={styles.btn} onPress={esignotp}><Text style={styles.btntxt}> E-Sign with Mobile Number</Text></TouchableOpacity></View>
        </View>

        <View style={{flexDirection:"row",justifyContent:"flex-end"}}>
          <TextInput  style={styles.input} placeholder="Enter OTP "  onChangeText={(numeric)=>setotp(numeric)} keyboardType="number-pad"/>
          <TouchableOpacity style={styles.btn1} onPress={submitfunction}><Text style={styles.btntxt1}>Submit</Text></TouchableOpacity>
        </View>
      </View>

      );
    };



  return (

    <SafeAreaView>
      <FlatList
           data={result}

           renderItem={renderList}

          //  keyExtractor={item => item.}
      />

    </SafeAreaView>
  )
}

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
      color:'#569F40',
      fontSize:15,

  },

  Txt2:{
      fontWeight:'bold',
      color:'black',
      fontSize:15

  },

  TxtView1:{
      width:190,
  },
  btn:{
    width:130,
    backgroundColor:"#FFA500",
    borderRadius:5
  },
  btn1:{
    marginLeft:10,
    backgroundColor:"#FFA500",
    borderRadius:5,
    width:100,
    marginTop:10
  },
  btntxt:{
    fontWeight:"bold",
    alignSelf:"center"
  },
  btntxt1:{
    fontWeight:"bold",
    alignSelf:"center",
    justifyContent:"center",
    marginTop:10

  },
  input:{
    borderColor:"grey",
    borderRadius:5,
    borderWidth:2,
    width:90,
    padding:5,
    marginTop:10,
    alignSelf:"flex-end"
  }


})


 export default AgreedLoans;
