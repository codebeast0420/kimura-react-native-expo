import { Pressable, StyleSheet, Text, TextInput, View, Image, Picker } from 'react-native';
import { useState, useEffect } from 'react';

import { css, horizontalScale, verticalScale, moderateScale } from '../../style';
import Footer from '../../components/Footer';

import img_work from '../../assets/photo-worker.png';
import like from '../../assets/heart-yes2.png';
import unlike from '../../assets/heart-no2.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const baseurl = "https://jobi.work";

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'white',
        paddingTop: horizontalScale(32),
        paddingRight: horizontalScale(40),
        paddingLeft: horizontalScale(40),
        position: 'fixed',
        width: horizontalScale(428),
        zIndex: 2,
    },
    ttl: {
        fontSize: horizontalScale(20),
        color: '#303030',
        textAlign: 'center',
    },
    nav: {
        marginTop: horizontalScale(17),
        display: 'flex',
        flexDirection: 'row',
    },
    item_nav_01: {
        fontSize: horizontalScale(17),
        color: '#30303050',
    },
    item_nav_02: {
        fontSize: horizontalScale(17),
        color: '#303030',
        marginLeft: horizontalScale(78),
        paddingBottom: horizontalScale(13),
        borderBottomColor: '#2C92D2',
        borderBottomWidth: horizontalScale(2),
        paddingLeft: horizontalScale(15),
        paddingRight: horizontalScale(15),
    },
    board: {
        marginTop: horizontalScale(123),
        paddingTop: horizontalScale(16),
        paddingLeft: horizontalScale(27),
        paddingRight: horizontalScale(27),
    },
    item_work: {
        width: '100%',
        backgroundColor: 'white',
        boxShadow: '0 3px 6px #ddd',
        padding: horizontalScale(15),
        marginBottom: horizontalScale(28),
    },
    date: {
        fontSize: horizontalScale(18),
        color: '#303030',
        marginLeft: horizontalScale(7),
    },
    img_work: {
        width: horizontalScale(341),
        height: horizontalScale(172),
        borderRadius: horizontalScale(9),
        marginTop: horizontalScale(11),
    },
    txt: {
        marginTop: horizontalScale(15),
        fontSize: horizontalScale(17),
        color: '#707070',
    },
    time: {
        fontSize: horizontalScale(12),
        fontColor: '#707070',
        fontWeight: 'bold',
        marginBottom: horizontalScale(13),
    },
    box_select: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: horizontalScale(15),
    },
    ttl_select: {
        fontSize: horizontalScale(13),
        color: '#2699FB',
        fontWeight: 'bold',
    },
    select: {
        marginLeft: horizontalScale(36),
        height: horizontalScale(48),
        width: horizontalScale(163),
        border: '1px solid #7FC4FD',
        borderRadius: horizontalScale(8),
        color: '#7FC4FD',
        fontSize: horizontalScale(14),
        paddingLeft: horizontalScale(19),
    },
    box_like: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginTop: horizontalScale(5),
    },
    txt_like: {
        color: '#ff0000',
        fontSize: horizontalScale(11),
        fontWeight: 'bold',
    },
    txt_unlike: {
        color: '#505050',
        fontSize: horizontalScale(11),
        fontWeight: 'bold',
    },
    like: {
        width: horizontalScale(21),
        height: horizontalScale(19),
        marginLeft: horizontalScale(26),
    },
    time_start: {
        color: 'black',
        fontSize: horizontalScale(13),
        fontWeight: 'bold',
        marginTop: horizontalScale(13),
    },
    time_end: {
        color: 'black',
        fontSize: horizontalScale(13),
        fontWeight: 'bold',
        marginTop: horizontalScale(13),
        paddingBottom: horizontalScale(30),
        borderBottomColor: '#2C92D2',
        borderBottomWidth: horizontalScale(1),
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
        width: horizontalScale(346),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: horizontalScale(30),
        paddingRight: horizontalScale(50),
        position: 'relative',
    },
    right_money_last: {
        color: '#D90000',
        fontSize: horizontalScale(16),
    },
    checkmark: {
        position: 'absolute',
        right: horizontalScale(8),
        bottom: horizontalScale(8),
        width: horizontalScale(20),
        height: horizontalScale(13),
        borderWidth: horizontalScale(3),
        borderColor: 'transparent',
        rotate: '-45deg',
    },
    checkmark_show: {
        borderBottomColor: '#172B4D',
        borderLeftColor: '#172B4D',
    },
});

