import 'react-native-gesture-handler';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import React from 'react';

import BorrowerHome from '../Borrower/Profile1/Home';
import BorrowerProfiles from '../Borrower/Profile1/Profiles';
import Borrowings from '../Borrower/Profile1/Borrowings';

import Icon from 'react-native-vector-icons/Ionicons';

import { createStackNavigator } from '@react-navigation/stack';


const HomeStack = createStackNavigator();
const ProfilesStack = createStackNavigator();
const BorrowingsStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const BorrowerMaintabScreen=()=>(
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
            <Icon name="apps" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Borrowing"
        component={BorrowingsStackScreen}
        options={{
          tabBarLabel: 'Borrowing',
          tabBarIcon: ({ color }) => (
            <Icon name="cash" color={color} size={26} />
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

export default BorrowerMaintabScreen;



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
   <HomeStack.Screen name="Dashboard" component={BorrowerHome} options={{
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
<ProfilesStack.Screen name="Profile" component={BorrowerProfiles}
options={{
headerLeft:()=>(
<Icon.Button name="ios-menu" size={35} backgroundColor="#009387" onPress={()=>navigation.toggleDrawer()}></Icon.Button>
),
}}
/>

</ProfilesStack.Navigator>
);

const BorrowingsStackScreen = ({navigation})=>(
<BorrowingsStack.Navigator screenOptions={{
headerStyle: {
backgroundColor : '#009387',
},
headerTintColor:'#fff',
headerTitleStyle:{
fontWeight:'bold'
}
}}>
<BorrowingsStack.Screen name="Borrowings" component={Borrowings}
options={{
headerLeft:()=>(
<Icon.Button name="ios-menu" size={35} backgroundColor="#009387" onPress={()=>navigation.toggleDrawer()}></Icon.Button>
),
}}
/>

</BorrowingsStack.Navigator>
);
