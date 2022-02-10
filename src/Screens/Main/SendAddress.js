import React ,{ useState, useCallback, useEffect } from 'react';
import BG from '../../../src/assets/images/bg_2.png';
import { Text, TouchableOpacity, View, ImageBackground,StyleSheet, TextInput, Image, ScrollView, ScrollViewBase, Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Topbar from '../../Components/Topbar';
import { useDispatch } from 'react-redux';
import { sendAddress } from '../../store/actions'
//import { sendInfo } from '../../store/actions'
import { useTranslation } from 'react-i18next';
const SendAddress = () => {
    

    const {t} = useTranslation();
    const [send_address, setAddress] = useState('');
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const goRight = useCallback(() => {
        console.log(send_address); 
        if(send_address === ''){
           Alert.alert(t('send_warning'))
        }else{
           dispatch(sendAddress(send_address.trim()));
           navigation.navigate('SendInput')
        } 
       },[send_address]) 
   

    return (
        <View style = {styles.container}>
              <ImageBackground style ={styles.image_bg} source ={BG}>
              <Topbar />
                <View style = {styles.content} >
                <View style = {styles.progress_wrapper}>
                    <View style = {[styles.progress_bar, {
                        backgroundColor: '#0096F0'
                    }]}></View>
                    <View style = {styles.progress_bar}></View>
                    <View style = {styles.progress_bar}></View>                
                </View>
                <View style = {{ marginTop: 40}} >
                    <Text style = {styles.txt_subtitle}>{t('send_title')}</Text>
                    {/* <Text style = {{color: '#fff'}}>주소</Text> */}
                </View>
                <View style = {styles.address_wrapper}>
                    <View style={{ justifyContent: 'center' , flexDirection: 'row'}}>
                        <View>
                        <TextInput style={styles.txt_subtitle}
                        // multiline={true}
                        placeholderTextColor = "#fff"
                        placeholder={t('send_subtitle')}
                        onChangeText={(text) => setAddress(text)}
                        
                    />
                        </View>
                    </View>
                </View>
                <View style={{justifyContent: 'center'}}>
                    <TouchableOpacity style = {styles.confirmBtn} onPress={goRight}>
                    <Text style = {styles.confirm_txt}>Next</Text>
                    <Icon name = 'arrow-right' size={26} color='#fff'/>
                    {/* <Icon name = 'Home' size={20} color='#fff' /> */}
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
        
    },
    progress_wrapper: {
        flexDirection: 'row',
        marginTop: 7,
        marginBottom: 25, 
        justifyContent: 'center'
    },
    progress_bar:{
        margin: 10,
        width: 60, 
        height: 3,
        backgroundColor: ' rgba(160, 160, 160, 0.4);'
    },
    txt_subtitle: {
        fontSize: 15,
        fontWeight: '400',
        color: '#fff'
    },
    address_wrapper:{
        width: 370,
        height: 80,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 5,
        marginVertical: 17,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    confirmBtn: {
        marginTop: 15,
        justifyContent: 'space-around',
        width: 370, 
        height: 45,
        // backgroundColor: '#0086F0',
        // borderBottomColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#FFF',
        flexDirection: 'row',
        alignItems: 'center',
    },
    confirm_txt:{
        color: '#fff',
        fontSize: 18
    }
})

export default SendAddress;