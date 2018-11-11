import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { FormInput, FormLabel, Icon } from 'react-native-elements';
import { AuthConsumer, AuthContext, AuthController } from '../../controller/AuthController';
import firebase from 'firebase';
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from 'react-native-responsive-screen';

class Login extends Component {

  static contextType = AuthContext;

  componentDidMount(){
    console.log(this.context)
  }
  
  state = {
    email: '',
    password: ''
  }

  async onLoginSubmit(login){
    const { email, password } = this.state;
    login(email,password);

    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.props.navigation.navigate('MenuTab')
      }
    });
  }

  renderSpinner(isLoading){
    if(isLoading){
      return <ActivityIndicator color='white' size='large' />
    }

    return <Text style={styles.loginTextBtn}>Login</Text>
  }

  render() {
    const {
      container,
      input,
      form,
      loginBtn,
      registerBtn,
      registerBtnText,
      brand
    } = styles;

    const { email,password } = this.state;

    return (
      <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={container}>
        <Text style={brand}>MENTORIN</Text>
        <View style={form}>
          <FormLabel labelStyle={{ color: '#2980B9'}}>Email</FormLabel>
          <FormInput
            placeholder='username@gmail.com'
            containerStyle={input}
            onChangeText={(email) => this.setState({ email })}
            value={email}
          />
          <FormLabel labelStyle={{ color: '#2980B9'}}>Password</FormLabel>
          <FormInput
            placeholder='type your password here'
            containerStyle={input}
            secureTextEntry
            onChangeText={(password) => this.setState({ password })}
            value={password}
          />
          <AuthConsumer>
            {({ error })=>(
              <Text style={{ fontFamily: 'OpenSans-Light', color: 'red', fontSize: 16, textAlign: 'center' }}>
                {error? error:''}
              </Text>
            )}
          </AuthConsumer>
          <AuthConsumer>
            {({ login, isLoading }) => (
              <TouchableOpacity 
                activeOpacity={0.8} 
                style={loginBtn}
                onPress={()=>this.onLoginSubmit(login)}
              >
                {this.renderSpinner(isLoading)}
              </TouchableOpacity>
            )}
          </AuthConsumer>
          <TouchableOpacity 
            onPress={()=>this.props.navigation.navigate('Register')}
            style={registerBtn}
          >
              <Text style={registerBtnText}>Belum punya akun? daftar disini!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    height: hp('45%'),
    paddingTop: hp('5%')
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
  registerBtn: {
    marginRight: 25,
    marginTop: 15,
    alignItems: 'center'
  },
  registerBtnText: {
    fontSize: 16,
    color: '#3498DB'
  },
  brand: {
    fontSize: hp('6%'),
    color: '#3498DB',
    letterSpacing: 1.5,
    fontFamily: 'OpenSans-Bold',
    textAlign: 'center'
  }
})

export default Login;