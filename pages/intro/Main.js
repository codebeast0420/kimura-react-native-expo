import { StyleSheet, Text, View, Image, ImageBackground, Pressable } from 'react-native';
import { css, horizontalScale, verticalScale, moderateScale } from '../../style';
import img_logo from '../../assets/logo.png';
import ButtonNext_Intro from './../../components/ButtonNext_Intro';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    bg: {
        width: horizontalScale(428),
        height: horizontalScale(926),
    },
    header: {
        marginTop: horizontalScale(43),
        marginLeft: horizontalScale(51),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    img_logo: {
        width: horizontalScale(187),
        height: horizontalScale(75),
    },
    btn_skip: {
        marginLeft: horizontalScale(99),
        fontSize: horizontalScale(15),
        color: '#000000',
    },
    txt_box: {
        marginTop: horizontalScale(471),
        marginLeft: horizontalScale(53),
        position: 'relative',
    },
    ttl_en: {
        position: 'absolute',
        top: horizontalScale(-30),
        left: horizontalScale(80),
        color: '#5D4AFF',
        fontSize: horizontalScale(29),
        fontWeight: 'bold',
    },
    ttl: {
        marginBottom: horizontalScale(16),
        color: '#5D4AFF',
        fontSize: horizontalScale(37),
        fontWeight: 'bold',
    },
    txt: {
        color: '#2C2C2C',
        fontSize: horizontalScale(14),
    },
    btn_next: {
        marginTop: horizontalScale(40),
    },
    btn: {
        marginTop: horizontalScale(40),
        marginLeft: horizontalScale(335),
        width: horizontalScale(65),
        height: horizontalScale(65),
    },
    num: {
        marginTop: horizontalScale(12),
        marginLeft: horizontalScale(356),
        color: 'white',
        fontSize: horizontalScale(14),
    },
});

const texts = {
    ttl:[
            "好きな時間に働こう",
            "お給料がすぐもらえる",
            "スキマ時間を充実"
    ],
    txt1:[
        "好きな職種を履歴書・面接一切なし！",
        "お仕事が終わったら365日24時間いつでも",
        "ちょっとしたスキマ時間を"

    ],
    txt2:[
        "あなたの働きたい時間ですぐ見つかります。",
        "お給料が引き出せます。",
        "一緒に充実させませんか？"
    ]
}

export default function Main(props) {
   
    const [pageNum, setPageNum] = useState(props.page_num)

    const goNext = () => {
        if(pageNum<3){
            setPageNum(parseInt(pageNum) + 1)
        }
        else{
            setData()
            props.navigation.navigate('AuthIndexPage')
            
        }
    }

    const setData = async () => {
        try {
            await AsyncStorage.setItem('visited', true);
        } catch (error) {
            console.log('Error setting data:', error);
        }
      };

  

  
    
  

    return (
        <View style={css.cont_intro}>
            <ImageBackground source={props.bg[pageNum - 1]} style={styles.bg}>
                <View style={styles.header}>
                    <Image source={img_logo} style={styles.img_logo} />
                    <Text onPress={()=>{navigate("/login")}} style={styles.btn_skip}>スキップ</Text>
                </View>
                <View style={styles.txt_box}>
                    {
                        pageNum == 1 ?  <Text style={styles.ttl_en}>Let’s WORK!</Text> : null
                    }
                    <Text style={styles.ttl}>{texts.ttl[pageNum - 1]}</Text>
                    <Text style={styles.txt}>{texts.txt1[pageNum - 1]}</Text>
                    <Text style={styles.txt}>{texts.txt2[pageNum - 1]}</Text>
                </View>
                <Pressable onPress={goNext}> <View style={styles.btn_next}><ButtonNext_Intro img={props.btn_next} num={pageNum}/></View></Pressable>
            </ImageBackground>
        </View >
    );
}
