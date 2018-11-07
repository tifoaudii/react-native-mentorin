import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { MentorContext } from '../../controller/MentorController';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Images = [
  "http://images1.rri.co.id/thumbs/berita_565248_800x600_by_ndtv_sports__emilia.jpeg",
  "https://hmsportal.org/wp-content/uploads/2018/03/badminton.jpg",
  "https://sportshub.cbsistatic.com/i/r/2018/02/17/a3899e50-50b6-402a-979f-43fd3ca207b2/thumbnail/770x433/c7907fc8918be00c6c98f20a053bd44b/kentucky-alabama.jpg",
  "https://www.melvillecity.com.au/CityOfMelville/media/Images/Content-Page-Thumbnails/gym-and-PT.jpg",
  "http://1.bp.blogspot.com/-YMTGjr8IErE/Vh4H5GNdFfI/AAAAAAAAAsM/Kxo2mbGzwMQ/s1600/532%2BPesilat%2BIkuti%2BKejurnas%2BPencak%2BSilat%2BAntar%2BPT.jpg",
  "https://i0.wp.com/urusandunia.com/wp-content/uploads/2016/04/macam-macam-gaya-renang-utama.jpg?fit=800%2C417&ssl=1",
  "https://cdns.klimg.com/bola.net/library/upload/21/2018/03/mengintip-kompleks-l_82b0801.jpg",
  "http://www.webdo.tn/wp-content/uploads/2016/06/World-League.jpg"
]

class Home extends Component {
  static contextType = MentorContext;

  componentDidMount() {
    this.context.fetchMentor();
  }

  renderCourse() {
    const { course } = this.context;
    return course.map((course, index) => {
      console.log(course.mentor);
      return (
        <TouchableOpacity
          activeOpacity={0.6}
          key={index}
          onPress={()=>this.props.navigation.navigate('ListMentor', { mentor: course.mentor })}
        >
          <ImageBackground
            source={{ uri: Images[index] }}
            style={styles.BackgroundImg}
            imageStyle={{ borderRadius: 18, opacity: 0.6 }}
          >
            <Text style={styles.TextImage}>{course.key}</Text>
          </ImageBackground>
        </TouchableOpacity>
      )
    })
  }

  render() {
    const { Container, SpinnerView, CardView } = styles;
    const { isLoading } = this.context;
    if (isLoading) {
      return (
        <View style={SpinnerView}>
          <ActivityIndicator color='blue' size='large' />
        </View>
      )
    }
    return (
      <View style={Container}>
        <View style={CardView}>
          {this.renderCourse()}
        </View>
      </View>
    )
  };
}

const styles = StyleSheet.create({
  CardView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  Container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center'
  },
  SpinnerView: {
    flex: 1,
    justifyContent: 'center'
  },
  BackgroundImg: {
    width: wp('44%'),
    height: hp('16%'),
    marginHorizontal: 5,
    marginTop: 14,
    backgroundColor: 'black',
    borderRadius: 18,
    justifyContent: 'center'
  },
  TextImage: {
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
    color: 'white',
    textAlign: 'center'
  }
})

export default Home;