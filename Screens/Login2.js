import  React,{useState} from "react";
import { StyleSheet, Text, View,Image,Button,TouchableOpacity,TextInput,Alert} from 'react-native';
import * as Animatable from 'react-native-animatable';
// import Spinner from 'react-native-loading-spinner-overlay';
import axios from "axios";
import AnimatedLoader from "react-native-animated-loader";

const Login2=props=> {
 var prod='https://fintech.oxyloans.com/oxyloans/v1/user';
 var local='http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user';
 const [usermobilenumber,setUsermobilenumber]=useState('8125861874');
const [loading, setLoading] = useState(false);
 const submitfunction=async ()=>{

  if(usermobilenumber==""){
   alert("Enter Mobile Number");
   return false;
  }
  setLoading(true);
     axios.post(local+'/sendOtp',
      {
         mobileNumber:usermobilenumber
       })
       .then(function (response) {
        //console.log(response.data);
        console.log(usermobilenumber);
        setTimeout(function(){
                      setLoading(false);
                     props.navigation.navigate('Login With OTP',{
                         usermobilenumber:usermobilenumber
                     })
                 },2000);
               })
       .catch(function (error) {
         console.log(error);
         console.log(error.response);
          Alert.alert(
    "Warring",
   // error.response.data.errorMessage,
    [
      { text: "OK", onPress: () => console.log("OK") }
    ]
  );
      });
}

  return (
    <View style={styles.container}>
        <View style={styles.img7}>
            <Image source={require('../assets/background.jpeg')} style={{height:500,width:'auto', position:'relative'}} />

            <View style={styles.secimg}>
                <Image source={require('../assets/oxylogowhite.png')} style={{height:60,width:185}} />
            </View>

            <View style={styles.maintext}>
              <Text style={styles.text1}>Welcome to Oxyloans</Text>
             <Text style={styles.text2}>OxyLoans.com is RBI approved peer 2 peer lending platform.You can register as Lender or Borrower.</Text>
             <Text style={styles.text2}>Please Login with your Mobile Number to continue with Oxyloans.</Text>
            </View>
        </View>
         <Animatable.View
         animation="fadeInUp"

         style={styles.backgd2}>

            <View style={{alignItems:'center',top:50}}>

                <View style={{flexDirection:'row',marginBottom:20}}>
                    <TouchableOpacity  style={styles.logemail} onPress={()=>{
                        props.navigation.push('Login1'); }}>
                        <Text style={styles.logButtonText}>Login with Email</Text>
                  </TouchableOpacity>

                  <TouchableOpacity  style={styles.logphone}
                  onPress={()=>{
                      props.navigation.push('Login2'); }}>
                        <Text style={styles.logphoneButtonText}>Login with OTP</Text>
                  </TouchableOpacity>
                </View>

                 <Text style={{fontSize:22}}>SIGN IN</Text>

            <View style={styles.inputbox}>
                <Text style={{fontSize:18}}>Phone Number</Text>
                <TextInput placeholder="Enter Your Phone Number" keyboardType="numeric" value={usermobilenumber}
                onChangeText={(text)=>setUsermobilenumber(text)}/>
            </View>
            <AnimatedLoader
             visible={loading}
             overlayColor="rgba(255,255,255,0.75)"
             source={require("../assets/loading-state.json")}
             animationStyle={styles.lottie}
             speed={1}
             >
       <Text>Loading...</Text>
     </AnimatedLoader>
            <TouchableOpacity  style={styles.appButtonContainer}
            onPress={submitfunction}>
                 <Text style={styles.appButtonText}>Get OTP</Text>
            </TouchableOpacity>
            <Text style={{fontSize:16,fontWeight:'bold',alignSelf:'center',justifyContent:'center'}}>OR</Text>
            <TouchableOpacity style={styles.appButtonContainer}
                onPress={()=>{
                props.navigation.push('Registation');}}>
               <Text style={styles.appButtonText}>Register</Text>
            </TouchableOpacity>

            </View>

         </Animatable.View>

    </View>
    );
}

const styles = StyleSheet.create({

    container:{
        flex:1,
    },

    img7:{
        flex:2,
  },

    backgd2:{
        backgroundColor:'white',
        flex:3,
        borderTopStartRadius:30,
        borderTopEndRadius:30,
    },

    secimg:{
        top:40,
        position:'absolute',
        margin:10,
 },

 text1:{
       color:'white',
       fontSize:22,
       width:300
},

maintext:{
   position:'absolute',
   marginLeft:25,
   marginTop:120,
},

text2:{
     marginTop:5,
     color:'white',
     fontSize:15,
     width:350,
 },

    inputbox:{
        position:'relative',
        backgroundColor:'#E8E8E8',
        borderRadius: 16,
        width:330,
        height:'auto',
        alignItems: 'flex-start',
        paddingLeft:20,
        paddingVertical:5,
        marginTop:20,
        margin:10
    },

    appButtonContainer: {
        marginTop:10,
        backgroundColor: "#569F40",
        borderRadius: 17,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width:330
      },
      appButtonText: {
        fontSize: 19,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",

      },
      logemail: {
        backgroundColor: "#F0F0F0",
        borderBottomLeftRadius:15,
        borderTopLeftRadius:15,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal: 12,
        width:168,
        height:45
    },
    logButtonText: {
        fontSize: 16,
        color: "#569F40",
        fontWeight: "bold",
        alignSelf: "center",

      },
      logphone: {

        backgroundColor: "#569F40",
        borderBottomRightRadius:15,
        borderTopRightRadius:15,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal: 12,
        width:168,
        height:45

    },

    logphoneButtonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
     },
     lottie: {
       width: 120,
       height: 120
     },
});

export default Login2;
