import { StyleSheet, Text, View, Image, TextInput } from 'react-native';

import { css, horizontalScale, verticalScale, moderateScale } from '../../style';

import img_logo from '../../assets/logo2.png';
import photo from '../../assets/photo_person.png';
import img_end from '../../assets/img-auth-index.png';

const styles = StyleSheet.create({
    img_logo: {
        width: horizontalScale(355),
        height: horizontalScale(141),
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: horizontalScale(50),
    },
    name: {
        fontSize: horizontalScale(24),
        textAlign: 'center',
        marginTop: horizontalScale(40),
        color: '#404040',
    },
    photo: {
        width: horizontalScale(104),
        height: horizontalScale(104),
        marginTop: horizontalScale(14),
        marginLeft: horizontalScale(248),
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius:'50%'
    },
    text_small: {
        fontSize: 15.5,
        textAlign: 'center',
        marginTop: horizontalScale(29),
        color: '#404040',
    },
    text_big: {
        fontSize: horizontalScale(28),
        textAlign: 'center',
        marginTop: horizontalScale(6),
        color: '#5D4AFF',
    },
    btn_yellow: {
        marginTop: horizontalScale(37),
        backgroundColor: '#332180',
        height: horizontalScale(65),
        color: 'white',
    },
    img_end: {
        marginTop: horizontalScale(35),
        width: horizontalScale(220),
        height: horizontalScale(211),
        marginTop: horizontalScale(48),
        marginBottom: horizontalScale(50),
        marginLeft: 'auto',
        marginRight: 'auto',
    },
});

export default function RegistPage4(props) {
    let {state} = props.route.params;
    const [avatar, setAvatar] = useState(photo_default)
    useEffect(()=>{      
        // if(location.state.avatar) {
        //     // setAvatar(URL.createObjectURL(location.state.avatar)) 
        // }
              
    },[])
    return (
        <View style={css.cont_white_full}>
            <Image source={img_logo} style={styles.img_logo} />
            <Text style={styles.name}>{state?.name}さん</Text>
            <Image source={avatar} style={styles.photo} />
            <Text style={styles.text_small}>おめでとうございます！</Text>
            <Text style={styles.text_big}>登録完了！</Text>          
            <Text onPress={()=>{props.navigatin.navigate("LoginPage")}} style={[css.btn_yellow, styles.btn_yellow]}>さぁはじめよう！</Text>    
            <Image source={img_end} style={styles.img_end} />
        </View >
    );
}
