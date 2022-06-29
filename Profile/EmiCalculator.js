import React,{useState} from "react"
import {View,Text,TextInput,StyleSheet,TouchableOpacity,FlatList} from "react-native"
// import {Picker} from "@react-native-picker/picker";
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

const data = [
      { label: '10', value: '10' },
      { label: '11', value: '11' },
      { label: '12', value: '12' },
      { label: '13', value: '13' },
      { label: '14', value: '14' },
      { label: '15', value: '15' },
      { label: '16', value: '16' },
      { label: '17', value: '17' },
      { label: '18', value: '18' },
      { label: '19', value: '19' },
      { label: '20', value: '20' },
      { label: '21', value: '21' },
      { label: '22', value: '22' },
      { label: '23', value: '23' },
      { label: '24', value: '24' },
      { label: '25', value: '25' },
      { label: '26', value: '26' },
      { label: '27', value: '27' },
      { label: '28', value: '28' },
      { label: '29', value: '29' },
      { label: '30', value: '30' },
      { label: '31', value: '31' },
      { label: '32', value: '32' },
      { label: '33', value: '33' },
      { label: '34', value: '34' },
      { label: '35', value: '35' },
      { label: '36', value: '36' },
      { label: '37', value: '37' },
      { label: '38', value: '38' },
    ];

const data1 = [
  { label1: '1', value1: '1' },
  { label1: '2', value1: '2' },
  { label1: '3', value1: '3' },
  { label1: '4', value1: '4' },
  { label1: '5', value1: '5' },
  { label1: '6', value1: '6' },
  { label1: '7', value1: '7' },
  { label1: '8', value1: '8' },
  { label1: '9', value1: '9' },
  { label1: '10', value1: '10' },
  { label1: '11', value1: '11' },
  { label1: '12', value1: '12' },
  { label1: '13', value1: '13' },
  { label1: '14', value1: '14' },
  { label1: '15', value1: '15' },
  { label1: '16', value1: '16' },
  { label1: '17', value1: '17' },
  { label1: '18', value1: '18' },
  { label1: '19', value1: '19' },
  { label1: '20', value1: '20' },
  { label1: '21', value1: '21' },
  { label1: '22', value1: '22' },
  { label1: '23', value1: '23' },
  { label1: '24', value1: '24' },
  { label1: '25', value1: '25' },
  { label1: '26', value1: '26' },
  { label1: '27', value1: '27' },
  { label1: '28', value1: '28' },
  { label1: '29', value1: '29' },
  { label1: '30', value1: '30' },
  { label1: '31', value1: '31' },
  { label1: '32', value1: '32' },
  { label1: '33', value1: '33' },
  { label1: '34', value1: '34' },
  { label1: '35', value1: '35' },
  { label1: '36', value1: '36' },
  { label1: '37', value1: '37' },
  { label1: '38', value1: '38' },
    ];


    const data2 = [
      { label2: 'Reduce', value2: 'Reduce' },
      { label2: 'Flat', value2: 'Flat' },
    ]
