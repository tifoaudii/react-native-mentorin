import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import ImagePicker from 'react-native-image-picker';
import { Icon } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { MentorContext } from '../../controller/MentorController';
import { StackActions, NavigationActions } from 'react-navigation';

export default class Payment extends Component {

  static contextType = MentorContext;

  state = {
    visibleModal: false
  }

  setModalVisible(visible) {
    this.setState({ visibleModal: visible });
  }

  onCancelOrder() {
    this.setModalVisible(false);
    this.props.navigation.navigate('Home')
  }

  renderSpinner() {
    const { isLoading } = this.context;
    if (isLoading) {
      return <ActivityIndicator size='large' />
    }

    return (
      <Icon
        type='materialicons'
        name='add-a-photo'
        size={hp('10%')}
      />
    )
  }

  onFinishingOrdering(){
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })]
    });
    this.props.navigation.dispatch(resetAction);
  }

  onImageUpload(mentor) {
    const { uploadPaymentProve } = this.context;
    ImagePicker.showImagePicker((response) => {
      if (!response.didCancel) {
        const status = uploadPaymentProve(mentor);
        if(status){
          this.onFinishingOrdering();
        }
      }
    });
  }

  renderDialog() {
    return (
      <Dialog
        visible={this.state.visibleModal}
      >
        <DialogContent style={styles.dialogContent}>
          <Text style={styles.dialogTitle}>Anda yakin ingin membatalkan pesanan?</Text>
          <View style={styles.dialogBtnView}>
            <TouchableOpacity onPress={() => this.onCancelOrder()} style={styles.dialogBtn}>
              <Text style={styles.dialogBtnText}>Ya</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setModalVisible(false)} style={styles.dialogBtn}>
              <Text style={styles.dialogBtnText}>Batal</Text>
            </TouchableOpacity>
          </View>
        </DialogContent>
      </Dialog>
    )
  }
  render() {
    const { mentor } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Text style={styles.paymentText}>Lakukan Pembayaran</Text>
        <Image
          source={{ uri: "https://upload.wikimedia.org/wikipedia/id/0/0c/Logo_BTPN.png" }}
          style={styles.paymentImage}
          resizeMode='contain'
        />
        <Text style={styles.paymentText}>90011920129</Text>
        <Text style={styles.paymentName}>A.n  {mentor.nama}</Text>
        <View style={styles.paymentPriceView}>
          <Text style={styles.paymentPriceTotal}>Total</Text>
          <Text style={styles.paymentPriceNominal}>IDR {mentor.harga}</Text>
        </View>
        <View style={styles.paymentProve}>
          <Text style={styles.paymentPriceTotal}>Silahkan unggah bukti pembayaran</Text>
          <TouchableOpacity onPress={() => this.onImageUpload(mentor)} style={styles.uploadIconView} >
            {this.renderSpinner()}
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => this.setModalVisible(true)} style={styles.cancelBtnView}>
          <Text style={styles.cancelBtnText}>Batal Pesan</Text>
        </TouchableOpacity>
        {this.renderDialog()}
      </View>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  paymentText: {
    fontSize: hp('2.5%'),
    fontFamily: 'OpenSans',
    alignSelf: 'center',
    marginTop: hp('3.5%')
  },
  paymentImage: {
    width: wp('42%'),
    height: hp('12%'),
    alignSelf: 'center',
    marginTop: hp('3.5%')
  },
  paymentName: {
    fontSize: hp('2.5%'),
    fontFamily: 'OpenSans',
    alignSelf: 'center',
  },
  paymentPriceView: {
    alignSelf: 'center',
    marginTop: hp('8%')
  },
  paymentPriceTotal: {
    textAlign: 'center',
    fontSize: hp('2%'),
    fontFamily: 'OpenSans-Regular',
    marginBottom: hp('2%')
  },
  paymentPriceNominal: {
    textAlign: 'center',
    fontSize: hp('3%'),
    fontFamily: 'OpenSans-SemiBold',
  },
  paymentProve: {
    alignSelf: 'center',
    marginTop: hp('8%')
  },
  uploadIconView: {
    alignSelf: 'center'
  },
  uploadIcon: {
    width: wp('42%'),
    height: hp('12%'),
  },
  cancelBtnView: {
    backgroundColor: 'red',
    padding: hp('1.5%'),
    marginHorizontal: 10,
    borderRadius: 30,
    marginTop: hp('4.5%'),
  },
  cancelBtnText: {
    textAlign: 'center',
    fontFamily: 'OpenSans-Bold',
    color: 'white',
    fontSize: hp('2%')
  },
  dialogContent: {
    padding: 10,
    height: hp('20%'),
    width: wp('85%'),
  },
  dialogTitle: {
    fontSize: hp('2.5%'),
    fontFamily: 'OpenSans-Bold',
    textAlign: 'center'
  },
  dialogBtnView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10
  },
  dialogBtn: {
    padding: hp('2%'),
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 20
  },
  dialogBtnText: {
    fontSize: hp('2%')
  }
})