import React,{useState} from "react";
import {View,Text,TextInput,StyleSheet,TouchableOpacity,ScrollView,FlatList} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from "react-redux";
import axios from 'axios';
import { SafeAreaView } from "react-native-safe-area-context";


const Withdrawalhistory= props =>{
    const[history,sethistory]=useState([]);
    const count =useSelector(state=>state.counter);

    var id=count.data.id;

    axios.post('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/lenderwithdrawalfundssearch',
    {
        page:{
            pageNo:1,
            pageSize:10
            },
        firstName:"",
        lastName:"",
        userId:id
    },
    {headers:{
        accessToken: count.headers.accesstoken,
    }}
    )
    .then(function(response){
        sethistory(response.data.results)


    })
    .catch(function(error){
        // console.log(error)
    })



    const renderList = ({ item }) => {
        return (


          <View style={{backgroundColor:'white',marginHorizontal:11,height:"auto",padding:8,borderColor:'grey',borderWidth:2.5,borderBottomWidth:0}}>
          <View style={styles.flatmain}>
          <View style={styles.TxtView1}><Text style={styles.Txt1}>Created On</Text></View>
          <View><Text style={styles.Txt2}>{item.createdOn}</Text></View>

          </View>

          <View style={styles.flatmain}>
          <View style={styles.TxtView1}><Text style={styles.Txt1}>Withdraw Amount </Text></View>
          <View><Text style={styles.Txt2}>{item.amount}</Text></View>
          </View>

          <View style={styles.flatmain}>
          <View style={styles.TxtView1}><Text style={styles.Txt1}>Withdrawal Reason</Text></View>
          <View><Text style={styles.Txt2}>{item.withdrawalReason}</Text></View>
          </View>

          <View style={styles.flatmain}>
          <View style={styles.TxtView1}><Text style={styles.Txt1}>Rating </Text></View>
          <View><Text style={styles.Txt2}>{item.rating}</Text></View>
          </View>
          <View style={styles.flatmain}>
          <View style={styles.TxtView1}><Text style={styles.Txt1}>Feedback </Text></View>
          <View><Text style={styles.Txt2}>{item.feedBack}</Text></View>
          </View>
          <View style={styles.flatmain1}>
          <View style={styles.TxtView1}><Text style={styles.Txt1}>Status </Text></View>
          <View><Text style={styles.Txt2}>{item.status}</Text></View>
          </View>



          {/* <View style={styles.flatmain}>
          <View style={styles.TxtView1}><Text style={styles.Txt1}>Deal Status </Text></View>
          <View><Text style={styles.Txt2}>{item.participationStatus}</Text></View>
          </View> */}
     </View>
      );
    };



    return (
        <SafeAreaView>
        <View>
        <FlatList
             data={history}
             renderItem={renderList}
        />
        </View>
        </SafeAreaView>
        )

}


const styles=StyleSheet.create({


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
    color:"#317BE0",
    fontSize:15

},

Txt2:{
    fontWeight:'bold',
    color:'black',
    fontSize:15

},

TxtView1:{
    width:190,
},

})
export default Withdrawalhistory;
