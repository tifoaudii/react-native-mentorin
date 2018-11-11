import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, ActivityIndicator } from 'react-native';
import { FormInput } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { AuthContext } from '../../controller/AuthController';

export default class EditProfile extends Component {

  static contextType = AuthContext;

  state = {
    payload: this.props.navigation.state.params.profile.payload
  }

  handleChanges = () => {
    const { profile } = this.props.navigation.state.params;
    this.context.updateProfile({ type: profile.type, value: this.state.payload });
    this.props.navigation.navigate('Profile');
  }

  renderSpinner(){
    const { isLoading } = this.context;
    if(isLoading) {
      return <ActivityIndicator size='small' color='white' />
    }
    return (
      <Text style={{ color: 'white' }}>Simpan Perubahan</Text>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.topBarText}>Edit Profile</Text>
        </View>
        <FormInput
          value={this.state.payload}
          onChangeText={(value) => this.setState({ payload: value })}
          autoFocus={true}
          containerStyle={styles.input}
          on
        />
        <TouchableOpacity onPress={()=>this.handleChanges()} style={styles.saveBtn}>
          {this.renderSpinner()}
        </TouchableOpacity>
      </View>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 5
  },
  topBar: {
    height: hp('8%'),
    borderBottomWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  saveBtn: {
    padding: 10,
    backgroundColor: '#3498DB',
    alignItems: 'center',
    marginTop: 13,
    marginHorizontal: 18,
    borderRadius:5
  }
})
