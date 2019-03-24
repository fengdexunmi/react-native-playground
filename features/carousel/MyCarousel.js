import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default class MyCarousel extends React.Component {
  static navigationOptions = {
    title: "MyCarousel"
  };

  constructor(props) {
    super(props);
    this.state = {
      entries: [
        { title: "Hello" },
        { title: "Hello" },
        { title: "Hello" },
        { title: "World" },
        { title: "World" },
        { title: "World" }
      ]
    };
  }

  _renderItem({ item, index }) {
    return (
      <View style={styles.slider}>
        <Text>{item.title}</Text>
      </View>
    );
  }

  render() {
    return (
      <Carousel
        ref={c => {
          this._carousel = c;
        }}
        data={this.state.entries}
        renderItem={this._renderItem}
        sliderWidth={SCREEN_WIDTH}
        sliderHeight={200}
        itemWidth={SCREEN_WIDTH / 2}
        layout="tinder"
      />
    );
  }
}

const styles = StyleSheet.create({
  slider: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "tomato",
    height: 200
  }
});
