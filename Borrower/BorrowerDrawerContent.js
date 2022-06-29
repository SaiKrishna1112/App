import React,{useState,useEffect} from 'react';
import { StyleSheet, View,TouchableOpacity,Image,ToastAndroid} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import {launchCameraAsync, useCameraPermissions, PermissionStatus} from 'expo-image-picker';
import {FormData} from "formdata-node";
import {
   Avatar,
   Title,
   Caption,
   Drawer,
   Paragraph,
   Text,
   TouchableRipple,
   Switch,
   List

} from 'react-native-paper';

import {
    DrawerContentScrollView,
    DrawerItem,
 } from '@react-navigation/drawer';


 import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import axios from 'axios';



 export function BorrowerDrawerContent(props){
  const userDetails = useSelector(state=>state.counter);
 const userDetail = useSelector(state=>state.logged);
  var access = userDetails.headers.accesstoken;
  var id = userDetails.data.id;
  const [pickedImagePath, setPickedImagePath] = useState('');
  const fd = new FormData();
  const setToastMsg= msg =>{
   ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };
  //------------------------PROFILEPIC-------------------------------//
   const [imageshow,setimageshow] = useState();
   const [cameraPermissionInformation, requestPermission] = ImagePicker.useCameraPermissions();

  async function verifyPermissions() {
   if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED){
    const  permissionResponse = await requestPermission();

    return permissionResponse.granted;
   }
   if(cameraPermissionInformation.status === PermissionStatus.DENIED){
    Alert.alert(
     'Insufficient Permissions',
    );
    return false;
   }
   return true;
  }
   async function takeImageHandler() {
   const hasPermission = await verifyPermissions();

   if(!hasPermission){
    return ;
   }
    const result = await launchCameraAsync({
   type: "*/*",
   allowsEditing: true,
   copyToCacheDirectory: true,
   aspect: [4, 3],
  });
  setimageshow(result.uri)
  var name=result.uri.split('file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FOxyloans-bf6d8ef4-4705-4802-b3a2-d6f53f612242/ImagePicker/')
  var imageset={
   name:name[1],
   uri: result.uri,
   size:(result.height)+(result.width),
   type: "application/jpg"
  }
  //console.log(imageset);
    fd.append("PROFILEPIC", imageset);
  axios({
     method:'post',
     url:'http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/upload/uploadProfilePic',
     data:fd,
     headers:{
           accessToken:access,
           'Content-Type' :'multipart/form-data',
          }
    })
     .then(function (response) {
      //console.log(response);
      setToastMsg("Successfully Upload");
           })
     .catch(function (error) {
      console.log('error',error);
      alert("=======")
    });
   }

  //------------------------------profile Pic Get Call---------------------------------------------
  const getprofieshowss=()=>{
   axios({
       method:'get',
       url:'http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/'+id+'/download/PROFILEPIC',
       headers:{
             accessToken:access,
            }
      })
       .then(function (response) {
        //console.log(response.data);
         setimageshow(response.data.downloadUrl);
             })
       .catch(function (error) {
        console.log('error',error);
        console.log(error.response.data.errorMessage);
      });

  }



     let imagePreview = <Text style={{marginTop:120,alignSelf:'center',justifyContent:'center',color:'white'}}>NO Image taken yet.</Text>

      if(imageshow) {
       imagePreview = <Image source={{uri:imageshow }} style={styles.image}/>
      }

///-------------------------end profile------------------------------------------------

