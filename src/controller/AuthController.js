import React, { Component } from 'react';
import firebase from 'firebase';

const AuthContext = React.createContext();

class AuthController extends Component {
  
  state = {
    isLoading: false,
    error: ''
  }

  updateErrorMessage(error){
    this.setState({ error });
  }

  register = async (user) => {
    this.setState({
      isLoading: true,
      error: false
    });
    const { email,password,name,phone } = user;

    try{
      await firebase.auth().createUserWithEmailAndPassword(email,password);
      const newUser = await firebase.database().ref('/user').push();
      newUser.set({
        name,
        email,
        phone,
        photo: ""
      })
      this.login(email,password);
    }catch(err){
      console.log(err);
      this.setState({
        error: 'register gagal, coba lagi',
        isLoading: false
      });
    }
  }

  login = async (email,password)=>{
    this.setState({
      isLoading: true,
      error: false
    });

    try{
      await firebase.auth().signInWithEmailAndPassword(email,password);
      this.setState({
        isLoading: false,
        error: false
      })
    }catch(err){
      console.log(err);
      this.setState({
        error: err.code,
        isLoading: false
      });
    }
  }
  
  render(){
    return(
      <AuthContext.Provider
        value={{
          login: this.login,
          error: this.state.error,
          isLoading: this.state.isLoading,
          updateError: this.updateErrorMessage,
          register: this.register
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthController, AuthConsumer, AuthContext };