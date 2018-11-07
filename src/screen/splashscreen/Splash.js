import React, { Component } from 'react';
import { View,Text, StyleSheet } from 'react-native';
import firebase from 'firebase';


class Splash extends Component {
  componentDidMount(){
    setTimeout(async ()=> {
      await firebase.auth().onAuthStateChanged((user)=>{
        this.props.navigation.navigate(user? 'MenuTab': 'AuthStack');
      });
    }, 2500);
  }

  render(){
    const { container, brand } = styles;
    return (
      <View style={container}>
        <Text style={brand}>MENTORIN</Text>
      </View>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498DB'
  },
  brand: {
    fontSize: 38,
    color: '#ECF0F1',
    letterSpacing: 3.5,
    fontFamily: 'OpenSans-Light'
  }
})

export default Splash;