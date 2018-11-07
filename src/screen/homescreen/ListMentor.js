import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar, Rating } from 'react-native-elements';
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default class ListMentor extends Component {
  renderCardMentor(mentor) {
    return mentor.map((mentor)=> {
      return (
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Mentor', { mentor })} activeOpacity={0.6} style={styles.CardMentor}>
          <Avatar
            source={{ uri: mentor.photo }}
            rounded
            large
            containerStyle={{ marginRight: wp('5%') }}
          />
          <View>
            <View>
              <Text style={styles.name}>{mentor.nama}</Text>
              <Text>{mentor.phone}</Text>
            </View>
            <Rating 
              startingValue={mentor.rating}
              type='star'
              readonly
              imageSize={20}
            />
          </View>
        </TouchableOpacity>
      )
    })
  }

  render(){
    const { mentor } = this.props.navigation.state.params;
    return(
      <View style={styles.container}>
        {this.renderCardMentor(mentor)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  CardMentor: {
    padding: hp('1.5%'),
    borderWidth: 0.5,
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row',
    borderColor: '#3498DB',
    borderRadius: 10,
  },
  name: {
    fontSize: hp('2.5%'),
    fontFamily: 'OpenSans-Bold'
  }
})