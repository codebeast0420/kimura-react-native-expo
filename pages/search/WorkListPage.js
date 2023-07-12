import { StyleSheet, Text, View, Image, Animated, Pressable } from 'react-native';
import { useRef, useState, useEffect } from 'react';

import { css, horizontalScale, verticalScale, moderateScale } from '../../style';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

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
    box_loader: {
        marginTop: horizontalScale(158),
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative',
        width: horizontalScale(100),
        height: horizontalScale(100),
    },
    circle: {
        position: 'absolute',
        width: horizontalScale(12),
        height: horizontalScale(12),
        backgroundColor: '#2C92D2',
        borderRadius: '50%',
    },
    circle0: {
        top: horizontalScale(0),
        left: horizontalScale(37),
    },
    circle1: {
        top: horizontalScale(10),
        left: horizontalScale(63),
    },
    circle2: {
        top: horizontalScale(30),
        left: horizontalScale(79),
    },
    circle3: {
        top: horizontalScale(53),
        left: horizontalScale(73),
    },
    circle4: {
        top: horizontalScale(70),
        left: horizontalScale(55),
    },
    circle5: {
        top: horizontalScale(73),
        left: horizontalScale(30),
    },
    circle6: {
        top: horizontalScale(60),
        left: horizontalScale(8),
    },
    circle7: {
        top: horizontalScale(35),
        left: horizontalScale(0),
    },
    circle8: {
        top: horizontalScale(10),
        left: horizontalScale(10),
    },
    txt_en: {
        fontSize: horizontalScale(28),
        color: '#2C92D2',
        marginTop: horizontalScale(88),
        textAlign: 'center',
        fontWeight: horizontalScale(600),
    },
    txt_jp: {
        marginTop: horizontalScale(7),
        textAlign: 'center',
        fontSize: horizontalScale(15),
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

const AnimCircle = props => {
    const zoom = useRef(new Animated.Value(1)).current; // Initial value for opacity: 0
    useEffect(() => {
        setTimeout(() => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(zoom, {
                        toValue: 1.75,
                        duration: horizontalScale(900),
                    }),
                    Animated.timing(zoom, {
                        toValue: horizontalScale(1),
                        duration: horizontalScale(900),
                    })
                ])
            ).start();
        }, props.delay);

    }, [zoom]);

    return (
        <Animated.View // Special animatable View
            style={{
                ...props.style,
                scale: zoom, // Bind opacity to animated value
            }}>
        </Animated.View>
    );
};



export default function WorkListPage(props) {
    
    const array = Array.from(Array(9).keys()).map(el=>'circle'+el);
    const [ready, setReady] = useState(false);
    const [list, setList]  = useState([]);
    const [filterValue, setFilterValue] = useState({city:"那覇市", filter:"未選択", date:0})
  
    const getData=async()=>{
        let date = new Date(new Date().getTime() + (filterValue.date * 24 * 60 * 60 * 1000));
        let data = JSON.stringify({
            "city":filterValue.city,
            "filter":filterValue.filter=="未選択" ? "" : filterValue.filter, 
            date:date.toISOString().split('T')[0], "shop_id":""
        });
        
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
            setReady(true)
            setList(response.data.jobs)
            
        })
        .catch((error)=>{
            if(error.response.status===401){
                AsyncStorage.removeItem("userData");
                 props.navigation.naviage("IntroPage")
             }
        })
    }

    const handleFav = async(shop) =>{
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

    useEffect(()=>{
        getData()
    },[filterValue])

    return (
        <View style={css.cont_white_header}>
            <Header value={filterValue} onChange={(value)=>{setFilterValue(value)}}/>
            {
                ready==false ?
                <View>
                    <View style={styles.box_loader}>
                        {array.map((item, index) =>
                            <AnimCircle style={{ ...styles.circle, ...styles[item] }} delay={index * 200}>
                            </AnimCircle>
                        )}
                    </View>
                    <Text style={styles.txt_en}>Loading</Text>
                    <Text style={styles.txt_jp}>求人を読み込んでいます</Text>
                </View>
                :
                <View style={styles.box}>
                    {list.map((item,index) =>
                        <View key={index} style={styles.item} >
                            <Pressable onPress={()=>props.navigation.navigate("WorkDetailPage",item.pk)}>
                                <View>
                                    <View style={styles.box_time}>
                                        <Image source={clock_blue} style={styles.clock} />
                                        <Text style={styles.time}>{item.end_time}</Text>
                                    </View>
                                    
                                    <Image source={{uri:`${baseurl}/media/${item?.img1}`}} style={styles.photo} />
                                    <Text style={styles.txt} >{item.title}</Text>
                                    <View style={styles.box_date} >
                                        <Text style={styles.date}>{`${item.start_date.substr(5,2)}月${item.start_date.substr(8,2)}日`}</Text>
                                        <Text style={styles.price}>{'¥' + item.hourly.toLocaleString('en-US').toString()}</Text>
                                    </View>
                                </View>
                            </Pressable>
                            <View style={styles.box_bottom}>
                                <View><Text style={styles.city}>{item.working_address1}</Text></View>
                                <Pressable onPress={()=>{handleFav(item.shop)}}>
                                    <View >{item.favorite ? <Image source={heart_yes} style={styles.heart} /> : <Image source={heart_no} style={styles.heart} /> }</View>
                                </Pressable>
                                
                                <Image source={img_distance} style={styles.img_distance} />
                                <Text style={styles.distance}>{item.distance}</Text>
                            </View>
                        </View>
                    )}
                </View>
            }
            <Footer num={1} {...props}/>
        </View>
    );
}