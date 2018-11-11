import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Platform } from 'react-native';
import { Avatar, FormInput, FormLabel } from 'react-native-elements';
import { AuthContext } from '../../controller/AuthController';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import firebase from 'firebase';


class Profile extends Component {
  static contextType = AuthContext;

  state = {
    name: '',
    phone: '',
    email: ''
  }

  componentDidMount() {
    this.context.fetchUserProfile();
  };

  onEditProfile(profile) {
    this.props.navigation.navigate('EditProfile', { profile });
  }

  
  handlePictureChange() {
    this.context.handlePictureChange();
  }

  logout(){
    firebase.auth().signOut().then(()=>{
      this.props.navigation.navigate('AuthStack')
    })
  }

  render() {
    const { isLoading, profile } = this.context;
    console.log(profile);
    if (isLoading) {
      return (
        <View style={styles.SpinnerView}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.topBarText}>Profile Saya</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => this.handlePictureChange()}>
            <Avatar
              height={130}
              source={{ uri: profile.photo }}
              rounded
              containerStyle={styles.avatarView}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => this.onEditProfile({ type: 'name', payload: profile.name })}>
            <FormLabel>Nama</FormLabel>
            <FormInput
              containerStyle={styles.input}
              value={profile.name}
              onChangeText={(name) => this.setState({ name })}
              editable={false}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => this.onEditProfile({ type: 'phone', payload: profile.phone })}>
            <FormLabel>Nomor Hp</FormLabel>
            <FormInput
              containerStyle={styles.input}
              value={profile.phone}
              onChangeText={(phone) => this.setState({ phone })}
              editable={false}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => this.onEditProfile({ type: 'email', payload: profile.email })}>
            <FormLabel>Email</FormLabel>
            <FormInput
              containerStyle={styles.input}
              value={profile.email}
              onChangeText={(email) => this.setState({ email })}
              editable={false}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Order')} activeOpacity={0.8} style={styles.historyBtn}>
            <Text style={{ color: 'white'}}>Lihat Riwayat Transaksi</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.logout()} activeOpacity={0.8}  style={styles.logoutBtn}>
            <Text style={{ color: 'white'}}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  SpinnerView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  topBar: {
    height: hp('8%'),
    borderBottomWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center'
  },
  topBarText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: hp('2.5%'),
  },
  avatarView: {
    alignSelf: 'center',
    marginTop: hp('2%')
  },
  input: {
    borderBottomColor: '#2980B9',
    borderBottomWidth: 0.5,
  },
  historyBtn: {
    backgroundColor: '#3498DB',
    padding: 10,
    marginHorizontal: 13,
    borderRadius: 5,
    marginTop: hp('3.5%'),
    alignItems: 'center'
  },
  logoutBtn: {
    backgroundColor: 'red',
    padding: 10,
    marginHorizontal: 13,
    borderRadius: 5,
    marginTop: hp('1.5%'),
    alignItems: 'center'
  }
})

export default Profile;