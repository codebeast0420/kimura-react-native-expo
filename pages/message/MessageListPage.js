import { Pressable, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { useState, useEffect } from 'react';

import { css, cutString , horizontalScale} from '../../style';
import Footer from '../../components/Footer';

import btn_search from '../../assets/search.png';
import img_user from '../../assets/user.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const baseurl = "https://jobi.work";

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: horizontalScale(428),
        height: horizontalScale(76),
        paddingLeft: horizontalScale(27),
        paddingRight: horizontalScale(27),
        backgroundColor: 'white',
        position: 'fixed',
        zIndex: 50,
    },
    input: {
        width: '100%',
        fontSize: horizontalScale(24),
        color: '#303030',
        padding: horizontalScale(5),
        marginRight: horizontalScale(10),
    },
    btn_search: {
        width: horizontalScale(27),
        height: horizontalScale(27),
    },
    box_list: {
        marginTop: horizontalScale(50),
        width: '100%',
        padding: horizontalScale(23),
    },
    msg: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        borderBottomWidth: horizontalScale(1),
        borderBottomColor: '#2C92D2',
        marginTop: 17.5,
        paddingTop: horizontalScale(10),
        paddingBottom: horizontalScale(20),
    },
    img_user: {
        width: horizontalScale(78),
        height: horizontalScale(78),
        marginRight: horizontalScale(12),
        borderRadius:"50%"
    },
    ttl: {
        width: horizontalScale(225),
        wordBreak: 'break-word',
        fontSize: horizontalScale(16),
        color: '#2C92D2',
    },
    name: {
        fontSize: horizontalScale(21),
        color: '#303030',
        fontWeight: 'bold',
    },
    txt: {
        fontSize: horizontalScale(16),
        color: '#9E9F9F',
    },
    box_right: {
        marginLeft: 'auto',
    },
    time: {
        fontSize: horizontalScale(14),
        color: '#9E9F9F',
    },
    num: {
        backgroundColor: '#303030',
        width: horizontalScale(26),
        height: horizontalScale(26),
        borderRadius: horizontalScale(26),
        fontSize: horizontalScale(14),
        color: '#fff',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: horizontalScale(12),
    },
});

export default function MessageListPage(props) {
  

    const [messageList, setMessageList] = useState([])

    const getData =async ()=>{
        var userData =  JSON.parse(await AsyncStorage.getItem("userData")) || null;
        var token = userData.token;
        let config = {
            method: 'post',
            url: `${baseurl}/api/message-list`,
            headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
            }
        };
        axios(config)
        .then((response)=>{
            
            setMessageList(response.data.chattings)
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
                <TextInput style={styles.input} placeholder="メッセージ" />
                <Pressable>
                    <Image source={btn_search} style={styles.btn_search} />
                </Pressable>
            </View>
            <View style={styles.box_list}>
                {
                    messageList.map((item, index) =>
                        <Pressable onPress={()=>{props.navigation.navigate("MessageDetailPage", {id:item.pk, messageData:item})}} key={index}>
                            <View style={styles.msg} >
                                <Image source={item.shop_image!==null ?  {uri:`${baseurl}/media/${item.shop_image}`} : img_user} style={styles.img_user} />
                                <View style={styles.box_txt}>
                                    {
                                    item.opponent_type ? 
                                        <Text style={styles.ttl}></Text>
                                    :
                                        <Text style={styles.ttl}>{item?.room__job__start_date.substr(5,2)}月{item?.room__job__start_date.substr(8,2)}日 {item.room__job__title}</Text>
                                    }
                                    {
                                    item.opponent_type ? 
                                        <Text style={styles.name}>JOBi事務局</Text>
                                    :
                                    <Text style={styles.name}>{item.room__shop__name}</Text>
                                    }
                                    <Text style={styles.txt}>{item.room__last_message ? item.room__last_message : "まだメッセージはありません。"}</Text>
                                </View>
                                <View style={styles.box_right}>
                                    <Text style={styles.time}>{item.time}</Text>
                                    { item.newMessage &&  <Text style={styles.num}>1</Text>}
                                </View>
                            </View>
                        </Pressable>                        
                    )
                }
            </View>
            <Footer num={4} {...props}/>
        </View>
    );
}