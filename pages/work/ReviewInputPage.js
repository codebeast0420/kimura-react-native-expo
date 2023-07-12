import { Pressable, StyleSheet, Text, TextInput, View, Image, Picker, TextBase } from 'react-native';
import { useState } from 'react';

import { css, horizontalScale, verticalScale, moderateScale } from '../../style';
import Footer from '../../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import btn_return from '../../assets/return.png';
import img_doll from '../../assets/doll.png';
import star_full from '../../assets/star_full.png';
import star_empty from '../../assets/star_empty.png';
import like from '../../assets/heart-yes3.png';
import unlike from '../../assets/heart-no.png';

import { useEffect } from 'react';
import axios from 'axios';

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
        marginLeft: horizontalScale(80),
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
        position: 'relative',
    },
    txt_info: {
        color: '#707070',
        fontSize: horizontalScale(16),
        width: '100%',
        lineHeight: '1.2',
        paddingBottom: horizontalScale(10),
        borderBottomColor: '#2C92D2',
        borderBottomWidth: horizontalScale(1),
    },
    img_doll: {
        width: horizontalScale(154),
        height: horizontalScale(148),
        position: 'absolute',
        left: horizontalScale(0),
        right: horizontalScale(0),
        marginLeft: 'auto',
        marginRight: 'auto',
        top: horizontalScale(94),
    },
    input: {
        width: horizontalScale(330),
        height: horizontalScale(180),
        borderRadius: horizontalScale(22),
        borderColor: '#B9B9B9',
        borderWidth: horizontalScale(1),
        padding: horizontalScale(22),
        marginTop: horizontalScale(25),
    },
    star: {
        width: horizontalScale(48),
        height: horizontalScale(44),
    },
    box_star: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: horizontalScale(31),
    },
    item_star: {
        display: 'flex',
        alignItems: 'center',
    },
    txt_star: {
        fontSize: horizontalScale(15),
        color: '#4B00E0',
        marginTop: horizontalScale(6),
    },
    txt_star_no: {
        fontSize: horizontalScale(15),
        color: 'transparent',
        marginTop: horizontalScale(6),
    },
    btn_unlike: {
        width: horizontalScale(301),
        borderColor: '#707070',
        borderWidth: horizontalScale(2),
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
    txt_btn_unlike: {
        color: '#333',
        fontSize: horizontalScale(13),
        fontWeight: 'bold',
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
        marginTop: horizontalScale(128),
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
        marginTop: horizontalScale(301),
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
        marginBottom: horizontalScale(25),
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

export default function ReviewInputPage(props) {
    let {shop, id} = props.route.params;
    
    const [isShowModal, setShowModal] = useState(false);
    const [isLike, setLike] = useState(false);
    const [rating, setRating] = useState(0);
    const [commnet, setCommnet] = useState("")
    const array_rating = [1,1,1,1,1]

    const getFavList = async() =>{
        let userData =  JSON.parse(await AsyncStorage.getItem("userData"));
        let token = userData.token
        let config = {
            method: 'get',
            url: `${baseurl}/api/favorites`,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };
        axios(config)
        .then((response)=>{
            let favlist = response.data.data
            setLike(favlist.filter(item=>(item.shop__id==shop)).length > 0)
        })
        .catch((error)=>{
            if(error.response.status===401){
                AsyncStorage.removeItem("userData");
                 props.navigation.naviage("IntroPage")
             }
        })

    }
    useEffect(()=>{
        getFavList()
    },[])

    const handleFav = async()=>{        
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
            getFavList()
            
        })
        .catch((error)=>{
            if(error.response.status===401){
                AsyncStorage.removeItem("userData");
                 props.navigation.naviage("IntroPage")
             }
        })

    }

    const handleSubmit = async()=>{
        let userData =  JSON.parse(await AsyncStorage.getItem("userData"));
        let token = userData.token
        let postdata = JSON.stringify({commnet:commnet, point:rating})
        let config = {
            method: 'post',
            url: `${baseurl}/api/review/${id}`,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            data:postdata
        };
        axios(config)
        .then((response)=>{     
            props.navigation.navigate("WorkEndPage", {id:id})       
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
                isShowModal &&
                <View style={styles.bg_modal}>
                    <View style={styles.modal}>
                        <Text style={styles.txt_modal}>レビューを送信します</Text>
                        <View style={styles.box_modal_btn}>
                            <Text style={styles.btn_modal_left} onPress={() => setShowModal(false)}>もどる</Text>
                            <Text style={styles.btn_modal_right} onPress={()=>{handleSubmit()}}>OK</Text>
                        </View>
                    </View>
                </View>
            }
            <View style={styles.header}>
                <Pressable onPress={()=>props.navigation.goBack()}>
                    <Image source={btn_return} style={styles.btn_return} />
                </Pressable>
                <Text style={styles.ttl}>レビューを入力</Text>
            </View>
            <View style={styles.board}>
                <Text style={styles.txt_info}>最後に働いた企業へコメントを書きましょう</Text>
                {
                    !isLike && <Image source={img_doll} style={styles.img_doll} />
                }
                <TextInput style={styles.input} multiline = {true} numberOfLines = {4} value={commnet} onChangeText={(text)=>setCommnet(text)}/>
                <View style={styles.box_star}>
                    {
                        array_rating.map((item, index) =>
                            <View style={styles.item_star} key={index}>
                                {
                                    index <= rating && <Pressable onPress={()=>setRating(index)}><Image source={star_full} style={styles.star} /></Pressable> ||
                                    index > rating && <Pressable onPress={()=>setRating(index)}><Image source={star_empty} style={styles.star} /></Pressable>
                                }
                                <Text style={[index <= rating && styles.txt_star, index > rating && styles.txt_star_no]}>{index + 1}</Text>
                            </View>
                        )
                    }
                </View>
                <Pressable onPress={() => setLike(!isLike)}>
                    <View style={[isLike && styles.btn_like, !isLike && styles.btn_unlike]}>
                        {
                            isLike && <Image source={like} style={styles.like} /> ||
                            !isLike && <Image source={unlike} style={styles.like} />
                        }
                        <Text style={[isLike && styles.txt_btn_like, !isLike && styles.txt_btn_unlike]} onPress={()=>handleFav()}>
                            {
                                isLike && "お気に入り済み" ||
                                !isLike && "この店舗をお気に入りにする"
                            }
                        </Text>
                    </View>
                </Pressable>                
                <View ><Text onPress={() => setShowModal(true)} style={styles.btn_go}>報酬を確定</Text></View>
            </View>
            <Footer num={3} {...props}/>
        </View>
    );
}