useEffect(()=>{
 getprofieshowss();
},[imageshow]);

  var LR;
  var BR;
     return(
           <View style={{flex:1}}>
               <DrawerContentScrollView {...props} style={{flex:1,margin:20,marginTop:30}}>
                <View style={{flexDirection:'row'}}>
                          <View>
                          <View style={{alignItems:'center',marginTop:10}}>
                     <TouchableOpacity onPress={takeImageHandler}>
                         <View style={styles.imagePreview}>{imagePreview}</View>
                      </TouchableOpacity>
                     </View>
                          </View>
                   <View style={{flexDirection:'column',marginLeft:20}}>
                       <Title style={{fontSize:15,width:120}}>{userDetail.firstName+userDetail.lastName}</Title>
                       <Caption>{userDetail.primaryType!='LENDER'? <Text>BR</Text>:<Text>LR</Text>}<Text>{userDetail.userId}</Text></Caption>

                   </View>
                </View>

                <Drawer.Section style={{marginTop:40,}}>
                   <DrawerItem
                   icon={({color,size})=>(
                       <Icon
                       name='apps'
                       color={color}
                       size={size}
                       />
                   )}
                   label='Dashboard'
                   onPress={()=>{props.navigation.navigate('Home')}}
                   />

                   <DrawerItem
                   icon={({color,size})=>(
                       <Icon
                       name='person-circle'
                       color={color}
                       size={size}
                       />
                   )}
                   label='Profile'
                   onPress={()=>{props.navigation.navigate('Profile')}}
                   />
                       <DrawerItem
                          icon={({color,size})=>(
                              <Icon
                              name='cash'
                              color={color}
                              size={size}
                              />
                          )}
                          label='Borrowings'
                          onPress={()=>{props.navigation.navigate('Borrowings')}}
                          />
                          <DrawerItem
                             icon={({color,size})=>(
                                 <Icon
                                 name='file-tray-full-outline'
                                 color={color}
                                 size={size}
                                 />
                             )}
                             label='Agreed Loans'
                             onPress={()=>{props.navigation.navigate('AgreedLoans')}}
                             />
                             <DrawerItem
                                icon={({color,size})=>(
                                    <Icon
                                    name='create-outline'
                                    color={color}
                                    size={size}
                                    />
                                )}
                                label='eNACH'
                                onPress={()=>{props.navigation.navigate('Enach')}}
                                />
                                <DrawerItem
                                   icon={({color,size})=>(
                                       <Icon
                                       name='checkbox-outline'
                                       color={color}
                                       size={size}
                                       />
                                   )}
                                   label='Accepted Loans'
                                   onPress={()=>{props.navigation.navigate('AcceptedLoans')}}
                                   />
                                      <DrawerItem
                                         icon={({color,size})=>(
                                             <Icon
                                             name='bar-chart-outline'
                                             color={color}
                                             size={size}
                                             />
                                         )}
                                         label='Accepted Offer'
                                         onPress={()=>{props.navigation.navigate('AcceptedOffer')}}
                                         />

                <DrawerItem
                   icon={({color,size})=>(
                       <Icon
                       name='person-add'
                       color={color}
                       size={size}
                       />
                   )}
                   label='Referral Friend'
                   onPress={()=>{props.navigation.navigate('BorrowerReferralFriend')}}
                   />
                   <DrawerItem
                      icon={({color,size})=>(
                          <Icon
                          name='people-outline'
                          color={color}
                          size={size}
                          />
                      )}
                      label='Referral Status'
                      onPress={()=>{props.navigation.navigate('BorrowerReferralStatus')}}
                      />
                   <DrawerItem
                      icon={({color,size})=>(
                          <Icon
                          name='create'
                          color={color}
                          size={size}
                          />
                      )}
                      label='Write To Us'
                      onPress={()=>{props.navigation.navigate('Write To Us')}}
                      />
                      <DrawerItem
                         icon={({color,size})=>(
                             <Icon
                             name='eye'
                             color={color}
                             size={size}
                             />
                         )}
                         label='View Ticket History'
                         onPress={()=>{props.navigation.navigate('Ticket History')}}
                         />
                         <DrawerItem
                            icon={({color,size})=>(
                                <Icon
                                name='map'
                                color={color}
                                size={size}
                                />
                            )}
                            label='Location'
                            onPress={()=>{props.navigation.navigate('Location')}}
                            />
               </Drawer.Section>

               </DrawerContentScrollView>

               <Drawer.Section style={{margin:20,marginBottom:50}}>
                   <DrawerItem
                   icon={({color,size})=>(
                       <Icon
                       name='log-out-outline'
                       color={color}
                       size={size}
                       />
                   )}
                   label='Sign Out'
                   onPress={()=>{props.navigation.navigate('Login1')}}
                   />
               </Drawer.Section>

           </View>
     );
 }
 const styles = StyleSheet.create({
  imagePreview:{
 borderRadius:100,
 width:70,
 height:70,
 backgroundColor:'black'
 },
 image:{
 width:70,
 height:70,
 borderRadius:100
 }
 })
