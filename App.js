import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Button
} from 'react-native';

import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Surface } from "gl-react-native";
import Layer from "./components/Layer";
const { Image: GLImage } = require("gl-react-image");

import ImagePicker from 'react-native-image-crop-picker';

import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import Amaro from './filters/Amaro.js';
import Earlybird from './filters/EarlyBird.js';
import Hudson from './filters/Hudson.js';
import Sierra from './filters/Sierra.js';
import Valencia from './filters/Valencia.js';
import Sepia from './filters/Sepia.js';
import Nothing from './filters/Nothing.js';
import FruitPunch from './filters/FruitPunch.js';
import GlitterMama from './filters/GlitterMama.js';

const filtersComponents = [
  Nothing,
  Amaro,
  Hudson,
  Sierra,
  Valencia,
  FruitPunch,
  GlitterMama
];


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      cameraSourceLeft: null,
      cameraSourceRight: null,
      selectedFilter: 0
    };
};

  changeFilter = (filter) => {
    this.setState({
      selectedFilter: filter
    });
  };

  onSwipeLeft(gestureState) {
    var selectedFilter2 = this.state.selectedFilter;
      if (selectedFilter2 == 6)
          selectedFilter2 = 0;
      else
          selectedFilter2++;
    this.changeFilter(selectedFilter2);
    console.log("Selected Filter in SwipeLeft: " + selectedFilter2);
  };

  onSwipeRight(gestureState) {
    var selectedFilter2 = this.state.selectedFilter;
      if (selectedFilter2 == 0)
          selectedFilter2 = 6;
      else
          selectedFilter2--;
    this.changeFilter(selectedFilter2);
    console.log("Selected Filter in SwipeRight: " + selectedFilter2);
  };

  selectPhotoTapped(whichPic) {

      ImagePicker.openCamera({
        width: 500,
        height: 500,
        cropping: true
      }).then(image => {
            console.log(image);

            let source = { uri: image.path };

            if (whichPic == "left") {
              this.setState({
                cameraSourceLeft: source
              });
            } else {
              this.setState({
                cameraSourceRight: source
              });
          }
      });

    };

    selectCameraRollTapped(whichPic) {

        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true
        }).then(image => {
          console.log(image);

          let source = { uri: image.path };

          if (whichPic == "left") {
            this.setState({
              cameraSourceLeft: source
            });
          } else {
            this.setState({
              cameraSourceRight: source
            });
        }
        });
      };

    showFilteredImage = (selectedFilter) =>
      {
          if (selectedFilter == 0) {

            return (
              <View style={styles.filter}>
                            <Image
                              source={this.state.cameraSourceLeft}
                              style={{ width: 400, height: 308, opacity: 0.5, position: 'absolute',
                                  top: 0, bottom: 0, left: 0, right: 0 }}
                              />
                              <Image
                                source={this.state.cameraSourceRight}
                                style={{ width: 400, height: 308, opacity: 0.5, position: 'absolute',
                                    top: 0, bottom: 0, left: 0, right: 0 }}
                                />
                </View>
            );

          } else {

            const FilteredComponent = filtersComponents[selectedFilter];
            return (
              <View style={styles.filter}>

              <Surface width={400} height={308} style={styles.photos}>
                          <FilteredComponent>
                            <GLImage
                              source={this.state.cameraSourceLeft}
                              imageSize={{ width: 1500, height: 1500 }}
                              resizeMode="cover"
                              />

                              <GLImage
                                source={this.state.cameraSourceRight}
                                imageSize={{ width: 1500, height: 1500 }}
                                resizeMode="cover"
                                />
                          </FilteredComponent>
                      </Surface>

                </View>
            );
        }
      };


  render() {
    const selectedFilter = this.state.selectedFilter;
    const filtersComponents = [
      Nothing,
      Amaro,
      Hudson,
      Sierra,
      Valencia,
      FruitPunch,
      GlitterMama
    ];

    return (
      <View style={styles.container}>

        <GestureRecognizer
                onSwipeLeft={(state) => this.onSwipeLeft(state)}
                onSwipeRight={(state) => this.onSwipeRight(state)} >

        <View>
              {this.showFilteredImage(selectedFilter)}
        </View>

        </GestureRecognizer>

              <View style={{backgroundColor: 'black', height:55, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Image style={{height:30, width:30}}
                  source={require('./assets/diana.jpeg')} />
              <Text style={{color: 'white', marginLeft:20}}>{ filtersComponents[selectedFilter].displayName }</Text>
              </View>

              <View style={styles.pic}>
                    <View>
                    { this.state.cameraSourceLeft === null ?
                      <View style={styles.leftPic} >
                          <Text style={styles.text}>Select a photo</Text>
                          <Icon name="camera-alt" size={50} color='white' onPress={this.selectPhotoTapped.bind(this,'left')} style={styles.iconCam} />
                          <Icon name="camera-roll" size={50} color='white' onPress={this.selectCameraRollTapped.bind(this,'left')} style={styles.iconRoll} />
                      </View>
                      :
                        <ImageBackground style={styles.leftPic} source={this.state.cameraSourceLeft} >
                            <Icon name="camera-alt" size={50} color='white' onPress={this.selectPhotoTapped.bind(this,'left')} style={styles.iconCam} />
                            <Icon name="camera-roll" size={50} color='white' onPress={this.selectCameraRollTapped.bind(this,'left')} style={styles.iconRoll} />
                        </ImageBackground>
                      }
                    </View>
                    <View>
                    { this.state.cameraSourceRight === null ?
                      <View style={styles.rightPic} >
                          <Text style={styles.text}>Select a photo</Text>
                          <Icon name="camera-alt" size={50} color='white' onPress={this.selectPhotoTapped.bind(this,'right')} style={styles.iconCam} />
                          <Icon name="camera-roll" size={50} color='white' onPress={this.selectCameraRollTapped.bind(this,'right')} style={styles.iconRoll} />
                      </View>
                      :
                        <ImageBackground style={styles.rightPic} source={this.state.cameraSourceRight} >
                            <Icon name="camera-alt" size={50} color='white' onPress={this.selectPhotoTapped.bind(this,'right')} style={styles.iconCam} />
                            <Icon name="camera-roll" size={50} color='white' onPress={this.selectCameraRollTapped.bind(this,'right')} style={styles.iconRoll} />
                        </ImageBackground>
                      }
                    </View>
                  </View>

            </View>
    );
  }
}

  const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  filter: {
    height: 310,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  photos: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pic: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftPic: {
    height:250,
    width:179,
    backgroundColor: 'black',
  },
  rightPic: {
    height:250,
    width:180,
    backgroundColor: 'black'
  },
  text: {
    color:'white',
    marginTop:100,
    marginLeft:40
  },
  iconCam: {
    position: 'absolute',
    bottom: 0,
    left: 20,
  },
  iconRoll: {
    position: 'absolute',
    bottom: 0,
    right: 20,
  },
  diana: {
    backgroundColor: 'black',
    height:55,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
