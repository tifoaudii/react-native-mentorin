import React, { Component } from 'react';
import { Platform } from 'react-native';
import firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';

const { Blob } = RNFetchBlob.polyfill;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const AuthContext = React.createContext();

class AuthController extends Component {

	state = {
		isLoading: false,
		error: '',
		orders: [],
		profile: {}
	}

	updateErrorMessage(error) {
		this.setState({ error });
	}

	fetchUserProfile = async () => {
		const { currentUser } = firebase.auth();
		this.setState({ isLoading: true });
		console.log(currentUser)
		const database = firebase.database().ref(`/user/${currentUser.uid}`);
		await database.on('value', (value) => {
			console.log(value.val());
			this.setState({ profile: value.val(), isLoading: false });
		});
	}

	register = async (user) => {
		this.setState({
			isLoading: true,
			error: false
		});
		const { email, password, name, phone } = user;

		try {
			await firebase.auth().createUserWithEmailAndPassword(email, password);
			const newUser = await firebase.database().ref('/user').push();
			newUser.set({
				name,
				email,
				phone,
				photo: ""
			});
			this.login(email, password);
		} catch (err) {
			console.log(err);
			this.setState({
				error: 'register gagal, coba lagi',
				isLoading: false
			});
		}
	}

	login = async (email, password) => {
		this.setState({
			isLoading: true,
			error: false
		});

		try {
			await firebase.auth().signInWithEmailAndPassword(email, password);
			this.setState({
				isLoading: false,
				error: false
			});
		} catch (err) {
			console.log(err);
			this.setState({
				error: err.code,
				isLoading: false
			});
		}
	}

	fetchOrder = async () => {
		this.setState({ isLoading: true });

		const { currentUser } = firebase.auth();
		const database = firebase.database().ref(`/user/${currentUser.uid}/mentors`);
		await database.on('value', (value) => {
			const order = Object.entries(value.val()).map(value => Object.assign({}, { key: value[0] }, value[1]));

			this.setState({ orders: order, isLoading: false })
		});
	}

	updateProfile = async (payload) => {
		this.setState({ isLoading: true });
		const updateProfile = {};
		updateProfile[`${payload.type}`] = payload.value;

		const { currentUser } = firebase.auth();
		const property = await firebase.database().ref(`/user/${currentUser.uid}`);
		property.update(updateProfile).then(() => {
			this.setState({ isLoading: false })
		});
	}

	updateProfilePicture = async (image) => {
		const { currentUser } = firebase.auth();
		await firebase.database().ref(`/user/${currentUser.uid}`).update({ photo: image }).then(() => {
			console.log('success')
		}).catch((err)=>{
			console.log(err);
		})
	}

	uploadImage = (uri, mime = 'application/octet-stream') => {
		console.log(uri);
		return new Promise((resolve, reject) => {
			const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
      let uploadBlob = null

      const imageRef = firebase.storage().ref('images').child('image_001')

      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
					resolve(url)
					this.updateProfilePicture(uri)
        })
        .catch((error) => {
          reject(error)
      })
		});
	}

	handlePictureChange = () => {
		ImagePicker.showImagePicker((response) => {
			if (!response.didCancel) {
				this.uploadImage(response.uri)
			}
		});
	}

	render() {
		return (
			<AuthContext.Provider
				value={{
					login: this.login,
					error: this.state.error,
					isLoading: this.state.isLoading,
					updateError: this.updateErrorMessage,
					register: this.register,
					fetchOrder: this.fetchOrder,
					orders: this.state.orders,
					fetchUserProfile: this.fetchUserProfile,
					profile: this.state.profile,
					updateProfile: this.updateProfile,
					handlePictureChange: this.handlePictureChange
				}}
			>
				{this.props.children}
			</AuthContext.Provider>
		)
	}
}

const AuthConsumer = AuthContext.Consumer;

export { AuthController, AuthConsumer, AuthContext };
