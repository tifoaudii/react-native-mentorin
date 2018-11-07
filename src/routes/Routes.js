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
import Order from '../screen/orderscreen/Order';
import Chat from '../screen/chatscreen/Chat';
import Profile from '../screen/profilescreen/Profile';

const AuthStack = createStackNavigator(
  { Login,Register },
  {
    headerMode: 'none',
  }
);

const HomeStack = createStackNavigator(
  { Home,ListMentor,Mentor },
  {
    headerMode: 'none'
  }
);

const OrderStack = createStackNavigator(
  { Order },
  {
    headerMode: 'none'
  }
);

const ChatStack = createStackNavigator(
  { Chat },
  {
    headerMode: 'none'
  }
);

const ProfileStack = createStackNavigator(
  { Profile },
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
    Order: { 
      screen: OrderStack,
      navigationOptions: {
        tabBarLabel: 'Order',
        tabBarIcon: ({ tintColor })=>(
          <Icon 
            name='add-shopping-cart'
            size={25}
            color={tintColor}
            type='materialicons'
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
        height: 50,
        backgroundColor: '#white'
      },
      labelStyle: {
        fontSize: 12,
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