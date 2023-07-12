
import Main from './Main';
import btn_next from '../../assets/btn-next.png'
import bg_intro1 from '../../assets/bg-intro1.png';
import bg_intro2 from '../../assets/bg-intro2.png';
import bg_intro3 from '../../assets/bg-intro3.png';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function IntroPage(props) {
  const retrieveData = async () => {
    try {
    const v = await AsyncStorage.getItem('visited');
    const u = await AsyncStorage.getItem('userData');
    if(u==null){
        if(v){
            props.navigation.navigate('AuthIndexPage')
            
        }
        else{
            props.navigation.navigate('IntroPage')
        }
    }
    else{
      props.navigation.navigate('WorkListPage')
    }
    } catch (error) {
    console.log('Error retrieving data:', error);
    }
};

useEffect(()=>{
    retrieveData();
})
  return (
    <Main 
        page_num = "1"
        bg = {[bg_intro1,bg_intro2,bg_intro3]}
        btn_next = {btn_next}
        {...props}
    />
  );
}