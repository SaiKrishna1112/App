import React from "react"
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Alert} from "react-native"
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { useSelector } from "react-redux";
import * as OpenAnything from "react-native-openanything";

const EarningCertificate=props=>{

    const userDetails = useSelector(state=>state.counter);
    var id = userDetails.data.id;
    var access = userDetails.headers.accesstoken;
    // var data= {
    //      lenderProfit: "https://oxyloansv1ft.s3.ap-south-1.amazonaws.com/LENDERINCOME_"+id+"LENDERINCOME.pdf",
    //      lenderProfitUrl: null,
    //      lenderUniqueNumber: null,
    //      profitValue: 0,
    //      status: "mailSentSuccessFully"
    //  }
const downloadfunction=()=>{
    axios.post('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/lenderInformation',{
        headers:{
            accessToken:access
        }
       })
    .then(function(response){
        console.log(response.data)
        // setmap(response.data)
        setTimeout(function(){
            Alert.alert("Success","Mail send Succesfully");
      }, 3000);
      })
    .catch(function(error){
        console.log(error)
         Alert.alert(error.response.data.errorMessage);
    })
}
    return(
        <View style={{flex:1,marginTop:30}}>
            <Text style={{marginLeft:15,marginRight:15,color:"red"}}> Note: Interest earned certificate can be downloaded and sent to registered email.</Text>
            <View style={styles.container}>
                <Text style={{fontSize:20,fontWeight:"bold",margin:30,alignSelf:"center"}}>Earnings Certificate FY 21-22</Text>
               <TouchableOpacity style={styles.btn} onPress={downloadfunction}>
                    <Text style={styles.btntxt}><Icon name="mail" size={20}/> Email Earnings Details</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.btn1} onPress={downloadfunction}>
                   <Text style={styles.btntxt}><Icon name="cloud-download" size={21}/> Download Earning Certificate</Text>
               </TouchableOpacity>
            </View>

        </View>
    )
}

const styles=StyleSheet.create({
container:{
    borderRadius:5,
    borderWidth:1,
    bordercolor:"ash",
    margin:20
},
btn:{
    backgroundColor:"#3498DB",
    width:230,
    borderRadius:5,
    padding:10,
    alignSelf:"flex-end",
    marginRight:5,
    marginBottom:10
},
btn1:{
    backgroundColor:"#AF7AC5",
    width:280,
    borderRadius:5,
    padding:10,
    alignSelf:"flex-end",
    marginRight:5,
    marginBottom:10
},
btntxt:{
    color:"white",
    alignSelf:"center",
    fontSize:17}
})
export default EarningCertificate;
