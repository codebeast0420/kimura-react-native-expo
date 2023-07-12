import { StyleSheet, Text, View, Image, Pressable, TextInput } from 'react-native';
import {useState, useRef, useEffect} from 'react';

import ButtonNext from './../../components/ButtonNext';
import InputIcon from '../../components/InputIcon';
import { css, horizontalScale, verticalScale, moderateScale } from '../../style';
import img_logo from '../../assets/logo2.png';
import phone from '../../assets/phone.png';
import btn_next from '../../assets/btn-next.png';
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import axios from 'axios';
import app from "../../firebaseconfig";
import firebase from 'firebase/compat/app';

import AsyncStorage from '@react-native-async-storage/async-storage';

const baseurl = "https://jobi.work";

const styles = StyleSheet.create({
    header: {
        marginTop: horizontalScale(38),
        display: 'flex',
        flexDirection: 'row',
    },
    btn_back: {
        marginLeft: horizontalScale(39),
        width: horizontalScale(16),
        height: horizontalScale(16),
    },
    header_ttl: {
        marginLeft: horizontalScale(128),
        color: 'white',
        fontSize: 15.5,
    },
    img_logo: {
        width: horizontalScale(355),
        height: horizontalScale(141),
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: horizontalScale(47),
    },
    ttl: {
        marginTop: horizontalScale(30),
    },
    sub_ttl: {
        fontSize: 15.5,
        color: 'white',
        paddingLeft: horizontalScale(67),
        marginTop: horizontalScale(20),
        marginBottom: 9
    },
    box: {
        width: horizontalScale(300),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 'auto',
        marginRight: 'auto',
        alignItems: 'flex-end',
    },

    number: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: horizontalScale(340),
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    code_input: {
        borderBottomColor: 'white',
        borderBottomWidth: horizontalScale(1),
        color: '#E1FA08',
        fontSize: horizontalScale(28),
        width: horizontalScale(42),
        height: horizontalScale(37),
        textAlign: 'center',
    },

    input: {
        width: horizontalScale(145),
        marginLeft: horizontalScale(0),
        marginRight: horizontalScale(0),
    },
    select: {
        border: 'none',
        width: horizontalScale(72),
        marginLeft: horizontalScale(0),
        marginRight: horizontalScale(0),
        paddingLeft: horizontalScale(10),
    },
    box_gender: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: horizontalScale(64),
    },
    checkbox: {
        width: horizontalScale(30),
        height: horizontalScale(30),
        backgroundColor: 'blue'
    },
    text_label: {
        fontSize: horizontalScale(14),
        color: 'white',
    },
    text_yellow: {
        color: '#E1FA08',
        fontSize: horizontalScale(12),
        marginLeft: horizontalScale(67),
    },
    photo_box: {
        width: horizontalScale(104),
        marginTop: horizontalScale(-75),
        marginLeft: horizontalScale(248),
        position: 'relative',
    },
    photo: {
        width: horizontalScale(104),
        height: horizontalScale(104),
    },
    btn_camera: {
        width: horizontalScale(40),
        height: horizontalScale(40),
        position: 'absolute',
        right: horizontalScale(-5),
        bottom: horizontalScale(-5),
    },
    btn_next: {
        marginTop: horizontalScale(27),
        marginLeft: horizontalScale(327),
        marginBottom: horizontalScale(49),
    },
    input_ok: {
        backgroundColor: 'transparent',
        appearance: 'none',
    },
    date_ok: {
        alignItems: 'center',
    },
    text_agree: {
        color: 'white',
        fontSize: horizontalScale(12),
        marginTop: horizontalScale(35),
        marginLeft: horizontalScale(67),
    },
    btn_yellow: {
        marginTop: horizontalScale(35),
        marginBottom: horizontalScale(50),
    },
    ttl_input: {
        color: 'white',
        marginTop: horizontalScale(41),
        marginBottom: horizontalScale(15),
        marginLeft: horizontalScale(64),
        fontSize: 15.5,
    },
    error: {
        color: 'red',
        marginTop: horizontalScale(41),
        marginLeft: horizontalScale(64),
        fontSize: 15.5,
    },
});

