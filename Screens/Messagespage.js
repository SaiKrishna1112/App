import  React,{useState,useEffect} from "react"
import {View,Text,StyleSheet,SafeAreaView,Image,TextInput,Button,TouchableOpacity,ScrollView ,Alert} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Asset } from 'expo-asset';
import * as Animatable from 'react-native-animatable';
import axios from "axios";
//import EncryptedStorage  from 'react-native-encrypted-storage';
import AnimatedLoader from "react-native-animated-loader";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DatePicker from '@react-native-community/datetimepicker';

const Messagespage  = props =>{
 const [useraddress,setUseraddress]=useState("");
 const [userdob,setUserdob]=useState("");
 const [userpan,setUserpan]=useState("");
 const [loading, setLoading] = useState(false);
 const [date, setDate] = useState(new Date());
const [mode,setMode] = useState('date');
const [show,setShow] = useState(false);
const [text,setText] = useState('01/05/2014');
 // console.log('----message----');
 // console.log(props);
 // console.log(props.route.params.emaildata);
 const GetEmaildata=props.route.params.emaildata;
 const GetPreviousData=props.route.params;
 var userId=GetEmaildata.userId;
 var username=GetPreviousData.username;
 var primaryType=GetPreviousData.primaryType;

 const [currentTime, setCurrentTime] = useState(new Date());

 var datetime = new Date(currentTime);
 var session_time = datetime.getTime();
      //console.log(session_time);

 //---------------DatePicker Start------------------//

const onChange=(event,selectDate) => {
 const currentDate = selectDate || date;
 setShow(Platform.OS === 'ios');
 setDate(currentDate);

 let tempDate = new Date(currentDate);
 let fDate = tempDate.getDate() + '/'+(tempDate.getMonth()+1) + '/' + tempDate.getFullYear();
 setText(fDate);
 //console.log(fDate);
}
const showMode = (currentMode)=> {
 setShow(true);
 setMode(currentMode);
};
//----------------DatePicker End-----------------//

  const savefunction=async ()=>{
   if(text==""){
    alert("Please Enter Date Of Birth");
    return false;
   }
   if(userpan==""){
    alert("Please Enter Pan Number");
    return false;
   }
   if(useraddress==""){
    alert("please Enter Address");
    return false;
   }
   console.log(text);
   console.log(userpan);
   console.log(useraddress);
   console.log(userId);
   setLoading(true);
           axios.patch('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/emailVerification', {
            address: useraddress,
            dob: text,
            panNumber: userpan,
            userId: userId,
            timeInMilliSeconds:session_time
             })
             .then(function (response) {
              //console.log(response.data);
              setTimeout(function(){
                           setLoading(false);
                           props.navigation.navigate('Success',{
                                username:username,
                               primaryType:primaryType
                           })
                       }, 1000);
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
          </View>
       </View>
         <Animatable.View
         animation="fadeInUp"
         style={styles.backgd2}>
         <ScrollView>
         <View style={styles.field}>
         <Text>Fill The Below Details To complete the login process</Text>
              <View style={styles.inputbox}>
                  <Text style={{fontSize:15}}>Date Of Birth</Text>
                  <TouchableOpacity onPress={()=>showMode('date')}>
                    <Text style={{fontSize:18}}>{text}</Text>
                      </TouchableOpacity>
                        {show&&(
                            <DatePicker
                            testID='DatePicker'
                            value={date}
                            mode={mode}
                            display='default'
                           onChange={onChange}
                           />)}
                          </View>
              <View style={styles.inputbox}>
                  <Text style={{fontSize:15}}>PAN NUMBER</Text>
                  <TextInput placeholder="Enter Pan Number"
                     onChangeText={(text)=>setUserpan(text)}/>
              </View>
              <View style={styles.inputbox}>
                  <Text style={{fontSize:15}}>Address</Text>
                  <TextInput placeholder="Please Enter Address"
                  onChangeText={(text)=>setUseraddress(text)}/>
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
              <Text style={styles.appButtonText}>Submit</Text>
          </TouchableOpacity>
          </View>
          </ScrollView>
     </Animatable.View>
  </View>
    )
   }
const styles = StyleSheet.create({
 field:{
  marginTop:25,
  padding:20,
  alignSelf:'center'
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
     margin:10,
     marginTop:10
 },
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
     marginLeft:12,
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
      marginTop:130,
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
})
export default Messagespage;
