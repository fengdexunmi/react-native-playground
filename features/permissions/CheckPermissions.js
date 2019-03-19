import React, { Component } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    Button,
    PermissionsAndroid
} from 'react-native';

export default class CheckPermissions extends React.Component {

    static navigationOptions = {
        title: 'Location',
    };

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            searching: false,
            location: null,
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async checkLocationPermission() {
        try {
            const granted = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            if (granted == PermissionsAndroid.RESULTS.GRANTED) {

            } else {
                // Need request permission of location
                this.requestionLocationPermission();
            }
        } catch (error) {
            console.warn(err);
        }
    }

    async getCurrentPosition() {
        this.setState({ searching: true });
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log(position.coords.latitude);
                console.log(position.coords.longitude);
                if (this._isMounted) {
                    this.setState({
                        location: position,
                        searching: false
                    });
                }
            },
            error => {
                console.log(error);
                this.setState({ searching: false });
            },
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
        );
    }

    async requestionLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            if (granted == PermissionsAndroid.RESULTS.GRANTED) {
                this.getCurrentPosition();
            } else {
                console.log('User rejects permission');
            }
        } catch (error) {
            console.warn(error);
        }
    }

    render() {
        if (this.state.searching) {
            return (
                <View style={{ marginTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }

        if (this.state.location) {
            return (
                <View style={styles.container}>
                    <Text>Latitude: {this.state.location.coords.latitude}</Text>
                    <Text>Longitude: {this.state.location.coords.longitude}</Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={this.checkLocationPermission.bind(this)}
                        title='Check location permission'>
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    buttonContainer: {
        marginTop: 20
    }
});