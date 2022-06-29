import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,FlatList } from 'react-native';
import * as Contacts from 'expo-contacts'

const ContactInfo=({navigation})=> {
  const [contacts,setContacts]=useState();

  useEffect(()=>{
    (async()=>{
      const {status}=await Contacts.requestPermissionsAsync();
      if(status==='granted'){
        const{data}=await Contacts.getContactsAsync({
          fields:[Contacts.Fields.PhoneNumbers]
        })
        if(data.length>0){
          setContacts(data);
          //console.log(data)

        }
      }
    })()
  })

  return (
    <View>
       <FlatList
       style={{width:"100%",padding:20,marginTop:5}}
       data={contacts}
       keyExtractor={item=>item.id}
       renderItem={({item})=>{
        return (
          <View style={{borderBottomWidth:2}}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>{item.name}</Text>
            <Text style={{fontSize:17,}}>{item.phoneNumbers && item.phoneNumbers[0] && item.phoneNumbers[0].number} </Text>
          </View>
        )
       }}
       />

     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ContactInfo;
