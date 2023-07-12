import { Pressable, StyleSheet, Text, TextInput, View, Image, Picker, TextBase } from 'react-native';
import { useState, useEffect } from 'react';

import { css, horizontalScale, verticalScale, moderateScale } from '../../style';
import Footer from '../../components/Footer';

import bg_photo from '../../assets/photo-worker.png';
import btn_return from '../../assets/return.png';
import map from '../../assets/map.png';
import img_triangle from '../../assets/right2.png';
import mark_qr from '../../assets/qr.png';
import img_file from '../../assets/file2.png';
import img_cancel from '../../assets/x.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const baseurl = "https://jobi.work";

const styles = StyleSheet.create({
    bg_photo: {
        position: 'absolute',
        top: horizontalScale(0),
        left: horizontalScale(0),
        width: horizontalScale(428),
        height: horizontalScale(244),
        opacity: .09,
        borderBottomLeftRadius: horizontalScale(10),
        borderBottomRightRadius: horizontalScale(10),
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: horizontalScale(35),
        paddingLeft: horizontalScale(32),
    },
    btn_return: {
        width: horizontalScale(27),
        height: horizontalScale(27),
    },
    ttl: {
        marginLeft: horizontalScale(110),
        color: '#303030',
        fontSize: horizontalScale(20),
    },
    board: {
        backgroundColor: 'white',
        width: horizontalScale(374),
        boxShadow: '0 3px 6px #ddd',
        marginTop: horizontalScale(18),
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: horizontalScale(16),
        paddingLeft: horizontalScale(25),
        paddingRight: horizontalScale(25),
    },
    box_info: {
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: horizontalScale(18),
        borderBottomColor: '#2C92D2',
        borderBottomWidth: horizontalScale(1),
    },
    map: {
        width: horizontalScale(59),
        height: horizontalScale(59),
    },
    txt_map: {
        marginTop: horizontalScale(3),
        fontSize: horizontalScale(12),
        color: '#4D4D4D',
        fontWeight: 'bold',
    },
    box_txt: {
        marginLeft: horizontalScale(19),
    },
    txt_info: {
        color: '#707070',
        fontSize: horizontalScale(16),
        width: horizontalScale(250),
        lineHeight: '1.2',
    },
    txt_datetime: {
        marginTop: horizontalScale(5),
        fontSize: horizontalScale(12),
        fontWeight: 'bold',
        color: '#4D4D4D',
    },
    box_check: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: horizontalScale(20),
        paddingLeft: horizontalScale(10),
        paddingRight: horizontalScale(10),
    },
    ttl_checkinout: {
        color: '#4D4D4D',
        fontSize: horizontalScale(15),
        fontWeight: 'bold',
    },
    date_checkinout: {
        marginTop: horizontalScale(19),
        fontSize: horizontalScale(12),
        color: '#4D4D4D',
        fontWeight: 'bold',
    },
    time_checkinout: {
        marginTop: horizontalScale(7),
        fontSize: horizontalScale(15),
        color: '#4D4D4D',
        fontWeight: 'bold',
    },
    img_triangle: {
        width: horizontalScale(17),
        height: horizontalScale(24),
    },
    txt_qr: {
        marginTop: horizontalScale(29),
        fontSize: horizontalScale(12),
        fontWeight: 'bold',
        color: '#4D4D4D',
        textAlign: 'center',
    },
    btn_qr: {
        backgroundColor: '#F0BC08',
        borderRadius: horizontalScale(5),
        width: horizontalScale(300),
        height: horizontalScale(52),
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: horizontalScale(14),
    },
    mark_qr: {
        width: horizontalScale(48),
        height: horizontalScale(48),
        marginRight: horizontalScale(3),
    },
    txt_btn_qr: {
        color: '#000',
        fontSize: horizontalScale(16),
        fontWeight: 'bold',
    },
    box_file: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: horizontalScale(1),
        borderTopWidth: horizontalScale(1),
        borderBottomColor: '#2C92D2',
        borderTopColor: '#2C92D2',
        paddingTop: horizontalScale(19),
        paddingBottom: horizontalScale(19),
        marginTop: horizontalScale(30),
        marginBottom: horizontalScale(19),
    },
    img_file: {
        width: horizontalScale(16),
        height: horizontalScale(20),
        marginLeft: horizontalScale(10),
    },
    txt_file: {
        fontSize: horizontalScale(12),
        fontWeight: 'bold',
        color: '#4D4D4D',
        marginLeft: horizontalScale(15),
    },
    box_cancel: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    img_cancel: {
        width: horizontalScale(16),
        height: horizontalScale(16),
        marginLeft: horizontalScale(10),
    },
    txt_cancel: {
        fontSize: horizontalScale(12),
        fontWeight: 'bold',
        color: '#4D4D4D',
        marginLeft: horizontalScale(15),
    },
    txt_contact: {
        marginTop: horizontalScale(19),
        paddingTop: horizontalScale(39),
        borderTopColor: '#2C92D2',
        borderTopWidth: horizontalScale(1),
        fontSize: horizontalScale(12),
        fontWeight: 'bold',
        color: '#4D4D4D',
        marginBottom: horizontalScale(4),
        textAlign: 'center',
    },
    txt_phonenumber: {
        color: '#4D4D4D99',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: horizontalScale(16),
        marginBottom: horizontalScale(100),
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

export default function WorkQRPage(props) {
    let params = props.route.params;
    
    const [isCheckinModal, setCheckinModal] = useState(false);
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    
    const working_start = params?.working_start;
    const working_end = params?.working_end;
    const handleCancel = async()=>{
        let userData =  JSON.parse(await AsyncStorage.getItem("userData"));
        let token = userData.token

        let config = {
            method: 'delete',
            url: `${baseurl}/api/cancel-contract/${params.pk}`,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };
        axios(config)
        .then((response)=>{
            props.navigation.navigate("WorkContractListPage")
        })
        .catch((error)=>{
            
            if(error.response.status===401){
                AsyncStorage.removeItem("userData");
                 props.navigation.naviage("IntroPage")
            }
        })
    }
    useEffect(()=>{
        
        if(working_start && working_end){
            props.navigation.navigate('SalaryFinalConfirmPage', {id:params.pk})
        }
    },[])

    return (
        <View style={css.cont_white}>
            {
                isCheckinModal &&
                <View style={styles.bg_modal}>
                    <View style={styles.modal}>
                        {
                            isCheckinModal && <Text style={styles.txt_modal}>本当にチェックイン<br />しますか？</Text> ||
                            !isCheckinModal && <Text style={styles.txt_modal}>本当にチェックアウト<br />しますか？</Text>
                        }
                        <View style={styles.box_modal_btn}>
                            <Text style={styles.btn_modal_left} onPress={()=>{setCheckinModal(!isCheckinModal)}}>もどる</Text>
                            <Text style={styles.btn_modal_right} onPress={()=>{props.navigation.navigate('GetQRPage', {state:params.pk})}}>OK</Text>
                        </View>
                    </View>
                </View>
            }
            <Image source={bg_photo} style={styles.bg_photo} />
            <View style={styles.header}>
                <Pressable onPress={()=>{props.navigation.goBack()}}>
                    <Image source={btn_return} style={styles.btn_return} />
                </Pressable>
                <Text style={styles.ttl}>はたらく</Text>
            </View>
            <View style={styles.board}>
                <View style={styles.box_info}>
                    <View style={styles.box_map}>
                        <Image source={map} style={styles.map} />
                        <Text style={styles.txt_map}>場所を確認</Text>
                    </View>
                    <View style={styles.box_txt}>
                        <Text style={styles.txt_info}>{params.title}</Text>
                        <Text style={styles.txt_datetime}>
                            {params.start_date ? `${params.start_date?.substr(0,4)}年${params.start_date?.substr(5,2)}月${params.start_date?.substr(8,2)}日(${days[new Date(params.start_date).getDay()]})`:""}{params.start_time?.substr(0,5)}〜{params.end_time?.substr(0,5)}{params.relax_time==0 ? "(休憩なし)" : "(休憩あり)"}
                        </Text>
                    </View>
                </View>
                <View style={styles.box_check}>
                    <View style={styles.box_checkinout}>
                        <Text style={styles.ttl_checkinout}>チェックイン</Text>
                        <Text style={styles.date_checkinout}>{working_start ? `${working_start?.substr(5,2)}月${working_start?.substr(8,2)}日(${days[new Date(working_start).getDay()]})` : "-月-日(-)"}</Text>
                        <Text style={styles.time_checkinout}>{working_start ? `${working_start?.substr(11,2)}:${working_start?.substr(14,2)}` : "-:--"}</Text>
                    </View>
                    <Image source={img_triangle} style={styles.img_triangle} />
                    <View style={styles.box_checkinout}>
                        <Text style={styles.ttl_checkinout}>チェックイン</Text>
                        <Text style={styles.date_checkinout}>{working_end ? `${working_end?.substr(5,2)}月${working_end?.substr(8,2)}日(${days[new Date(working_end).getDay()]})` : "-月-日(-)"}</Text>
                        <Text style={styles.time_checkinout}>{working_end ? `${working_end?.substr(11,2)}:${working_end?.substr(14,2)}` : "-:--"}</Text>
                    </View>
                </View>
                <Text style={styles.txt_qr}>仕事をはじめる/おわるときにQRコードを読み込む</Text>
                <View style={styles.btn_qr}>
                    <Image source={mark_qr} style={styles.mark_qr} />
                    <Text style={styles.txt_btn_qr} onPress={()=>{setCheckinModal(true)}}>QRを読み込む</Text>
                </View>
                <View style={styles.box_file}>
                    <Image source={img_file} style={styles.img_file} />
                    <Text style={styles.txt_file}>募集詳細</Text>
                </View>
                <View style={styles.box_cancel}>
                    <Image source={img_cancel} style={styles.img_cancel} />
                    <Text style={styles.txt_cancel} onPress={()=>{handleCancel()}}>このお仕事をキャンセル</Text>
                </View>
                <Text style={styles.txt_contact}>緊急連絡先</Text>
                <Text style={styles.txt_phonenumber}>000-0000-0000</Text>
            </View>
            <Footer num={3} {...props}/>
        </View>
    );
}