export default function RegistPage1(props) {
   
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const [sent, setCodeSent] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState(null)
    const recaptchaVerifier = useRef(null);
    const firebaseConfig = app ? app.options : undefined;
    const [val1, setVal1] = useState("");
    const [val2, setVal2] = useState("");
    const [val3, setVal3] = useState("");
    const [val4, setVal4] = useState("");
    const [val5, setVal5] = useState("");
    const [val6, setVal6] = useState("");

    const ref_input1 = useRef(null);
    const ref_input2 = useRef(null);
    const ref_input3 = useRef(null);
    const ref_input4 = useRef(null);
    const ref_input5 = useRef(null);
    const ref_input6 = useRef(null);
    
    const options = {
        timeout: 60 * 1000 * 5 
    };
    const handleSubmit = () =>{
        if(phoneNumber=="") return
        let phonenumber = phoneNumber.replace(/\s/g, '');
        let data = JSON.stringify({"phone":`+81${phoneNumber}`});
        let config = {
          method: 'post',
          url: `${baseurl}/api/indentify-phone`,
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        axios(config)
        .then(async (response)=>{
           
            const phoneProvider =  new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(
                `+81${phonenumber}`,
                recaptchaVerifier.current
            );
            setCodeSent(true);
            setConfirmationResult(verificationId)
        })
        
    }

    const handleSend = async() =>{
        if(val1==="" || val2==="" || val3==="" || val4===""){
            return
        }
        else{
            let code = `${val1}${val2}${val3}${val4}${val5}${val6}`
            try {
                const credential = firebase.auth.PhoneAuthProvider.credential(
                    confirmationResult,
                    code
                );
                await firebase.auth().signInWithCredential(credential);
                await AsyncStorage.setItem("register-phone", `+81${phoneNumber}`);     
                props.navigation.navigate('PasswordSettingPage')
              
            } catch (err) {
              showMessage({ text: `Error: ${err.message}`, color: "red" });
            }
        }
        
    }
   
    const handlePaste = (event)=>{  
        if(!sent)
            return
        const pastedText = event.clipboardData.getData('text');     
        let codes = pastedText.split('');
        for (let i = 0; i <codes.length; i++){
            if(i==0)
            {
                setVal1(codes[i])
                
            }
            if(i==1)
            {
                setVal2(codes[i])
                
            }
            if(i==2)
            {
                setVal3(codes[i])
                
            }
            if(i==3)
            {
                setVal4(codes[i])
                
            }
            if(i==4)
            {
                setVal5(codes[i])
                
            }
            if(i==5)
            {
                setVal6(codes[i])
               
            }
        }
    }

    useEffect(() => {
        window.addEventListener("paste", handlePaste);
    
        return () => {
          window.removeEventListener("paste",handlePaste);
        };
      }, []);

    return (
        <>
            {
            sent
            ?
                <View style={css.cont_blue}>
                    <Image source={img_logo} style={styles.img_logo} />
                    <Text style={[css.ttl, styles.ttl]}>認証コード入力</Text>
                    <Text style={[css.dsc, styles.dsc]}>電話番号に届いた認証コードを入力</Text>
                    <Text style={styles.ttl_input}>認証コード</Text>
                    <View style={styles.number}>
                        <TextInput  style={styles.code_input} keyboardType='numeric' textContentType="oneTimeCode" value={val1}  ref={ref_input1} maxLength = {1} 
                            onChangeText={value => {
                            setVal1(value);                           
                            if(value) ref_input2.current.focus();
                        }}/>
                        <TextInput style={styles.code_input} keyboardType='numeric' textContentType="oneTimeCode" value={val2} ref={ref_input2}  maxLength = {1}
                            onChangeText={value => {
                            setVal2(value);
                            if(value) ref_input3.current.focus();
                            else ref_input1.current.focus();
                        }}/>
                        <TextInput style={styles.code_input} keyboardType='numeric' textContentType="oneTimeCode" value={val3} ref={ref_input3} maxLength = {1}
                            onChangeText={value => {
                            setVal3(value);
                            if(value) ref_input4.current.focus();
                            else ref_input2.current.focus();
                        }}/>
                        <TextInput style={styles.code_input} keyboardType='numeric' textContentType="oneTimeCode" value={val4} ref={ref_input4} maxLength = {1}
                            onChangeText={value => {
                            setVal4(value);
                            if(value) ref_input5.current.focus();
                            else ref_input3.current.focus();
                        }}/>
                         <TextInput style={styles.code_input} keyboardType='numeric' textContentType="oneTimeCode" value={val5} ref={ref_input5} maxLength = {1}
                            onChangeText={value => {
                            setVal5(value);
                            if(value) ref_input6.current.focus();
                            else ref_input4.current.focus();
                        }}/>
                         <TextInput style={styles.code_input} keyboardType='numeric' textContentType="oneTimeCode" value={val6} ref={ref_input6} maxLength = {1}
                            onChangeText={value => {
                            setVal6(value)
                            if(value==="") ref_input5.current.focus();
                        }}/>
                    </View>
                    <Pressable onPress={handleSend}> 
                        <View style={styles.btn_next}>
                            <ButtonNext  img={btn_next} txt='2/5' />
                        </View>
                    </Pressable>
                </View >
            :
                <View style={css.cont_blue}>
                    <Image source={img_logo} style={styles.img_logo} />
                    <Text style={[css.ttl, styles.ttl]}>電話番号入力</Text>
                    <Text style={[css.dsc, styles.dsc]}>電話番号を入力して下さい。</Text>
                    <Text style={styles.ttl_input}>電話番号</Text>
                    <InputIcon width={"12px"} value={phoneNumber} onChangeText={(value)=>{setPhoneNumber(value); setError("")}} icon={phone} placeholder="+818012345678" />
                    <Text style={styles.error}>{error}</Text>
                    <Pressable onPress={handleSubmit}>
                        <View style={styles.btn_next}><ButtonNext img={btn_next} txt='1/5'/></View>                        
                    </Pressable>
                    <FirebaseRecaptchaVerifierModal
                        style={{marginBottom:0}}
                        ref={recaptchaVerifier}
                        firebaseConfig={firebaseConfig}
                    />
                </View > 
            
            }
        </>
        
    );
}