import { StyleSheet, Text, View, Image, TextInput } from 'react-native';

import ButtonNext from '../../components/ButtonNext';
import { css, horizontalScale, verticalScale, moderateScale } from '../../style';

import img_logo from '../../assets/logo2.png';
import btn_next from '../../assets/btn-next.png';
import check from '../../assets/check.png';
import AsyncStorage from '@react-native-async-storage/async-storage';


import axios from 'axios';
const baseurl = "https://jobi.work";

const styles = StyleSheet.create({
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
    ttl_input: {
        color: 'white',
        marginTop: horizontalScale(18),
        marginLeft: horizontalScale(64),
        marginBottom: horizontalScale(9),
        fontSize: 15.5,
    },
    btn_next: {
        marginTop: horizontalScale(11),
        marginLeft: horizontalScale(327),
    },
    txt_condition: {
        color: '#E1FA08',
        fontSize: horizontalScale(13),
        fontWeight: 'bold',
        paddingLeft: horizontalScale(67),
        paddingTop: horizontalScale(16),
        marginBottom: horizontalScale(10),
    },
    box_condition: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: horizontalScale(300),
        marginLeft: horizontalScale(67),
    },
    item_condition: {
        width: '50%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: horizontalScale(10),
    },
    check: {
        width: horizontalScale(16),
        height: horizontalScale(16),
        marginRight: horizontalScale(5),
    },
    str_condition: {
        fontSize: horizontalScale(12),
        color: 'white',
    },
    str_condition_checked: {
        color: '#93FFC5',
    }
});

export default function RegistPage3(props) {
    
 
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [phone, setPhone] = useState("")
    const [error, setError] = useState("")
    const [array, setArray] = useState(
        [
            { isMatch: false, txt: "最低8文字以上" },
            { isMatch: false, txt: "数字を含む" },
            { isMatch: false, txt: "英大文字を含む" },
            { isMatch: false, txt: "特殊文字（!?#@）を含む" },
        ]
    )

    const handleSubmit = () =>{  
        var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,50}$/;
        if(!password.match(decimal)){
            return
        }       
        if(password!==passwordConfirm){
            setError("パスワードを正確に入力してください。")
            return
        }
        else{
            let phonenumber = phone.replace(/\s/g, '');
            var data = JSON.stringify({"phone":phonenumber,"password":password});
            var config = {
              method: 'POST',
              url: `${baseurl}/api/password-register`,
              headers: { 
                'Content-Type': 'application/json'
              },
              data : data
            };
            axios(config).then((response)=>{     
                navigate("/account-setting") 
            })
            .catch((error)=>{
              
            });
        }
    }

    useEffect(async ()=>{

        let data = AsyncStorage.getItem("register-phone")
        if(data){
          console.log(data)
          setPhone(data)
        }
        else
          props.navigation.navigate("RegisterPage")
        
    },[])

    const handleChange = (value)=>{        
        setPassword(value)
        let tmp = array
        if(value.length>=8){
            tmp[0] = {isMatch:true,txt: "最低8文字以上"}
            setArray(tmp)
        }
        else{
            tmp[0] = {isMatch:false,txt: "最低8文字以上"}
            setArray(tmp)
        }
        if(/\d/.test(value)){
            tmp[1] = {isMatch:true,txt: "数字を含む"}
            setArray(tmp)
        }
        else{
            tmp[1] = {isMatch:false,txt: "数字を含む"}
            setArray(tmp)
        }
        if(/[A-Z]/.test(value)){
            tmp[2] = {isMatch:true,txt: "英大文字を含む"}
            setArray(tmp)
          
        }
        else{
            tmp[2] = {isMatch:false,txt: "英大文字を含む"}
            setArray(tmp)
        }
        if(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)){
            tmp[3] = {isMatch:true,txt: "特殊文字（!?#@）を含む"}
            setArray(tmp)
        }
        else{
            tmp[3] = {isMatch:false,txt: "特殊文字（!?#@）を含む"}
            setArray(tmp)
        }
      }

    return (
        <View style={css.cont_blue}>
            <Image source={img_logo} style={styles.img_logo} />
            <Text style={[css.ttl, styles.ttl]}>パスワード設定</Text>
           
            <Text style={styles.ttl_input}>パスワード</Text>
            <TextInput secureTextEntry={true} value={password} onChangeText={(text)=>handleChange(text)} style={css.input} placeholder="入力"/>
            <Text style={styles.txt_condition}>下記の要件を満たすパスワードを入力して下さい。</Text>
            <View style={styles.box_condition}>
                {
                    array.map((item, index) =>
                        <View key={index} style={styles.item_condition}>
                            {item.isMatch && <Image source={check} style={styles.check} />}
                            {!item.isMatch && <Text style={styles.str_condition}>・</Text>}
                            <Text style={[styles.str_condition, item.isMatch && styles.str_condition_checked]}>{item.txt}</Text>
                        </View>
                    )
                }
            </View>
            <Text style={[styles.ttl_input, {marginTop:22, marginBottom:9}]}>パスワード再度入力</Text>
            <TextInput secureTextEntry={true} value={passwordConfirm} onChangeText={(text)=>{setError(""); setPasswordConfirm(text)}} style={css.input} placeholder="入力"/>
            
            <Text style={styles.error}>{error}</Text>
            <Pressable onPress={handleSubmit}>
                <View style={styles.btn_next}><ButtonNext img={btn_next} txt='3/5'/></View>
            </Pressable>
            
        </View >
    );
}
