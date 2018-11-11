import React, { Component } from 'react';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

//import screen
import Login from '../screen/authscreen/Login';
import Register from '../screen/authscreen/Register';
import Splash from '../screen/splashscreen/Splash';
import Home from '../screen/homescreen/Home';
import ListMentor from '../screen/homescreen/ListMentor';
import Mentor from '../screen/homescreen/Mentor';
import Payment from '../screen/homescreen/Payment';
import Order from '../screen/orderscreen/Order';
import EditProfile from '../screen/profilescreen/EditProfile';
import Profile from '../screen/profilescreen/Profile';

const AuthStack = createStackNavigator(
  { Login,Register },
  {
    headerMode: 'none',
  }
);

const HomeStack = createStackNavigator(
  { Home,ListMentor,Mentor,Payment },
  {
    headerMode: 'none'
  }
);


const ProfileStack = createStackNavigator(
  { Profile, EditProfile, Order },
  {
    headerMode: 'none'
  }
);

const MenuTab = createBottomTabNavigator(
  { 
    Home: { 
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor })=>(
          <Icon 
            name='home'
            size={25}
            color={tintColor}
          />
        ),
      }
    }, 
    Profile : { 
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor })=>(
          <Icon 
            name='person-outline'
            size={25}
            color={tintColor}
          />
        ),
      } 
    }
  },{
    tabBarOptions:{
      showIcon: true,
      activeTintColor: '#3498DB',
      scrollEnabled: true,
      style: {
        height: 52,
        backgroundColor: 'white',
      },
      labelStyle: {
        fontSize: 8,
      },
    },   
  }
);

const MainRoutes = createSwitchNavigator(
  {
    Splash,
    AuthStack,
    MenuTab
  },{
    initialRouteName: 'Splash',
    headerMode: 'none'
  }
);

class Routes extends Component {
  render() {
    return (
      <MainRoutes />
    )
  };
};

export default Routes