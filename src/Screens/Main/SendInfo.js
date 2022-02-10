import React ,{ useState, useCallback, useEffect } from 'react';
import BG from '../../../src/assets/images/bg_2.png';
import { Text, TouchableOpacity, View, ImageBackground,StyleSheet, TextInput, Image, ScrollView, ScrollViewBase} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import Topbar from '../../Components/Topbar';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
const SendInfo = () => {
  
    const {t} = useTranslation();
    //보낼때 성공하면 꼭 초기화 해주기!!!!!!!
    const send_address = useSelector((state) => state.send_address);
    const navigation = useNavigation();
    const [balance, setBalance] = useState('')
    const { send_amount, send_fee, send_memo } = useSelector((state) => state.sendInfo);
   
    useEffect(()=> {

        console.log('send_amount', send_amount);
        console.log('send_fee',send_fee);
        RNSecureKeyStore.get('balance').then((balance) => {
            setBalance(balance);
            console.log('balance', balance)
        });
        
   
      
    })

    return (
        <View style = {styles.container}>
              <ImageBackground style ={styles.image_bg} source ={BG}>
              <Topbar />
                <View style = {styles.content} >
                <View style = {styles.progress_wrapper}>
                    <View style = {styles.progress_bar}></View>
                    <View style = {styles.progress_bar}></View>                
                    <View style = {[styles.progress_bar, {
                        backgroundColor: '#0096F0'
                    }]}></View>
                </View>
                <View style = {{ marginTop: 40}} >
                    <Text style = {{color: '#fff'}}>{t('send_info')}</Text>
                    {/* <Text style = {{color: '#fff'}}>주소</Text> */}
                </View>
                <View style = {[styles.info_wrapper, {height: 250}]}>
                    <View style={{flexDirection: 'row', justifyContent:'space-between', paddingHorizontal: 10}}>
                        <Text style = {styles.txt_subtitle}>{t('send_info_amount')}</Text>            
                        <Text style = {styles.txt_subtitle}>{send_amount} atolo</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'space-between', paddingHorizontal: 10}}>
                        <Text style = {styles.txt_subtitle}>{t('send_fee')}</Text>
                        <Text style = {styles.txt_subtitle}>{send_fee} atolo</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'space-between', paddingHorizontal: 10}}>
                        <Text style = {styles.txt_subtitle}>Total</Text>
                        {/* <Text style = {styles.txt_subtitle}>{(parseInt(send_amount)+send_fee)/1000000} atolo</Text> */}
                        <Text style = {styles.txt_subtitle}>{(parseFloat(send_amount)*1000000+parseFloat(send_fee)*1000000)/1000000} atolo</Text>
                    </View>
                    <View style ={{width: 370, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.4)', alignSelf: 'center'}}></View>
                    <View style={{flexDirection: 'row', justifyContent:'space-between', paddingHorizontal: 10}}>
                        <Text style = {styles.txt_subtitle}>{t('send_current')}</Text>
                        <Text style = {styles.txt_subtitle}>{parseInt(balance)/1000000} atolo</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'space-between', paddingHorizontal: 10}}>
                        <Text style = {styles.txt_subtitle}>{t('send_trans_av')}</Text>
                        {/* <Text style = {styles.txt_subtitle}>{(parseInt(balance)-(parseInt(send_amount)+ parseInt(send_fee)))/1000000} atolo</Text> */}
                        <Text style = {styles.txt_subtitle}>{(balance-((parseFloat(send_amount)*1000000+parseFloat(send_fee)*1000000)))/1000000} atolo</Text>
                    </View>
                </View>
                <View style = {{ marginTop: 10}} >
                    <Text style = {{color: '#fff'}}>{t('send_title')}</Text>
                </View>
                <View style = {[styles.address_wrapper,{
                    alignItems: 'center'
                }]}>
                        <Text style = {styles.txt_subtitle}>{send_address}</Text>
                </View>
                <View style={{justifyContent: 'center'}}>
                    <TouchableOpacity style = {styles.confirmBtn} onPress={()=> navigation.navigate('SendPincode')}>
                    <Text style = {styles.confirm_txt}>{t('send_confirm_btn')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ImageBackground>
    </View>
    )
}



const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    image_bg:{
      flex: 1,
      alignItems: 'center',
    },
    content: {
        // backgroundColor: '#5566ee',
        flex: 1,
        marginTop: -10,
        paddingHorizontal: 40,
        paddingTop: 20,
        alignItems: 'center'
        
    },
    progress_wrapper: {
        flexDirection: 'row',
        marginTop: 7,
        marginBottom: 10 , 
        justifyContent: 'center'
    },
    progress_bar:{
        marginHorizontal: 10,
        width: 60, 
        height: 3,
        backgroundColor: ' rgba(160, 160, 160, 0.4);'
    },
    txt_subtitle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#fff'
    },
    info_wrapper:{
        width: 370,
        height: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 5,
        marginVertical: 17,
        padding: 10,
        justifyContent: 'space-around'
    },
    address_wrapper:{
        width: 370,
        height: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 5,
        marginVertical: 17,
        padding: 10,
        justifyContent: 'center'
    },
    confirmBtn: {
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: 370, 
        height: 45,
        backgroundColor: '#092C47',
        borderRadius: 5,
        // borderColor: '#0086F0'
    },
    confirm_txt:{
        color: '#fff',
        fontSize: 18
    }
})

export default SendInfo;