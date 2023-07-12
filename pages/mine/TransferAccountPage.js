import { StyleSheet, Text, View, Image, Pressable, TextInput } from 'react-native';

import { css, horizontalScale, verticalScale, moderateScale } from '../../style';
import Footer from '../../components/Footer';

import btn_return from '../../assets/return.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const baseurl = "https://jobi.work";

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
        position: 'fixed',
        width: horizontalScale(428),
        zIndex: 50,
        backgroundColor: '#fff',
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
        width: horizontalScale(300),
        height: horizontalScale(52),
        paddingLeft: horizontalScale(23),
        paddingRight: horizontalScale(23),
        fontSize: horizontalScale(16),
        borderColor: '#BEBEBE',
        borderRadius: horizontalScale(5),
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

export default function BankAccountPage(props) {
 
    const [isShowModal, setShowModal] = useState(false);
    const [bank_name, setBankName] = useState("")
    const [branch_name, setBranchName] = useState("")
    const [branch_number, setBranchNumber] = useState("")
    const [account_holder, setAccountHolder] = useState("")

    

    const handleSend = ()=>{
        if(bank_name=="" || branch_name=="" || branch_number=="" || account_holder=="") return
        setShowModal(true)
    }

    useEffect(async()=>{
            let userData =  JSON.parse(await AsyncStorage.getItem("userData")) || null;
            let token = userData.token;
            let config = {
                method: 'get',
                url: `${baseurl}/api/bank-info`,
                headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
                }
            };
            axios(config)
            .then((response)=>{
                setBankName(response.data.data.bank_name)
                setBranchName(response.data.data.branch_name)
                setBranchNumber(response.data.data.branch_number)
                setAccountHolder(response.data.data.account_holder)
            })
            .catch((error)=>{
                if(error.response.status===401){
                    AsyncStorage.removeItem("userData");
                     props.navigation.naviage("IntroPage")
                }
            })
    },[])
    const handleSubmit = async() =>{
        let userData =  JSON.parse(await AsyncStorage.getItem("userData")) || null;
        let token = userData.token;
        let data = JSON.stringify({bank_name:bank_name,branch_name:branch_name,branch_number:branch_number,account_holder:account_holder});
        let config = {
            method: 'post',
            url: `${baseurl}/api/bank-info`,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            data:data
        };
        axios(config)
        .then((response)=>{
            props.navigation.navigate('MyPage')
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
            {
                isShowModal== true ? 
                <View style={styles.bg_modal}>
                    <View style={styles.modal}>
                        <Text style={styles.txt_modal}>変更します。<br />よろしいですか？</Text>
                        <View style={styles.box_modal_btn}>
                            <Text style={styles.btn_modal_left} onPress={()=>setShowModal(false)}>もどる</Text>
                            <Text style={styles.btn_modal_right} onPress={()=>handleSubmit()}>OK</Text>
                        </View>
                    </View>
                </View>
                 :
                 null
            }
            <View style={styles.header}>
                <Pressable onPress={()=>props.navigation.goBack()}>
                    <Image source={btn_return} style={styles.btn_return} />
                </Pressable>
                <Text style={styles.ttl}>振込先口座</Text>
            </View>
            <View style={{marginTop: '90rem'}} />
            <Text style={styles.subttl}>振込先銀行名</Text>
            <TextInput style={styles.input} placeholder="入力" value={bank_name} onChangeText={(text)=>setBankName(text)}/>
            <Text style={styles.subttl}>支店名</Text>
            <TextInput style={styles.input} placeholder="入力" value={branch_name} onChangeText={(text)=>{setBranchName(text)}} />
            <Text style={styles.subttl}>支店番号</Text>
            <TextInput style={styles.input} placeholder="入力" value={branch_number} onChangeText={(text)=>setBranchNumber(text)}/>
            <Text style={styles.subttl}>口座名義</Text>
            <TextInput style={styles.input} placeholder="入力" value={account_holder} onChangeText={(text)=>{setAccountHolder(text)}}/>
            <Text style={styles.btn_go} onPress={() => handleSend()}>変更</Text>
            <Footer num={5} {...props}/>
        </View >
    );
}
