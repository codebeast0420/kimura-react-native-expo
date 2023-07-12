import { StyleSheet, Text, View, Image, TextInput } from 'react-native';

import ButtonNext from '../../components/ButtonNext';
import { css, horizontalScale, verticalScale, moderateScale } from '../../style';

import img_logo from '../../assets/logo2.png';
import btn_next from '../../assets/btn-next.png';

const styles = StyleSheet.create({
    img_logo: {
        width: horizontalScale(355),
        height: horizontalScale(141),
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: horizontalScale(47),
    },
    ttl: {
        marginTop: horizontalScale(47),
    },
    dsc: {
        marginTop: horizontalScale(13),
    },
    ttl_input: {
        color: 'white',
        marginTop: horizontalScale(41),
        marginLeft: horizontalScale(64),
        fontSize: 15.5,
    },
    number: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: horizontalScale(269),
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    input: {
        borderBottomColor: 'white',
        borderBottomWidth: horizontalScale(1),
        color: '#E1FA08',
        fontSize: horizontalScale(28),
        width: horizontalScale(42),
        height: horizontalScale(37),
        textAlign: 'center',
    },
    btn_next: {
        marginTop: horizontalScale(40),
        marginLeft: horizontalScale(327),
    },
});

export default function RegistPage2(props) {
    return (
        <View style={css.cont_blue}>
            <Image source={img_logo} style={styles.img_logo} />
            <Text style={[css.ttl, styles.ttl]}>認証コード入力</Text>
            <Text style={[css.dsc, styles.dsc]}>電話番号に届いた認証コードを入力</Text>
            <Text style={styles.ttl_input}>認証コード</Text>
            <View style={styles.number}>
                <TextInput style={styles.input} keyboardType='numeric' defaultValue={6} />
                <TextInput style={styles.input} keyboardType='numeric' defaultValue={3} />
                <TextInput style={styles.input} keyboardType='numeric' />
                <TextInput style={styles.input} keyboardType='numeric' />
            </View>
            <View style={styles.btn_next}><ButtonNext img={btn_next} txt='2/5' /></View>
        </View >
    );
}
