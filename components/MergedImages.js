import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default class MergedImages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cameraSourceLeft: null,
      cameraSourceRight: null
    };
  }

  // shouldComponentUpdate(nextProps) {
  //       this.setState({
  //         cameraSourceLeft: nextProps.cameraSourceLeft,
  //         cameraSourceRight: nextProps.cameraSourceRight
  //       });
  // }

  // shouldComponentUpdate() {
  //   setTimeout(() => {
  //     this.forceUpdate();
  //   }, 0);
  // }

  render() {
    return (
      <View style={styles.filter}>

      <Surface width={400} height={308} style={styles.photos}>
                  <Amaro>
                    <GLImage
                      source={this.state.cameraSourceLeft}
                      imageSize={{ width: 1000, height: 1200 }}
                      resizeMode="cover"
                      />

                      <GLImage
                        source={this.state.cameraSourceRight}
                        imageSize={{ width: 1000, height: 1200 }}
                        resizeMode="cover"
                        />

                  </Amaro>
              </Surface>
      </View>
    );
  };
}


const styles = StyleSheet.create({
  filter: {
    height: 310,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5
  }
});

AppRegistry.registerComponent('MergedImages', () => MergedImages);
