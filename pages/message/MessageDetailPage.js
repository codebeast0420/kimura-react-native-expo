import { Pressable, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { useRef, useState, useEffect } from 'react';
import * as MediaLibrary from 'expo-media-library';
// import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';

import { css, cutString, horizontalScale } from '../../style';
import Footer from '../../components/Footer';
import downloadimage from '../../assets/icon-download.png'
import btn_return from '../../assets/next.png';
import img_user from '../../assets/user.png';
import rec from '../../assets/rec.png';
import camera from '../../assets/camera3.png';
import emoji from '../../assets/emoji.png';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const baseurl = "https://jobi.work";

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: "max-content",
        paddingLeft: horizontalScale(25),
        paddingRight: horizontalScale(25),
        backgroundColor: 'white',
        position: 'fixed',
        zIndex: 10,
        width: horizontalScale(428),
        height: horizontalScale(97),
    },
    btn_return: {
        width: horizontalScale(25),
        height: horizontalScale(25),
        rotate: '180deg',
    },
    img_user: {
        marginLeft: horizontalScale(15),
        width: horizontalScale(62),
        height: horizontalScale(62),
        borderRadius:"50%"
    },
    box_txt: {
        marginLeft: 9
    },
    ttl: {
        color: '#2C92D2',
        fontSize: horizontalScale(16),
        width: horizontalScale(225),
        wordBreak: 'break-word',
    },
    name: {
        color: '#303030',
        fontSize: horizontalScale(21),
        fontWeight: 'bold',
    },
    btn_more: {
        marginLeft: 'auto',
        fontSize: horizontalScale(30),
        lineHeight: '0.3',
        fontWeight: 'bold',
        marginBottom: horizontalScale(10),
    },
    board: {
        paddingTop: horizontalScale(110),
        paddingLeft: horizontalScale(20),
        paddingRight: horizontalScale(20),
        paddingBottom: horizontalScale(70),
    },
    today: {
        fontSize: horizontalScale(18),
        color: '#303030',
        textAlign: 'center',
        marginBottom: horizontalScale(24),
    },
    msg_left: {
        padding: horizontalScale(10),
        borderRadius: horizontalScale(10),
        borderTopLeftRadius: horizontalScale(0),
        backgroundColor: '#EEEEEE',
        fontSize: horizontalScale(18),
        color: '#303030',
        marginTop: horizontalScale(10),
        maxWidth: horizontalScale(325),
        width: 'max-content',
    },
    time_left: {
        fontSize: horizontalScale(14),
        color: '#9E9F9F',
        marginTop: horizontalScale(6),
    },
    msg_right: {
        padding: horizontalScale(10),
        borderRadius: horizontalScale(10),
        borderTopRightRadius: horizontalScale(0),
        // backgroundColor: '#EEEEEE',
        fontSize: horizontalScale(18),
        color: '#303030',
        marginTop: horizontalScale(10),
        marginLeft: 'auto',
        maxWidth: horizontalScale(325),
        width: 'max-content',
        backgroundColor:"#7fc4fd"
    },
    time_right: {
        fontSize: horizontalScale(14),
        color: '#9E9F9F',
        marginTop: horizontalScale(6),
        textAlign: 'right',
        
    },
    rec: {
        width: horizontalScale(234),
        height: horizontalScale(45),
        marginLeft: 'auto',
        marginTop: horizontalScale(10),
    },
    box_input: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: horizontalScale(68),
        paddingLeft: horizontalScale(25),
        paddingRight: horizontalScale(25),
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        left: horizontalScale(0),
        right: horizontalScale(0),
        marginLeft: 'auto',
        marginRight: 'auto',
        bottom: horizontalScale(100),
        position: 'fixed',
        zIndex: 10,
        width: horizontalScale(428),
    },
    camera: {
        width: horizontalScale(26),
        height: horizontalScale(26),
    },
    download:{
        width: horizontalScale(10),
        height: horizontalScale(10),
    },
    input: {
        width: '100%',
        marginLeft: horizontalScale(5),
        marginRight: horizontalScale(5),
        padding: horizontalScale(5),
    },
    emoji: {
        width: horizontalScale(26),
        height: horizontalScale(26),
    },
    popup_img: {
        width: '100%',
        height: horizontalScale(550),
        position: 'fixed',
        bottom: horizontalScale(0),
        left: horizontalScale(0),
        borderRadius: horizontalScale(50),
        boxShadow: '0 0 10px #888',
        padding: horizontalScale(25),
        minHeight: horizontalScale(500),
        backgroundColor: 'white',
    },
    popup_img_inner: {
        width: horizontalScale(384),
        height: horizontalScale(500),
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#888',
        borderRadius: horizontalScale(30),
        paddingLeft: horizontalScale(25),
        paddingRight: horizontalScale(25),
        paddingBottom: horizontalScale(100),
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflow: 'auto',
        position: 'relative',
    },
    photo_real: {
        width: horizontalScale(77),
        height: horizontalScale(77),
        margin: 2.5,
        opacity: .75,
    },
    popup_img_box_btn: {
        position: 'absolute',
        top: horizontalScale(375),
        left: horizontalScale(0),
        right: horizontalScale(0),
        marginLeft: 'auto',
        marginRight: 'auto',
        width: horizontalScale(230),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    btn_gallery: {
        width: horizontalScale(75),
        height: horizontalScale(75),
    },
    btn_camera: {
        width: horizontalScale(50),
        height: horizontalScale(50),
    },
    btn_copy: {
        width: horizontalScale(50),
        height: horizontalScale(50),
    },
});

