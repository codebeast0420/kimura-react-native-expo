import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';

import { css, horizontalScale, verticalScale, moderateScale } from '../../style';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

const AnimCircle = props => {
    const zoom = useRef(new Animated.Value(1)).current; // Initial value for opacity: 0
    useEffect(() => {
        setTimeout(() => {Animated.loop(
            Animated.sequence([
                Animated.timing(zoom, {
                    toValue: 1.75,
                    duration: 900,
                }),
                Animated.timing(zoom, {
                    toValue: 1,
                    duration: 900,
                })
            ])
        ).start();
        }, props.delay);
        
    }, [zoom]);

    return (
        <Animated.View // Special animatable View
            style={{
                ...props.style,
                scale: zoom, // Bind opacity to animated value
            }}>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    box: {
        marginTop: horizontalScale(158),
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative',
        width: horizontalScale(100),
        height: horizontalScale(100),
    },
    circle: {
        position: 'absolute',
        width: horizontalScale(12),
        height: horizontalScale(12),
        backgroundColor: '#2C92D2',
        borderRadius: '50%',
    },
    circle0: {
        top: horizontalScale(0),
        left: horizontalScale(37),
    },
    circle1: {
        top: horizontalScale(10),
        left: horizontalScale(63),
    },
    circle2: {
        top: horizontalScale(30),
        left: horizontalScale(79),
    },
    circle3: {
        top: horizontalScale(53),
        left: horizontalScale(73),
    },
    circle4: {
        top: horizontalScale(70),
        left: horizontalScale(55),
    },
    circle5: {
        top: horizontalScale(73),
        left: horizontalScale(30),
    },
    circle6: {
        top: horizontalScale(60),
        left: horizontalScale(8),
    },
    circle7: {
        top: horizontalScale(35),
        left: horizontalScale(0),
    },
    circle8: {
        top: horizontalScale(10),
        left: horizontalScale(10),
    },
    txt_en: {
        fontSize: horizontalScale(28),
        color: '#2C92D2',
        marginTop: horizontalScale(88),
        textAlign: 'center',
        fontWeight: horizontalScale(600),
    },
    txt_jp: {
        marginTop: horizontalScale(7),
        textAlign: 'center',
        fontSize: horizontalScale(15),
    }
});

export default function LoadingPage(props) {
    const array = Array.from(Array(9).keys()).map(el=>'circle'+el);
    return (
        <View style={css.cont_white_header}>
            <Header />
            <View style={styles.box}>
                {array.map((item, index) =>
                    <AnimCircle style={{...styles.circle, ...styles[item]}} delay={index*200}>
                    </AnimCircle>
                )}
            </View>
            <Text style={styles.txt_en}>Loading</Text>
            <Text style={styles.txt_jp}>求人を読み込んでいます</Text>
            <Footer num={1} {...props}/>
        </View>
    );
}
