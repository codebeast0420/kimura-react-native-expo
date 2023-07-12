import { StyleSheet, Text, View, Image, Pressable, TextInput } from 'react-native';
import { useState, useEffect } from 'react';

import { css, cutString, horizontalScale } from '../../style';
import Footer from '../../components/Footer';

import btn_return from '../../assets/return.png';
import star from '../../assets/star.png';
import review from '../../assets/review.png';
import star_full from '../../assets/star_full.png';
import star_empty from '../../assets/star_empty.png';
import btn_remove from '../../assets/x.png';
import photo from '../../assets/photo_person.png';
import doll from '../../assets/doll2.png';
import money from '../../assets/money.png';
import crown from '../../assets/crown.png';
import btn_showmore from '../../assets/showmore.png';
import btn_prev from '../../assets/prev.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const baseurl = "https://jobi.work";

const styles = StyleSheet.create({
    header: {
        paddingTop: horizontalScale(33),
        paddingLeft: horizontalScale(31),
        paddingBottom: horizontalScale(5),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: horizontalScale(9),
        borderBottomColor: '#eee',
        position: 'fixed',
        width: horizontalScale(428),
        zIndex: 50,
        backgroundColor: '#fff',
    },
    btn_return: {
        width: horizontalScale(27),
        height: horizontalScale(27),
    },
    ttl: {
        marginLeft: horizontalScale(117),
        color: '#303030',
        fontSize: horizontalScale(18),
        fontWeight: 'bold',
    },
    photo: {
        width: horizontalScale(150),
        height: horizontalScale(150),
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: '100%',
        borderWidth: horizontalScale(3),
        borderColor: 'white',
        marginTop: horizontalScale(100),
        boxShadow: '0 3px 10px #ddd',
    },
    txt_name: {
        textAlign: 'center',
        marginTop: horizontalScale(12),
        color: '#333333',
        fontSize: horizontalScale(20),
    },
    box_doll: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: horizontalScale(8),
    },
    txt_money: {
        fontSize: horizontalScale(17),
        height: '#707070',
        marginTop: horizontalScale(18),
        marginLeft: horizontalScale(28),
    },
    box_money: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: horizontalScale(8),
    },
    money: {
        width: horizontalScale(59),
        height: horizontalScale(42),
    },
    num_money: {
        fontSize: horizontalScale(30),
        color: '#707070',
    },
    btn_money: {
        borderRadius: horizontalScale(12),
        backgroundColor: '#FA8673',
        color: 'white',
        width: horizontalScale(212),
        height: horizontalScale(32),
        fontSize: horizontalScale(12),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: horizontalScale(12),
        marginTop: horizontalScale(11),
    },
    doll: {
        width: horizontalScale(128),
        height: horizontalScale(150),
        marginLeft: horizontalScale(32),
    },
    board: {
        backgroundColor: 'white',
        width: horizontalScale(374),
        padding: horizontalScale(20),
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: horizontalScale(17),
        boxShadow: '0 3px 6px #ddd',
    },
    box_crown: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    crown: {
        width: horizontalScale(32),
        height: horizontalScale(24),
    },
    txt_crown: {
        marginLeft: horizontalScale(23),
        color: '#333333',
        fontSize: horizontalScale(20),
    },
    box_circle: {
        borderRadius: '100%',
        borderColor: '#DED8CD',
        borderWidth: horizontalScale(16),
        width: horizontalScale(170),
        height: horizontalScale(170),
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inner_circle: {
        borderRadius: '100%',
        borderColor: '#DED8CD',
        borderWidth: horizontalScale(16),
        width: horizontalScale(120),
        height: horizontalScale(120),
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingBottom: horizontalScale(25),
        paddingLeft: horizontalScale(20),
    },
    txt_circle1: {
        fontSize: horizontalScale(14),
        fontWeight: 'bold',
        color: '#333333',
        paddingBottom: horizontalScale(3),
    },
    txt_circle2: {
        fontSize: horizontalScale(28),
        fontWeight: 'bold',
        color: '#333333',
        marginLeft: horizontalScale(12),
    },
    ttl_percent: {
        color: '#333333',
        fontSize: horizontalScale(16),
        fontWeight: 'bold',
        marginTop: horizontalScale(23),
        textAlign: 'center',
    },
    txt_percent: {
        color: '#E2A500',
        fontSize: horizontalScale(24),
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: horizontalScale(13),
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: horizontalScale(1),
    },
    box_percent: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: horizontalScale(12),
        width: '100%',
    },
    item_percent: {
        width: '30%',
        display: 'flex',
        alignItems: 'center',
        borderRightColor: '#CCCCCC',
        borderRightWidth: horizontalScale(1),
    },
    num_item_percent: {
        color: '#50A5AD',
        fontSize: horizontalScale(24),
        fontWeight: 'bold',
    },
    txt_item_percent: {
        color: '#333333',
        fontSize: horizontalScale(13),
        fontWeight: 'bold',
        marginTop: horizontalScale(5),
    },
    box_skill: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: horizontalScale(10),
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: horizontalScale(1),
    },
    skill: {
        width: horizontalScale(20),
        height: horizontalScale(19),
    },
    ttl_skill: {
        color: '#333333',
        fontSize: horizontalScale(20),
        marginLeft: horizontalScale(21),
    },
    item_skill: {
        marginTop: horizontalScale(22),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: horizontalScale(10),
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: horizontalScale(1),
        paddingLeft: horizontalScale(6),
        paddingRight: horizontalScale(6),
        width: '100%',
    },
    lvl_skill: {
        width: horizontalScale(26),
        height: horizontalScale(26),
        borderRadius: horizontalScale(26),
        color: 'white',
        fontWeight: 'bold',
        fontSize: horizontalScale(14),
        backgroundColor: '#303030',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txt_skill: {
        marginLeft: horizontalScale(13),
    },
    btn_remove: {
        width: horizontalScale(15),
        height: horizontalScale(15),
    },
    btn_skill: {
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
    star: {
        width: horizontalScale(25),
        height: horizontalScale(23),
    },
    box_star: {
        width: horizontalScale(156),
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    item_star: {
        display: 'flex',
        alignItems: 'center',
    },
    txt_star: {
        fontSize: horizontalScale(7),
        color: '#4B00E0',
        marginTop: horizontalScale(3),
        fontWeight: 'bold',
    },
    txt_star_no: {
        fontSize: horizontalScale(7),
        color: 'transparent',
        marginTop: horizontalScale(3),
        fontWeight: 'bold',
    },
    item_review: {
        paddingLeft: horizontalScale(5),
        paddingRight: horizontalScale(5),
        width: '100%',
        borderBottomColor: '#ccc',
        borderBottomWidth: horizontalScale(1),
    },
    item_review_header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: horizontalScale(12),
        paddingBottom: horizontalScale(12),
    },
    txt_more: {
        marginLeft: horizontalScale(27),
        fontSize: horizontalScale(15),
        color: '#333333',
    },
    btn_showmore: {
        width: horizontalScale(16),
        height: horizontalScale(23),
    },
    btn_showmore_active: {
        rotate: '90deg',
    },
    txt_review: {
        fontSize: horizontalScale(15),
        color: '#333333',
        paddingBottom: horizontalScale(30),
    },
    pagination: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: horizontalScale(15),
    },
    box_btn_pagination: {
        width: horizontalScale(35),
        height: horizontalScale(35),
        borderRadius: horizontalScale(4),
        borderColor: '#E8E9EC',
        borderWidth: horizontalScale(1),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: horizontalScale(16),
    },
    btn_prev: {
        width: horizontalScale(8),
        height: horizontalScale(13),
    },
    btn_next: {
        width: horizontalScale(8),
        height: horizontalScale(13),
        rotate: '180deg',
    },
    num_page: {
        color: '#707070',
        fontSize: horizontalScale(12),
        marginRight: horizontalScale(16),
    },
    btn_contact: {
        marginTop: horizontalScale(18),
        textAlign: 'center',
        color: '#707070',
        fontSize: horizontalScale(14),
    },
    btn_delete: {
        marginTop: horizontalScale(18),
        textAlign: 'center',
        color: '#707070',
        fontSize: horizontalScale(14),
        marginBottom: horizontalScale(20),
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



export default function MyPage(props) {

    const [showReviewMoreIndex, setShowReviewMoreIndex] = useState(0);
    const array_rating = [1, 1, 1, 1, 1];
    const [basic_info, setBasicInfo] = useState(null);
    const [skills, setSkills] = useState({});
    const [reviews, setReviews] = useState([]);
 
    const getUserData =async()=>{
        var userData =  JSON.parse(await AsyncStorage.getItem("userData")) || null;
        var token = userData.token;
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
            setBasicInfo(response.data.basic_data)
            if(response.data.skills.length > 0){
                setSkills(response.data.skills[0])
            }
            setReviews(response.data.reviews)
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

    const handleRemoveSkill = async (name) =>{
        let userData =  JSON.parse(await AsyncStorage.getItem("userData")) || null;
        let token = userData.token
        let config = {
            method: 'delete',
            url: `${baseurl}/api/skill/${name}`,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
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

    const showReviewMore = index => {
        setShowReviewMoreIndex(index);
    }

    return (
        <View style={css.cont_white}>
            <View style={styles.header}>
                <Pressable onPress={()=>props.navigation.goBack()}>
                    <Image source={btn_return} style={styles.btn_return} />
                </Pressable>
                <Text style={styles.ttl}>マイページ</Text>
            </View>
            <Image source={basic_info?.avatar!==null ?  {uri:`${baseurl}/media/${basic_info?.avatar}`} : photo} style={styles.photo} />
            <Text style={styles.txt_name}>{basic_info?.name}({new Date(new Date() - new Date(basic_info?.birthday)).getFullYear() - 1970 + 1})</Text>
            <View style={styles.box_doll}>
                <Image source={doll} style={styles.doll} />
                <View>
                    <Text style={styles.txt_money}>あなたへの報酬金額</Text>
                    <View style={styles.box_money}>
                        <Image source={money} style={styles.money} />
                        <Text style={styles.num_money}>{basic_info?.income_price.toLocaleString('en-US').toString()}円</Text>
                    </View>
                    <Text style={styles.btn_money} onPress={()=>props.navigation.navigate('TransferAccountPage')}>振込先口座の確認・変更</Text>
                </View>
            </View>
            <View style={styles.board}>
               
                <View style={styles.box_percent}>
                    <View style={styles.item_percent}>
                        <Text style={styles.num_item_percent}>{basic_info?.cancel_rate}</Text>
                        <Text style={styles.txt_item_percent}>キャンセル率</Text>
                    </View>
                    <View style={styles.item_percent}>
                        <Text style={styles.num_item_percent}>{basic_info?.working_hour}</Text>
                        <Text style={styles.txt_item_percent}>就業時間</Text>
                    </View>
                    <View style={[styles.item_percent, { borderRightColor: 'transparent' }]}>
                        <Text style={styles.num_item_percent}>{basic_info?.panelty_point}</Text>
                        <Text style={styles.txt_item_percent}>ペナルティ</Text>
                    </View>
                </View>
            </View>
            <View style={styles.board}>
                <View style={styles.box_skill}>
                    <Image source={star} style={styles.skill} />
                    <Text style={styles.ttl_skill}>あなたのスキル</Text>
                </View>
                {
                    skill_list.map((item, index) =>
                        (skills[item.name] && skills[item.name]!=0) ?
                        <View style={styles.item_skill} key={index}>
                            <Text style={styles.lvl_skill}>{skills[item.name]}</Text>
                            <Text style={styles.txt_skill}>{item.label}</Text>
                            <Pressable style={{ marginLeft: 'auto' }} onPress={()=>{handleRemoveSkill(item.name)}}>
                                <Image source={btn_remove} style={styles.btn_remove} />
                            </Pressable>
                        </View>
                        :
                        null
                        
                    )
                }
                <Text style={styles.btn_skill} onPress={()=>props.navigation.navigate('MyFixedSkillPage')}>スキルの追加・変更</Text>
            </View>
            <View style={styles.board}>
                <View style={styles.box_skill}>
                    <Image source={review} style={styles.skill} />
                    <Text style={styles.ttl_skill}>あなたへのレビュー</Text>
                </View>
                {
                    reviews.map((item, index) =>
                        <View style={styles.item_review} key={index}>
                            <View style={styles.item_review_header}>
                                <View style={styles.box_star}>
                                    {
                                        array_rating.map((el, idx) =>
                                            <View style={styles.item_star} key={idx}>
                                                {
                                                    item.point > idx ? <Image source={star_full} style={styles.star} /> 
                                                    :
                                                    <Image source={star_empty} style={styles.star} />
                                                }
                                                <Text style={item.point > idx && styles.txt_star || styles.txt_star_no}>{idx + 1}</Text>
                                            </View>
                                        )
                                    }
                                </View>
                                
                                {
                                    showReviewMoreIndex != index ? <Text style={styles.txt_more}>{cutString(item.comment, 5)}</Text> : null
                                }
                                <Pressable onPress={() => showReviewMore(index)} style={{marginLeft: 'auto'}}>
                                    <Image source={btn_showmore} style={[styles.btn_showmore, showReviewMoreIndex == index && styles.btn_showmore_active]} />
                                </Pressable>
                            </View>
                            {
                                showReviewMoreIndex == index ? <Text style={styles.txt_review}>{item.comment}</Text> : null
                            }
                        </View>
                    )
                }
            </View>
            <Text style={styles.btn_contact} onPress={()=>{props.navigation.navigate('ContactPage')}}>お問い合わせ</Text>
            <Text style={styles.btn_delete} onPress={()=>{console.log("delete")}}>アカウントを削除</Text>
            <Footer num={5} {...props}/>
        </View >
    );
}
