import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Avatar, Rating } from 'react-native-elements';
import { AuthContext } from '../../controller/AuthController';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

class Order extends Component {
  static contextType = AuthContext;

  componentDidMount() {
    this.context.fetchOrder();
  }

  renderOrder() {
    const { orders } = this.context;
    return orders.map((order, i) => {
      return (
        <TouchableOpacity key={i} activeOpacity={0.6} style={styles.CardMentor}>
          <Avatar
            source={{ uri: order.photo }}
            rounded
            large
            containerStyle={{ marginRight: wp('5%') }}
          />
          <View>
            <View>
              <Text style={styles.name}>{order.nama}</Text>
              <Text>{order.phone}</Text>
            </View>
            <Rating
              startingValue={order.rating}
              type='star'
              readonly
              imageSize={20}
            />
          </View>
        </TouchableOpacity>
      )
    })
  }

  render() {
    const { isLoading } = this.context;
    if (isLoading) {
      return (
        <View style={styles.SpinnerView}>
          <ActivityIndicator color='blue' size='large' />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.topBarText}>Riwayat Transaksi</Text>
        </View>
        <ScrollView>
          {this.renderOrder()}
        </ScrollView>
      </View>
    )
  };
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
  },
  SpinnerView: {
    flex: 1,
    justifyContent: 'center'
  },
  topBar: {
    height: hp('8%'),
    borderBottomWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  topBarText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: hp('2.5%'),
  },
})

export default Order;