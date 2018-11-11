import React, { Component } from 'react';
import firebase from 'firebase';
import initFirebase from '../config/firebase';

const MentorContext = React.createContext();

class MentorController extends Component {

  state = {
    course: [],
    isLoading: false,
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

  uploadPaymentProve = async (mentor) => {
    const { currentUser } = firebase.auth();
    const orderStatus = false;
    this.setState({ isLoading: true });

    firebase.database().ref(`/user/${currentUser.uid}/mentors`).push(mentor)
      .then(() => {
        this.setState({ isLoading: false });
        orderStatus = true;
      });

    return orderStatus;
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
          isLoading: this.state.isLoading,
          uploadPaymentProve: this.uploadPaymentProve,
          paymentStatus: this.state.paymentStatus
        }}
      >
        {this.props.children}
      </MentorContext.Provider>
    )
  };
}

const MentorConsumer = MentorContext.Consumer;

export { MentorConsumer, MentorController, MentorContext };