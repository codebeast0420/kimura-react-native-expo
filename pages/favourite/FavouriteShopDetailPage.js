import { Pressable, StyleSheet, Text, Image, View } from 'react-native';
import { useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import { css, horizontalScale, verticalScale, moderateScale } from '../../style';

import favourite from '../../assets/favourite.png';
import btn_return from '../../assets/return.png';
import like from '../../assets/heart-yes3.png';
import clock_red from '../../assets/clock-red.png';
import clock_blue from '../../assets/clock-blue.png';
import photo_worker from '../../assets/photo-worker.png';
import img_distance from '../../assets/distance.png';
import heart_no from '../../assets/heart-no.png';
import heart_yes from '../../assets/heart-yes.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const baseurl = "https://jobi.work";

const styles = StyleSheet.create({
    header: {
        paddingTop: horizontalScale(31),
        paddingLeft: horizontalScale(31),
        paddingBottom: horizontalScale(10),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        position: 'fixed',
        zIndex: 2,
        width: horizontalScale(428),
    },
    btn_return: {
        width: horizontalScale(27),
        height: horizontalScale(27),
    },
    ttl: {
        marginLeft: horizontalScale(87),
        color: '#303030',
        fontSize: horizontalScale(18),
        fontWeight: 'bold',
    },
    favourite: {
        width: horizontalScale(111),
        height: horizontalScale(103),
        marginTop: horizontalScale(80),
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    txt_favourtie: {
        color: '#303030',
        fontSize: horizontalScale(17),
        marginTop: horizontalScale(10),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    btn_like: {
        width: horizontalScale(192),
        backgroundColor: '#FA8673',
        height: horizontalScale(46),
        marginTop: horizontalScale(31),
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: horizontalScale(19),
    },
    like: {
        width: horizontalScale(19),
        height: horizontalScale(17),
        marginRight: horizontalScale(17),
    },
    txt_btn_like: {
        color: 'white',
        fontSize: horizontalScale(13),
        fontWeight: 'bold',
    },
    border: {
        marginTop: horizontalScale(24),
        width: horizontalScale(367),
        height: horizontalScale(1),
        backgroundColor: '#CCCCCC',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    box: {
        width: '100%',
        paddingTop: horizontalScale(10),
        paddingLeft: horizontalScale(7),
        paddingRight: horizontalScale(7),
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        position: 'relative',
    },
    item: {
        width: horizontalScale(193),
        margin: horizontalScale(7),
    },
    box_time: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: horizontalScale(3),
        zIndex: 2,
        top: horizontalScale(8),
        left: horizontalScale(10),
        borderRadius: horizontalScale(4),
        backgroundColor: 'white',
        width: horizontalScale(58),
        height: horizontalScale(16),
    },
    clock: {
        width: horizontalScale(10),
        height: horizontalScale(10),
    },
    time: {
        color: '#2C92D2',
        fontSize: horizontalScale(10),
        fontWeight: 'bold',
        marginLeft: horizontalScale(1),
    },
    time_red: {
        color: '#FA8673',
        fontSize: horizontalScale(10),
        fontWeight: 'bold',
        marginLeft: horizontalScale(11),
    },
    photo: {
        width: horizontalScale(193),
        height: horizontalScale(148),
    },
    txt: {
        marginTop: horizontalScale(5),
        fontSize: horizontalScale(12),
        color: '#172B4D',
    },
    box_date: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    date: {
        fontSize: horizontalScale(12),
        color: '#172B4D',
    },
    price: {
        marginTop: horizontalScale(10),
        fontSize: horizontalScale(16),
        color: '#172B4D',
    },
    box_bottom: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: horizontalScale(10),
    },
    city: {
        height: horizontalScale(21),
        borderRadius: horizontalScale(4),
        paddingLeft: horizontalScale(9),
        paddingRight: horizontalScale(9),
        backgroundColor: '#2C92D2',
        color: 'white',
        fontSize: horizontalScale(13),
        display: 'flex',
        justifyContent: 'center',
    },
    heart: {
        width: horizontalScale(20),
        height: horizontalScale(18),
        marginLeft: horizontalScale(10),
    },
    img_distance: {
        width: horizontalScale(9),
        height: horizontalScale(13),
        marginLeft: 'auto',
    },
    distance: {
        color: '#172B4D',
        fontSize: horizontalScale(10),
    },
});

export default function FavouriteShopDetailPage(props) {
    let id = props.route.params;
    const [joblist, setJobList] = useState([])

    const getData = async () =>{
        
        let data = JSON.stringify({"shop_id":id});
        
        let userData =  JSON.parse(await AsyncStorage.getItem("userData"));
        let token = userData.token

        let config = {
            method: 'post',
            url: `${baseurl}/api/job-list-all`,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            data : data
        };
        axios(config)
        .then((response)=>{
            setJobList(response.data.jobs)            
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

    const handleFav = async (shop) =>{
        let userData =  JSON.parse(await AsyncStorage.getItem("userData"));
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
        .then((response)=>{
            getData()
            
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
            <View style={styles.header}>
                <Pressable onPress={()=>{props.navigation.goBack()}}>
                    <Image source={btn_return} style={styles.btn_return} />
                </Pressable>
                <Text style={styles.ttl}>お気に入り店舗</Text>
            </View>
            <Image source={favourite} style={styles.favourite} />
            <Text style={styles.txt_favourtie}>じゃがすたじお</Text>
            <View style={styles.btn_like}>
                <Image source={like} style={styles.like} />
                <Text style={styles.txt_btn_like}>お気に入り済み</Text>
            </View>
            <View style={styles.border} />

            <View style={styles.box}>
                {joblist.map((item,index) =>
                    <View key={index} style={styles.item} >
                        <Pressable onPress={()=>props.navigation.navigate("WorkDetailPage",item.pk)}>
                            <View style={styles.box_time}>
                                <Image source={clock_blue} style={styles.clock} />
                                <Text style={styles.time}>{item.end_time}</Text>
                            </View>
                            
                            <Image source={{uri:`${baseurl}/media/${item.img1}`}} style={styles.photo} />
                            <Text style={styles.txt} onPress={()=>props.navigation.navigate("WorkDetailPage",item.pk)}>{item.title}</Text>

                            <View style={styles.box_date} >
                                <Text style={styles.date}>{`${item.start_date.substr(5,2)}月${item.start_date.substr(8,2)}日`}</Text>
                                <Text style={styles.price}>{'¥' + item.hourly.toLocaleString('en-US').toString()}</Text>
                            </View>
                        </Pressable>                        
                        <View style={styles.box_bottom}>
                            <View><Text style={styles.city}>{item.working_address1}</Text></View>
                            <Pressable onPress={()=>{handleFav(item.shop)}}>
                                <View>{item.favorite ? <Image source={heart_yes} style={styles.heart} /> : <Image source={heart_no} style={styles.heart} /> }</View>
                            </Pressable>                            
                            <Image source={img_distance} style={styles.img_distance} />
                            <Text style={styles.distance}>{item.distance}</Text>
                        </View>
                    </View>
                )}
            </View>
            <Footer num={2} {...props}/>
        </View>
    );
}