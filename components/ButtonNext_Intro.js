import { StyleSheet, View, Image } from "react-native";

import { css, horizontalScale, verticalScale, moderateScale } from '../style';

const styles = StyleSheet.create({
    cont: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: horizontalScale(164),
    },
    box_dot: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: horizontalScale(100),
    },
    dot: {
        width: horizontalScale(17),
        height: horizontalScale(17),
        borderRadius: '100%',
        backgroundColor: '#C7C7C7',
    },
    dot_active: {
        backgroundColor: '#7364FF',
    },
    btn_next: {
        width: horizontalScale(65),
        height: horizontalScale(65),
        marginLeft: horizontalScale(58),
    },
});

export default function ButtonNext(props) {
    return(
        <View style={styles.cont}>
            <View style={styles.box_dot}>
                <View style={[styles.dot, props.num==1 && styles.dot_active]} />
                <View style={[styles.dot, props.num==2 && styles.dot_active]} />
                <View style={[styles.dot, props.num==3 && styles.dot_active]} />
            </View>
            <Image source={props.img} style={styles.btn_next} />
        </View>
    )
};