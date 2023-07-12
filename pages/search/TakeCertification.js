import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import {  useState, useRef } from 'react'


import { css, horizontalScale, verticalScale, moderateScale } from '../../style';

import btn_camera from '../../assets/camera2.png';
import btn_return from '../../assets/left.png';
import { Camera, CameraType } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const baseurl = "https://jobi.work";

const styles = StyleSheet.create({
    btn_return: {
        width: horizontalScale(12),
        height: horizontalScale(20),
        position: 'absolute',
        top: horizontalScale(30),
        left: horizontalScale(20),
    },
    img: {
        width: horizontalScale(428),
        height: horizontalScale(375),
    },
    ttl: {
        fontSize: horizontalScale(28),
        fontWeight: 'bold',
        marginTop: horizontalScale(0),
        marginLeft: horizontalScale(15),
        marginRight: horizontalScale(15),
    },
    txt: {
        marginTop: horizontalScale(20),
        marginLeft: horizontalScale(15),
        marginRight: horizontalScale(15),
        fontSize: horizontalScale(16),
    },
    btn_camera: {
        width: horizontalScale(77),
        height: horizontalScale(77),
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: horizontalScale(350),
    },
    box_btn: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: horizontalScale(175),
        paddingLeft: horizontalScale(20),
        paddingRight: horizontalScale(20),
    },
    btn_left: {
        border: '1px solid #3478F6',
        color: '#3478F6',
        width: horizontalScale(100),
        height: horizontalScale(40),
    },
    btn_right: {
        backgroundColor: '#3478F6',
        color: 'white',
        width: horizontalScale(120),
        height: horizontalScale(40),
    }
});

// const videoConstraints = {
   
//     facingMode: 'environment',
//   }

export default function CertificatePage(props) {
    let {id} = props.route.params.state;
    
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const camRef = useRef(null);
    const [camera, setCamera] = useState(false)
    const [imageurl, setImageURL] = useState("")
    const [image, setImage] = useState(null)

    if (!permission){        
         return <Text>No access to camera</Text>;
    }

    // if (!permission.granted){
    //     // return <Text>No access to camera</Text>;
    // }
    const capture = async() =>{
        const options = { quality: 0.7, base64: true };
        const data = await camRef.current.takePictureAsync(options);
        const source = `data:image/jpg;base64,${source}`;
        setImageURL(source);
        if(source){
            const binaryImage = atob(source);
            const byteArray = new Uint8Array(binaryImage.length);
                for (let i = 0; i < binaryImage.length; i++) {
                byteArray[i] = binaryImage.charCodeAt(i);
            }
            const cert_blob = new Blob([byteArray], { type: "image/jpeg" });
            const cert_file = new File([cert_blob], "cert_image.jpg", { type: "image/jpeg" });
            setImage(cert_file)
            setCamera(false)
        }
    }
    const handleSubmit = async(event) =>{
        if(!image) return
        const fd = new FormData();
        var userData =  JSON.parse(await AsyncStorage.getItem("userData")) || null;
        var token = userData.token;
        fd.append('certification',image);
        let config = {
            method: 'post',
            url: `${baseurl}/api/certificate`,
            headers: { 
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token
            },
            data : fd,
        };
        axios(config)
        .then((response) => {            
            props.navigation.navigate("AddressInputPage",{state:{id:id}})
        })
    }

    return (
        <>
        {
        camera==true ?
            <View style={css.cont_white_full}>
                <Camera ref={camRef} ratio='16:9' />
                    <Text style={styles.ttl}>運転免許証のオモテ面全体を撮 影してください</Text>
                    <Text style={styles.txt}>運転免許証の表面を撮影してください<br/>※必ず運転免許証の原本全体を撮影してください</Text>
                    <Pressable onPress={()=>{capture()}}>
                        <Image source={btn_camera} style={styles.btn_camera}/>
                    </Pressable>                
                    <Pressable style={{position: 'initial'}} onPress={()=>{props.navigation.goBack()}}>
                        <Image source={btn_return} style={styles.btn_return}/>
                    </Pressable>
                
            </View>       
        :
            <View style={css.cont_white_full}>             
                <Image source={imageurl} style={styles.img} />
                <Text style={styles.ttl}>身分証明書全体が、鮮明に写っていますか？</Text>
                <Text style={styles.txt}>運転免許証のオモッテ面全体が鮮明に写っている、手ブレ、はみ出し、反射のない写真でなければなりません。</Text>
                <Text style={styles.txt}>また、身分証明書が、タイミー上で第三者に開示されることはありません。</Text>
                <View style={styles.box_btn}>
                    <Text style={[css.btn, styles.btn_left]} onPress={()=>setCamera(true)}>撮り撮る</Text> 
                    <Text style={[css.btn, styles.btn_right]} onPress={handleSubmit}>この写真にOK</Text>
                </View>
                <Pressable style={{position: 'initial'}} onPress={()=>{props.navigation.goBack()}}>
                    <Image source={btn_return} style={styles.btn_return} />
                </Pressable>
            </View>
        }
        </>
    );
}