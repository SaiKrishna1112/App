import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
//import 'react-native-reanimated';
import 'react-native-paper';
import { View, TouchableOpacity, Image, StyleSheet, Text ,Button } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { ImageBackground } from 'react-native';
import { COLORS, SIZES } from './src/constants/theme';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';
import * as Permissions from 'expo-permissions';

import Login1 from './Screens/Login1';
import Login2 from './Screens/Login2';
import Registation from './Screens/Registation';
import ViewLoginData from './Screens/ViewLoginData';
import Openpage from './Screens/Openpage';
import Otp1 from './Screens/Otp1';
import Otp2 from './Screens/Otp2';
import Messagespage from './Screens/Messagespage';
import Success from "./Screens/Success";
import Details from './Screens/Details';
import Support from './Profile/Support';
import WalletSuccess from './Profile/WalletSuccess';
import ReferralFriend from './Profile/ReferralFriend';
import Tickethistory from './Profile/Tickethistory';
import OngoingDeals from './Profile/OngoingDeals';
import ParticpatedDeals from './Profile/ParticpatedDeals';
import ViewStatement from './Profile/ViewStatement';
import ViewLenders from './Profile/Viewlenders';
import MyClosedDeals from './Profile/MyClosedDeals';
import SingleDeal from './Profile/SingleDeal';
import Withdrawal from './Profile/Withdrawal';
import WithdrawalNormalDeal from './Profile/WithdrawalNormalDeal';
import Withdrawalfromwallet from './Profile/Withdrawalfromwallet';
import PersonalDeals from './Profile/PersonalDeals';
import Withdrawalhistory from './Profile/Withdrawalhistory';
import EmiCalculator from './Profile/EmiCalculator';
import MappingUsers from './Profile/MappingUsers';
import EarningCertificate from './Profile/EarningCertificate';
import LenderReferralStatus from './Profile/LenderReferralStatus';
import ParticipateDetails from './Profile/ParticipateDetails';
import BorrowerReferralFriend from './Borrower/Profile1/BorrowerReferralFriend';
import BorrowerReferralStatus from './Borrower/Profile1/BorrowerReferralStatus';
import BorrowerSupport from './Borrower/Profile1/BorrowerSupport';
import BorrowerTickethistory from './Borrower/Profile1/BorrowerTickethistory';
import MyloanRequest from './Borrower/Profile1/MyloanRequest';
import AcceptedLoans from './Borrower/Profile1/AcceptedLoans';
import AgreedLoans from './Borrower/Profile1/AgreedLoans';
import Enach from './Borrower/Profile1/enach';
import AcceptedOffer from './Borrower/Profile1/AcceptedOffer';
import Location from './Borrower/Profile1/Location';
import Maps from './Borrower/Profile1/Maps';
import Login from './Screens/Login';
import Registration from './Screens/Registration';
import Generating from './Tabs/Generating';
import BankVerify from './Tabs/BankVerify';
import Inviting from './Tabs/Inviting';
import NumberVerify from './Tabs/NumberVerify';
import ReferralStatus from './Tabs/ReferralStatus';
import NeoBank from './Tabs/NeoBank';
import bgm from './src/Images/bgm.jpg';
import MaintabScreen from './Screens1/MaintabScreen';
import BorrowerMaintabScreen from './Borrower/BorrowerMaintabScreen';
import {DrawerContent} from './Screens1/DrawerContent';
import {BorrowerDrawerContent} from './Borrower/BorrowerDrawerContent';
import {PartnerDrawerContent} from './Tabs/PartnerDrawerContent';
import PartnerMaintabScreen from './Tabs/PartnerMaintabScreen';

import { createStore } from 'redux';
import allReducers from './src/reducers';
import { Provider } from 'react-redux';
import { LogBox } from "react-native";

LogBox.ignoreLogs(["EventEmitter.removeListener","ViewPropTypes",'VirtualizedLists','Warning:...']);
const store = createStore(
               allReducers
              );

const Stack = createStackNavigator();

