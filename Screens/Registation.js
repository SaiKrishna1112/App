import  React,{useState} from "react"
import {View,Text,StyleSheet,SafeAreaView,Image,TextInput,Button,
 TouchableOpacity,ScrollView,Alert,Pressable} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Asset } from 'expo-asset';
import * as Animatable from 'react-native-animatable';
import axios from "axios";
import AnimatedLoader from "react-native-animated-loader";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Picker} from "@react-native-picker/picker";
//import EncryptedStorage  from 'react-native-encrypted-storage';

const Registation  = props =>{
 const [loading, setLoading] = useState(false);
 const [username,setUsername]=useState("");
 const [useremail,setUseremail]=useState("");
 const [userpassword,setUserpassword]=useState("");
 const [usermobilenumber,setUsermobilenumber]=useState("");
 const [load, setLoad]=useState(false);
 const [userprimary, setUserPrimary]=useState("");
 const [userprimarytype, setUserPrimaryType]=useState(props.route.params.primaryType);
 const [selectedValue, setSelectedValue] = useState("LENDER");
 const convertTextToUpperCase = () => {
    //To convert Upper Case
    let upperCaseText = userprimary.toUpperCase();
    setUserPrimaryType(upperCaseText);
  };
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
  const [password, setPassword] = useState('');

  const savefunction=async ()=>{
      if(username==""){
       alert("Please Enter Name");
       return false;
      }
      if(useremail==""){
       alert("Please Enter Email");
       return false;
      }
      if(password==""){
       alert("Please Enter Password");
       return false;
      }
      if(usermobilenumber==""){
       alert("Please Enter Mobile Number");
       return false;
      }
      if(selectedValue==""){
       alert("Please Enter primary Type");
       return false;
      }
      setLoading(true);
           axios.post('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/newUserRegistration', {
               citizenship:"NONNRI",
               mobileNumber: usermobilenumber
             })
             .then(function (response) {
              //console.log(response.data);
              setTimeout(function(){
                           setLoading(false);
                           props.navigation.navigate('Part 1',{
                               mobiledata:response.data,
                                 username:username,
                                 useremail :useremail,
                                 userpassword:password,
                                 userprimarytype:userprimarytype
                           })
                       }, 3000);
                     })
             .catch(function (error) {
               console.log(error);
               console.log(error.response.data.errorMessage);
               Alert.alert(
         "Warring",
         error.response.data.errorMessage,
         [
           { text: "OK", onPress: () => setLoading(false) }
         ]
       );
           });
     }

    return(
     <View style={styles.container}>
       <View style={styles.img7}>
          <Image source={require('../assets/background.jpeg')} style={{height:1000,width:'auto', position:'relative'}} />

          <View style={styles.secimg}>
             <Image source={require('../assets/oxylogowhite.png')} style={{height:60,width:185}} />
         </View>

          <View style={styles.maintext}>
            <Text style={styles.text1}>Welcome to Oxyloans</Text>
            <Text style={styles.text2}>Register As a {userprimarytype}</Text>
          </View>
       </View>
         <Animatable.View
         animation="fadeInUp"
         style={styles.backgd2}>
         <ScrollView>
         <View style={{marginTop:25,justifyContent:'center',alignSelf:'center'}}>
              <View style={styles.inputbox}>
                  <Text style={{fontSize:18}}>Name</Text>
                  <TextInput placeholder="NAME AS PER PANCARD"
                  onChangeText={(text)=>setUsername(text)}/>
              </View>
              <View style={styles.inputbox}>
                  <Text style={{fontSize:18}}>Email</Text>
                  <TextInput placeholder="Email"
                     onChangeText={(text)=>setUseremail(text)}/>
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
                    textContentType="newPassword"
                    secureTextEntry={passwordVisibility}
                    value={password}
                    enablesReturnKeyAutomatically
                    onChangeText={text => setPassword(text)}
                  />
                  <Pressable onPress={handlePasswordVisibility}>
                    <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
                  </Pressable>
              </View>
              </View>
              <View style={styles.inputbox}>
                  <Text style={{fontSize:18}}>Mobile Number</Text>
                  <TextInput placeholder="Mobile Number" keyboardType="numeric"
                  onChangeText={(number)=>setUsermobilenumber(number)}/>
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
          <TouchableOpacity style={styles.appButtonContainer}
          onPress={savefunction}>
              <Text style={styles.appButtonText}>Sign UP</Text>
          </TouchableOpacity>
          </View>
          </ScrollView>
     </Animatable.View>
  </View>
    )
   }
const styles = StyleSheet.create({
 inputbox:{
     position:'relative',
     backgroundColor:'#E8E8E8',
     borderRadius: 16,
     width:330,
     height:'auto',
     alignItems: 'flex-start',
     paddingLeft:15,
     paddingVertical:5,
     margin:10,
     marginTop:10,
     marginLeft:18,
     justifyContent:'center'
 },
 container:{
     flex:1,
 },

 img7:{
     flex:2,
},

 backgd2:{
     backgroundColor:'white',
     flex:6,
     borderTopStartRadius:30,
     borderTopEndRadius:30,
 },

 secimg:{
     top:40,
     position:'absolute',
     margin:10,
},
 appButtonContainer: {
     marginTop:10,
     backgroundColor: "#569F40",
     borderRadius: 17,
     paddingVertical: 10,
     paddingHorizontal: 12,
     width:330,
     marginLeft:18,
     alignSelf:'center'
   },
   appButtonText: {
     fontSize: 19,
     color: "#fff",
     fontWeight: "bold",
     alignSelf: "center",

   },
   maintext:{
      position:'absolute',
      marginLeft:25,
      marginTop:110,
   },
   text2:{
        marginTop:10,
        color:'white',
        fontSize:20,
        width:330,
    },
    text1:{
          color:'white',
          fontSize:25,
          width:300
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
})
export default Registation;
