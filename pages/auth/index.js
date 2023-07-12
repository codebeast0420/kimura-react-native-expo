import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

import { css, horizontalScale, verticalScale, moderateScale } from '../../style';

import img_logo from '../../assets/logo2.png';
import img_mid from '../../assets/img-auth-index.png';

const styles = StyleSheet.create({
    img_logo: {
        width: horizontalScale(355),
        height: horizontalScale(141),
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: horizontalScale(47),
    },
    img_mid: {
        width: horizontalScale(336),
        height: horizontalScale(323),
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: horizontalScale(34),
    },
    ttl: {
        marginTop: horizontalScale(40),
        color: '#5D4AFF',
        textAlign: 'center',
        fontSize: horizontalScale(28),
        fontWeight: 'bold',
    },
    dsc: {
        marginTop: horizontalScale(13),
        color: '#5D4AFF',
        textAlign: 'center',
        fontSize: horizontalScale(16),
    },
    btn_yellow: {
        marginTop: horizontalScale(43),
    },
    btn_yellow_txt: {
        fontSize: horizontalScale(16),
    },
    btn_login: {
        width: horizontalScale(300),
        height: horizontalScale(52),
        color: 'white',
        fontSize: horizontalScale(16),
        backgroundColor: '#332180',
        border: '2px solid white',
        borderRadius: horizontalScale(5),
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: horizontalScale(26),
    },
});

export default function AuthIndexPage(props) {
   
    return (
        <View style={css.cont_intro}>
            <Image source={img_logo} style={styles.img_logo} />
            <Image source={img_mid} style={styles.img_mid} />
            <Text style={[css.ttl, styles.ttl]}>JOBiへようこそ！</Text>
            <Text style={[css.dsc, styles.dsc]}>登録してJOBiをはじめよう！</Text>
            <Pressable onPress={()=>props.navigation.navigate('RegisterPage')}>
                <View style={[css.btn_yellow, styles.btn_yellow]} ><Text style={styles.btn_yellow_txt}>新規登録</Text></View>
            </Pressable>
            <Pressable onPress={()=>props.navigation.navigate('LoginPage')}>
                <View style={styles.btn_login}>ログイン</View>
            </Pressable>
            
        </View >
    );
}
