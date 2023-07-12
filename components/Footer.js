import { StyleSheet, Text, View, Image, Animated, ImageBackground } from 'react-native';
import { useRef, useEffect, useState } from 'react';
import { css, horizontalScale, verticalScale, moderateScale } from '../style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import icon_feed from '../assets/icon-feed.png';
import icon_alarm from '../assets/icon-alarm.png';
import icon_explore from '../assets/icon-explore.png';
import icon_user from '../assets/icon-user.png';
import icon_setting from '../assets/icon-setting.png';
import axios from 'axios';
const baseurl = "https://jobi.work";

const styles = StyleSheet.create({
    footer: {
        position: 'fixed',
        bottom: horizontalScale(0),
        backgroundColor: '#332180',
        width: horizontalScale(428),
        height: horizontalScale(99),
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: horizontalScale(12),
        paddingRight: horizontalScale(36),
        paddingLeft: horizontalScale(43),
    },
    item: {
        alignItems: 'center',
        position: 'relative',
    },
    img: {
        width: horizontalScale(45),
        height: horizontalScale(35),
        opacity: .3,
    },
    img_active: {
        opacity: horizontalScale(1),
    },
    txt: {
        marginTop: horizontalScale(9),
        fontSize: horizontalScale(11),
        color: 'white',
        fontWeight: 'bold',
    },
    alert_msg: {
        top: horizontalScale(-8),
        right: horizontalScale(-10),
        position: 'absolute',
        fontSize: horizontalScale(11),
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: horizontalScale(20),
        height: horizontalScale(20),
        borderRadius: horizontalScale(20),
        backgroundColor: '#FA8673',
    },
});

function AnimButton(props) {
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const clickButton = () => {
        Animated.timing(scaleAnim, {
            toValue: 0.5,
            duration: 250,
            useNativeDriver: true,
        }).start();
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 0.1,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1.5,
                duration: 250,
                useNativeDriver: true,
            }),
        ]).start();
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true,
            }),
        ]).start();
    }

    const [count, setCount] = useState(0)

    useEffect(async ()=>{
        var userData =  JSON.parse(await AsyncStorage.getItem("userData")) || null;
        var token = userData.token;
        let config = {
            method: 'get',
            url: `${baseurl}/api/new-message`,
            headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
            }
        };
        axios(config)
        .then((response)=>{
           setCount(response.data.count)
        })
        .catch((error)=>{
            if(error.response.status===401){
                AsyncStorage.removeItem("userData");
                props.navigation.navigate("IntroPage")
            }
        })
    })

    return (
        <Animated.View onClick={()=>clickButton(1)}
            style={{opacity: fadeAnim, transform: [{ scale: scaleAnim }]}}>
            <View style={styles.item}>
                <Image source={props.img} style={[styles.img, props.active && styles.img_active]} />
                <Text style={styles.txt}>{props.txt}</Text>
                {props.txt==="メッセージ" && count !== 0 ? <Text style={styles.alert_msg}>{count}</Text> : null}
            </View>
        </Animated.View>
    );
}

export default function Footer(props) {
    return (
        <View style={styles.footer}>
            <AnimButton img={icon_feed} active={props.num === 1} txt="さがす" onClick={() => props.navigation.navigate("WorkListPage")}  />
            <AnimButton img={icon_alarm} active={props.num === 2} txt="お気に入り" onClick={() => props.navigation.navigate("FavouriteShopPage")} />
            <AnimButton img={icon_explore} active={props.num === 3} txt="はたらく" onClick={() => props.navigation.navigate("WorkContractListPage")} />
            <AnimButton img={icon_user} active={props.num === 4} txt="メッセージ" onClick={() => props.navigation.navigate("MessageListPage")} />
            <AnimButton img={icon_setting} active={props.num === 5} txt="マイページ" onClick={() => props.navigation.navigate("MyPage")} />
        </View >
    );
}
