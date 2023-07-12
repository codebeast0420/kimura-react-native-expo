import { Pressable, StyleSheet, Text, TextInput, View, Image, Picker, TextBase } from 'react-native';
import { useState, useEffect } from 'react';

import { css, horizontalScale, verticalScale, moderateScale } from '../../style';
import Footer from '../../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import btn_return from '../../assets/return.png';
import img_triangle from '../../assets/right2.png';
import axios from 'axios';
// import Loader from './Loader';
const baseurl = "https://jobi.work";

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: horizontalScale(35),
        paddingLeft: horizontalScale(32),
        position: 'fixed',
        width: horizontalScale(428),
        zIndex: 2,
        backgroundColor: '#fff',
        paddingBottom: horizontalScale(35),
    },
    btn_return: {
        width: horizontalScale(27),
        height: horizontalScale(27),
    },
    ttl: {
        marginLeft: horizontalScale(75),
        color: '#303030',
        fontSize: horizontalScale(20),
    },
    board: {
        backgroundColor: 'white',
        width: horizontalScale(374),
        boxShadow: '0 3px 6px #ddd',
        marginTop: horizontalScale(120),
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: horizontalScale(21),
        paddingLeft: horizontalScale(25),
        paddingRight: horizontalScale(25),
    },
    txt_info: {
        color: '#707070',
        fontSize: horizontalScale(16),
        width: '100%',
        lineHeight: '1.2',
        paddingBottom: horizontalScale(18),
        borderBottomColor: '#2C92D2',
        borderBottomWidth: horizontalScale(1),
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
    txt_checkinout: {
        color: '#4D4D4D',
        fontSize: horizontalScale(15),
        marginTop: horizontalScale(25),
    },
    ttl_checkinout: {
        color: '#4D4D4D',
        fontSize: horizontalScale(15),
        fontWeight: 'bold',
        marginTop: horizontalScale(18),
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
    box_breaktime: {
        borderBottomWidth: horizontalScale(1),
        borderTopWidth: horizontalScale(1),
        borderBottomColor: '#2C92D2',
        borderTopColor: '#2C92D2',
        paddingTop: horizontalScale(20),
        paddingBottom: horizontalScale(22),
        marginTop: horizontalScale(37),
        marginBottom: horizontalScale(20),
        marginLeft: horizontalScale(5),
    },
    ttl_breaktime: {
        color: '#4D4D4D',
        fontSize: horizontalScale(15),
    },
    txt_breaktime: {
        color: '#4D4D4D',
        fontSize: horizontalScale(15),
        fontWeight: 'bold',
        marginTop: horizontalScale(9),
    },
    ttl_money: {
        marginTop: horizontalScale(20),
        fontSize: horizontalScale(15),
        color: '#4D4D4D',
    },
    row_money: {
        width: horizontalScale(306),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: horizontalScale(15),
    },
    left_money: {
        color: '#4D4D4D',
        fontSize: horizontalScale(12),
        fontWeight: 'bold',
    },
    right_money: {
        color: '#4D4D4D',
        fontSize: horizontalScale(12),
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    row_money_last: {
        width: horizontalScale(306),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: horizontalScale(30),
        position: 'relative',
        marginBottom: horizontalScale(36),
    },
    right_money_last: {
        color: '#4D4D4D',
        fontSize: horizontalScale(16),
    },
    btn_go: {
        width: horizontalScale(300),
        height: horizontalScale(52),
        borderRadius: horizontalScale(5),
        backgroundColor: '#172B4D',
        color: 'white',
        fontWeight: 'bold',
        fontSize: horizontalScale(16),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: horizontalScale(28),
        marginLeft: 'auto',
        marginRight: 'auto',
    },
});

export default function CompleteContractPage(props) {
    let {id} = props.route.params;
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)

    const days = ['日', '月', '火', '水', '木', '金', '土'];
    
    useEffect(async()=>{
        let userData =  JSON.parse(await AsyncStorage.getItem("userData"));
        let token = userData.token

        let config = {
            method: 'get',
            url: `${baseurl}/api/contract/${id}`,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };
        axios(config)
        .then((response)=>{
            setLoading(false)
            setData(response.data.data)
        })
        .catch((error)=>{
            if(error.response.status===400){
                
                if(error.response.data?.type === "already_worked"){
                    props.navigation.navigate("ReviewInputPage", {shop:error.response.data.shop, id:id})
                    
                }
            }
            if(error.response.status===401){
                AsyncStorage.removeItem("userData");
                 props.navigation.naviage("IntroPage")
            }
        })
    },[])

    const getTotalPrice = (hourly,start_time, end_time)=>{
        let differ = new Date(start_time) - new Date(end_time)
        let hour = Math.abs(((differ % 86400000) / 3600000))
        return Math.round(hour * hourly)

    }

    const handleSubmit = async()=>{
        setLoading(true)
        let userData =  JSON.parse(await AsyncStorage.getItem("userData"));
        let token = userData.token
        let totalPrice = getTotalPrice(data.hourly, data.working_start, data.working_end) + parseInt(data.transportation_expenses)
        let postdata = JSON.stringify({price:totalPrice})
        let config = {
            method: 'put',
            url: `${baseurl}/api/contract/${id}`,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            data:postdata
        };
        axios(config)
        .then((response)=>{

            props.navigation.navigate(`ReviewInputPage` ,{shop:response.data.shop, id:id})
        })
        .catch((error)=>{
            
            if(error.response.status===401){
                AsyncStorage.removeItem("userData");
                 props.navigation.naviage("IntroPage")
            }
            
            if(error.response.status===400){
                
                if(error.response.data?.type === "already_worked"){
                    props.navigation.navigate("ReviewInputPage", {shop:error.response.data.shop, id:id})
                }
            }
        })
    }

    return (
        <View style={css.cont_white}>
            <View style={styles.header}>
                <Pressable onPress={()=>{props.navigation.navigate("WorkContractListPage")}}>
                    <Image source={btn_return} style={styles.btn_return} />
                </Pressable>
                <Text style={styles.ttl}>報酬額の最終確認</Text>
            </View>
            
            <View style={styles.board}>
                <Text style={styles.txt_info}>以下の内容で業務と報酬を確定します。最後にもう一度内容を確認してください。</Text>
                <View style={styles.box_check}>
                    <View style={styles.box_checkinout}>
                        <Text style={styles.txt_checkinout}>業務開始</Text>
                        <Text style={styles.ttl_checkinout}>チェックイン</Text>
                        <Text style={styles.date_checkinout}>{`${data.working_start?.substr(5,2)}月${data.working_start?.substr(8,2)}日(${days[new Date(data.working_start).getDay()]})`}</Text>
                        <Text style={styles.time_checkinout}>{`${data.working_start?.substr(11,2)}:${data.working_start?.substr(14,2)}`}</Text>
                    </View>
                    <Image source={img_triangle} style={styles.img_triangle} />
                    <View style={styles.box_checkinout}>
                        <Text style={styles.txt_checkinout}>業務終了</Text>
                        <Text style={styles.ttl_checkinout}>チェックイン</Text>
                        <Text style={styles.date_checkinout}>{`${data.working_end?.substr(5,2)}月${data.working_end?.substr(8,2)}日(${days[new Date(data.working_end).getDay()]})`}</Text>
                        <Text style={styles.time_checkinout}>{`${data.working_end?.substr(11,2)}:${data.working_end?.substr(14,2)}`}</Text>
                    </View>
                </View>
                <View style={styles.box_breaktime}>
                    <Text style={styles.ttl_breaktime}>休憩時間</Text>
                    <Text style={styles.txt_breaktime}>{data.relax_time}分</Text>
                </View><Text style={styles.ttl_money}>報酬内訳</Text>
                <View style={styles.row_money}>
                    <Text style={styles.left_money}>時給</Text>
                    <Text style={styles.right_money}>{data.hourly?.toLocaleString('en-US').toString()}円 / 1時間</Text>
                </View>
                <View style={styles.row_money}>
                    <Text style={styles.left_money}>基本給</Text>
                    <Text style={styles.right_money}>{getTotalPrice(data.hourly, data.working_start, data.working_end).toLocaleString('en-US').toString()}円</Text>
                </View>
                <View style={styles.row_money}>
                    <Text style={styles.left_money}>交通費</Text>
                    <Text style={styles.right_money}>{data.transportation_expenses?.toLocaleString('en-US').toString()}円</Text>
                </View>
                <View style={styles.row_money_last}>
                    <Text style={styles.left_money}>支払われる報酬総額</Text>
                    <Text style={styles.right_money_last}>{(getTotalPrice(data.hourly, data.working_start, data.working_end) + parseInt(data.transportation_expenses)).toLocaleString('en-US').toString()}円</Text>
                </View>
                <View ><Text style={styles.btn_go} onPress={()=>handleSubmit()}>次へ進む</Text></View>
            </View>
            <Footer num={3} {...props}/>
        </View>
    );
}