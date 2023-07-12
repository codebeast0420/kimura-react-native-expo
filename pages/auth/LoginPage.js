import { Pressable, StyleSheet, Text, View, Image } from 'react-native';

import { useEffect, useState } from 'react';
import InputIcon from '../../components/InputIcon';
import { css, horizontalScale, verticalScale, moderateScale } from '../../style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import btn_back from '../../assets/btn-back.png';
import img_logo from '../../assets/logo2.png';
import icon_mail from '../../assets/icon-mail.png';
import icon_lock from '../../assets/icon-lock.png';
import btn_grad from '../../assets/btn-grad.png';

import phone from '../../assets/phone.png';
import axios from 'axios';
const baseurl = "https://jobi.work";
const styles = StyleSheet.create({
    header: {
        marginTop: horizontalScale(38),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'relative',
    },
    btn_back: {
        position: 'absolute',
        width: horizontalScale(16),
        height: horizontalScale(16),
        top: horizontalScale(0),
        left: horizontalScale(37),
    },
    header_ttl: {
        color: 'white',
        fontSize: 15.5,
    },
    img_logo: {
        width: horizontalScale(355),
        height: horizontalScale(141),
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: horizontalScale(52),
    },
    ttl: {
        marginTop: horizontalScale(46),
    },
    dsc: {
        marginTop: horizontalScale(13),
        marginBottom: horizontalScale(36),
    },
    btn_yellow: {
        marginTop: horizontalScale(43),
    },
    bg_modal: {
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: horizontalScale(0),
        left: horizontalScale(0),
        backgroundColor: '#ffffff00',
    },
    modal: {
        marginTop: horizontalScale(304),
        width: horizontalScale(295),
        height: horizontalScale(205),
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'white',
        paddingTop: horizontalScale(21),
        paddingLeft: horizontalScale(24),
        paddingRight: horizontalScale(24),
        boxShadow: '0 5px 5px #134D7Eaa',
    },
    ttl_modal: {
        fontSize: horizontalScale(14),
        color: '#2699FB',
        fontWeight: 'bold',
    },
    txt_modal: {
        fontSize: horizontalScale(14),
        color: '#2699FB',
        marginTop: horizontalScale(16),
    },
    btn_modal: {
        marginTop: horizontalScale(45),
        marginLeft: 'auto',
        fontSize: horizontalScale(14),
        color: '#2699FB',
        fontWeight: 'bold',
    },
    btn: {
        marginTop: horizontalScale(55),
        marginLeft: 'auto',
        marginRight: 'auto',
        width: horizontalScale(367),
        height: horizontalScale(71),
    }
});
export default function LoginPage(props) {
    const [isShowModal, setShowModal] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        let phonenumber = email.replace(/\s/g, '');
        let data = JSON.stringify({"email":`+81${phonenumber}`,"password":password});
        let config = {
          method: 'post',
          url: `${baseurl}/api/login`,
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        axios(config)
        .then(async (response)=>{

            await AsyncStorage.setItem("userData", JSON.stringify(response.data))
            await AsyncStorage.setItem("register-email", response.data.email)
            if(response.data.userstatus==1){
                props.navigation.navigate("WorkListPage");
            }
            else{
                window.location.assign("RegistPage4");
            }
        })
        .catch((error)=>{
            setShowModal(true);
        })
        
    }

    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <View style={css.cont_blue}>
            <View style={styles.header}>
                <Pressable onPress={()=>{props.navigation.goBack()}}><Image source={btn_back} style={styles.btn_back} /></Pressable>
                <Text style={styles.header_ttl}>ログイン</Text>
            </View>
            <Image source={img_logo} style={styles.img_logo} />
            <Text style={[css.ttl, styles.ttl]}>ログイン</Text>
            <Text style={[css.dsc, styles.dsc]} onPress={()=>{props.navigation.navigate('RegisterPage')}}>会員登録はこちら</Text>
            <InputIcon width="12px"  value={email} onChangeText={(value)=>setEmail(value)}  icon={phone} placeholder="電話番号" keyboardType="default"></InputIcon>
            <View style={{ marginTop: 17 }}></View>
            <InputIcon width="20px" value={password} secureTextEntry={true} onChangeText={(value)=>setPassword(value)}  icon={icon_lock} placeholder="パスワード" keyboardType="default"></InputIcon>
            <Pressable onPress={login}> <View style={[css.btn_yellow, styles.btn_yellow]}><Text>ログイン</Text></View></Pressable>
            {
                isShowModal==true ?
                <View style={styles.bg_modal}>
                    <View style={styles.modal}>
                        <Text style={styles.ttl_modal}>ログインに失敗しました</Text>
                        <Text style={styles.txt_modal}>メールアドレスもしくはパスワードが間違っています。再度ログインをお試しください。</Text>
                        <Pressable onPress={closeModal}><View style={styles.btn_modal} ><Text>OK</Text></View></Pressable>
                    </View>
                </View> : null
}
        </View >
    );
}
