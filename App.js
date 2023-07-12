import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import IntroPage from './pages/intro/IntroPage';
import AuthIndexPage  from './pages/auth/index';
import LoginPage      from './pages/auth/LoginPage';
import RegisterPage    from './pages/auth/RegisterPage';
// import RegistPage2    from './pages/auth/RegistPage2';
import PasswordSettingPage    from './pages/auth/PasswordSettingPage';
import AccountSettingPage    from './pages/auth/AccountSettingPage';
import RegistEndPage  from './pages/auth/RegistEndPage';

import LoadingPage    from './pages/search/LoadingPage';
import FailedPage     from './pages/search/FailedPage';
import WorkListPage   from './pages/search/WorkListPage';
import WorkDetailPage from './pages/search/WorkDetailPage';
import CertificatePage from './pages/search/CertificatePage';
import TakeCertification from './pages/search/TakeCertification';

import CertificateEndPage from './pages/search/CertificateEndPage';
import WorkConformPage from './pages/search/WorkConformPage';

import MessageListPage from './pages/message/MessageListPage';
import MessageDetailPage from './pages/message/MessageDetailPage';

import WorkContractListPage from './pages/work/WorkContractListPage';
import PastHirePage from './pages/work/PastHirePage';
import WorkQRPage from './pages/work/WorkQRPage';
import SalaryFinalConfirmPage from './pages/work/SalaryFinalConfirmPage';
import ReviewInputPage from './pages/work/ReviewInputPage';
import WorkEndPage from './pages/work/WorkEndPage';
import GetQRPage from './pages/work/GetQRPage';

import TransferAccountPage from './pages/mine/TransferAccountPage';
import ContactPage from './pages/mine/ContactPage';
import MySkillPage from './pages/mine/MySkillPage';
import MyFixedSkillPage from './pages/mine/MyFixedSkillPage';
import MyPage from './pages/mine/MyPage';
import AddressInputPage from './pages/mine/AddressInputPage';

import FavouriteShopPage from './pages/favourite/FavouriteShopPage';
import FavouriteShopDetailPage from './pages/favourite/FavouriteShopDetailPage';


const Stack = createStackNavigator();

export default function App() {
  
 
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="IntroPage"
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="IntroPage" component={IntroPage} />
        <Stack.Screen name="AuthIndexPage" component={AuthIndexPage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="RegisterPage" component={RegisterPage} />
      
        <Stack.Screen name="PasswordSettingPage" component={PasswordSettingPage} />
        <Stack.Screen name="AccountSettingPage" component={AccountSettingPage} />
        <Stack.Screen name="RegistEndPage" component={RegistEndPage} />
        <Stack.Screen name="LoadingPage" component={LoadingPage} />
        <Stack.Screen name="FailedPage" component={FailedPage} />
        <Stack.Screen name="WorkListPage" component={WorkListPage} />
        <Stack.Screen name="WorkDetailPage" component={WorkDetailPage} />
        <Stack.Screen name="CertificatePage" component={CertificatePage} />
        <Stack.Screen name="TakeCertification" component={TakeCertification} />

        <Stack.Screen name="CertificateEndPage" component={CertificateEndPage} />
        <Stack.Screen name="WorkConformPage" component={WorkConformPage} />
        <Stack.Screen name="MessageListPage" component={MessageListPage} />
        <Stack.Screen name="MessageDetailPage" component={MessageDetailPage} />
        <Stack.Screen name="WorkContractListPage" component={WorkContractListPage} />
        <Stack.Screen name="PastHirePage" component={PastHirePage} />
        <Stack.Screen name="WorkQRPage" component={WorkQRPage} />
        <Stack.Screen name="GetQRPage" component={GetQRPage} />
        <Stack.Screen name="AddressInputPage" component={AddressInputPage} />
        <Stack.Screen name="SalaryFinalConfirmPage" component={SalaryFinalConfirmPage} />
        <Stack.Screen name="ReviewInputPage" component={ReviewInputPage} />
        <Stack.Screen name="WorkEndPage" component={WorkEndPage} />
        <Stack.Screen name="TransferAccountPage" component={TransferAccountPage} />
        <Stack.Screen name="ContactPage" component={ContactPage} />
        <Stack.Screen name="MySkillPage" component={MySkillPage} />
        <Stack.Screen name="MyFixedSkillPage" component={MyFixedSkillPage} />
        <Stack.Screen name="MyPage" component={MyPage} />
        <Stack.Screen name="FavouriteShopPage" component={FavouriteShopPage} />
        <Stack.Screen name="FavouriteShopDetailPage" component={FavouriteShopDetailPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