export default function MessageDetailPage(props) {
    let {id, messageData} = props.route.params;

    const [messages, setMessages] = useState([])
    const [messageCont, setMessageCont] = useState("")
    const [shop_image, setShopImage] = useState(null)
    const [opponent_type, setOpponentType] = useState(false)
    const [attachment, setAttachment] = useState(null)
    const messagesEndRef = useRef(null)
    const attachRef = useRef(null)
    

    const downloadFile = (url)=>{
       
        // FileSystem.downloadAsync(url, url)
        // .then(({ url }) => {
        //     saveFile(url);
        //   })
        //   .catch(error => {
        //     console.error(error);
        //   })
    }
    
    const saveFile = async (fileUri) => {
        const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        if (status === "granted") {
            const asset = await MediaLibrary.createAssetAsync(fileUri)
            await MediaLibrary.createAlbumAsync("Download", asset, false)
        }
    }
    
    const getData = async()=>{
        var userData =  JSON.parse(await AsyncStorage.getItem("userData")) || null;
        var token = userData.token;
        let config = {
            method: 'get',
            url: `${baseurl}/api/message/${id}`,
            headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
            }
        };
        axios(config)
        .then((response)=>{
            setMessages(response.data.messages)
            setShopImage(response.data.shop_image)
            setOpponentType(response.data.opponent_type)
            
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        getData()
    },[])

    const handleSending = ()=>{
        if(messageCont=="")
            return
        else{          
            const fd = new FormData();  
            fd.append("message", messageCont)
            if(attachment){
                fd.append("attachment",attachment)
                setMessages([...messages, {"contents":messageCont, send:0, "attach":attachment}])
            }
            else{
                setMessages([...messages, {"contents":messageCont, send:0}])
            }
            let userData =  JSON.parse(AsyncStorage.getItem("userData")) || null;
            let token = userData.token;
            setMessageCont("")
            let config = {
                method: 'put',
                url: `${baseurl}/api/message/${id}`,
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token
                },
                data:fd
            };
            axios(config)
            .then((response)=>{
                setMessageCont("")
                getData()
            })
            .catch((error)=>{
                console.log(error)
            })

        }
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const updateAttach = (event)=>{
        let fileObj = event.target.files[0];
        setAttachment(fileObj);
    }

    return (
        <View style={[css.cont_white, styles.cont]}>
            <View style={styles.header}>
                <Pressable onPress={()=>{props.navigation.goBack()}}>
                
                    <Image source={btn_return} style={styles.btn_return} />
                </Pressable>
                <Image source={shop_image!==null ?  {uri:`${baseurl}/media/${shop_image}`} : img_user} style={styles.img_user} />
                {
                    opponent_type ? 
                    <Text style={styles.name}>JOBi事務局</Text> :
                    <View style={styles.box_txt}>
                        <Text style={styles.ttl}>{messageData?.room__job__start_date.substr(5,2)}月{messageData?.room__job__start_date.substr(8,2)}日 {cutString(messageData.room__job__title,9)}</Text>
                        <Text style={styles.name}>{messageData.room__shop__name}</Text>
                    </View>
                }
                <View style={{marginLeft: 'auto'}} ><Text style={styles.btn_more}>.<br />.<br />.</Text></View>
            </View>
            <View style={styles.board}>
              
                {messages.map((item, index)=>(
                    <View key={index}>
                        <View style={item.send!==0 ? styles.msg_left : styles.msg_right}>
                            <View>{item.contents}</View>
                            {(item.attach!=="" && item.attach) ?
                            <View>
                                    <View className="w-[40px] h-[40px] bg-[#FF7052] text-[14px] text-white flex justify-center items-center mr-[20px] rounded-[10px]"><Text>画像</Text></View>
                                    <Pressable onPress={()=>downloadFile(`${baseurl}/media/${item.attach}`)}> <View ><Image source={downloadimage} alt="download" style={styles.download}/></View></Pressable>
                            </View> : null}
                        </View>
                        <Text style={item.send!==0 ? styles.time_left : styles.time_right}>{item?.timestamp?.substr(11,5)}</Text>
                    </View>
                ))}  
                <View ref={messagesEndRef}></View>   
                
            </View>
            <View style={styles.box_input}>
                <Image source={emoji} style={styles.emoji} />               
                <TextInput style={styles.input} placeholder="メッセージを入力" onSubmitEditing={()=>{handleSending()}} onChangeText={(text)=>{setMessageCont(text)}} value={messageCont}/>
                <Pressable> <Image source={camera} style={styles.camera} /></Pressable>
                
            </View>
            <Footer num={4} {...props}/>
        </View>
    );
}