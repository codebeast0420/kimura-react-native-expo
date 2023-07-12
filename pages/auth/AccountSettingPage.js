import { Pressable, StyleSheet, Text, View, Image, TextInput, Picker } from 'react-native';
import { useState, useRef, useEffect } from "react";

import ButtonNext from '../../components/ButtonNext';
import CheckBox from '../../components/CheckBox';
import { css, horizontalScale, verticalScale, moderateScale } from '../../style';
import img_logo from '../../assets/logo2.png';
import photo_default from '../../assets/photo.png';
import btn_camera from '../../assets/camera.png';
import btn_next from '../../assets/btn-next.png';
import btn_back from '../../assets/btn-back.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const baseurl = "https://jobi.work";

const styles = StyleSheet.create({
    header: {
        marginTop: horizontalScale(38),
        display: 'flex',
        flexDirection: 'row',
    },
    btn_back: {
        marginLeft: horizontalScale(39),
        width: horizontalScale(16),
        height: horizontalScale(16),
    },
    header_ttl: {
        marginLeft: horizontalScale(128),
        color: 'white',
        fontSize: 15.5,
    },
    img_logo: {
        width: horizontalScale(355),
        height: horizontalScale(141),
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: horizontalScale(47),
    },
    ttl: {
        marginTop: horizontalScale(30),
    },
    sub_ttl: {
        fontSize: 15.5,
        color: 'white',
        paddingLeft: horizontalScale(67),
        marginTop: horizontalScale(20),
        marginBottom: 9
    },
    box: {
        width: horizontalScale(300),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 'auto',
        marginRight: 'auto',
        alignItems: 'flex-end',
    },
    input: {
        width: horizontalScale(145),
        marginLeft: horizontalScale(0),
        marginRight: horizontalScale(0),
    },

    input_multi:{
        width: horizontalScale(145),
        marginLeft: horizontalScale(0),
        marginRight: horizontalScale(0),
        
    },
    select: {
        border: 'none',
        width: horizontalScale(72),
        marginLeft: horizontalScale(0),
        marginRight: horizontalScale(0),
        paddingLeft: horizontalScale(10),
    },
    box_gender: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: horizontalScale(64),
    },
    checkbox: {
        width: horizontalScale(30),
        height: horizontalScale(30),
        backgroundColor: 'blue'
    },
    text_label: {
        fontSize: horizontalScale(14),
        color: 'white',
    },
    text_yellow: {
        color: '#E1FA08',
        fontSize: horizontalScale(12),
        marginLeft: horizontalScale(67),
    },
    photo_box: {
        width: horizontalScale(104),
        marginTop: horizontalScale(-75),
        marginLeft: horizontalScale(248),
        position: 'relative',
    },
    photo: {
        width: horizontalScale(104),
        height: horizontalScale(104),
        borderRadius:'50%'
    },
    btn_camera: {
        width: horizontalScale(40),
        height: horizontalScale(40),
        position: 'absolute',
        right: horizontalScale(-5),
        bottom: horizontalScale(-5),
    },
    btn_next: {
        marginTop: horizontalScale(27),
        marginLeft: horizontalScale(327),
        marginBottom: horizontalScale(49),
    },
    input_ok: {
        backgroundColor: 'transparent',
        appearance: 'none',
    },
    date_ok: {
        alignItems: 'center',
    },
    text_agree: {
        color: 'white',
        fontSize: horizontalScale(12),
        marginTop: horizontalScale(35),
        marginLeft: horizontalScale(67),
    },
    btn_yellow: {
        marginTop: horizontalScale(35),
        marginBottom: horizontalScale(50),
    },
    error: {
        color: 'red',
        marginLeft: horizontalScale(64),
        fontSize: 15.5,
    },
});

