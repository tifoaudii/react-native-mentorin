import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FormInput, FormLabel } from 'react-native-elements';
import { AuthConsumer } from '../../controller/AuthController';
import firebase from 'firebase';
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from 'react-native-responsive-screen';

class Register extends Component {

  state = {
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    phone: ''
  }

  async onRegisterSubmit(register,updateError){
    if(this.state.password !== this.state.confirmPassword){
      updateError('Password dan konfirmasi password harus sama!');
    }

    register(this.state);
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.props.navigation.navigate('MenuTab')
      }
    });
  }

  renderSpinner(isLoading){
    if(isLoading){
      return <ActivityIndicator size='large' />
    }

    return <Text style={styles.loginTextBtn}>Register</Text>
  }

  render() {
    const {
      container,
      input,
      form,
      loginBtn,
      brand
    } = styles;

    const { email,password, name, phone, confirmPassword } = this.state;

    return (
      <View style={container}>
        <Text style={brand}>MENTORIN</Text>
        <View style={form}>
          <FormLabel>Nama</FormLabel>
          <FormInput
            placeholder='nama anda'
            containerStyle={input}
            onChangeText={(name) => this.setState({ name })}
            value={name}
          />
          <FormLabel>Email</FormLabel>
          <FormInput
            placeholder='username@gmail.com'
            containerStyle={input}
            onChangeText={(email) => this.setState({ email })}
            value={email}
          />
          <FormLabel>No.Hp</FormLabel>
          <FormInput
            placeholder='+62'
            containerStyle={input}
            onChangeText={(phone) => this.setState({ phone })}
            value={phone}
          />
          <FormLabel>Password</FormLabel>
          <FormInput
            placeholder='type your password here'
            containerStyle={input}
            secureTextEntry
            onChangeText={(password) => this.setState({ password })}
            value={password}
          />
          <FormLabel>Konfirmasi Password</FormLabel>
          <FormInput
            placeholder='type your password here'
            containerStyle={input}
            secureTextEntry
            onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
            value={confirmPassword}
          />
          <AuthConsumer>
            {({ error })=>(
              <Text style={{ fontFamily: 'OpenSans-Light', color: 'red', fontSize: 16, textAlign: 'center' }}>
                {error? error:''}
              </Text>
            )}
          </AuthConsumer>
          <AuthConsumer>
            {({ register, isLoading, updateError }) => (
              <TouchableOpacity 
                activeOpacity={0.8} 
                style={loginBtn}
                onPress={()=>this.onRegisterSubmit(register,updateError)}
              >
                {this.renderSpinner(isLoading)}
              </TouchableOpacity>
            )}
          </AuthConsumer>
        </View>
      </View>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  input: {
    borderBottomColor: '#2980B9',
    borderBottomWidth: 0.5,
  },
  form: {
    marginHorizontal: 15,
    paddingTop: hp('3%')
  },
  loginBtn: {
    marginTop: hp('8%'),
    backgroundColor: '#3498DB',
    padding: 10,
    marginHorizontal: 13,
    borderRadius: 30
  },
  loginTextBtn: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white'
  },
  brand: {
    fontSize: hp('6%'),
    color: '#3498DB',
    letterSpacing: 1.5,
    fontFamily: 'OpenSans-Bold',
    textAlign: 'center'
  }
})

export default Register;