import { StyleSheet, Text, View, Image, Pressable, TextInput } from 'react-native';
import { useState } from 'react';

import { css, horizontalScale, verticalScale, moderateScale } from '../../style';
import Footer from '../../components/Footer';

import btn_return from '../../assets/return.png';
import star from '../../assets/star.png';

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
    },
    btn_return: {
        width: horizontalScale(27),
        height: horizontalScale(27),
    },
    ttl: {
        marginLeft: horizontalScale(49),
        color: '#303030',
        fontSize: horizontalScale(18),
        fontWeight: 'bold',
    },
    board: {
        backgroundColor: 'white',
        width: horizontalScale(374),
        padding: horizontalScale(20),
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: horizontalScale(30),
        boxShadow: '0 3px 6px #ddd',
    },
    box_txt: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    star: {
        width: horizontalScale(20),
        height: horizontalScale(19),
    },
    txt_skillname: {
        color: '#333333',
        fontSize: horizontalScale(15),
        marginLeft: horizontalScale(19),
    },
    txt_skilllevel: {
        color: '#333333',
        fontSize: horizontalScale(15),
        marginLeft: horizontalScale(87),
    },
    box_input: {
        marginTop: horizontalScale(22),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input_left: {
        width: horizontalScale(197),
        height: horizontalScale(42),
        borderColor: '#BEBEBE',
        borderWidth: horizontalScale(1),
        borderRadius: horizontalScale(5),
        fontSize: horizontalScale(16),
        paddingLeft: horizontalScale(23),
        paddingRight: horizontalScale(23),
    },
    input_right: {
        width: horizontalScale(120),
        height: horizontalScale(42),
        borderColor: '#BEBEBE',
        borderWidth: horizontalScale(1),
        borderRadius: horizontalScale(5),
        fontSize: horizontalScale(16),
        paddingLeft: horizontalScale(23),
        paddingRight: horizontalScale(23),
    },
    btn_go: {
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
});

export default function MySkillPage(props) {
    const array = [1,2,3,4,5,6];
    return (
        <View style={css.cont_white}>
            <View style={styles.header}>
                <Pressable>
                    <Image source={btn_return} style={styles.btn_return} />
                </Pressable>
                <Text style={styles.ttl}>あなたのスキルを追加する</Text>
            </View>
            <View style={styles.board}>
                <View style={styles.box_txt}>
                    <Image source={star} style={styles.star} />
                    <Text style={styles.txt_skillname}>スキルの名前</Text>
                    <Text style={styles.txt_skilllevel}>スキルのレベル</Text>
                </View>
                {
                    array.map((item, index)=>
                        <View style={styles.box_input} key={index}>
                            <TextInput style={styles.input_left} placeholder="入力" placeholderTextColor="#9B9B9B" />
                            <TextInput style={styles.input_right} placeholder="1~10" placeholderTextColor="#9B9B9B" />
                        </View>
                    )
                }
                <Text style={styles.btn_go}>スキルの追加・変更</Text>
            </View>
            <Footer num={5} {...props}/>
        </View >
    );
}
