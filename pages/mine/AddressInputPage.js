import { StyleSheet, Text, View, Image, Pressable, TextInput } from 'react-native';

import { css, horizontalScale, verticalScale, moderateScale } from '../../style';
import Footer from '../../components/Footer';

import btn_return from '../../assets/left.png';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const baseurl = "https://jobi.work";

const styles = StyleSheet.create({
    btn_return: {
        width: horizontalScale(12),
        height: horizontalScale(20),
        marginTop: horizontalScale(35),
        marginLeft: horizontalScale(21),
    },
    ttl: {
        color: '#172B4D',
        fontSize: horizontalScale(22),
        textAlign: 'center',
        marginTop: horizontalScale(23),
    },
    box: {
        width: horizontalScale(428),
        paddingLeft: horizontalScale(35),
        paddingRight: horizontalScale(35),
    },
    txt: {
        marginTop: horizontalScale(36),
        fontSize: horizontalScale(15),
    },
    warning: {
        color: '#E80F0F',
        fontSize: horizontalScale(12),
        marginTop: horizontalScale(15),
    },
    input: {
        width: '100%',
        height: horizontalScale(104),
        borderRadius: horizontalScale(22),
        padding: horizontalScale(20),
        marginTop: horizontalScale(15),
        borderColor: '#B9B9B9',
        borderWidth: horizontalScale(1),
        backgroundColor: 'white',
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
    error: {
        color: 'red',
        fontSize: 15.5,
        marginTop:'10rem'
    },
});


export default function AddressInputPage(props) {
    const [current_address, setCurrentAddress]= useState("")
    const [differ_reason, setDifferReason] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async()=>{
        if(current_address==""){
            setError("住所をご入力下さい")
            return 
        }
        let userData =  JSON.parse(await AsyncStorage.getItem("userData")) || null;
        let token = userData.token;
        let data = JSON.stringify({current_address:current_address,differ_reason:differ_reason});
        let config = {
            method: 'put',
            url: `${baseurl}/api/indentify-address`,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            data:data
        };
        axios(config)
        .then((response)=>{
            props.navigation.navigate('CertificateEndPage')
        })
        .catch((error)=>{
            if(error.response.status===401){
                AsyncStorage.removeItem("userData");
                    props.navigation.naviage("IntroPage")
            }
        })
    }
    return (
        <View style={css.cont_white}>
            <Image source={btn_return} style={styles.btn_return} />
            <Text style={styles.ttl}>現在お住まいの住所</Text>
            <View style={styles.box}>
                <Text style={styles.txt}>現在お住まいの住所をご記入下さい。</Text>
                <Text style={styles.warning}>マンション・アパート名と部屋番号までご記入下さい。</Text>
                <TextInput style={styles.input} multiline={true} value={current_address} onChangeText={(text)=>{setError(""); setCurrentAddress(text)}} />
                <Text style={styles.error}>{error}</Text>
                <Text style={styles.txt}>身分証の住所と違う方は理由をご記入下さい。</Text>
                <TextInput style={styles.input} multiline={true} value={differ_reason} onChangeText={(text)=>{setDifferReason(text)}}/>
            </View>
            <Text onPress={handleSubmit} style={styles.btn}>送信</Text>
             <Footer num={1} {...props}/>
        </View >
    );
}
