import React, { useState,useEffect } from 'react'
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from "axios";

import { StyleSheet, Text, View,Button ,TextInput,FlatList,Modal,SafeAreaView,Alert,TouchableOpacity} from 'react-native';


const Enach = ({navigation}) => {

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



const searchEnachMandate=()=>{
  axios.post('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/loan/BORROWER/searchEnachMandate',{
    leftOperand:{fieldName:"borrowerUserId",
                   fieldValue:id,
                   operator:"EQUALS"},
    logicalOperator:"AND",
    rightOperand:{leftOperand:{fieldName:"borrowerEsignId",
                                    operator:"NOT_NULL"},
                    logicalOperator:"AND",
                    rightOperand:{fieldName:"loanStatus",
                                  fieldValue:"Active",
                                  operator:"EQUALS"}},
    page:{pageNo:1,pageSize:10},
    sortBy:"loanId",
    sortOrder:"DESC"},
  {
    headers:{
      accessToken:access,
    }
  })
  .then(function (response) {
    console.log("======================")
    console.log(response.data.results);
    setresults(response.data.results);

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


useEffect(()=>{
    searchEnachMandate();

},[])

    const renderList = ({ item }) => {


      return (

      <View style={{backgroundColor:'white',marginHorizontal:8,height:"auto",padding:8,marginVertical:8,borderLeftColor:'green',borderLeftWidth:4.5}}>
        <View style={styles.flatmain}>
        <View style={styles.TxtView1}><Text style={styles.Txt1}>Lender Name</Text></View>
        <View><Text style={styles.Txt2}>{item.lenderUser.firstName}</Text></View>
        </View>

        <View style={styles.flatmain}>
        <View style={styles.TxtView1}><Text style={styles.Txt1}>Loan Request</Text></View>
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
        <View style={styles.TxtView1}><Text style={styles.Txt1}>ENach</Text></View>
        <View><TouchableOpacity style={styles.btn} ><Text style={styles.btntxt}> ENach</Text></TouchableOpacity></View>
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



 export default Enach;
