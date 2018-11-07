import React, { Component } from 'react';
import { View,Text, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

class Order extends Component {
  async logout(){
    await firebase.auth().signOut();

    this.props.navigation.navigate('AuthStack')
  }
  render(){
    return (
      <View>
        <TouchableOpacity onPress={()=>this.logout()}>
          <Text>logout</Text>
        </TouchableOpacity>
      </View>
    )
  };
}

export default Order;