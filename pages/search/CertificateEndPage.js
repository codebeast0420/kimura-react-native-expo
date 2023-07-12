import { Pressable, StyleSheet, Text, View, Image } from 'react-native';

import { css, horizontalScale, verticalScale, moderateScale } from '../../style';
import Footer from '../../components/Footer';

import btn_return from '../../assets/left.png';

const styles = StyleSheet.create({
    btn_return: {
        width: horizontalScale(12),
        height: horizontalScale(20),
        marginTop: horizontalScale(35),
        marginLeft: horizontalScale(21),
    },
    ttl: {
        fontSize: horizontalScale(22),
        color: '#172B4D',
        textAlign: 'center',
        marginTop: horizontalScale(23),
        marginBottom: horizontalScale(36),
    },
    txt: {
        fontSize: horizontalScale(15),
        lineHeight: '2.5',
        marginLeft: horizontalScale(37),
    },
    email: {
        marginTop: horizontalScale(29),
        color: '#707070',
        textAlign: 'center',
    },
    btn:{
        width: horizontalScale(159),
        height: horizontalScale(48),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        borderRadius: horizontalScale(6),
        fontSize: horizontalScale(16),
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: horizontalScale(39),
        backgroundColor: '#332180',
        
    },
});


export default function CertificatePage(props) {
  
    return (
        <View style={css.cont_white}>
            <Pressable onPress={()=>{props.navigation.navigate("WorkListPage")}}>
                <Image source={btn_return} style={styles.btn_return} />
            </Pressable>
            <Text style={styles.ttl}>本人確認資料を提出しました。</Text>
            <Text style={styles.txt}>
                現在、本人確認資料を確認しています。<br />
                審査結果まで２～３日ほどお待ちください。<br />
                結果はアプリ内で確認する事ができます。<br />
                間違って送信した場合は下記までご連絡下さい。
            </Text>
            <Text style={styles.email}>info@minepro.co.jp</Text>
            <Text onPress={()=>props.navigation.navigate('WorkListPage')} style={styles.btn}>ホーム</Text>
            <Footer num={1} {...props}/>
        </View>
    );
}