import { Pressable, StyleSheet, Text, View, Image, ImageBackground } from 'react-native';

import { css, horizontalScale, verticalScale, moderateScale } from '../../style';
import Footer from '../../components/Footer';

import btn_return from '../../assets/left.png';
import cer1 from '../../assets/cer1.png';
import cer2 from '../../assets/cer2.png';
import cer3 from '../../assets/cer3.png';
import cer4 from '../../assets/cer4.png';

const styles = StyleSheet.create({
    cont: {
        paddingLeft: horizontalScale(21),
        paddingRight: horizontalScale(21),
    },
    btn_return: {
        width: horizontalScale(12),
        height: horizontalScale(20),
        marginTop: horizontalScale(35),
    },
    ttl: {
        fontSize: horizontalScale(22),
        color: '#172B4D',
        marginTop: horizontalScale(27),
        textAlign: 'center',
    },
    dsc: {
        fontSize: horizontalScale(15),
        marginTop: horizontalScale(18),
    },
    item: {
        height: horizontalScale(127),
        marginTop: horizontalScale(20),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        border: '1px solid #707070',
        borderRadius: horizontalScale(16),
        paddingLeft: horizontalScale(21),
        paddingRight: horizontalScale(21),
    },
    img1: {
        width: horizontalScale(83),
        height: horizontalScale(83),
        marginRight: horizontalScale(21),
    },
    img2: {
        width: horizontalScale(119),
        height: horizontalScale(76),
        marginRight: horizontalScale(21),
    },
    img3: {
        width: horizontalScale(107),
        height: horizontalScale(75),
        marginRight: horizontalScale(21),
    },
    img4: {
        width: horizontalScale(94),
        height: horizontalScale(94),
        marginRight: horizontalScale(21),
    },
    txt_item: {
        color: '#505050',
        fontSize: horizontalScale(18),
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
    }
});

export default function CertificatePage(props) {
    let {id} = props.route.params.state;

    return (
        <View style={css.cont_white}>
            <View style={styles.cont} >
                <Pressable onPress={()=>props.navigation.goBack()}>
                    <Image source={btn_return} style={styles.btn_return}/>
                </Pressable>
                <Text style={styles.ttl}>登録したい本人確認書類を選択</Text>
                <Text style={styles.dsc}>JOBiで働くには書類を登録して、本人確認する必要があります。ここで入力した本人確認書類の情報が他のユーザーに公開されることはありません。</Text>
                    <Pressable onPress={()=>props.navigation.navigate('TakeCertification', {state:{id:id}})}>
                        <View style={styles.item}>
                            <Image source={cer1} style={styles.img1} />
                            <Text style={styles.txt_item}>パスポート（所持人記入欄があるもの）</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={()=>props.navigation.navigate('TakeCertification', {state:{id:id}})}>
                        <View style={styles.item}>
                            <Image source={cer2} style={styles.img2} />
                            <Text style={styles.txt_item}>運転免許証</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={()=>props.navigation.navigate('TakeCertification', {state:{id:id}})}>
                        <View style={styles.item}>
                            <Image source={cer3} style={styles.img3} />
                            <Text style={styles.txt_item}>マイナンバーカード</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={()=>props.navigation.navigate('TakeCertification', {state:{id:id}})}>
                        <View style={styles.item}>
                            <Image source={cer4} style={styles.img4} />
                            <Text style={styles.txt_item}>住民基本台帳カード（顔写真付きのもの）</Text>
                        </View>
                    </Pressable>
            </View>
            <Footer num={1} {...props}/>
        </View>
    );
}