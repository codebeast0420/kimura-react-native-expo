import { StyleSheet } from "react-native";

export const cutString = (str, len) => {
    if (str.length <= len)
        return str;
    else
        return str.substring(0, len) + "...";
}


import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
console.log("width:");
console.log(width);

const guidelineBaseWidth = 428;
const guidelineBaseHeight = 926;

const horizontalScale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

export { horizontalScale, verticalScale, moderateScale };

export const css = StyleSheet.create({
    cont_intro: {
        width: horizontalScale(428),
        minHeight: '100vh',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#E1F0FB',
        fontFamily: 'Arial',
        position: 'relative',
        paddingBottom: horizontalScale(50),
    },
    cont_blue: {
        width: horizontalScale(428),
        minHeight: '100vh',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#2C92D2',
        fontFamily: 'Arial',
        position: 'relative',
    },
    cont_white_header: {
        width: horizontalScale(428),
        minHeight: '100vh',
        paddingTop: horizontalScale(199),
        paddingBottom: horizontalScale(119),
        marginLeft: 'auto',
        marginRight: 'auto',
        fontFamily: 'Arial',
        position: 'relative',
        backgroundColor: '#F6F9FC'
    },
    cont_white: {
        width: horizontalScale(428),
        minHeight: '100vh',
        paddingBottom: horizontalScale(119),
        marginLeft: 'auto',
        marginRight: 'auto',
        fontFamily: 'Arial',
        position: 'relative',
        backgroundColor: '#F6F9FC'
    },
    cont_white_full: {
        width: horizontalScale(428),
        minHeight: '100vh',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontFamily: 'Arial',
        position: 'relative',
        backgroundColor: '#F6F9FC',
    },
    btn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: horizontalScale(5),
    },
    btn_yellow: {
        width: horizontalScale(300),
        height: horizontalScale(52),
        color: 'white',
        fontSize: horizontalScale(16),
        backgroundColor: '#F0BC08',
        borderRadius: horizontalScale(5),
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    ttl: {
        fontSize: horizontalScale(28),
        color: 'white',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    dsc: {
        fontSize: 15.5,
        color: '#E1FA08',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    input: {
        color: 'white',
        fontSize: horizontalScale(18),
        width: horizontalScale(300),
        height: horizontalScale(60),
        paddingLeft: horizontalScale(23),
        backgroundColor: '#ffffff33',
        borderRadius: horizontalScale(5),
        marginLeft: 'auto',
        marginRight: 'auto',
    },

    input_multi: {
        color: 'white',
        fontSize: horizontalScale(18),
        width: horizontalScale(300),
        height: horizontalScale(120),
        paddingLeft: horizontalScale(10),
        paddingTop: horizontalScale(10),
        backgroundColor: '#ffffff33',
        borderRadius: horizontalScale(5),
        marginLeft: 'auto',
        marginRight: 'auto',
    },
});