import { Pressable, StyleSheet, Text, TextInput, View, Image, Picker, TextBase } from 'react-native';
import { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import btn_change_camera from '../../assets/change_camera.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { css, cutString, horizontalScale } from '../../style';

const baseurl = "https://jobi.work";

const styles = StyleSheet.create({
    cont: {
        width: '100vw',
        height: '100vh',
        minHeight: horizontalScale(428),
        minHeight: horizontalScale(926),
        backgroundColor: 'black',
        position: 'relative',
    },
    box_top: {
        position: 'absolute',
        width: 'max-content',
        top: horizontalScale(21),
        left: horizontalScale(0),
        right: horizontalScale(0),
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    txt_top: {
        color: 'white',
        fontSize: horizontalScale(18),
    },
    btn_top: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: horizontalScale(9),
        width: horizontalScale(90),
        height: horizontalScale(30),
        color: 'white',
        fontSize: horizontalScale(15),
        borderRadius: horizontalScale(6),
        borderColor: 'white',
        borderWidth: horizontalScale(1),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box_center: {
        position: 'absolute',
        top: horizontalScale(175),
        left: horizontalScale(0),
        right: horizontalScale(0),
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'white',
        width: horizontalScale(213),
        height: horizontalScale(213),
        borderWidth: horizontalScale(5),
        borderColor: 'black',
    },
    box_center_green: {
        borderColor: '#08D500',
    },
    box_center_red: {
        borderColor: '#d50000',
    },
    box_bottom: {
        position: 'absolute',
        width: 'max-content',
        bottom: horizontalScale(17),
        left: horizontalScale(0),
        right: horizontalScale(0),
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    txt_bottom: {
        color: 'white',
        textAlign: 'center',
        marginBottom: horizontalScale(14),
    },
    btn_change_camera: {
        width: horizontalScale(60),
        height: horizontalScale(52),
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    btn_green: {
        left: horizontalScale(0),
        right: horizontalScale(0),
        marginLeft: 'auto',
        marginRight: 'auto',
        width: horizontalScale(94),
        height: horizontalScale(94),
        borderRadius: horizontalScale(94),
        backgroundColor: '#08D500',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: horizontalScale(24),
    },
    btn_red: {
        left: horizontalScale(0),
        right: horizontalScale(0),
        marginLeft: 'auto',
        marginRight: 'auto',
        width: horizontalScale(94),
        height: horizontalScale(94),
        borderRadius: horizontalScale(94),
        backgroundColor: '#D50000',
        marginBottom: horizontalScale(24),
        position: 'relative',
    },
    checkmark: {
        borderBottomColor: 'white',
        borderLeftColor: 'white',
        borderBottomWidth: horizontalScale(2),
        borderLeftWidth: horizontalScale(2),
        width: horizontalScale(35),
        height: horizontalScale(25),
        rotate: '-45deg',
        marginBottom: horizontalScale(15),
    },
    xmark: {
        position: 'absolute',
        fontSize: horizontalScale(75),
        rotate: '45deg',
        color: 'white',
        top: horizontalScale(-8),
        left: horizontalScale(27),
    },
});


export default function WorkQRPage(props) {
    let {state} = props.route.params;
    console.log(state)
    const [flag, setFlag] = useState(0);
    const [hasPermission, setHasPermission] = useState(null);
    const [activeCamera, setActiveCamera] = useState('environment');
   
    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);
 
    const working = async()=>{        
        let userData =  JSON.parse(await AsyncStorage.getItem("userData"));
        let token = userData.token

        let config = {
            method: 'post',
            url: `${baseurl}/api/working/${state}`,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };
        axios(config)
        .then((response)=>{
            if(response.data.type=="started"){
                navigate(`/work/contract`)
            }
            else{
                navigate(`/work/complete/${state}`)
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
        working()
    },[])

    // if (hasPermission === null) {
    //     return <View />;
    // }
    
    // if (hasPermission === false) {
    // return <View />;
    // }
  
    return (
       

            <View style={styles.cont}>


            <View style={styles.cameraContainer}>
                <BarCodeScanner
                    onBarCodeScanned={()=>{setFlag(1);working()}}
                    style={styles.box_center}
                />
            </View>

             {
                flag == 0 ?
                <View style={styles.box_top}>
                    <Text style={styles.txt_top}>チェックイン</Text>
                    <Text style={styles.btn_top} onPress={()=>props.navigation.goBack()}>閉じる</Text>
                </View> : null
            }
            <View style={styles.box_bottom}>
                <Text text style={styles.txt_bottom}>
                    {
                        flag == 0 && "QRコードが枠に入るように " ||
                        flag == 1 && "読み取りに成功しました！" ||
                        flag == 2 && "読み取りに失敗しました"
                    }
                    <br />
                    {
                        flag == 0 && "調整して下さい、"
                    }
                </Text>
                {
                    flag == 0 && <Pressable onPress={() =>{setActiveCamera(activeCamera === 'environment' ? 'user' : 'environment')}}><Image source={btn_change_camera} style={styles.btn_change_camera} /></Pressable> ||
                    flag == 1 && <View style={styles.btn_green}><View style={styles.checkmark} /></View> ||
                    flag == 2 && <View style={styles.btn_red}><Text style={styles.xmark}>+</Text></View>
                }
            </View>
            </View>
    );
}