import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
// import MapView from 'react-native-maps';

import { css, horizontalScale, verticalScale, moderateScale } from '../../style';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import img_heart from '../../assets/heart-no.png';
import img_go from '../../assets/left.png';
import photo from '../../assets/photo-worker.png';
import img_clock from '../../assets/clock.png';
import img_dollar from '../../assets/dollar.png';
import img_noexp from '../../assets/noexp.png';
import img_car from '../../assets/car.png';
import img_moneyhand from '../../assets/moneyhand.png';
import btn_grad from '../../assets/btn-grad2.png';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const baseurl = "https://jobi.work";

const styles = StyleSheet.create({
    header: {
        paddingTop: horizontalScale(35),
        paddingLeft: horizontalScale(21),
        paddingRight: horizontalScale(21),
        paddingBottom: horizontalScale(35),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'fixed',
        width: horizontalScale(428),
        top: 0,
        zIndex: 2,
        backgroundColor: 'white',
    },
    return: {
        width: horizontalScale(11),
        height: horizontalScale(20),
    },
    ttl: {
        fontSize: horizontalScale(15),
        fontWeight: 'bold',
        color: '#172B4D',
    },
    heart: {
        width: horizontalScale(19),
        height: horizontalScale(17),
    },
    box_photo: {
        position: 'relative',
        marginTop: horizontalScale(83),
    },
    photo: {
        width: horizontalScale(428),
        height: horizontalScale(310),
    },
    price_on_img: {
        position: 'absolute',
        width: horizontalScale(83),
        height: horizontalScale(33),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#2C92D2',
        fontSize: horizontalScale(20),
        fontWeight: 'bold',
        borderRadius: horizontalScale(4),
        right: horizontalScale(20),
        bottom: horizontalScale(14),
        backgroundColor: 'white',
    },
    box_main: {
        width: '100%',
        paddingLeft: horizontalScale(21),
        paddingRight: horizontalScale(21),
    },
    path: {
        fontSize: horizontalScale(13),
        color: '#959595',
        marginTop: horizontalScale(16),
    },
    txt: {
        color: '#172B4D',
        fontSize: horizontalScale(15),
        marginTop: horizontalScale(13),
    },
    box_clock: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: horizontalScale(20),
    },
    img_clock: {
        width: horizontalScale(18),
        height: horizontalScale(18),
    },
    txt_clock: {
        marginLeft: horizontalScale(13),
        fontSize: horizontalScale(14),
        fontWeight: 'bold',
        color: '#4D4D4D',
    },
    box_price: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: horizontalScale(7),
    },
    img_dollar: {
        width: horizontalScale(10),
        height: horizontalScale(18),
        marginLeft: horizontalScale(4),
        marginRight: horizontalScale(4),
    },
    box_deadline: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: horizontalScale(9),
    },
    txt_deadline: {
        fontSize: horizontalScale(12),
        color: '#2C92D2',
        marginLeft: horizontalScale(10),
        fontWeight: 'bold',
    },
    btn_deadline: {
        width: horizontalScale(91),
        height: horizontalScale(21),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: horizontalScale(29),
        fontSize: horizontalScale(12),
        fontWeight: 'bold',
        color: 'white',
        borderRadius: horizontalScale(4),
        backgroundColor: '#FA8673',
    },
    ttl_treat: {
        fontSize: horizontalScale(15),
        color: '#172B4D',
        paddingTop: horizontalScale(15),
        marginTop: horizontalScale(15),
        borderTopColor: '#707070',
        borderTopWidth: '1px',
    },
    box_treat: {
        marginTop: horizontalScale(10),
        display: 'flex',
        flexDirection: 'row',
    },
    item_treat: {
        width: horizontalScale(74),
        height: horizontalScale(71),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: horizontalScale(12),
        backgroundColor: '#E1F0FB',
        marginRight: horizontalScale(15),
    },
    img_treat: {
        width: horizontalScale(31),
        height: horizontalScale(31),
    },
    txt_treat: {
        fontSize: horizontalScale(10),
        color: '#959595',
        marginTop: horizontalScale(7),
    },
    ttl_content: {
        fontSize: horizontalScale(15),
        color: '#172B4D',
        paddingTop: horizontalScale(15),
        marginTop: horizontalScale(15),
        borderTopColor: '#707070',
        borderTopWidth: '1px',
    },
    txt_content: {
        color: '#4D4D4D',
        fontSize: horizontalScale(14),
        fontWeight: 'bold',
        marginTop: horizontalScale(17),
    },
    box_ttl_content_more: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: horizontalScale(25),
    },
    ttl_content_more: {
        color: '#172B4D',
        fontSize: horizontalScale(15),
    },
    img_go_map: {
        width: horizontalScale(6),
        height: horizontalScale(10),
        rotate: '270deg',
        marginLeft: horizontalScale(22),
    },
    box_subttl: {
        fontSize: horizontalScale(15),
        color: '#172B4D',
        paddingTop: horizontalScale(15),
        marginTop: horizontalScale(15),
        borderTopColor: '#707070',
        borderTopWidth: '1px',
    },
    address: {
        color: '#4D4D4D',
        fontSize: horizontalScale(14),
        marginTop: horizontalScale(14),
    },
    map: {
        width: horizontalScale(428),
        marginLeft: horizontalScale(-14),
        height: horizontalScale(347),
    },
    btn_use_other_app: {
        color: '#2C92D2',
        fontSize: horizontalScale(15),
        marginTop: horizontalScale(14),
        textAlign: 'center',
    },
    ttl_warning: {
        fontSize: horizontalScale(15),
        color: '#172B4D',
        paddingTop: horizontalScale(15),
        marginTop: horizontalScale(15),
        borderTopColor: '#707070',
        borderTopWidth: '1px',
    },
    txt_warning: {
        color: '#4D4D4D',
        fontSize: horizontalScale(14),
        marginTop: horizontalScale(17),
    },
    ttl_thing: {
        fontSize: horizontalScale(15),
        color: '#172B4D',
        paddingTop: horizontalScale(15),
        marginTop: horizontalScale(15),
        borderTopColor: '#707070',
        borderTopWidth: '1px',
    },
    txt_thing: {
        color: '#4D4D4D',
        fontSize: horizontalScale(14),
        marginTop: horizontalScale(20),
    },
    btn_yellow: {
        position: 'fixed',
        bottom: horizontalScale(110),
        left: horizontalScale(0),
        right: horizontalScale(0),
        marginLeft: 'auto',
        marginRight: 'auto',
        cursor: "pointer"
    },
    txt_waiting: {
        position: 'fixed',
        bottom: horizontalScale(110),
        left: horizontalScale(0),
        right: horizontalScale(0),
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#172B4D',
        color: 'white',
    },
    txt_applied: {
        position: 'fixed',
        bottom: horizontalScale(110),
        left: horizontalScale(0),
        right: horizontalScale(0),
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#fce800',
        color: '#3d258e',
    },
    btn_grad: {
        position: 'fixed',
        bottom: horizontalScale(110),
        left: horizontalScale(0),
        right: horizontalScale(0),
        marginLeft: 'auto',
        marginRight: 'auto',
        width: horizontalScale(300),
        height: horizontalScale(54),
    }
});

