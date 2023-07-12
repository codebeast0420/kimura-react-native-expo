import { StyleSheet, Text, View, Image, Pressable, TextInput } from 'react-native';

import { css, horizontalScale, verticalScale, moderateScale } from '../../style';
import Footer from '../../components/Footer';

import btn_return from '../../assets/return.png';
import { useState } from 'react';

const styles = StyleSheet.create({
    header: {
        paddingTop: horizontalScale(33),
        paddingLeft: horizontalScale(31),
        paddingBottom: horizontalScale(5),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: horizontalScale(9),
        borderBottomColor: '#eee',
        marginBottom: horizontalScale(21),
    },
    btn_return: {
        width: horizontalScale(27),
        height: horizontalScale(27),
    },
    ttl: {
        marginLeft: horizontalScale(117),
        color: '#303030',
        fontSize: horizontalScale(18),
        fontWeight: 'bold',
    },
    subttl: {
        marginTop: horizontalScale(27),
        color: '#707070',
        fontSize: horizontalScale(17),
        textAlign: 'center',
    },
    input: {
        width: horizontalScale(346),
        height: horizontalScale(420),
        padding: horizontalScale(23),
        fontSize: horizontalScale(16),
        borderColor: '#BEBEBE',
        borderRadius: '3%',
        borderWidth: horizontalScale(1),
        marginTop: horizontalScale(14),
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: horizontalScale(16),
    },
    btn_go: {
        width: horizontalScale(212),
        height: horizontalScale(43),
        borderRadius: horizontalScale(12),
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: horizontalScale(18),
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: horizontalScale(45),
        backgroundColor: '#FA8673',
    },
    bg_modal: {
        backgroundColor: '#B5B5B5aa',
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        top: horizontalScale(0),
        left: horizontalScale(0),
        zIndex: 999,
    },
    modal: {
        marginTop: horizontalScale(289),
        marginLeft: 'auto',
        marginRight: 'auto',
        width: horizontalScale(270),
        borderRadius: horizontalScale(14),
        backgroundColor: '#F2F2F2dd',
    },
    txt_modal: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: horizontalScale(17),
        textAlign: 'center',
        marginTop: horizontalScale(19),
        marginBottom: horizontalScale(19),
    },
    box_modal_btn: {
        width: '100%',
        height: '100%',
        borderTopColor: '#888',
        borderTopWidth: horizontalScale(1),
        display: 'flex',
        flexDirection: 'row',
        height: horizontalScale(44),
    },
    btn_modal_left: {
        width: '50%',
        height: '100%',
        color: '#007AFF',
        fontSize: horizontalScale(17),
        borderRightColor: '#888',
        borderRightWidth: horizontalScale(1),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn_modal_right: {
        width: '50%',
        height: '100%',
        color: '#007AFF',
        fontSize: horizontalScale(17),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default function ContactPage(props) {
    const [isShowModal, setShowModal] = useState(false);
    return (
        <View style={css.cont_white}>
            {
                isShowModal==true ?
                <View style={styles.bg_modal}>
                    <View style={styles.modal}>
                        <Text style={styles.txt_modal}>変更します。<br />よろしいですか？</Text>
                        <View style={styles.box_modal_btn}>
                            <Text style={styles.btn_modal_left} onStartShouldSetResponder={()=>setShowModal(false)}>もどる</Text>
                            <Text style={styles.btn_modal_right}>OK</Text>
                        </View>
                    </View>
                </View>
                : null
            }
            <View style={styles.header}>
                <Pressable onPress={()=>{props.navigation.goBack()}}>
                    <Image source={btn_return} style={styles.btn_return} />
                </Pressable>
                <Text style={styles.ttl}>お問い合わせ</Text>
            </View>
            <Text style={styles.subttl}>内容</Text>
            <TextInput style={styles.input} placeholder="入力" multiline={true} />
            <Text style={styles.btn_go} onStartShouldSetResponder={() => setShowModal(true)}>送信</Text>
            <Footer num={5} {...props}/>
        </View >
    );
}
