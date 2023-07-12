import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';

import { css, horizontalScale, verticalScale, moderateScale } from '../../style';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import img_file from '../../assets/file.png';

const styles = StyleSheet.create({
    img: {
        width: horizontalScale(64),
        height: horizontalScale(73),
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: horizontalScale(182),
    },
    txt: {
        color: '#00000044',
        fontSize: horizontalScale(15),
        marginTop: horizontalScale(30),
        textAlign: 'center',
    },
    btn: {
        marginTop: horizontalScale(29),
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: horizontalScale(15),
        backgroundColor: '#2C92D2',
        width: horizontalScale(197),
        height: horizontalScale(48),
        borderRadius: horizontalScale(6),
    }
});

export default function FailedPage(props) {
    return (
        <View style={css.cont_white_header}>
            <Header />
            <Image source={img_file} style={styles.img} />
            <Text style={styles.txt}>読み込みに失敗しました</Text>
            <Text style={styles.btn}>再読み込み</Text>
            <Footer num={1} {...props}/>
        </View>
    );
}