import { StyleSheet, Text, View, Image, Pressable, Picker } from 'react-native';
import { useState, useEffect } from 'react';

import { css, horizontalScale, verticalScale, moderateScale } from '../../style';
import Footer from '../../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import btn_return from '../../assets/return.png';
import star from '../../assets/star.png';

import axios from 'axios';
const baseurl = "https://jobi.work";
const styles = StyleSheet.create({
    cont: {
        paddingTop: horizontalScale(75),
    },
    header: {
        width: horizontalScale(428),
        paddingTop: horizontalScale(33),
        paddingLeft: horizontalScale(31),
        paddingBottom: horizontalScale(5),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: horizontalScale(9),
        borderBottomColor: '#eee',
        position: 'fixed',
        top: 0,
        zIndex: 10,
        backgroundColor: 'white',
    },
    btn_return: {
        width: horizontalScale(27),
        height: horizontalScale(27),
    },
    ttl: {
        marginLeft: horizontalScale(49),
        color: '#303030',
        fontSize: horizontalScale(18),
        fontWeight: 'bold',
    },
    board: {
        backgroundColor: 'white',
        width: horizontalScale(374),
        padding: horizontalScale(20),
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: horizontalScale(30),
        boxShadow: '0 3px 6px #ddd',
        position: 'relative',
    },
    ver_line: {
        position: 'absolute',
        width: horizontalScale(1),
        height: horizontalScale(797),
        backgroundColor: '#5C8EF2',
        top: horizontalScale(19),
        left: horizontalScale(235),
    },
    box_txt: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderBottomWidth: horizontalScale(1),
        borderBottomColor: '#5C8EF2',
        paddingBottom: horizontalScale(16),
    },
    star: {
        width: horizontalScale(20),
        height: horizontalScale(19),
    },
    txt_skillname: {
        color: '#333333',
        fontSize: horizontalScale(15),
        marginLeft: horizontalScale(19),
    },
    txt_skilllevel: {
        color: '#333333',
        fontSize: horizontalScale(15),
        marginLeft: horizontalScale(35),
    },
    box_input: {
        marginTop: horizontalScale(21),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    txt_left: {
        fontSize: horizontalScale(17),
    },
    select_right: {
        width: horizontalScale(100),
        height: horizontalScale(33),
        borderColor: '#BEBEBE',
        borderWidth: horizontalScale(1),
        borderRadius: horizontalScale(5),
        fontSize: horizontalScale(16),
        marginLeft: horizontalScale(35),
        backgroundColor: 'white',
        paddingLeft: horizontalScale(20),
    },
    btn_go: {
        width: horizontalScale(332),
        height: horizontalScale(48),
        borderRadius: horizontalScale(5),
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: horizontalScale(18),
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: horizontalScale(16),
        backgroundColor: '#2C92D2',
    },
});

const skill_list =[
    {
        "name":'physical_strength',
        "label":"体力"
    },
    {
        "name":'healthy',
        "label":"元気"
    },
    {
        "name":'smile',
        "label":"笑顔"
    },
    {
        "name":'hakihaki',
        "label":"はきはき"
    },
    {
        "name":'communication_skills',
        "label":"コミュニケーション力"
    },
    {
        "name":'customer_service',
        "label":"接客"
    },
    {
        "name":'bar_counter',
        "label":"バーカウンター"
    },
    {
        "name":'order',
        "label":"オーダー"
    },
    {
        "name":'hall_serving',
        "label":"ホール・配膳"
    },
    {
        "name":'kitchen',
        "label":"キッチン"
    },
    {
        "name":'washing_place',
        "label":"洗い場"
    },
    {
        "name":'cleaning',
        "label":"清掃"
    },
    {
        "name":'PC_operation',
        "label":"PC操作"
    },
    {
        "name":'phone',
        "label":"電話"
    },
]
export default function MyFixedSkillPage(props) {
    
    const array_number = Array.from(Array(10).keys()).map(item => item + 1);
    const [skills, setSkills] = useState({})
    const getUserData = async ()=>{
        let userData =  JSON.parse(await AsyncStorage.getItem("userData")) || null;
        let token = userData.token;
        let config = {
            method: 'get',
            url: `${baseurl}/api/profile`,
            headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
            }
        };
        axios(config)
        .then((response)=>{
            if(response.data.skills.length > 0){
                setSkills(response.data.skills[0])
            }
        })
        .catch((error)=>{
            if(error.response.status===401){
                AsyncStorage.removeItem("userData");
                 props.navigation.naviage("IntroPage")
            }
        })
    }

    useEffect(()=>{
        getUserData()
    },[])

    const handleSubmit = async() =>{
        let userData =  JSON.parse(await AsyncStorage.getItem("userData")) || null;
        let token = userData.token;
        let data = JSON.stringify(skills)
        let config = {
            method: 'post',
            url: `${baseurl}/api/skill`,
            headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
            },
            data:data
        };
        axios(config)
        .then((response)=>{
            getUserData()
        })
        .catch((error)=>{
            if(error.response.status===401){
                AsyncStorage.removeItem("userData");
                 props.navigation.naviage("IntroPage")
            }
        })
    }
    return (
        <View style={[css.cont_white, styles.cont]}>
            <View style={styles.header}>
                <Pressable onPress={()=>{props.navigation.goBack()}}>
                    <Image source={btn_return} style={styles.btn_return} />
                </Pressable>
                <Text style={styles.ttl}>あなたのスキルを追加する</Text>
            </View>
            <View style={styles.board}>
                <View style={styles.ver_line} />
                <View style={styles.box_txt}>
                    <Image source={star} style={styles.star} />
                    <Text style={styles.txt_skillname}>スキルの名前</Text>
                    <Text style={styles.txt_skilllevel}>スキルのレベル</Text>
                </View>
                {
                    skill_list.map((item, index) =>
                        <View style={styles.box_input} key={index}>
                            <Text style={styles.txt_left}>{item.label}</Text>
                            <Picker style={styles.select_right} onValueChange={(value)=>{setSkills({...skills, [item.name]:value})}} placeholder='common:filterPlaceholder' value={skills[item.name] ? skills[item.name] : 0}>
                                <Picker.Item value={0} label="1~10" enabled={false} color="gray" disabled/>
                                {
                                    array_number.map((number, index) =>
                                    <Picker.Item label={number} value={number} key={index} />)
                                }
                            </Picker>
                        </View>
                    )
                }
                
            </View>
            <Text style={styles.btn_go} onPress={()=>handleSubmit()}>スキルの追加・変更</Text>
            <Footer num={5} {...props}/>
        </View >
    );
}