export default function PastHirePage(props) {

    const [isLike, setLike] = useState(false);
    const clickLike = async (shop) => {
        let userData = JSON.parse(await AsyncStorage.getItem("userData"));
        let token = userData.token
        let config = {
            method: 'post',
            url: `${baseurl}/api/favorite/${shop}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };
        axios(config)
            .then((response) => {
                getData()

            })
            .catch((error) => {
                if (error.response.status === 401) {
                    AsyncStorage.removeItem("userData");
                    props.navigation.naviage("IntroPage")
                }
            })
    };

    const [contract_list, setContractList] = useState([])
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    const getData = async () => {
        let userData = JSON.parse(await AsyncStorage.getItem("userData"));
        let token = userData.token

        let config = {
            method: 'post',
            url: `${baseurl}/api/contract-list`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };
        axios(config)
            .then((response) => {

                setContractList(response.data.data)

            })
            .catch((error) => {

                if (error.response.status === 401) {
                    AsyncStorage.removeItem("userData");
                    props.navigation.naviage("IntroPage")
                }
            })
    }

    const getTotal = (hourly, start_time, end_time) => {
        if (start_time && end_time && hourly) {
            let differ = new Date(start_time) - new Date(end_time)
            let hour = Math.abs(((differ % 86400000) / 3600000))
            return Math.round(hour * hourly)
        }
        else
            return "-"

    }


    useEffect(() => {
        getData()
    }, [])


    return (
        <View style={css.cont_white}>
            <View style={styles.header}>
                <Text style={styles.ttl}>はたらく</Text>
                <View style={styles.nav}>
                    <Text style={styles.item_nav_01} onPress={() => { props.navigation.navigate('WorkContractListPage') }}>確定済み契約一覧</Text>
                    <Text style={styles.item_nav_02} onPress={() => { props.navigation.navigate('PastHirePage') }}>過去の求人</Text>
                </View>
            </View>
            <View style={styles.board}>
              
                {contract_list.map((item, index) => (
                    <View style={styles.item_work} key={index}>
                        <Text style={styles.date}>{`${item.job__start_date?.substr(5, 2)}月${item.job__start_date?.substr(8, 2)}日(${days[new Date(item.job__start_date).getDay()]})`}</Text>
                        <Image source={{ uri: `${baseurl}/media/${item?.job__img1}` }} style={styles.img_work} />
                        <Text style={styles.txt}>{item.job__title}</Text>
                        <Text style={styles.time}>{item.job__start_date ? `${item.job__start_date?.substr(0, 4)}年${item.job__start_date?.substr(5, 2)}月${item.job__start_date?.substr(8, 2)}日(${days[new Date(item.job__start_date).getDay()]})` : ""}{item.job__start_time?.substr(0, 5)}〜{item.job__end_time?.substr(0, 5)}{item.job__relax_time == 0 ? "(休憩なし)" : "(休憩あり)"}</Text>
                        <View style={styles.box_like}>
                            {
                                item.favorite && <Text style={styles.txt_like}>お気に入り済み</Text> ||
                                !item.favorite && <Text style={styles.txt_unlike}>この店舗をお気に入りにする</Text>
                            }
                            <Pressable onPress={() => clickLike(item.shop)}>
                                {
                                    item.favorite && <Image source={like} style={styles.like} /> ||
                                    !item.favorite && <Image source={unlike} style={styles.like} />
                                }
                            </Pressable>
                        </View>
                        <Text style={styles.time_start}>出勤時間：{(item.status !== 1 && item.work_time) ? `${item.work_time.substr(0, 4)}/${item.work_time.substr(5, 2)}/${item.work_time.substr(8, 2)} ${item.work_time.substr(11, 2)}:${item.work_time.substr(14, 2)}` : ""}</Text>
                        <Text style={styles.time_end}>退勤時間：{(item.status !== 1 && item.leaving_time) ? `${item.leaving_time.substr(0, 4)}/${item.leaving_time.substr(5, 2)}/${item.leaving_time.substr(8, 2)} ${item.leaving_time.substr(11, 2)}:${item.leaving_time.substr(14, 2)}` : ""}</Text>
                        <Text style={styles.ttl_money}>報酬内訳</Text>
                        <View style={styles.row_money}>
                            <Text style={styles.left_money}>時給</Text>
                            <Text style={styles.right_money}>{`${item.hourly.toLocaleString('en-US').toString()}円`} / 1時間</Text>
                        </View>
                        <View style={styles.row_money}>
                            <Text style={styles.left_money}>基本給</Text>
                            <Text style={styles.right_money}>{getTotal(item.hourly, item.work_time, item.leaving_time).toLocaleString('en-US').toString()}円</Text>
                        </View>
                        <View style={styles.row_money}>
                            <Text style={styles.left_money}>交通費</Text>
                            <Text style={styles.right_money}>{`${item.transportation_expenses.toLocaleString('en-US').toString()}円`}</Text>
                        </View>
                        <View style={styles.row_money_last}>
                            <Text style={styles.left_money}>支払われる報酬総額</Text>
                            <Text style={styles.right_money_last}>{item.status !== 0 ? `${item.price.toLocaleString('en-US').toString()}円` : "キャンセル済み"}</Text>
                            <View style={[styles.checkmark, isLike && styles.checkmark_show]} />
                        </View>
                    </View>
                ))}
            </View>
            <Footer num={3} {...props} />
        </View>
    );
}