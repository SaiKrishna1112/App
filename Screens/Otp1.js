import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View ,TouchableOpacity,StyleSheet,Button,Alert} from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from
'react-native-confirmation-code-field';
import axios from "axios";
import AnimatedLoader from "react-native-animated-loader";

const Otp1=props=> {
//     console.log('--------------Start------------');
// console.log(props);
// console.log(props.route.params.mobiledata);
const [loading, setLoading] = useState(false);
const GetMobileData=props.route.params.mobiledata;
var  mobileSession = GetMobileData.mobileOtpSession;
var mobileNumber  = GetMobileData.mobileNumber;
const GetPreviousData=props.route.params;
var username=GetPreviousData.username;
var useremail=GetPreviousData.useremail;
var userpassword=GetPreviousData.userpassword;
var primaryType=GetPreviousData.userprimarytype;
const otpfunction=async ()=>{
         setLoading(true);
         axios.post('http://ec2-13-235-82-38.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/newUserRegistration', {
             mobileOtpSession: mobileSession,
             mobileOtpValue: value,
             mobileNumber:mobileNumber,
             primaryType: primaryType,
             name: username,
             email:useremail,
             password:userpassword,
             citizenship:'NONNRI',
             uniqueNumber: '0',
             utm:'WEB'
           })
           .then(function (response) {
            console.log(response.data);
                    setTimeout(function(){
                     setLoading(false);
                    props.navigation.navigate('Part 2',{
                           emaildata:response.data,
                           username:username,
                           primaryType:primaryType
                          })
                   },4000);
                   })
           .catch(function (error) {
             console.log(error);
             console.log(error.response.status)
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
const CELL_COUNT = 6;
const RESEND_OTP_TIME_LIMIT = 30;

let resendOtpTimerInterval: any;
const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
    RESEND_OTP_TIME_LIMIT,
);

//to start resent otp option
const startResendOtpTimer = () => {
    if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval);
    }
    resendOtpTimerInterval = setInterval(() => {
        if (resendButtonDisabledTime <= 0) {
            clearInterval(resendOtpTimerInterval);
        } else {
            setResendButtonDisabledTime(resendButtonDisabledTime - 1);
        }
    }, 2000);
};

//on click of resend button
const onResendOtpButtonPress = () => {
    //clear input field
    setValue('')
    setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
    startResendOtpTimer();
    // resend OTP Api call
    // todo
    console.log('Resend OTP');
};

//declarations for input field
const [value, setValue] = useState('');
const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
const [para, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
});

//start timer on screen on launch
useEffect(() => {
    startResendOtpTimer();
    return () => {
        if (resendOtpTimerInterval) {
            clearInterval(resendOtpTimerInterval);
        }
    };
}, [resendButtonDisabledTime]);


return (
    <SafeAreaView style={styles.root}>
        <Text style={styles.title}>Verify the Authorisation Code</Text>
        <Text style={styles.subTitle}>Sent to {mobileNumber}</Text>
        <CodeField
            ref={ref}
            {...para}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
                <View
                    onLayout={getCellOnLayoutHandler(index)}
                    key={index}
                    style={[styles.cellRoot, isFocused && styles.focusCell]}>
                    <Text style={styles.cellText}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                </View>
            )}
        />
        {/* View for resend otp  */}
        {resendButtonDisabledTime > 0 ? (
            <Text style={styles.resendCodeText}>Resend Authorisation Code in {resendButtonDisabledTime} sec</Text>
        ) : (
                <TouchableOpacity
                    onPress={onResendOtpButtonPress}>
                    <View style={styles.resendCodeContainer}>
                        <Text style={styles.resendCode} > Resend Authorisation Code</Text>
                        <Text style={{ marginTop: 40 }}> in {resendButtonDisabledTime} sec</Text>
                    </View>
                </TouchableOpacity >
            )
        }
        <AnimatedLoader
   visible={loading}
   overlayColor="rgba(255,255,255,0.75)"
   source={require("../assets/loading-state.json")}
   animationStyle={styles.lottie}
   speed={1}
 >
   <Text>Loading...</Text>
 </AnimatedLoader>
        <View style={styles.button}>
            <Button title='Submit'
                onPress={otpfunction} />
        </View>
    </SafeAreaView >
);
}
const styles = StyleSheet.create({
root: {
    flex: 1,
    padding: 20,
    alignContent: 'center',
    justifyContent: 'center'
},
title: {
    textAlign: 'left',
    fontSize: 20,
    marginStart: 20,
    fontWeight:'bold'
},
subTitle: {
    textAlign: 'left',
    fontSize: 16,
    marginStart: 20,
    marginTop: 10
},
codeFieldRoot: {
    marginTop: 40,
    width: '90%',
    marginLeft: 20,
    marginRight: 20,
},
cellRoot: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
 },
 cellText: {
    color: '#000',
    fontSize: 28,
    textAlign: 'center',
},
focusCell: {
    borderBottomColor: '#007AFF',
    borderBottomWidth: 2,
},

button: {
    marginTop: 20
},
resendCode: {
    color: "blue",
    marginStart: 20,
    marginTop: 40,
},
resendCodeText: {
    marginStart: 20,
    marginTop: 40,
},
resendCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center'
},
lottie: {
  width: 120,
  height: 120
},
});

export default Otp1;
