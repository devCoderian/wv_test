import React ,{ useState, useCallback, useEffect } from 'react';
import BG from '../../../src/assets/images/bg_2.png';
import { Text, TouchableOpacity, View, ImageBackground,StyleSheet, TextInput, Image, ScrollView, ScrollViewBase} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import rizonjs from '../../../rizonjs/dist/rizon'
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SendInput = () => {
  
    const navigation = useNavigation();
    const goRight = useCallback(() => navigation.navigate('SendInfo'),[]) 
        return (
            <View style = {styles.container}>
                  <ImageBackground style ={styles.image_bg} source ={BG}>
                    <View style = {styles.content} >
                    <View style = {{ marginTop: 40}} >
                        <Text style = {styles.txt_title}>my wallet</Text>
                        {/* <Text style = {{color: '#fff'}}>주소</Text> */}
                    </View>
                    <View style = {styles.coin_info_wrapper}>
                        <View style={{ justifyContent: 'center' , flexDirection: 'row'}}>
                            <View>
                            <Text style = {styles.txt_title}>안녕</Text>
                            </View>
                        </View>
                    </View>
                    <View style = {styles.coin_info_wrapper}>
                        <View style={{ justifyContent: 'center' , flexDirection: 'row'}}>
                            <View>
                            <Text style = {styles.txt_title}>안녕</Text>
                            </View>
                        </View>
                    </View>
                    <View style = {styles.coin_info_wrapper}>
                        <View style={{ justifyContent: 'center' , flexDirection: 'row'}}>
                            <View>
                            <Text style = {styles.txt_title}>안녕</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                        <TouchableOpacity style = {styles.confirmBtn} onPress={goRight}>
                        <Text style = {styles.confirm_txt}>Next</Text>
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
        alignItems:'center'
        
    },
    txt_title: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        color: '#fff',
    },
    txt_subtitle: {

        fontSize: 16,
        fontWeight: '400',
        color: '#fff'
    },
    address_wrapper:{
        width: 370,
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 5,
        marginTop: 20,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    coin_info_wrapper:{
      width: 370,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: 5,
      marginTop: 15,
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly'
    },
    coin_img:{
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    word:{
        color: '#fff',
        fontSize: 20
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

export default SendInput;