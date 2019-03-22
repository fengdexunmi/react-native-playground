import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    Keyboard
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Icon from "react-native-vector-icons/Ionicons";

const LIST_ITEMS = [
    'Development',
    'Business',
    'IT & Software',
    'Office Productivity',
    'Personal Development',
    'Design',
    'Marketing',
    'LifeStyle',
    'Photography',
    'Health & Fitness',
    'Teacher Training',
    'Music'
]

class SearchBar extends Component {
    state = {
        searchBarFoucused: false
    };

    componentDidMount() {
        this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    }

    keyboardDidShow = () => {
        this.setState({ searchBarFoucused: true });
    }

    keyboardWillShow = () => {
        this.setState({ searchBarFoucused: true });
    }

    keyboardWillHide = () => {
        this.setState({ searchBarFoucused: false });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: 80, backgroundColor: '#c45653', justifyContent: 'center', paddingHorizontal: 5 }}>
                    <Animatable.View animation='slideInRight' duration={500} style={{ height: 50, backgroundColor: 'white', flexDirection: 'row', padding: 5, alignItems: 'center' }}>
                        <Animatable.View animation={this.state.searchBarFoucused ? 'fadeInleft' : 'fadeInRight'} duration={400}>
                            <Icon name={this.state.searchBarFoucused ? "md-arrow-back" : "navicon"} style={{ fontSize: 24 }} />
                        </Animatable.View>
                        <TextInput placeholder='Search' style={{ fontSize: 24, marginLeft: 15, flex: 1 }} />
                    </Animatable.View>
                </View>
                <FlatList
                    style={{ backgroundColor: this.state.searchBarFoucused ? 'rgba(0, 0,0,0.3)' : 'white' }}
                    data={LIST_ITEMS}
                    renderItem={({ item }) => <Text style={{ padding: 20, fontSize: 20 }}>{item}</Text>}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

export default SearchBar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});