const EmiCalculator=props=>{
  const userDetails = useSelector(state=>state.counter);
  //   const userDetail = useSelector(state=>state.logged);
      var access = userDetails.headers.accesstoken;
      var id = userDetails.data.id;

    const[Emi,setEmi]=useState();
    const[load,setLoading]=useState();
    const[loanamount,setloanamount]=useState();
    // const [selectedValue, setSelectedValue] = useState("1");
    const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [value1, setValue1] = useState(null);
  const [isFocus1, setIsFocus1] = useState(false);
  const [value2, setValue2] = useState(null);
  const [isFocus2, setIsFocus2] = useState(false);


const submitfunction=props=>{
  console.log(loanamount,value,value1,value2);
  axios.post('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/borrowerEmiDetails',
  {
    loanAmount:loanamount,
    rateOfInterest:value,
    tenure:value1,
    calculationType:value2
  }, {headers:{
    accessToken:access
   }
       })
       .then(function (response) {
       if(value2=="Reduce")
       {
         setEmi(response.data.reduceCalculationEmi);

       }
       else{
       setEmi(response.data.flatCalculationEmi);
       }
        setTimeout(function(){
                   setLoading(false);
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


const renderList = ({ item }) => {
  return (

      <View style={{backgroundColor:'white',marginHorizontal:11,height:"auto",padding:8,borderColor:'grey',borderWidth:2.5,borderBottomWidth:0}}>
      <View style={styles.flatmain}>
      <View style={styles.TxtView1}><Text style={styles.Txt1}>SNo</Text></View>
      <View><Text style={styles.Txt2}>{item.emiNumber}</Text></View>
      </View>

      <View style={styles.flatmain}>
      <View style={styles.TxtView1}><Text style={styles.Txt1}>	Emi Amount </Text></View>
      <View><Text style={styles.Txt2}>{item.emiAmount}</Text></View>
      </View>

      <View style={styles.flatmain}>
      <View style={styles.TxtView1}><Text style={styles.Txt1}>principalAmount</Text></View>
      <View><Text style={styles.Txt2}>{item.principalAmount}</Text></View>
      </View>

      <View style={styles.flatmain}>
      <View style={styles.TxtView1}><Text style={styles.Txt1}>Interest Amount</Text></View>
      <View><Text style={styles.Txt2}>{item.interestAmount}</Text></View>
      </View>


      <View style={styles.flatmain1}>
      <View style={styles.TxtView1}><Text style={styles.Txt1}>Outstanding </Text></View>
      <View><Text style={styles.Txt2}>{item.balanceAndOutstanding}</Text></View>
      </View>
 </View>
  );
};


  return(
       <View style={styles.container}>
          <View style={styles.cont}>
              <View style={{flexDirection:"row"}}>
                <View>
                    <Text style={{fontSize:15,fontWeight:"bold",marginLeft:10,marginTop:10}}>Loan Amount</Text>
                        <TextInput style={styles.input} placeholder="Enter Loan Amount" onChangeText={(numeric)=>setloanamount(numeric)} keyboardType="number-pad"/>

                </View>

              <View>
                <Text style={{fontSize:15,fontWeight:"bold",marginLeft:15,marginTop:10}}>ROI: </Text>
                  <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      data={data}
                      maxHeight={150}
                      labelField="label"
                      valueField="value"
                      placeholder={!isFocus ? 'Choose ROI Type' : ''}
                      value={value}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {setValue(item.value);
                                          setIsFocus(false);}} />
              </View>
              </View>


            <View style={{flexDirection:"row"}}>
              <View>
                <Text style={{fontWeight:"bold",marginLeft:20,marginTop:10}}>Tenure:  </Text>
                    <Dropdown style={[styles.dropdown, isFocus1 && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={data1}
                        maxHeight={150}
                        labelField="label1"
                        valueField="value1"
                        placeholder={!isFocus1 ? 'Choose Tenure' : ''}
                        value={value1}
                        onFocus1={() => setIsFocus1(true)}
                        onBlur1={() => setIsFocus1(false)}
                        onChange={item => {setValue1(item.value1);
                                          setIsFocus1(false);}}/>
            </View>


            <View>
                <Text style={{fontWeight:"bold",marginLeft:30,marginTop:10}}>EMI Type:  </Text>
                      <Dropdown
                        style={[styles.dropdown, isFocus2 && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={data2}
                        maxHeight={150}
                        labelField="label2"
                        valueField="value2"
                        placeholder={!isFocus2 ? 'Choose Calculation Type' : ''}
                        value={value2}
                        onFocus2={() => setIsFocus2(true)}
                        onBlur2={() => setIsFocus2(false)}
                        onChange={item => {setValue2(item.value2);
                                            setIsFocus2(false);}}/>
            </View>
            </View>
                      <TouchableOpacity style={styles.btn} onPress={submitfunction} >
                          <Text style={{fontWeight:"bold",fontSize:15}}>Submit</Text>
                      </TouchableOpacity>
          </View>
                  <Text style={styles.txt}>Your Emi Info </Text>
                       <FlatList data={Emi}
                              renderItem={renderList}
                              keyExtractor={item => item.emiNumber}
                              />
        </View>
      )
}

const styles=StyleSheet.create({
container:{
    flex:1
},
text:{
    fontSize:20,
    fontWeight:"bold",
    marginTop:34,
    marginLeft:20,
    alignSelf:"center",
    justifyContent:"center",
    alignItems:"center"
},
input:{
borderWidth:0.5,
padding:10,
margin:10,
width:130,
borderColor:"grey",
borderRadius:5
},
cont:{
    width:350,
    borderRadius: 5,
    backgroundColor: 'white',
    alignSelf:"center",
    marginTop:20,
    height:260,
},
placeholderStyle: {
        fontSize: 14,
        marginLeft:10
      },
selectedTextStyle: {
        fontSize: 14,
        marginLeft:10
      },
dropdown: {
            height: 50,
            borderColor: 'gray',
            borderWidth: 0.5,
            borderRadius: 8,
            width:140,
            marginLeft:10,
            marginTop:10,
            // paddingHorizontal: 10,
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
          marginTop:15
            },
      txt:{
        fontSize:18,
        fontWeight:"bold",
        marginTop:10,
        marginBottom:10,
        alignSelf:"center"
      },
      flatmain:{
        flexDirection:"row",
        alignItems:'center',
        borderBottomColor:'grey',
        borderBottomWidth:1,
        paddingVertical:5
      },
      flatmain1:{
        flexDirection:"row",
        alignItems:'center',

        paddingVertical:5
      },
    Txt1:{
        fontWeight:'bold',
        color:'#2B547E',
        fontSize:15
    },
    Txt2:{
        fontWeight:'bold',
        color:'black',
        fontSize:15
    },
    TxtView1:{
        width:190,
    }


})
export default EmiCalculator;
