import  React,{useState,useEffect} from "react"
import {View,Text,StyleSheet,SafeAreaView,Image,TextInput,Button,
 FlatList,ActivityIndicator,ScrollView,Alert,Pressable,ToastAndroid} from "react-native";
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
 import AnimatedLoader from "react-native-animated-loader";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { AccessToken,UserID } from '../src/action/index';


const Login1 = para => {
 const dispatch = useDispatch();
 const [username,setUsername]=useState()
 const [userpass,setuserpass]=useState('');
 const [primaryType,setprimaryType]=useState(para.route.params.primaryType);
 const[load, setLoad]=useState(false);
const [loading, setLoading] = useState(false);
const [accessToken,setAccessToken] = useState("");
const [userId,setUserId] = useState("");
var userlogin=local;
var prod='https://fintech.oxyloans.com/oxyloans/v1/user';
var local='http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user';
const useTogglePasswordVisibility = () => {
const [passwordVisibility, setPasswordVisibility] = useState(true);
const [rightIcon, setRightIcon] = useState('eye-off');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    }
  }

  return {
    passwordVisibility,
    rightIcon,
    handlePasswordVisibility
  };
};
const { passwordVisibility, rightIcon, handlePasswordVisibility } =
  useTogglePasswordVisibility();
const [password, setPassword] = useState('Test@123');
const setToastMsg=(msg) =>{
 ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
}
function fuction(){
 if(para.route.params.primaryType=="LENDER"){
  setUsername('savicky@gmail.com')
 }else{
  setUsername('saivicky2324@gmail.com')
 }
}

useEffect(()=>{
 fuction();
},[]);
const submitfunction= ()=>{
   if(username==""){
    setToastMsg('Please Enter Email');
    return false;
   }
   if(password==""){
    alert("Please Enter Password");
    return false;
   }
   setLoading(true);
   axios.post(local+'/login?grantType=PWD', {
       email: username,
      password: password,
     })
     .then(function (response) {
      //console.log(response);
      dispatch(AccessToken(response));
      axios({
          method:'get',
          url:local+'/personal/'+response.data.id,
          headers:{
                accessToken:response.headers.accesstoken,
               }
         })
          .then(function (response) {
           dispatch(UserID(response.data));
           //console.log(response.data);
                })
          .catch(function (error) {
           console.log('error',error);
         });
      setTimeout(function(){
              setLoading(false);
              //console.log(primaryType);
              if(response.data.primaryType=="LENDER"){
               setToastMsg('LENDER');
               para.navigation.navigate('LenderDrawer')
              } else {
               para.navigation.navigate('BorrowerDrawer')
               setToastMsg('BORROWER');
              }

             },1000);
             })
     .catch(function (error) {
  Alert.alert(
   "Oops",
   "Invaild User name or Password",
   [
     { text: "OK", onPress: () => setLoading(false) }
   ]
 );
 });
}

  return (
    <View style={styles.container}>

        <View style={styles.img7}>
            <Image source={require('../assets/background.jpeg')} style={{height:1000,width:'auto', position:'relative'}} />

            <View style={styles.secimg}>
                <Image source={require('../assets/oxylogowhite.png')} style={{height:60,width:185}} />
            </View>
            <View style={styles.maintext}>
              <Text style={styles.text1}>Welcome to Oxyloans</Text>
             <Text style={styles.text2}>Please Login with your email to continue with Oxyloans as {primaryType}</Text>
            </View>
        </View>
         <View
         style={styles.backgd2}>
            <View style={{alignItems:'center',top:30}}>
                <View style={{flexDirection:'row',marginBottom:20}}>
                    <TouchableOpacity  style={styles.logemail} onPress={()=>{
                        para.navigation.push('Login1'); }}>
                        <Text style={styles.logButtonText}>Login with Email</Text>
                  </TouchableOpacity>
                  <TouchableOpacity  style={styles.logphone}
                  onPress={()=>{
                      para.navigation.push('Login2'); }}>
                        <Text style={styles.logphoneButtonText}>Login with OTP</Text>
                  </TouchableOpacity>
                </View>
                 <Text style={{fontSize:22}}>SIGN IN</Text>
                 <ScrollView>
            <View style={styles.inputbox}>
                <Text style={{fontSize:18}}>Email</Text>
                <TextInput placeholder="Enter your Email" value={username}
                autoCapitalize="none"
                onChangeText={(text)=>setUsername(text)}/>
            </View>
            <View style={{paddingLeft:13},styles.inputbox}>
                <Text style={{fontSize:16}}>Password</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.inputField}
                      name="password"
                      placeholder="Enter password"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={passwordVisibility}
                      value={password}
                      onChangeText={(text) =>setPassword(text)}/>
                  <Pressable onPress={handlePasswordVisibility}>
                    <Text><MaterialCommunityIcons name={rightIcon} size={22} color="#232323" /></Text>
                  </Pressable>
                </View>
          </View>
          <AnimatedLoader
           visible={loading}
           overlayColor="rgba(255,255,255,0.75)"
           source={require("../assets/loading-state.json")}
           animationStyle={styles.lottie}
           speed={1}>
     <Text>Loading...</Text>
   </AnimatedLoader>
                 <TouchableOpacity onPress={submitfunction} style={styles.appButtonContainer}>
                   <Text style={styles.appButtonText}>Login</Text>
                 </TouchableOpacity>
                  <Text style={{fontSize:16,fontWeight:'bold',alignSelf:'center',justifyContent:'center'}}>OR</Text>
                  <TouchableOpacity style={styles.appButtonContainer} onPress={()=>{
                     para.navigation.push('Registration',{primaryType:primaryType}); }}>
                     <Text style={styles.appButtonText}>Register</Text>
                  </TouchableOpacity>
                  </ScrollView>
               </View>
         </View>
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
        flex:4,
        borderTopStartRadius:30,
        borderTopEndRadius:30,
    },

    secimg:{
        top:50,
        position:'absolute',
        margin:10,
 },

    text1:{
          color:'white',
          fontSize:22,
          width:300,
          marginTop:10
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
        margin:10
    },

    appButtonContainer: {
        marginTop:10,
        backgroundColor: "#569F40",
        borderRadius: 17,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width:330,
        marginLeft:12
      },
      appButtonText: {
        fontSize: 19,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",


      },
      logemail: {
        backgroundColor: "#569F40",
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
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",

      },
      logphone: {

        backgroundColor: "#F0F0F0",
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
        color: "#569F40",
        fontWeight: "bold",
     },
     horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  lottie: {
    width: 120,
    height: 120
  },
  inputContainer: {
   backgroundColor: '#E8E8E8',
   width: '100%',
   borderRadius: 20,
   flexDirection: 'row',
   alignItems: 'center',
   borderColor: '#d7d7d7',
 },
 inputField: {
   padding: 5,
   fontSize: 16,
   width: '90%',
   height:30
 }

});

export default Login1;
