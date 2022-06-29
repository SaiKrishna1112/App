import React,{useState,useEffect} from "react";
import { View,Text ,StyleSheet,FlatList,TextInput,ScrollView,TouchableOpacity,Alert} from "react-native";
import Slider from '@react-native-community/slider';
import { RadioButton } from 'react-native-paper';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import DatePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import {useSelector} from 'react-redux';



const MyloanRequest=({navigation,route})=>{
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
    const[status,setStatus]=useState(route.params.status);



    const Editfunction=()=>{
    axios.post('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/loan/BORROWER/updateLoanRequest',{
      loanRequestAmount:LoanRequest,
      rateOfInterest:sliderValue,
      duration:LoanDuration,
      repaymentMethod:payment,
      loanPurpose:LoanPurpose,
      expectedDate:text,
      durationType:value,
      status:status,
    },{

      headers:{
      accessToken: access,

   }})

    .then(function (response) {
   //console.log(response.data);
      setTimeout(function(){
          Alert.alert("Your Loan Application is Sucessfully Editied");
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


   //---------------DatePicker Start------------------//

   const onChange=(event,selectDate) => {
     const currentDate = selectDate || date;
     setshow(Platform.OS === 'ios');
     setDate(currentDate);

     let tempDate = new Date(currentDate);
     let fDate = tempDate.getDate() + '/'+(tempDate.getMonth()+1) + '/' + tempDate.getFullYear();
     setText(fDate);

     console.log(fDate);
    }
    const showMode = (currentMode)=> {
     setshow(true);
     setMode(currentMode);
    };
    //----------------DatePicker End-----------------//


return (
 <View style={{marginTop:8,alignSelf:'center',justifyContent:'center'}}>
<View style={{marginTop:10,marginBottom:30}}>
<ScrollView>
<View style={{height:1000,alignSelf:'center'}}>
 <View style={styles.inputbox}>
       <Text style={{fontSize:18}}>Loan Request Amount</Text>
       <TextInput placeholder="Enter Your Amount"  keyboardType="number-pad"
      captionTextStyle={styles.captionTextStyle}
      onChangeText={(number)=>setLoanRequest(number)}/>
   </View>
     <View style={{marginLeft:12}}>
       <Text style={{fontSize:18,marginLeft:20}}>Rate of Interest per Annum</Text>
       <Text style={{color: 'black',marginLeft:25}}>{sliderValue}</Text>
       <Slider style={styles.slide}
           maximumValue={48}
           minimumValue={8}
           minimumTrackTintColor="#307ecc"
           maximumTrackTintColor="#000000"
           step={1}
           value={sliderValue}
           onValueChange={(sliderValue) => setSliderValue(sliderValue)} />
     </View>
           <Text style={{marginLeft:25,fontWeight:"bold",marginBottom:8,marginTop:10,color:"red"}}>Note:Enter Loan Duration from 1Month to 36Months </Text>
     <View style={styles.inputbox}>
       <Text style={{fontSize:18}}>Loan Duration</Text>
       <TextInput placeholder="Enter Loan Duration"  keyboardType="number-pad"
      captionTextStyle={styles.captionTextStyle}
      onChangeText={(number)=>setLoanDuration(number)}/>
   </View>
   <View style={{marginLeft:20}}>
   <Text style={{fontSize:18,marginLeft:20}}>Duration Type</Text>
   <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
    <View style={{flexDirection:'row',marginLeft:15}}>
      <RadioButton.Item label="Months" value="MONTHS" />
       <RadioButton.Item label="Days" value="DAYS" />
       </View>
  </RadioButton.Group>
  </View>

  <View style={{marginLeft:20}}>
   <Text style={{fontSize:18,marginLeft:15}}>Preferred Re-Payment Method</Text>
   <RadioButton.Group onValueChange={value => setpayment(value)} value={payment}>
    <View style={{marginLeft:5}} >
      <RadioButton.Item label="Pay (P + I) monthly by Flat EMI method)Your EMI is " value="PI" />
       <RadioButton.Item label="Pay Monthly Interest (I) Only & Principal (P) at the end of the term. Your Interest is " value="I" />
       </View>
  </RadioButton.Group>
  </View>

   <View style={styles.inputbox}>
       <Text style={{fontSize:18}}>Loan Purpose</Text>
       <TextInput placeholder="Purpose of Loan"
      captionTextStyle={styles.captionTextStyle}
      onChangeText={(text)=>setLoanPurpose(text)}/>
   </View>
       {/* <View>
        <Text style={{fontSize:18}}>Expected Date</Text> */}
       <View style={styles.inputbox}>
         <Text style={{fontSize:18}}>Expected Date</Text>
            {show&&(
<DatePicker
testID='DatePicker'
value={date}
mode={mode}
display='default'
is24Hour={true}
onChange={onChange}
/>)}
             <TouchableOpacity onPress={()=>showMode('date')}>
                <Text style={{fontSize:18}}>{text}</Text>
             </TouchableOpacity>
                  {/* </View> */}
        </View>

     <View style={styles.footer}>
         <TouchableOpacity style={styles.btn} onPress={Editfunction} >
               <Text style={{fontWeight:"bold"}}>Submit</Text>
         </TouchableOpacity>
     </View>
 </View>
   </ScrollView>
   </View>
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
    insideview:{
        flexDirection:"row",
        borderBottomWidth:1,
        borderBottomColor:"black",
        marginLeft:10,
        marginRight:10,
        padding:5,
        justifyContent:"flex-start"
    },
    txt5:{

        color:"black",
        fontSize:14,
        borderBottomColor:"black",
        fontWeight:"bold",
    },
    txt3:{
        color:"black",
        fontSize:14,
        fontWeight:"bold",
    },
    inputbox:{
      position:'relative',
      backgroundColor:'#E8E8E8',
      borderRadius: 16,
      width:300,
      height:'auto',
      alignItems: 'flex-start',
      paddingLeft:15,
      paddingVertical:5,
      margin:10,
      marginTop:5,
      marginLeft:50
  },
  slide:{
    marginLeft:20,
    marginRight:20
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
  marginTop:10,
  marginBottom:30
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


})


export default MyloanRequest;
