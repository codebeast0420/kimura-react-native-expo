import { Pressable, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { useState, useEffect } from 'react';

import { css, horizontalScale, verticalScale, moderateScale } from '../../style';
import Footer from '../../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import img_work from '../../assets/photo-worker.png';
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
        color: '#303030',
        paddingBottom: horizontalScale(13),
        borderBottomColor: '#2C92D2',
        borderBottomWidth: horizontalScale(2),
        paddingLeft: horizontalScale(5),
        paddingRight: horizontalScale(5),
    },
    item_nav_02: {
        fontSize: horizontalScale(17),
        color: '#30303050',
        marginLeft: horizontalScale(78),
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
    img: {
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
    }
});

export default function WorkContractListPage(props) {
    
    const [contract_list, setContractList] = useState([])
    const [loading, setLoading] = useState(true)
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    const getData = async()=>{
        let userData =  JSON.parse(await AsyncStorage.getItem("userData"));
        let token = userData.token

        let config = {
            method: 'get',
            url: `${baseurl}/api/contract-list`,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };
        axios(config)
        .then((response)=>{
            setLoading(false)
            setContractList(response.data.data)
           
            
        })
        .catch((error)=>{
            
            if(error.response.status===401){
                AsyncStorage.removeItem("userData");
                 props.navigation.naviage("IntroPage")
            }
        })
    }

    useEffect(()=>{
        getData()
    },[])
    return (
        <View style={css.cont_white}>
            <View style={styles.header}>
                <Text style={styles.ttl}>はたらく</Text>
                <View style={styles.nav}>
                    <Text style={styles.item_nav_01} onPress={()=>props.navigation.navigate('WorkContractListPage')}>確定済み契約一覧</Text>
                    <Text style={styles.item_nav_02} onPress={()=>props.navigation.navigate('PastHirePage')}>過去の求人</Text>
                </View>
            </View>
           
            {!loading && 
            <View style={styles.board}>
                {
                    contract_list.map((item, index) =>
                        <Pressable key={index} onPress={()=>{props.navigation.navigate("WorkQRPage", {pk:item.pk, job_id:item.job__pk, title:item.job__title, start_date:item.job__start_date, start_time:item.job__start_time, end_time:item.job__end_time, relax_time:item.job__relax_time, shop:item.job__shop__pk, working_start:item.working_start_time, working_end:item.working_end_time})}}>
                            <View style={styles.item_work} >
                                <Text style={styles.date}>{`${item.job__start_date?.substr(0,4)}年${item.job__start_date?.substr(5,2)}月${item.job__start_date?.substr(8,2)}日(${days[new Date(item.job__start_date).getDay()]})`}</Text>
                                <Image source={{uri:`${baseurl}/media/${item.job__img1}`}} style={styles.img} />
                                <Text style={styles.txt}>{item.job__title}</Text>
                                <Text style={styles.time}>{item.job__start_date ? `${item.job__start_date?.substr(0,4)}年${item.job__start_date?.substr(5,2)}月${item.job__start_date?.substr(8,2)}日(${days[new Date(item.job__start_date).getDay()]})`:""}{item.job__start_time?.substr(0,5)}〜{item.job__end_time?.substr(0,5)}{item.job__relax_time==0 ? "(休憩なし)" : "(休憩あり)"}</Text>
                            </View>
                        </Pressable>
                        
                    )
                }
            </View>}
            <Footer num={3} {...props}/>
        </View>
    );
}