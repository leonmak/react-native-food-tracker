/**
 * Created by Mak on 25/6/17.
 */
import React from 'react';
import { uploadImageAsync, annotate } from '../utils/image';
import { getFoodsFromAnnotations } from '../utils/food';
import { getFoodRef } from '../utils/firebase';
import { goToTab } from '../redux/router';

import {
  ActivityIndicator, Button, Clipboard,
  Image, Share, StatusBar, StyleSheet,
  Text, View, ScrollView,
} from 'react-native';

import { ImagePicker } from 'expo';

export default class UploadImage extends React.Component {
  state = {
    image: null,
    uploading: false,
  }

  render() {
    let { image } = this.state;

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 20, marginBottom: 20, textAlign: 'center', marginHorizontal: 15}}>
          Example: Upload ImagePicker result
        </Text>

        <Button onPress={this._pickImage} title="Pick an image from camera roll" />

        <Button onPress={this._takePhoto} title="Take a photo" />

        { this._maybeRenderImage() }
        { this._maybeRenderUploadingOverlay() }

        <StatusBar barStyle="default" />
      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View style={[StyleSheet.absoluteFill, {backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center'}]}>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  }

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <ScrollView style={{
        marginTop: 30,
        width: 250,
        borderRadius: 3,
        elevation: 2,
        shadowColor: 'rgba(0,0,0,1)',
        shadowOpacity: 0.2,
        shadowOffset: {width: 4, height: 4},
        shadowRadius: 5,
      }}>
        <View style={{borderTopRightRadius: 3, borderTopLeftRadius: 3, overflow: 'hidden'}}>
          <Image
            source={{uri: image}}
            style={{width: 250, height: 250}}
          />
        </View>

        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={{paddingVertical: 10, paddingHorizontal: 10}}>
          {image}
        </Text>
      </ScrollView>
    );
  }

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  }

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  }

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4,3]
    });

    this._handleImagePicked(pickerResult);
  }

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4,3]
    });

    this._handleImagePicked(pickerResult);
  }

  _uploadFoods = (foods) => {
    const foodRef = getFoodRef();
    const uploads = foods.map(food => foodRef.push({
      name: food.shortName,
      time: Date.now().valueOf(),
      done: false,
    }))
    Promise.all(uploads).then(() => {
      goToTab('track', this.props.navigation);
      this.setState({image: null})
    })
  }

  _handleImagePicked = async (pickerResult) => {
    let uploadResponse, uploadResult, annotations;

    try {
      this.setState({uploading: true});

      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        uploadResult = await uploadResponse.json();
        this.setState({image: uploadResult.secure_url});
        annotations = await annotate(uploadResult.url);
        this._uploadFoods(getFoodsFromAnnotations(annotations));
      }
    } catch(e) {
      console.log({e});
      alert('Upload failed.');
    } finally {
      console.log(uploadResponse);
      console.log(uploadResult);
      this.setState({uploading: false});
    }
  }
}
