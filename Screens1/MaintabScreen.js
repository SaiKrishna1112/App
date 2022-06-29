import 'react-native-gesture-handler';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import React from 'react';

import Home from '../Profile/Home';
import Profiles from '../Profile/Profiles';
import Wallet from '../Profile/Wallet';
import MyTransactionHistory from '../Profile/MyTransactionHistory';

import Icon from 'react-native-vector-icons/Ionicons';

import { createStackNavigator } from '@react-navigation/stack';


const HomeStack = createStackNavigator();
const ProfilesStack = createStackNavigator();
const WalletStack = createStackNavigator();
const MyTransactionHistoryStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MaintabScreen=()=>(
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      barStyle={{ backgroundColor: '#009387' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Dashboard',
        //   tabBarColor:'#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletStackScreen}
        options={{
          tabBarLabel: 'Wallet',
          tabBarIcon: ({ color }) => (
            <Icon name="wallet-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Transaction History"
        component={MyTransactionHistoryScreen}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ color }) => (
            <Icon name="swap-vertical-outline" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfilesStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );

export default MaintabScreen;



const HomeStackScreen = ({navigation})=>(
    <HomeStack.Navigator screenOptions={{
   headerStyle: {
     backgroundColor : '#009387',
   },
   headerTintColor:'#fff',
   headerTitleStyle:{
     fontWeight:'bold'
   }
 }}>
   <HomeStack.Screen name="Dashboard" component={Home} options={{
     headerLeft:()=>(
     <Icon.Button name="ios-menu" size={35} backgroundColor="#009387" onPress={()=>navigation.toggleDrawer()}></Icon.Button>
    ),
   }}/>

 </HomeStack.Navigator>
);

const ProfilesStackScreen = ({navigation})=>(
<ProfilesStack.Navigator screenOptions={{
headerStyle: {
backgroundColor : '#009387',
},
headerTintColor:'#fff',
headerTitleStyle:{
fontWeight:'bold'
}
}}>
<ProfilesStack.Screen name="Profile" component={Profiles}
options={{
headerLeft:()=>(
<Icon.Button name="ios-menu" size={35} backgroundColor="#009387" onPress={()=>navigation.toggleDrawer()}></Icon.Button>
),

}}
/>

</ProfilesStack.Navigator>
);


const WalletStackScreen = ({navigation})=>(
<WalletStack.Navigator screenOptions={{
headerStyle: {
backgroundColor : '#009387',
},
headerTintColor:'#fff',
headerTitleStyle:{
fontWeight:'bold'
}
}}>
<WalletStack.Screen name="Wallet" component={Wallet}
options={{
headerLeft:()=>(
<Icon.Button name="ios-menu" size={35} backgroundColor="#009387" onPress={()=>navigation.toggleDrawer()}></Icon.Button>
),

}}
/>

</WalletStack.Navigator>
);


const MyTransactionHistoryScreen = ({navigation})=>(
<MyTransactionHistoryStack.Navigator screenOptions={{
headerStyle: {
backgroundColor : '#009387',
},
headerTintColor:'#fff',
headerTitleStyle:{
fontWeight:'bold'
}
}}>
<MyTransactionHistoryStack.Screen name="MyTransactionHistory" component={MyTransactionHistory}
options={{
headerLeft:()=>(
<Icon.Button name="ios-menu" size={35} backgroundColor="#009387" onPress={()=>navigation.toggleDrawer()}></Icon.Button>
),
}}
/>

</MyTransactionHistoryStack.Navigator>
);