export default function RegistPage4(props) {
    const navigate = useNavigate();
    const years = Array.from(Array(new Date().getFullYear() - 1950 - 16).keys()).map(i=> i + 1950);
    const months = Array.from(Array(12).keys()).map(i=> i + 1);
    const days = Array.from(Array(31).keys()).map(i=> i+1);   
    const [gender, setGender] = useState("男性");  
    const [conform, setConform] = useState(false);
    const [year, setYear] = useState("")
    const [month, setMonth] = useState("")
    const [day, setDay] = useState("")
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [first_gana_name, setFirstGanaName] = useState("")
    const [last_gana_name, setLastGanaName] = useState("")
    const [birthDayError, setBirthDayError] = useState("")
    const [qualification, setQualification] = useState("")
    const [nameError, setNameError] = useState("")
    const [ganaError, setGanaError] = useState("")
    const [avatar, setAvatar] = useState(photo_default)
    const [imageFile, setImageFile] = useState(null);
    const [phone, setPhone] = useState("")
    // const image = useRef();

    

    const clickCheckMale = () => {
        if (!conform) {
            setGender("男性")
        }
    }
    const clickCheckFemale = () => {
        if (!conform) {
            setGender("女性")
        }
    }
    const clickGo = () => {
        let validate = true
        // if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)==false)
        // {
        //   setMailError("有効なメールアドレスを入力してください。");
        //   validate = false
        // }
        if(year==="" || month==="" || day===""){
            setBirthDayError("生年月日を入力してください")
            validate = false
        }
        if(first_name==="" || last_name===""){
            setNameError("氏名を入力してください")
            validate = false
        }
        if(first_gana_name==="" || last_gana_name===""){
            setGanaError("フリガナを入力してください")
            validate = false
        }
        if(!validate) return
        setConform(true);
    }

    const clickEdit = () => {
        setConform(false);
    }

    // const updateImage = (event)=>{
    //     let fileObj = event.target.files[0];            
    //     setAvatar(URL.createObjectURL(fileObj));
    //     setImageFile(fileObj)
        
    // }

    useEffect(async()=>{
        let data = await AsyncStorage.getItem("register-phone")
        if(data)
            setPhone(data)
        else
          navigate("RegisterPage")
        
    },[])

    const handleSubmit = () =>{        
        const fd = new FormData();
        fd.append("name1",first_name)
        fd.append("name2",last_name)
        fd.append("gana1",first_gana_name)
        fd.append("gana2",last_gana_name)
        fd.append("gender",gender)
        fd.append("user_type","user")
        fd.append("phone",phone)
        fd.append("qualification",qualification)
        fd.append("birthday", `${year}-${month}-${day}`)
        if(imageFile){
            fd.append("image", imageFile) 
        }
              
        var config = {
          method: 'POST',
          url: `${baseurl}/api/user/account-register`,
          headers: { 
            'Content-Type': 'multipart/form-data',
          },
          data : fd,
        };
        axios(config).then((response)=>{    
            props.navigation.navigate("/RegistEndPage",{
                state: {
                    // avatar:imageFile,
                    name:first_name,
                }}
        )
        })
        .catch((error)=>{
            if(error?.response?.data?.type=="already"){
               
            }
        });
    }

    return (
        <View style={css.cont_blue}>
            {
                conform ?
                <View style={styles.header}>
                    <Pressable onPress={clickEdit}>
                        <Image source={btn_back} style={styles.btn_back} />
                    </Pressable>
                    <Text style={styles.header_ttl}>最終確認</Text>
                </View> : null
            }
            <Image source={img_logo} style={styles.img_logo} />
            <Text style={[css.ttl, styles.ttl]}>基本情報入力</Text>
            <Text style={styles.sub_ttl}>氏名</Text>
            <View style={styles.box}>
                <TextInput value={first_name} onChangeText={(text)=>{setNameError(""); setFirstName(text)}}  style={[css.input, styles.input, conform && styles.input_ok]} placeholder={!conform && '姓'} disabled={conform} />
                <TextInput value={last_name} onChangeText={(text)=>{setNameError(""); setLastName(text)}} style={[css.input, styles.input, conform && styles.input_ok]} placeholder={!conform && '名'} disabled={conform} />
            </View>
            <Text style={styles.error}>{nameError}</Text>
            <Text style={styles.sub_ttl}>フリガナ</Text>
            <View style={styles.box}>
                <TextInput value={first_gana_name} onChangeText={(text)=>{setGanaError(""); setFirstGanaName(text)}} style={[css.input, styles.input, conform && styles.input_ok]} placeholder={!conform && 'セイ'} disabled={conform} />
                <TextInput value={last_gana_name} onChangeText={(text)=>{setGanaError(""); setLastGanaName(text)}} style={[css.input, styles.input, conform && styles.input_ok]} placeholder={!conform && 'メイ'} disabled={conform} />
            </View>
            <Text style={styles.error}>{ganaError}</Text>
            <Text style={styles.sub_ttl}>生年月日</Text>
            <View style={[styles.box, conform && styles.date_ok]}>
                <Picker
                    style={[css.input, styles.select, conform && styles.input_ok]}
                    disabled={conform}
                    onValueChange={(value)=>{setBirthDayError("");setYear(value)}}
                    value={year}
                >
                    <Picker.Item label="選択" value="" disabled={true}/>
                    {
                    years.map((item,index) =>
                        <Picker.Item label={item} key={index} color="blue" value={item} />
                    )
                    }
                </Picker>
                <Text style={styles.text_label}>年</Text>
                <Picker
                    style={[css.input, styles.select, conform && styles.input_ok]}
                    disabled={conform}
                    onValueChange={(value)=>{setBirthDayError("");setMonth(value)}}
                    value={month}
                >
                    <Picker.Item label="選択" value="" disabled={true}/>
                    {
                    months.map((item,index) =>
                        <Picker.Item label={item} key={index} color="blue" value={item} />
                    )
                    }
                </Picker>
                <Text style={styles.text_label}>月</Text>
                <Picker
                    style={[css.input, styles.select, conform && styles.input_ok]}
                    disabled={conform}
                    onValueChange={(value)=>{setBirthDayError("");setDay(value)}}
                    value={day}
                >
                    <Picker.Item label="選択" value=""  disabled={true}/>
                    {
                        days.map((item,index) =>
                            <Picker.Item label={item} key={index} color="blue" value={item} />
                        )
                    }
                </Picker>
                <Text style={styles.text_label}>日</Text>
            </View>
            <Text style={styles.error}>{birthDayError}</Text>
            <Text style={styles.sub_ttl}>性別</Text>
            <View style={styles.box_gender}>
                <CheckBox
                    onPress={() => clickCheckMale()}
                    txt="男性"
                    checked={gender==="男性"}
                    disabled={conform}
                />
                <View style={{ marginLeft: 58 }} />
                <CheckBox
                    onPress={() => clickCheckFemale()}
                    txt="女性"
                    checked={gender==="女性"}
                    disabled={conform}
                />
            </View>
          
            
            <Text style={styles.sub_ttl}>顔写真のアップロード</Text>
            <Text style={styles.text_yellow}>必ず顔が分かる写真を<br />お選び下さい。</Text>
            <View style={styles.photo_box}>
                <Image source={avatar} style={styles.photo} />
                {
                    !conform &&
                    <Pressable > <Image source={btn_camera} style={styles.btn_camera} /></Pressable>
                }
            </View>
           
            <Text style={styles.sub_ttl}>保有資格（お持ちの方のみ）</Text>
            <TextInput style={[css.input_multi, conform && styles.input_ok]} multiline = {true} numberOfLines = {8} value={qualification} onChangeText={(text)=>setQualification(text)}/>
            
            {
                conform==true ?
                <View>
                    <Text style={styles.text_agree}>登録完了すると利用規約とプライバシーポリシーに<br />同意したことになります。</Text>
                    <Pressable onPress={handleSubmit}><View style={[css.btn_yellow, styles.btn_yellow]} ><Text>✓　この内容で会員登録する</Text></View></Pressable>
                </View>
                :
                <Pressable onPress={clickGo}><View style={styles.btn_next}><ButtonNext img={btn_next} txt='4/5' /></View></Pressable>
            }
        </View >
    );
}
