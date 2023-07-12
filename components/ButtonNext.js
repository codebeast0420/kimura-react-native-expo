import { StyleSheet, View, Image, Text } from "react-native";

import { css, horizontalScale, verticalScale, moderateScale } from '../style';
const styles = StyleSheet.create({
    cont: {
        display: 'flex',
        alignItems: 'center',
        width: horizontalScale(65),
        cursor:"pointer"
    },
    btn_next: {
        width: horizontalScale(65),
        height: horizontalScale(65),
    },
    txt: {
        color: 'white',
        fontSize: horizontalScale(14),
        marginTop: horizontalScale(12),
    }
});

export default function ButtonNext(props) {
    return(
        <View style={styles.cont} {...props}>
            <Image source={props.img} style={styles.btn_next} />
            <Text style={styles.txt}>{props.txt}</Text>
        </View>
    )
};