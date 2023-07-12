import { StyleSheet, Text, View, Image } from 'react-native';

import InputIcon from '../../components/InputIcon';
import ButtonNext from '../../components/ButtonNext';
import { css, horizontalScale, verticalScale, moderateScale } from '../../style';

import img_logo from '../../assets/logo2.png';
import icon_mail from '../../assets/icon-mail.png';
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
        marginBottom: horizontalScale(9),
    },
    btn_next: {
        marginTop: horizontalScale(-20),
        marginLeft: horizontalScale(327),
    },
});

export default function RegistPage1(props) {
    return (
        <View style={css.cont_blue}>
            <Image source={img_logo} style={styles.img_logo} />
            <Text style={[css.ttl, styles.ttl]}>電話番号入力</Text>
            <Text style={[css.dsc, styles.dsc]}>電話番号を入力して下さい。</Text>
            <Text style={styles.ttl_input}>電話番号</Text>
            <InputIcon icon={icon_mail} placeholder="09012345678" keyboardType='numberic'/>
            <View style={styles.btn_next}><ButtonNext img={btn_next} txt='1/5' /></View>
        </View >
    );
}
