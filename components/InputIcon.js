import { StyleSheet, View, Image, TextInput } from "react-native";
import { ImageBackground } from "react-native-web";

import { css, horizontalScale, verticalScale, moderateScale } from '../style';
const styles = StyleSheet.create({
    cont: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: horizontalScale(300),
        height: horizontalScale(52),
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative',
    },
    icon: {
        position: 'absolute',
        left: horizontalScale(23),
        width: horizontalScale(20),
        height: horizontalScale(20),
    },
    input: {
        color: 'white',
        fontSize: horizontalScale(18),
        width: horizontalScale(344),
        height: horizontalScale(60),
        paddingLeft: horizontalScale(57),
        backgroundColor: '#ffffff33',
        borderRadius: horizontalScale(5),
    },
});

export default function InputIcon(props) {
    return (
        <View style={styles.cont}>
            <Image source={props.icon} style={{...styles.icon, width:props.width}} />
            <TextInput
                style={styles.input}
                onChangeText={(text)=>props.onChangeText(text)}
                placeholder={props.placeholder}
                keyboardType = {props.keyboardType}
                secureTextEntry={props.secureTextEntry}
                value={props.value}
            />
        </View>
    )
};