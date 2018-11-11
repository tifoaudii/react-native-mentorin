import React, { Component } from 'react';
import { View,Text,StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Rating } from 'react-native-elements';
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default class Mentor extends Component {
  renderSchedule(jadwal){
    return jadwal.split(',').map((jadwal, i)=> {
      return (
        <Text
         key={i}
         style={{ marginRight: wp('3%'), fontSize: hp('2.5%'), fontFamily: 'OpenSans-Light', color: 'black' }}
        >
          {jadwal}
        </Text>
      )
    })
  };

  render(){
    const { 
      container, 
      avatar, 
      profileDetail, 
      profileText, 
      descriptionDetail, 
      scheduleView, 
      descriptionText, 
      orderBtn, 
      orderBtnText 
    } = styles;
    const { mentor } = this.props.navigation.state.params;
    return (
      <ScrollView style={container}>
        <View style={profileDetail}>
          <Image 
            source={{ uri: mentor.photo }}
            style={avatar}
          />
          <View>
            <Text style={profileText}>{mentor.nama}</Text>
            <Text style={profileText}>{mentor.phone}</Text>
            <Text style={profileText}>IDR {mentor.harga}</Text>
            <Rating 
              startingValue={mentor.rating}
              type='star'
              readonly
              imageSize={20}
            />
          </View>
        </View>
        <View style={descriptionDetail}>
          <Text style={profileText}>Tentang Saya</Text>
          <Text style={descriptionText}>{mentor.description}</Text>
        </View>
        <View style={descriptionDetail}>
          <Text style={profileText}>Jadwal Mengajar</Text>
          <View style={scheduleView}>{this.renderSchedule(mentor.hari)}</View>
        </View>
        <View>
          <Text style={profileText}>Pesan Mentor</Text>
          <Text style={descriptionText}>Cocok dengan Mentor ini ? Tekan tombol di bawah ini untuk memesan pelatihan dengan Mentor ini</Text>
        </View>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Payment', { mentor })} activeOpacity={0.6} style={orderBtn}>
          <Text style={orderBtnText}>Pesan Mentor</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
  },
  avatar: {
    height: hp('20%'),
    width: wp('45%'),
    borderRadius: 20,
    marginRight: wp('4%')
  },
  profileDetail: {
    flexDirection: 'row',
    paddingBottom: hp('2%'),
    borderBottomWidth: 0.5,
    marginBottom: hp('2%')
  },
  profileText: {
    fontSize: hp('2.5%'),
    fontFamily: 'OpenSans-SemiBold',
    color: 'black',
    marginBottom: hp('1%')
  },
  descriptionDetail: {
    paddingBottom: hp('2%'),
    borderBottomWidth: 0.5,
    marginBottom: hp('2%')
  },
  scheduleView: {
    flexDirection: 'row',
  },
  descriptionText: {
    fontSize: hp('2%'),
    fontFamily: 'OpenSans-Regular'
  },
  orderBtn: {
    marginVertical: hp('3.5%'),
    padding: hp('1.5%'),
    backgroundColor: '#3498DB',
    borderRadius: 25
  },
  orderBtnText: {
    fontSize: hp('2%'),
    color: 'white',
    textAlign: 'center'
  }
});