import { StyleSheet, Text, View, Image } from 'react-native';

import { css, horizontalScale, verticalScale, moderateScale } from '../../style';
import Footer from '../../components/Footer';

import img_logo from '../../assets/logo2.png';
import img_mid from '../../assets/work_end.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect,useState } from 'react';
import axios from 'axios';

const baseurl = "https://jobi.work";

const styles = StyleSheet.create({
    cont: {
        backgroundColor: 'white',
    },
    img_logo: {
        width: horizontalScale(355),
        height: horizontalScale(141),
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: horizontalScale(47),
    },
    txt1: {
        color: '#303030',
        fontSize: horizontalScale(22),
        marginTop: horizontalScale(26),
        textAlign: 'center',
    },
    txt2: {
        color: '#303030',
        fontSize: horizontalScale(37),
        marginTop: horizontalScale(9),
        textAlign: 'center',
    },
    txt3: {
        color: '#303030',
        fontSize: horizontalScale(22),
        marginTop: horizontalScale(3),
        textAlign: 'center',
    },
    img_mid: {
        width: horizontalScale(287),
        height: horizontalScale(215),
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    btn_yellow: {
        backgroundColor: '#FFC602',
        borderRadius: horizontalScale(5),
        width: horizontalScale(300),
        height: horizontalScale(72),
        marginTop: horizontalScale(26),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    txt_btn_1: {
        fontSize: horizontalScale(16),
        color: 'black',
    },
    txt_btn_2: {
        color: '#676767',
        fontSize: horizontalScale(12),
    }
});

export default function WorkEndPage(props) {
    const {id}  = props.route.params
   
    const [price, setPrice] = useState(0)
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
            setPrice(response.data.data.price)
        })
        .catch((error)=>{
           
            if(error.response.status===401){
                AsyncStorage.removeItem("userData");
                 props.navigation.naviage("IntroPage")
            }
        })
    },[])
    return (
        <View style={[css.cont_white, styles.cont]}>
            <Image source={img_logo} style={styles.img_logo} />
            <Text style={styles.txt1}>報酬が確定しました！</Text>
            <Image source={img_mid} style={styles.img_mid} />
            <Text style={styles.txt2}>{price.toLocaleString('en-US').toString()}円</Text>
            <Text style={styles.txt3}>お疲れ様でした。</Text>
            <Pressable onPress={()=>{props.navigation.navigate('MyPage')}}>
                <View style={styles.btn_yellow}>
                    <Text style={styles.txt_btn_1}>振り込み予定を見る</Text>
                    <Text style={styles.txt_btn_2}>マイページへ</Text>
                </View>
            </Pressable>
            
            <Footer num={3} {...props}/>
        </View >
    );
}
