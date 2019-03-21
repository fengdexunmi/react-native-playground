import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducer";
import Timer from "./components/Timer";

let store = createStore(reducer);

console.log(store.getState());

export default class Pomodoro extends React.Component {

    static navigationOptions = {
        title: 'Pomodoro',
    };

    render() {
        return (
            <Provider store={store}>
                <Timer />
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center"
    }
});