export default function WorkDetailPage(props) {
    let id = props.route.params;

    const [isShowContentMore, setShowContentMore] = useState(false);
    const [isShowWarningMore, setShowWarningMore] = useState(false);
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    const [userStatus, setUserStatus] = useState(2)
    const [postData, setPostData] = useState({})
    const [belongs, setBelongs] = useState({})
    const [applied, setApplied] = useState(false)
    const showContentMore = () => {
        setShowContentMore(!isShowContentMore);
    }
    const showWarningMore = () => {
        setShowWarningMore(!isShowWarningMore);
    }
    const clickReturn = () => {
        props.navigation.goBack()
    };

    const getJobDetailData = async(id) => {
        let userData = JSON.parse(await AsyncStorage.getItem("userData"));
        let token = userData.token

        let config = {
            method: 'get',
            url: `${baseurl}/api/job/${id}`,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
        axios(config).then((response) => {
            let user = response.data.user_data
            if (user.user_doc == null) {
                setUserStatus(0)
            }
            if (user.identify == false) {
                setUserStatus(1)
            }
            else {
                setUserStatus(2)
            }
            setApplied(user.applied)
            setPostData(response.data.job_data)
            setBelongs(JSON.parse(response.data.job_data.belongings))

        })
            .catch((error) => {
                if (error.response.status === 401) {
                    AsyncStorage.removeItem("userData");
                    props.navigation.naviage("IntroPage")
                }
            });
    }

    useEffect(() => {        
        getJobDetailData(id);
    }, [])
    return (
        <div className='cont_jobdetailpage'>
            <View style={css.cont_white}>
                <View style={styles.header}>
                    <Pressable onPress={clickReturn}>
                        <Image source={img_go} style={styles.return} />
                    </Pressable>
                    <Text style={styles.ttl}>{postData.start_date ? `${postData.start_date?.substr(0, 4)}年${postData.start_date?.substr(5, 2)}月${postData.start_date?.substr(8, 2)}日(${days[new Date(postData.start_date).getDay()]})` : ""}</Text>
                    <Image source={img_heart} style={styles.heart} />
                </View>
                <View style={styles.box_photo}>
                    <Image source={ { uri: `${baseurl}/media/${postData?.img1}` }} style={styles.photo} />
                    <Text style={styles.price_on_img}>{'¥' + postData.hourly?.toLocaleString('en-US').toString()}</Text>
                </View>
                <View style={styles.box_main}>
                    <Text style={styles.path}>{postData.shop}</Text>
                    <Text style={styles.txt}>{postData.title}</Text>
                    <View style={styles.box_clock}>
                        <Image source={img_clock} style={styles.img_clock} />
                        <Text style={styles.txt_clock}>{postData.start_date ? `${postData.start_date?.substr(0, 4)}年${postData.start_date?.substr(5, 2)}月${postData.start_date?.substr(8, 2)}日(${days[new Date(postData.start_date).getDay()]})` : ""}{postData.start_time?.substr(0, 5)}〜{postData.end_time?.substr(0, 5)} ({postData?.relax_time !== 0 ? "休憩あり" : "休憩あり"})</Text>
                    </View>
                    <View style={styles.box_price}>
                        <Image source={img_dollar} style={styles.img_dollar} />
                        <Text style={styles.txt_clock}>交通費支給 {postData.transportation_expenses?.toLocaleString('en-US').toString()}円</Text>
                    </View>
                    <View style={styles.box_deadline}>
                       
                        <View ><Text style={styles.btn_deadline}>募集人数 {postData.recruitment_number}名</Text></View>
                    </View>
                    <Text style={styles.ttl_treat}>待遇</Text>
                    <View style={styles.box_treat}>
                        <View style={styles.item_treat}>
                            <Image source={img_noexp} style={styles.img_treat} />
                            <Text style={styles.txt_treat}>未経験者OK</Text>
                        </View>
                        <View style={styles.item_treat}>
                            <Image source={img_car} style={styles.img_treat} />
                            <Text style={styles.txt_treat}>バイク車通勤OK</Text>
                        </View>
                        <View style={styles.item_treat}>
                            <Image source={img_moneyhand} style={styles.img_treat} />
                            <Text style={styles.txt_treat}>交通費支給</Text>
                        </View>
                    </View>
                    <Text style={styles.ttl_content}>仕事内容</Text>
                    <Text style={styles.txt_content}>{postData.content}</Text>
                    <Pressable onPress={showContentMore}>
                        <View style={styles.box_ttl_content_more}>
                            <Text style={styles.ttl_content_more}>さらに表示</Text>
                            <Image source={img_go} style={styles.img_go_map} />
                        </View>
                    </Pressable>
                    
                    {
                        isShowContentMore ==ture ?
                        <View>
                            <Text style={styles.box_subttl}>働く場所</Text>
                            <Text style={styles.address}>{postData.working_address1 + postData.working_address2 + postData.working_address3}</Text>
                            
                            <View style={styles.btn_use_other_app}>ほかのアプリで行き方を確認</View>
                        </View>
                        : null
                    }
                    <Text style={styles.ttl_warning}>注意事項</Text>
                    <Text style={styles.txt_warning}>{postData.notes}</Text>
                    <Pressable onPress={showWarningMore}>
                        <View style={styles.box_ttl_content_more}>
                            <Text style={styles.ttl_content_more}>さらに表示</Text>
                            <Image source={img_go} style={styles.img_go_map} />
                        </View>
                    </Pressable>
                   
                    {
                        isShowWarningMore==true ?
                        <View>
                            <Text style={styles.ttl_thing}>持ち物</Text>
                            <View style={styles.txt_thing}>
                                {belongs.uniform==ture ? <View><Text>私服OK</Text></View>: null}
                                {belongs.shoes==ture ? <View><Text>シューズ貸し出し</Text></View>: null}
                                {belongs.pen==ture ? <View><Text>筆記用具</Text></View>: null}
                                {belongs.snack==ture ? <View><Text>飲み物・軽食</Text></View>: null}
                            </View>
                        </View>
                        :null
                    }
                    <View style={{ marginBottom: 150 }} />
                </View>
                {
                    applied==true ?
                    <View style={[css.btn_yellow, styles.txt_applied]}>応募済み</View>
                    :
                    <>
                        {
                            userStatus==0 ? <Pressable onPress={() => { props.navigation.navigate("CertificatePage", { state: { id: id } }) }}> <View style={[css.btn_yellow, styles.btn_yellow]} >本人確認にすすむ</View> </Pressable> : null 
                        } 
                        {    userStatus == 1 ? <View style={[css.btn_yellow, styles.txt_waiting]}>本人確認資料を確認中</View> : null }
                        {    userStatus == 2 ?
                            <Pressable onPress={() => { if (postData) props.navigation.navigate("WorkConformPage", {id:id,state: { postData: postData }}) }}>
                                <Image source={btn_grad} style={styles.btn_grad} />
                            </Pressable> : null
                        }
                    </>    
                    
                }

                <Footer num={1} {...props}/>
            </View>
        </div>
    );
}