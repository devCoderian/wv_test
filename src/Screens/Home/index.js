import React, { useCallback, useEffect } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { View, TouchableOpacity, Text, StyleSheet, Image, ImageBackground, SafeAreaView, BackHandler, Alert } from 'react-native';
import BG from '../../../src/assets/images/bg_2.png';
import MAIN from '../../../src/assets/images/spaceship.png';
import Topbar from '../../Components/Topbar';
import { useTranslation } from 'react-i18next';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const Home = () => {
    const navigation = useNavigation();
    
    const goRight = useCallback(() => navigation.navigate('Pincode'),[]) ;
    const goRestore = useCallback(() => navigation.navigate('MnemonicInput'),[]);

    const { t, i18n } = useTranslation();
    const isFocused = useIsFocused(); 

    useEffect(() => {
        if(isFocused){
        RNSecureKeyStore.remove("pincode")
        .then((res) => {
            console.log(res);
        }, (err) => {
            console.log(err);
        });
        RNSecureKeyStore.remove("privkey")
        .then((res) => {
            console.log(res);
        }, (err) => {
            console.log(err);
        });
        RNSecureKeyStore.remove("address")
        .then((res) => {
            console.log(res);
        }, (err) => {
            console.log(err);
        });
        RNSecureKeyStore.remove("mnemonic")
        .then((res) => {
            console.log(res);
        }, (err) => {
            console.log(err);
        });
    }
    },[isFocused]);

    
    useFocusEffect(
        useCallback(() => {
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          function(){
            console.log(isFocused)
            const exit = t('Exit');
            Alert.alert("Stop",exit,[
              { text:"cancle",
                onPress: ()=> null,
                style:"cancel" },
              { text:"Yes",
                onPress: ()=> {
                    AsyncStorage.setItem('lang', i18n.language ).then((res) => {
                             console.log(res)
                             BackHandler.exitApp();
                        });
                   
                }}
            ]);
            return true;
          }
        )
        return () => backHandler.remove()
        },[])
      )

    return(
        <SafeAreaView style = {styles.container}>
            <ImageBackground style ={styles.image_bg} source ={BG}>
                <Topbar logo={true}/>
                <View style = {styles.contents}>
                    <Text style = {styles.txt_title}>{t('home_title')}</Text>
                    <Image style = {styles.image_main}source = {MAIN} /> 
                    <Text style = {styles.txt_subtitle}>{t('home_subtitle')}</Text>
                    <View styles = {styles.btn_container}>
                        <TouchableOpacity style = {styles.btn_create} onPress = {goRight}>
                            <Text style ={{  color: '#fff', textAlign: 'center'}}>{t('home_btn1')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.btn_restore} onPress = {goRestore}>
                            <Text style ={{  color: '#fff', textAlign: 'center'}}>{t('home_btn2')}</Text>
                        </TouchableOpacity>
                    </View> 
                </View>
            </ImageBackground>
        </SafeAreaView> 
  );
};
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    image_bg:{
      flex: 1,
      alignItems: 'center',
    },
    image_main:{
        width: 287,
        height: 214,
        bottom: '4%'
    },
    contents:{
        width: 200,
        height: 700,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txt_title: {
        width: 192,
        fontSize: 50,
        fontWeight: '900',
        lineHeight: 58,
        textAlign: 'center',
        color: '#fff'
    },
    txt_subtitle: {
        marginVertical: 15,
        width: 270,
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 25, 
        color: '#AFB1B9',
        textAlign: 'center'
    },
    btn_container: {
        marginTop: 60
    },
    btn_create:{
        backgroundColor: '#0086F0',
        borderRadius: 5,
        width: 280,
        height: 45,
        justifyContent: 'center',
        marginTop: 25
    },
    btn_restore:{
        backgroundColor: '#092C47',
        borderRadius: 5,
        width: 280,
        height: 45,
        justifyContent: 'center',
        marginTop: 20
    }
    });

export default Home;
