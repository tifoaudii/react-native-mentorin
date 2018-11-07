import React, { Component } from 'react';
import Routes from './src/routes/Routes';
import initFirebase from './src/config/firebase';
import { AuthController } from './src/controller/AuthController';
import { MentorController } from './src/controller/MentorController';

export default class App extends Component {
  componentDidMount() {
    initFirebase();
  }
  render() {
    console.disableYellowBox = true;
    return (
      <AuthController>
        <MentorController>
          <Routes />
        </MentorController>
      </AuthController>
    )
  };
}