import React from 'react';
import Carousel from 'react-native-snap-carousel';

export default class MyCarousel extends React.Component {

    static navigationOptions = {
        title: "MyCarousel",
    };

    constructor(props) {
        super(props);
        this.state = {
            entries: 1
        }
    }

    _renderItem({ item, index }) {
        return (
            <View>
                <Text>{item.title}</Text>
            </View>
        );
    }

    render() {
        return (
            <Carousel
                ref={(c) => {
                    this._carousel = c;
                }}
                data={this.state.entries}
                renderItem={this._renderItem}
                sliderWidth={120}
                itemWidth={80}
            />
        );
    }
}