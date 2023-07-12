
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import { css, horizontalScale, verticalScale, moderateScale } from '../style';
const CheckBox2 = (props) => {
    return (
        <View style={styles.box} onStartShouldSetResponder={props.onPress}>
            <Text style={styles.txt}>{props.txt}</Text>
            <View style={styles.outline}>
                {props.checked ? <View style={styles.checkmark}></View> :  null}
            </View>
        </View>
    );
};

export default CheckBox2;

const styles = StyleSheet.create({
    box: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    txt: {
        color: '#172B4D',
        fontSize: '15rem',
        marginRight: '5rem',
    },
    outline:{
        borderRadius: '6rem',
        border: '2px solid #7764E4',
        position: 'relative',
        width: '30rem',
        height: '30rem',
    },
    checkmark: {
        border: '3px solid #7764E4',
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        rotate: '-45deg',
        position: 'absolute',
        width: '18rem',
        height: '10rem',
        top: '5rem',
        left: '4rem',
    },
});