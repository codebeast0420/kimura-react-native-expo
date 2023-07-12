import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { useState } from 'react';

import { css, horizontalScale, verticalScale, moderateScale } from '../../style';
import Footer from '../../components/Footer';
import CheckBox2 from '../../components/CheckBox2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import btn_return from '../../assets/left.png';
import btn_pdf from '../../assets/btn-pdf2.png';
import axios from 'axios';

const baseurl = "https://jobi.work";

const styles = StyleSheet.create({
    box: {
        paddingLeft: horizontalScale(27),
        paddingRight: horizontalScale(27),
    },
    btn_return: {
        width: horizontalScale(12),
        height: horizontalScale(20),
        marginTop: horizontalScale(35),
        marginLeft: horizontalScale(-6),
    },
    ttl: {
        fontSize: horizontalScale(22),
        color: '#172B4D',
        textAlign: 'center',
        marginTop: horizontalScale(23),
        marginBottom: horizontalScale(36),
    },
    subttl: {
        color: '#172B4D',
        fontSize: horizontalScale(15),
        marginBottom: horizontalScale(15),
    },
    txt: {
        color: '#4d4d4d',
        fontSize: horizontalScale(14),
        fontWeight: 'bold'
    },
    border: {
        marginTop: horizontalScale(30),
        marginBottom: horizontalScale(30),
        width: '100%',
        height: horizontalScale(1),
        backgroundColor: '#7FC4FD',
        position: 'relative',
    },
    subbox: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    btn_blue: {
        width: '31%',
        height: horizontalScale(37),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: horizontalScale(12),
        fontWeight: 'bold',
        backgroundColor: '#2C92D2',
        marginBottom: horizontalScale(18),
    },
    btn_pdf: {
        width: horizontalScale(41),
        height: horizontalScale(52),
    },
    btn_yellow: {
        marginBottom: horizontalScale(30),
    },
    box_check: {
        position: 'absolute',
        right: horizontalScale(0),
        bottom: horizontalScale(25),
    },
    bg_modal: {
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: horizontalScale(0),
        left: horizontalScale(0),
        backgroundColor: '#95959595',
        zIndex: 999
    },
    modal: {
        marginTop: horizontalScale(304),
        width: horizontalScale(295),
        height: horizontalScale(205),
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'white',
        paddingTop: horizontalScale(21),
        paddingLeft: horizontalScale(24),
        paddingRight: horizontalScale(24),
        boxShadow: '0 5px 5px #134D7Eaa',
    },
    ttl_modal: {
        fontSize: horizontalScale(14),
        color: '#2699FB',
        fontWeight: 'bold',
    },
    txt_modal: {
        fontSize: horizontalScale(14),
        color: '#2699FB',
        marginTop: horizontalScale(16),
    },
    btn_modal: {
        marginTop: horizontalScale(20),
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'felx',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: horizontalScale(14),
        color: 'white',
        fontWeight: 'bold',
        borderRadius: horizontalScale(16),
        backgroundColor: '#F0BC08',
        width: horizontalScale(177),
        height: horizontalScale(41),
    },
});

