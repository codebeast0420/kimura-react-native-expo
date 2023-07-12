import {StyleSheet, Text, Image, View} from 'react-native';

import Footer from '../../components/Footer';
import { css, horizontalScale, verticalScale, moderateScale } from '../../style';

import favourite from '../../assets/favourite.png';

import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const baseurl = "https://jobi.work";


const styles = StyleSheet.create({
    ttl: {
        width: horizontalScale(428),
        height: horizontalScale(69),
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#303030',
        fontSize: horizontalScale(20),
        fontWeight: 'bold',
        paddingTop: horizontalScale(10),
        position: 'fixed',
        zIndex: 2,
    },
    box_item: {
        paddingTop: horizontalScale(69),
    },
    item: {
        width: horizontalScale(367),
        height: horizontalScale(100),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: horizontalScale(1),
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    favourite: {
        width: horizontalScale(55),
        height: horizontalScale(51),
    },
    txt: {
        fontSize: horizontalScale(17),
        color: '#303030',
        fontWeight: 'bold',
        marginLeft: horizontalScale(10),
    },
    btn: {
        width: horizontalScale(96),
        height: horizontalScale(34),
        marginLeft: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: horizontalScale(14),
        backgroundColor: '#7764E4',
        borderRadius: horizontalScale(5),
    },
});

export default function FavouriteShopPage(props) {
    
    const [favorite, setFavorite] = useState([])

    useEffect(async() => {

        let userData =  JSON.parse(await AsyncStorage.getItem("userData"));
        let token = userData.token
        let config = {
            method: 'get',
            url: `${baseurl}/api/favorites`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };
        axios(config)
            .then((response) => {
                setFavorite(response.data.data)
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    AsyncStorage.removeItem("userData");
                    props.navigation.naviage("IntroPage")
                }
            })
    }, [])

    return (
        <View style={css.cont_white}>
            <Text style={styles.ttl}>お気に入り店舗</Text>
            <View style={styles.box_item}>
                {
                    favorite.map((item, index) =>
                        <View style={styles.item} key={index}>
                            <Image source={favourite} style={styles.favourite} />
                            <Text style={styles.txt}>{item.shop__name}</Text>
                            <Text style={styles.btn} onPress={() => {props.navigation.navigate('FavouriteShopDetailPage', `${item.shop__id}`)}}>求人を見る</Text>
                        </View>
                    )
                }
            </View>
            <Footer num={2} {...props} />
        </View>
    );
}