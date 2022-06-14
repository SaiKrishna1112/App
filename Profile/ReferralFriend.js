import React,{useState} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';


import { Text, View , StyleSheet ,TextInput,TouchableOpacity,Alert,ScrollView} from 'react-native';
import {useSelector} from "react-redux";
import {Picker} from "@react-native-picker/picker";


const ReferralFriend=props=>{
    const userDetails =useSelector(state=>state.counter);
    var access = userDetails.headers.accesstoken;
   var id = userDetails.data.id;
    const[fname,setfname]=useState("");
    const[email,setfemail]=useState("");
    const[number,setfnumber]=useState("");
    const[loading,setLoading]=useState(false);
    const [selectedValue, setSelectedValue] = useState("LENDER");
    const [mailContent,setmailcontent]=useState();
    const [mailSubject,setmailsubject]=useState();
    const [bottomOfTheMail,setbottomOfTheMail]=useState();

    axios({
       method:'get',
       url:'http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/mailContentShowingToLender',
       headers:{
             accessToken:access,
            }
      })
      .then(function (response) {
       //console.log(response.data)
       setmailcontent(response.data.mailContent)
       setmailsubject(response.data.mailSubject)
       setbottomOfTheMail(response.data.bottomOfTheMail)
               })
       .catch(function (error) {
        console.log('error',error);
      });
const invitefunction=props=>{
    if(fname=="")
    {
        Alert.alert("Please enter your friend name");
    }
    if(email=="")
    {
        Alert.alert("Please enter email_id");
    }
    if(number=="")
    {
        Alert.alert("Please enter number");
    }
    console.log(fname,email,number,selectedValue);
        axios.post('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/lenderReferring',{
            email:email,
            mobileNumber:number,
            name:fname,
            mailContent:mailContent,
            mailSubject:mailSubject,
            referrerId:0,
            primaryType:selectedValue,
            citizenType:"NONNRI",
            seekerRequestedId:"0",
            userType:"LENDER"
        },
        {headers:{
            accessToken: access,
        }})
        .then(function (response) {
          setTimeout(function(){
              Alert.alert("Referred Your Friend Successfully");
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

var fullemailcontent=mailContent+'\n'+bottomOfTheMail;
    return(
<View style={styles.container}>
<View style={{alignSelf:'center'}}>
<ScrollView>
    <View style={styles.cont}>
        <Text style={styles.txt1}> Refer a Friend & Earn  </Text>
        <Text style={styles.text}><Icon name="arrow-forward" color="#4F8EF7" size={20}/>  Let us grow as a family, while you are lending money through OXYLOANS, we ourselves a back-up in life for each other in all kinds of times.
        </Text>
        <Text style={styles.text}><Icon name="arrow-forward" color="#4F8EF7" size={20}/>  Every time your friend lends money, He / She will earn interest and you will earn a Reference Fee as shown below: Example: You Referred XYZ || XYZ joined the platform and lent INR 3,00,000.
        </Text>
        <Text style={styles.text1}><Icon name="arrow-forward" color="#4F8EF7" size={20}/>  On the first INR 1,00,000 you will get INR 1000 For the second 1-lakh, you will get INR 100 For the third 1-lakh, you will get INR 100. In total, you will get INR 1200.
        </Text>
    </View>
    <View style={styles.cont1}>
        <ScrollView>
        <Text style={styles.txt1}>Invite Friends/Professionals </Text>
                <View style={styles.inputbox}>

                <Text style={{fontSize:18,fontWeight:"bold"}}>Friend Name : </Text>

                <TextInput  placeholder="Friend Name"onChangeText={(text)=>setfname(text)}/>

                </View>

                <View style={styles.inputbox}>

                <Text style={{fontSize:18,fontWeight:"bold"}}>Email: </Text>
                <TextInput  placeholder="Friend Email"onChangeText={(text)=>setfemail(text)}/>

               </View>

               <View style={styles.inputbox}>

                <Text style={{fontSize:18,fontWeight:"bold"}}>Mobile Number: </Text>
                <TextInput  placeholder="Friend Mobile Number"onChangeText={(numeric)=>setfnumber(numeric)} keyboardType="number-pad" maxLength={10}/>

               </View>

               <Text style={{fontWeight:"bold",marginLeft:20}}>Primary Type : </Text>
               <Picker
                 selectedValue={selectedValue}
                 style={{ height: 40, width: 300,backgroundColor:"#E8E8E8",marginLeft:18,borderRadius:15,marginTop:5}}
                 onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
               <Picker.Item label="LENDER" value="LENDER" />
               <Picker.Item label="BORROWER" value="BORROWER" />
               </Picker>
               <View style={styles.inputbox}>

                <Text style={{fontSize:18,fontWeight:"bold"}}>Mail Subject: </Text>
                <TextInput  placeholder="Mail Subject"onChangeText={(text)=>setmailsubject(text)} value={mailSubject}/>

               </View>
               <View style={styles.inputbox}>

                <Text style={{fontSize:18,fontWeight:"bold"}}>Mail Content: </Text>
                <TextInput  placeholder="Mail Content"onChangeText={(text)=>setmailcontent(text)} value={fullemailcontent}/>

               </View>
            <View>
                    <TouchableOpacity style={styles.btn} onPress={invitefunction}>
                            <Text style={{fontSize:15,fontWeight:"bold"}}><Icon name="person-add" color="black" size={17}/>   Invite  </Text>
                    </TouchableOpacity>
            </View>

            </ScrollView>
    </View>
    </ScrollView>
    </View>
</View>

    )
    }

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#CCD8E1",


    },
    cont:{

    justifyContent:"flex-start",
    // alignItems:"center",
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    marginTop:50,
    width:340,
    marginLeft:10,
    },
    cont1:{
        justifyContent:"flex-start",
        // alignItems:"center",
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        marginTop:13,
        width:340,
        marginLeft:10,
    },
    txt1:{
        marginTop:10,
        marginLeft:10,
        fontSize:15,
        fontWeight:"bold"
    },
    text:{
        marginTop:10,
        marginLeft:10,
        marginRight:10
    },
    text1:{

        margin:10

    },
    input:{
        borderColor:'grey',
        borderWidth:2,
        padding:5,
        borderRadius:10,
        marginVertical:10,
        marginHorizontal:10,

      },
      inputbox:{
        position:'relative',
        backgroundColor:'#E8E8E8',
        borderRadius: 16,
        width:300,
        height:'auto',
        alignItems: 'flex-start',
        paddingLeft:20,
        paddingVertical:5,
        // marginTop:20,
        marginBottom:5,
        marginTop:10,
        marginLeft:15
    },
    btn:{
        // margin:2,
        padding:10,
        width:100,
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"center",
        borderRadius:5,
        backgroundColor:"#4CAF50",
      marginTop:20,
      marginBottom:20
        },




})
export default ReferralFriend;