export default function WorkConformPage(props) {

  
    let {id} = props.route.params;
    const {postData} = props.route.params.state;

    const days = ['日', '月', '火', '木', '水', '金', '土'];
 
 
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [checked4, setChecked4] = useState(false);
    const [checked5, setChecked5] = useState(false);
    const [checked6, setChecked6] = useState(false);
    const [checked7, setChecked7] = useState(false);
    const [conform, setConform] = useState(false);
    const [message, setMessage] = useState("契約が完了しました！")

    const handleSubmit = async()=>{
        var userData =  JSON.parse(await AsyncStorage.getItem("userData")) || null;
        var token = userData.token;
        if(checked1 && checked2 && checked3 && checked4 && checked5 && checked6 && checked7){
            let config = {
                method: 'post',
                url: `${baseurl}/api/application/${id}`,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                data:""
            }
            axios(config).then((response)=>{
                setMessage("契約が完了しました！")
                setConform(true)
            })
            .catch((error)=>{
                if(error.response.data.message=="already applicated"){
                    setMessage("すでに応募に参加しました。")
                    setConform(true)
                }
                if(error.response.status===401){
                    AsyncStorage.removeItem("userData");
                    props.navigation.navigate("IntroPage")
                }
            });
        }
    }
    return (
        <View style={css.cont_white}>
            {
                conform = true ?
                <View style={styles.bg_modal}>
                    <View style={styles.modal}>
                        <Text style={styles.ttl_modal}>{message}</Text>
                        <Text style={styles.txt_modal}>企業様とメッセージのやりとりが可能になります。メッセンジャーに移動して企業様へ挨拶をして下さい。</Text>
                        <Pressable onPress={()=>{props.navigation.navigate("MessageListPage")}}>
                            <View style={styles.btn_modal} ><Text>メッセンジャーに移動</Text></View>
                        </Pressable> 
                    </View>
                </View> :
                null
            }
            <View style={styles.box}>
                <Pressable onPress={()=>props.navigation.goBack()}>
                    <Image source={btn_return} style={styles.btn_return} />
                </Pressable>
                <Text style={styles.ttl}>お仕事の最終確認</Text>
                <Text style={styles.subttl}>働きたい日時と相違ないですか？</Text>
                <Text style={styles.txt}>{postData.start_date?.substr(0,4)}年{postData.start_date?.substr(5,2)}月{postData.start_date?.substr(8,2)}日({days[new Date(postData.start_date).getDay()]}){postData.start_time?.substr(0,5)}〜{postData.end_time?.substr(0,5)} (休憩あり)</Text>
                <View style={styles.border}>
                    <View style={styles.box_check}>
                        <CheckBox2 txt="はい" checked={checked1} onPress={() => setChecked1(!checked1)} />
                    </View>
                </View>
                <Text style={styles.subttl}>働く場所は確認しましたか？</Text>
                <Text style={styles.txt}>{postData.working_address1 + postData.working_address2 + postData.working_address3}</Text>
                <View style={styles.border}>
                    <View style={styles.box_check}>
                        <CheckBox2 txt="はい" checked={checked2} onPress={() => setChecked2(!checked2)} />
                    </View>
                </View>
                <Text style={styles.subttl}>持ち物を確認しましたか？</Text>
                <View style={styles.txt}>
                            {JSON.parse(postData.belongings || "{}").uniform==true ? <View><Text style={styles.txt}>・私服OK</Text></View> : null}
                            {JSON.parse(postData.belongings || "{}").shoes==true ? <View><Text style={styles.txt}>・シューズ貸し出し</Text></View> : null}
                            {JSON.parse(postData.belongings || "{}").pen==true ? <View><Text style={styles.txt}>・筆記用具</Text></View> : null}
                            {JSON.parse(postData.belongings || "{}").snack==true ? <View><Text style={styles.txt}>・飲み物・軽食</Text></View> : null}
                </View>
                <View style={styles.border}>
                    <View style={styles.box_check}>
                        <CheckBox2 txt="はい" checked={checked3} onPress={() => setChecked3(!checked3)} />
                    </View>
                </View>
                <Text style={styles.subttl}>必要なスキルを確認しましたか？</Text>
                <View style={styles.subbox}>
                    <View style={styles.btn_blue}><Text>オーダー</Text></View>
                    <View style={styles.btn_blue}><Text>接客</Text></View>
                    <View style={styles.btn_blue}><Text>はきはき</Text></View>
                    <View style={styles.btn_blue}><Text>体力</Text></View>
                    <View style={styles.btn_blue}><Text>笑顔</Text></View>
                    <View style={styles.btn_blue}><Text>コミュニケーション</Text></View>
                    <View style={styles.btn_blue}><Text>配膳</Text></View>
                    <View style={styles.btn_blue}><Text>キッチン</Text></View>
                    <View style={styles.btn_blue}><Text>清掃</Text></View>
                </View>
                {
                    conform ==false ? 
                    <View style={{ position: 'initial' }}>
                        <View style={[styles.border, { marginTop: 60 }]}>
                            <View style={styles.box_check}>
                                <CheckBox2 txt="はい" checked={checked4} onPress={() => setChecked4(!checked4)} />
                            </View>
                        </View>
                        <Text style={styles.subttl}>働くための条件を確認しましたか？</Text>
                        <View style={styles.txt}>
                            {JSON.parse(postData.treatment || "{}").bike==true ? <View><Text style={styles.txt}>・バイク通勤OK</Text></View> : null}
                            {JSON.parse(postData.treatment || "{}").car==true ? <View><Text style={styles.txt}>・車通勤OK</Text></View> : null}
                            {JSON.parse(postData.treatment || "{}").launchTime==true ? <View><Text style={styles.txt}>・まかないつき</Text></View> : null}
                            {JSON.parse(postData.treatment || "{}").beginner==true ? <View><Text style={styles.txt}>・未経験者OK</Text></View> : null}
                            {JSON.parse(postData.treatment || "{}").transfee==true ? <View><Text style={styles.txt}>・交通費支給</Text></View> : null}
                            {JSON.parse(postData.treatment || "{}").bicycle==true ? <View><Text style={styles.txt}>・自転車通勤OK</Text></View> : null}
                            {JSON.parse(postData.treatment || "{}").atHome==true ? <View><Text style={styles.txt}>・アットホーム</Text></View> : null}                            : null 
                        </View>
                        <View style={styles.border}>
                            <View style={styles.box_check}>
                                <CheckBox2 txt="はい" checked={checked5} onPress={() => setChecked5(!checked5)} />
                            </View>
                        </View>
                        <Text style={styles.subttl}>業務に関する書類をご確認下さい。</Text>
                        <Pressable>
                            <Image source={btn_pdf} style={styles.btn_pdf} />
                        </Pressable>
                        <View style={styles.border}>
                            <View style={styles.box_check}>
                                <CheckBox2 txt="はい" checked={checked6} onPress={() => setChecked6(!checked6)} />
                            </View>
                        </View>
                        <Text style={styles.subttl}>キャンセルポリシーをご確認下さい。</Text>
                        <Text style={styles.txt}>
                            業務開始の24時間前までに契約破棄を申し出た場合ペナルティポイントが2加算されます。<br />
                            業務開始の12時間前までに契約破棄を申し出た場合ペナルティポイントが3加算されます。<br />
                            業務開始の6時間前までに契約破棄を申し出た場合ペナルティポイントが4加算されます。<br />
                            業務開始まで残り6時間を切っている場合、ペナルティポイントが6加算されます。<br />
                            無断契約破棄の場合は損害賠償として一律8,000円の請求と当サービスの利用を停止させていただきます。
                        </Text>

                        <View style={[styles.border, { marginTop: 60 }]}>
                            <View style={styles.box_check}>
                                <CheckBox2 txt="はい" checked={checked7} onPress={() => setChecked7(!checked7)} />
                            </View>
                        </View>
                        <Pressable onPress={() => handleSubmit()}>
                            <View style={[css.btn_yellow, styles.btn_yellow]}><Text>申し込みを確定</Text></View>
                        </Pressable>                        
                        
                    </View>
                    :
                    null
                }
            </View>
            <Footer num={1} {...props}/>
        </View >
    );
}