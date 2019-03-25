import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import AdvanceSwiper from '../AdvanceSwiper';

const styles = {
    wrapper: {
        backgroundColor: '#009688',
        flex: 1,
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e91e63',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#673ab7',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3f51b5',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
};

export default () => <AdvanceSwiper
    style={styles.wrapper}
    paginationStyle={{ container: { backgroundColor: 'transparent' } }}
    paginationLeft={''}
    paginationRight={''}
    smoothTransition
    stack
    dragDownToBack
    dragY
>
    <View style={styles.slide1}>
        <Text style={styles.text}>Hello Swiper</Text>
    </View>
    <View style={styles.slide2}>
        <Text style={styles.text}>Awesome</Text>
    </View>
    <View style={styles.slide3}>
        <Text style={styles.text}>And simple</Text>
    </View>
    <View style={styles.slide2}>
        <Text style={styles.text}>This is a test slide</Text>
    </View>
    <View style={styles.slide1}>
        <Text style={styles.text}>Isn&apos;t this just mind blowing?</Text>
    </View>
    <View style={styles.slide3}>
        <Text style={styles.text}>Check it Out</Text>
    </View>
</AdvanceSwiper>;