// const Slides = [{
//         id: 1,
//         title: 'Get Free Movie Tickets ',
//         discripition: 'Be a part of OxyLoans',
//         image: require('./src/Images/oxy.png')
//
//     },
//     {
//         id: 2,
//         title: 'Sarkaru Vaari Paata',
//         discripition: 'Register in OxyLoans and get 5 movie tickets FREE',
//         image: require('./src/Images/oxy2.png')
//     },
//     {
//         id: 3,
//         title: 'Keep a Note',
//         discripition: '*hyderbad thearters only          *Tickets allocated based on your Credit score and Details',
//         image: require('./src/Images/oxy3.png')
//     }
// ]

const App = () => {
const Drawer = createDrawerNavigator();

function LenderDrawer() {
  return (
   <Drawer.Navigator screenOptions = {{headerShown: false}} drawerContent={props => <DrawerContent {...props}/> }>
        <Drawer.Screen name="HomeDrawer" component={MaintabScreen}  />
    </Drawer.Navigator>
  );
}
function BorrowerDrawer() {
  return (
   <Drawer.Navigator screenOptions = {{headerShown: false}} drawerContent={props => <BorrowerDrawerContent {...props}/> }>
        <Drawer.Screen name="HomeDrawer" component={BorrowerMaintabScreen}  />
    </Drawer.Navigator>
  );
}
function PartnerDrawer(){
  return(
  <Drawer.Navigator screenOptions={{headerShown:false}} drawerContent={props => <PartnerDrawerContent {...props}/> }>
  <Drawer.Screen name="HomeDrawer" component={PartnerMaintabScreen} />
</Drawer.Navigator>
  )
}
    // const [ShowHomePage, SetShowHomePage] = useState(false);
    //
    // const buttonlabel = (label) => {
    //     return (
    //      <View style = {{ padding: 12 } } >
    //         <Text style = {
    //             { color: COLORS.title, fontSize: SIZES.h3 } } > { label } < /Text>
    //             </View>
    //     )
    // }
    //
    // if (!ShowHomePage) {
    //     return (
    //      <AppIntroSlider data = { Slides }
    //         renderItem = {
    //             ({ item }) => {
    //                 return (
    //
    //                     <ImageBackground style = {
    //                         {
    //                             flex: 1,
    //                             alignItems: 'center',
    //                             padding: 15,
    //                             paddingTop: 40,
    //                         }
    //                     }
    //                     source = { bgm } >
    //                     <Image source = { item.image }
    //                     style = {
    //                         {
    //                             width: SIZES.width - 50,
    //                             height: 500,
    //                         }
    //                     }
    //                     resizeMode = "contain" />
    //                     <Text style = {
    //                         {
    //                             fontWeight: 'bold',
    //                             color: COLORS.title,
    //                             fontSize: SIZES.h1,
    //                             marginBottom: 7,
    //                             bottom: 60,
    //
    //
    //                         }
    //                     } > { item.title }
    //                     </Text>
    //                     <Text style = {
    //                         {
    //                             textAlign: 'center',
    //                             fontWeight: 'bold',
    //                             color: COLORS.title2,
    //                             fontSize: SIZES.h2,
    //                             bottom: 30,
    //
    //                         }
    //                     } > { item.discripition }
    //                     </Text>
    //                     </ImageBackground>
    //                 )
    //             }
    //         }
    //         activeDotStyle = {
    //             { backgroundColor: COLORS.primary, width: 20 } }
    //         showSkipButton renderNextButton = {() => buttonlabel('Next') }
    //         renderSkipButton = {() => buttonlabel('Skip') }
    //         renderDoneButton = {() => buttonlabel('Done') }
    //         onDone = {() => { SetShowHomePage(true);}}
    //         onSkip = {() => { SetShowHomePage(true); } }
    //         />
    //     )
    // }
    return (
     <Provider store={store}>
     <NavigationContainer >
        <Stack.Navigator initialRouteName = "Openpage"
        screenOptions = {{
                headerTintColor: 'black',
                headerTitleStyle: styles.headerTitleStyle,
                headerMode: 'float',
                headerShown: true}}>
        <Stack.Screen name = "OxyLoans" component = { Openpage } options={{headerShown: false}}/>
        <Stack.Screen name = "Login1" component = { Login1 } options={{headerShown: false}}/>
        <Stack.Screen name = "Login2" component = { Login2 } options={{headerShown: false}}/>
        <Stack.Screen name = "Login" component = { Login } options={{headerShown: false}}/>
        <Stack.Screen name = "Primary Type" component = { Registration } options={{headerShown: false}}/>
        <Stack.Screen name = "ViewLoginData" component = { ViewLoginData } options={{headerShown: false}}/>
        <Stack.Screen name = "Registration" component = { Registation } options={{headerShown: false}}/>
        <Stack.Screen name = "Part 1" component = { Otp1 } options={{headerShown: false}}/>
        <Stack.Screen name = "Part 2"component = { Messagespage } options={{headerShown: false}}/>
        <Stack.Screen name = "Success"component = { Success } options={{headerShown: false}}/>
        <Stack.Screen name = "Login With OTP"component = { Otp2 } options={{headerShown: false}}/>
        <Stack.Screen name = "Support" component = { Support }/>
        <Stack.Screen name = "ReferralFriend" component = { ReferralFriend } />
        <Stack.Screen name = "LenderReferralStatus" component = { LenderReferralStatus } />
        <Stack.Screen name = "WalletSuccess" component = { WalletSuccess } />
        <Stack.Screen name = "Tickethistory" component = { Tickethistory } />
        <Stack.Screen name = "Running Deals" component = { OngoingDeals } />
        <Stack.Screen name = "Participated Deals" component = { ParticpatedDeals } />
        <Stack.Screen name = "ViewStatement" component = { ViewStatement } />
        <Stack.Screen name = "View Lenders" component = { ViewLenders } />
        <Stack.Screen name = "Closed Deals" component = { MyClosedDeals } />
        <Stack.Screen name = "SingleDeal"  component = { SingleDeal } />
        <Stack.Screen name = "Withdrawal" component = { Withdrawal } />
        <Stack.Screen name = "EmiCalculator" component = { EmiCalculator } />
        <Stack.Screen name = "Mapped Users" component = { MappingUsers } />
        <Stack.Screen name = "Earning Certificate" component = { EarningCertificate } />
        <Stack.Screen name = "WithdrawalNormalDeal" component = { WithdrawalNormalDeal } />
        <Stack.Screen name = "Withdrawalfromwallet" component = { Withdrawalfromwallet } />
        <Stack.Screen name = "Withdrawalhistory" component = { Withdrawalhistory } />
        <Stack.Screen name = "Participate Details" component = { ParticipateDetails } />
        <Stack.Screen name = "PersonalDeals" component = { PersonalDeals } />
        <Stack.Screen name = "BorrowerReferralFriend" component = { BorrowerReferralFriend } />
        <Stack.Screen name = "BorrowerReferralStatus" component = { BorrowerReferralStatus } />
        <Stack.Screen name = "Write To Us" component = { BorrowerSupport } />
        <Stack.Screen name = "Ticket History" component = { BorrowerTickethistory } />
        <Stack.Screen name = "MyloanRequest" component = { MyloanRequest } />
        <Stack.Screen name = "AgreedLoans" component = { AgreedLoans } />
        <Stack.Screen name = "Enach" component = { Enach } />
        <Stack.Screen name = "AcceptedLoans" component = { AcceptedLoans } />
        <Stack.Screen name = "AcceptedOffer" component = { AcceptedOffer } />
        <Stack.Screen name = "Location" component = { Location } />
        <Stack.Screen name = "Maps" component = { Maps } />
        <Stack.Screen name = "Inviting" component = { Inviting } />
        <Stack.Screen name = "BankVerify" component = { BankVerify } />
        <Stack.Screen name = "Generating" component = { Generating } />
        <Stack.Screen name = "NumberVerify" component = { NumberVerify } />
        <Stack.Screen name = "ReferralStatus" component = { ReferralStatus } />
        <Stack.Screen name = "NeoBank" component = { NeoBank } />

        <Drawer.Screen name = "LenderDrawer" component = { LenderDrawer }  options={{headerShown: false}}/>
        <Drawer.Screen name = "BorrowerDrawer" component = { BorrowerDrawer } options={{headerShown: false}}/>
        <Drawer.Screen name = "PartnerDrawer" component = { PartnerDrawer } options={{headerShown: false}}/>
        </Stack.Navigator>
        </NavigationContainer>
        </Provider>
    )
}
const styles = StyleSheet.create({
    headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        color: 'black',
    },
});
export default App;
