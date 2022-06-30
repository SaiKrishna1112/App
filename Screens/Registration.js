import  React from "react"
import { StyleSheet, Text, View,Image,TouchableOpacity,Button} from 'react-native';

const  Registration=props=>{
  return (
    <View style={styles.container}>
            <TouchableOpacity onPress={()=>{
                props.navigation.push('Registration',{primaryType:"BORROWER"}); }}>
                 <View style={styles.boxcontainer}>
                  <View>
                  <View style={styles.logo}>
                 <Image source={require('../assets/needloan.jpg')} style={styles.img} />
                 </View>
                </View>
               </View>
           </TouchableOpacity>

           <TouchableOpacity onPress={()=>{
               props.navigation.push('Registration',{primaryType:"LENDER"});}}>
               <View style={styles.boxcontainer}>
                 <View>
                   <View style={styles.logo}>
                     <Image source={require('../assets/lender.jpg')} style={styles.img} />
                   </View>
                </View>
              </View>
             </TouchableOpacity>

         <TouchableOpacity onPress={()=>{
          props.navigation.push("Login");
          }}>
        <View style={styles.imaggrow}>

            <Image source={{uri:"https://media.istockphoto.com/photos/business-partnership-business-man-investor-handshake-with-effect-picture-id1313742092?b=1&k=20&m=1313742092&s=170667a&w=0&h=rDXsKPD722DEsxHYo1QEhM2UWV0nOfuD-izQHm2DxJ4="}}
            style={styles.img1} />
                <View style={{width:"70%"}}>
                    <Text style={styles.txt1}> Login or Register as Partner </Text>
                    <Text>Who are interested to join as a partner with oxyloans,click here and join us </Text>
                </View>
        </View>
      </TouchableOpacity>

     </View>
    );
}

const styles = StyleSheet.create({
 container: {
      flex: 1,
 justifyContent: 'center',
 alignItems: 'center',
},
  img1:{
    height:80,
    width:80,
    margin:6
  },
  imaggrow:{
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"flex-start",
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: '#73A16C',
    margin:10,
    height:100,
    width:300

  },
  txt1:{
    color:"black",
    padding:5,
    fontSize:15
  },
  boxcontainer: {
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#fff',
   borderColor: '#000',
   borderWidth: 1,
   height: 80,
   borderRadius: 5,
   margin: 10,
   width: 300,
   },
   img:{
   height:80,
   width:300
   },
   logo: {
       justifyContent: 'center',
       alignItems: 'center',
   },
  });

export default Registration;
