import React, { Component } from 'react';
import firebase from 'firebase';
import initFirebase from '../config/firebase';

const MentorContext = React.createContext();

class MentorController extends Component {

  state = {
    course: [],
    isLoading: false
  }

  fetchMentor = async () => {
    initFirebase();
    this.setState({ isLoading: true });
    this.database = firebase.database().ref('Course/');
    await this.database.on('value', (value) => {
      const mentor = Object.entries(value.val()).map(value => Object.assign({}, { key: value[0] }, { mentor: value[1] }));

      this.setState({ course: mentor, isLoading: false });
    });

  }

  componentWillUnmount() {
    this.database.off();
  }

  render() {
    return (
      <MentorContext.Provider
        value={{
          fetchMentor: this.fetchMentor,
          course: this.state.course,
          isLoading: this.state.isLoading
        }}
      >
        {this.props.children}
      </MentorContext.Provider>
    )
  };
}

const MentorConsumer = MentorContext.Consumer;

export { MentorConsumer, MentorController, MentorContext };