import { StyleSheet, Text, View, Image, TextInput, Picker, Pressable } from 'react-native';
import { useRef, useState, useEffect } from 'react';

import { css, horizontalScale, verticalScale, moderateScale } from '../style';
import icon_search from '../assets/search2.png';
import img_right from '../assets/down.png';


const styles = StyleSheet.create({
    header: {
        width: horizontalScale(428),
        height: horizontalScale(196),
        position: 'fixed',
        top: horizontalScale(0),
        paddingLeft: horizontalScale(16),
        paddingRight: horizontalScale(16),
        paddingTop: horizontalScale(36),
        backgroundColor: 'white',
        boxShadow: '0 10px 10px -10px #000',
        zIndex: 10,
    },
    dsc: {
        fontSize: horizontalScale(15),
        color: '#332180',
    },
    box_date: {
        marginTop: horizontalScale(3),
        flexDirection: 'row',
        width: horizontalScale(396),
        overflow: 'auto',
    },
    item_date: {
        justifyContent: 'center',
        alignItems: 'center',
        width: horizontalScale(69),
        height: horizontalScale(65),
        borderRadius: horizontalScale(10),
        border: '1px solid #BABABA',
        marginRight: horizontalScale(10),
    },
    item_date_today: {
        border: 'none',
        backgroundColor: '#FFE400',
    },
    item_date_first: {
        color: '#172B4D',
        fontSize: horizontalScale(15),
        fontWeight: 'bold',
    },
    item_date_second: {
        color: '#172B4D',
        fontSize: horizontalScale(9),
        fontWeight: 'bold',
    },
    box_search: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        width: horizontalScale(396),
    },
    box_input: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: horizontalScale(48),
        position: 'relative',
    },
    icon: {
        position: 'absolute',
        left: horizontalScale(17),
        width: horizontalScale(16),
        height: horizontalScale(16),
    },
    input: {
        color: '#332180',
        fontSize: horizontalScale(14),
        width: horizontalScale(193),
        height: horizontalScale(32),
        paddingLeft: horizontalScale(50),
        borderRadius: horizontalScale(9),
        border: '1px solid #332180',
    },
    ttl_select: {
        color: '#332180',
        fontSize: horizontalScale(13),
        fontWeight: 'bold',
    },
    select: {
        color: '#332180',
        fontSize: horizontalScale(14),
        width: horizontalScale(127),
        height: horizontalScale(32),
        paddingLeft: horizontalScale(19),
        borderRadius: horizontalScale(8),
        border: '1px solid #332180',
    },
    menu_city: {
        position: 'absolute',
        top: horizontalScale(50),
    },
    menu_filter: {
        position: 'absolute',
        top: horizontalScale(50),
        right: horizontalScale(0),
    },
    menu_item: {
        width: horizontalScale(343),
        height: horizontalScale(48),
        marginBottom: horizontalScale(1),
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: horizontalScale(19),
        color: '#332180',
        fontSize: horizontalScale(14),
        fontWeight: 'bold',
        position: 'relative',
        boxShadow: '0 3px 6px #00000033',
    },
    img_arrow_right: {
        position: 'absolute',
        right: horizontalScale(15),
        width: horizontalScale(10),
        height: horizontalScale(10),
        rotate: '-90deg',
    },
    img_arrow_down: {
        position: 'absolute',
        right: horizontalScale(15),
        width: horizontalScale(10),
        height: horizontalScale(10),
    }
});

export default function Header(props) {       
    const [isShowCityMenu, setShowCityMenu] = useState(false);
    const [isShowFilterMenu, setShowFilterMenu] = useState(false);
    const dates = new Array();
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    const now = new Date();
    dates.push({ first: "今日", second: parseInt(now.getMonth()) + 1 + "月" + now.getDate() + '日' + days[now.getDay()] });
    let tmrw = new Date(now.getTime() + (24 * 60 * 60 * 1000));
    dates.push({ first: "明日", second: parseInt(tmrw.getMonth()) + 1 + "月" + tmrw.getDate() + '日' + days[tmrw.getDay()] });
    for (let i = 1; i <= 5; i++) {
        const tmpDate = new Date(tmrw.getTime() + i * (24 * 60 * 60 * 1000));
        dates.push({ first: parseInt(tmpDate.getMonth()) + 1 + "月" + tmpDate.getDate() + '日', second: days[tmpDate.getDay()] });
    }
    const cites = ['那覇市', '浦添市', '宜野湾市', '沖縄市', 'うるま市'];
    const filters = ['未選択', '飲食店', '未経験OK', '交通費支給', '倉庫', '宅配'];
    const onClickCity = name => {
        
        setShowCityMenu(false);
        props.onChange({...props.value, city:name})
        
    }
    const onClickFilter = name => {
        setShowFilterMenu(false);
        props.onChange({...props.value, filter:name})
        
    }
    const showCityMenu = () => {
        setShowCityMenu(true);
        setShowFilterMenu(false);
    }
    const showFilterMenu = () => {
        setShowFilterMenu(true);
        setShowCityMenu(false);
    }
    
    // const ref = useRef();
    // useEffect(() => {
       
    //     const handleClickOutside = (event) => {
    //         console.log(event.target)
    //         // if (!ref?.current?.contains(event.target)) {
    //         //     // setShowCityMenu(false);
    //         //     // setShowFilterMenu(false);
    //         // }
    //     };
    //     document.addEventListener("mousedown", handleClickOutside);
    // }, [ref]);
  
    return (
        <View style={styles.header}>
            <Text style={styles.dsc}>働きたい日を選択</Text>
            <View style={styles.box_date} showsHorizontalScrollIndicator={false}>
                {dates.map((item, index) => (
                            <Pressable onPress={()=>{props.onChange({...props.value, date:index})}}>
                                <View style={props.value.date==index ? [styles.item_date, styles.item_date_today] : styles.item_date} key={index} >
                                    <View><Text style={styles.item_date_first}>{item.first}</Text></View>
                                    <View><Text style={styles.item_date_second}>{item.second}</Text></View>
                                </View>
                            </Pressable>
                           
                ))}
            </View>
            <View style={styles.box_search}>
                <View style={styles.box_input}>
                    <Image source={icon_search} style={styles.icon} />
                    <TextInput style={styles.input} value={props.value.city} onFocus={showCityMenu} />
                    {isShowCityMenu ? <View style={styles.menu_city}>
                        {cites.map((item,index) =>
                            <Pressable  key={index} onPress={() => onClickCity(item)}>
                                <View
                                    style={styles.menu_item}
                                >
                                    <Text>{item}</Text><Image source={img_right} style={styles.img_arrow_right} />
                                </View>
                            </Pressable>
                        )}
                    </View> : null}
                </View>
                <Text style={styles.ttl_select}>絞り込み</Text>
                <TextInput style={styles.select} value={props.value.filter} onFocus={showFilterMenu} />
                <Image source={img_right} style={styles.img_arrow_down} />
                {isShowFilterMenu && <View style={styles.menu_filter}>
                    {filters.map((item,index) => 
                        <Pressable  key={index} onPress={() => onClickFilter(item)}>
                            <View 
                                style={styles.menu_item}
                            >
                                <Text>{item}</Text><Image source={img_right} style={styles.img_arrow_right} />
                            </View>
                        </Pressable>
                    )}
                </View>}
            </View>
        </View>
    );
}
