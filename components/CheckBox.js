import { StyleSheet, Text, View, Pressable } from "react-native";

import { css, horizontalScale, verticalScale, moderateScale } from '../style';
const CheckBox = (props) => {
    return (
        <Pressable onPress={props.onPress}>
            <View style={styles.box} >
                <View style={[styles.outline, props.checked && styles.outline_checked, props.disabled && styles.outline_disabled]}>
                    {props.checked ? <View style={styles.checkmark}></View> : null}
                </View>
                <Text style={styles.txt}>{props.txt}</Text>
            </View>
        </Pressable>
        
    );
};

export default CheckBox;

const styles = StyleSheet.create({
    box: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    txt: {
        color: '#fff',
        fontSize: horizontalScale(14),
        marginLeft: horizontalScale(5),
    },
    outline:{
        borderRadius: horizontalScale(6),
        borderWidth: horizontalScale(2),
        borderColor: '#2699FB',
        backgroundColor: '#fff',
        position: 'relative',
        width: horizontalScale(30),
        height: horizontalScale(30),
    },
    outline_checked:{
        borderRadius: horizontalScale(6),
        backgroundColor: '#2699FB',
        position: 'relative',
        width: horizontalScale(30),
        height: horizontalScale(30),
    },
    outline_disabled:{
        borderColor: 'transparent',
        backgroundColor: 'transparent',
    },
    checkmark: {
        border: '3px solid white',
        borderTopWidth: horizontalScale(0),
        borderRightWidth: horizontalScale(0),
        rotate: '-45deg',
        position: 'absolute',
        width: horizontalScale(18),
        height: horizontalScale(10),
        top: horizontalScale(5),
        left: horizontalScale(4),
    },
});