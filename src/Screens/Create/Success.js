import React, { useCallback, useEffect, useState} from 'react';
import BG from '../../../src/assets/images/bg_2.png';
import { SafeAreaView, Text, StatusBar, TouchableOpacity, View, StyleShee, ImageBackground,StyleSheet  } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";

// rizonjs확인

const Success = () => {
    const navigation = useNavigation();
    const goRight = useCallback(() => navigation.navigate('Home'),[]);
    // const [mnemonic, setMnemonic] = useState();

    // useEffect(() => {
    // RNSecureKeyStore.get("mnemonic").then((res) => {
    //     setMnemonic(res);
    // });
        
    // },[]);

    return (
        <SafeAreaView style = {styles.container}>
              <ImageBackground style ={styles.image_bg} source ={BG}>
                <View style = {styles.content} >
                    <Text style = {styles.txt_title}>Congrats Use your Crypto Wallet</Text>
                    <View style = {styles.word_list_wrapper}>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                        <TouchableOpacity style = {styles.confirmBtn} onPress ={goRight}>
                        <Text style = {styles.confirm_txt}>지갑 확인하기</Text>
                        <Text style = {styles.confirm_icon}>-</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
    </SafeAreaView>
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
        flex: 1,
        marginTop: 100,
        
    },
    txt_title: {
        width: 220,
        height: 250,
        fontSize: 52,
        fontWeight: '700',
        lineHeight: 65,
        color: '#fff',
    },
    confirmBtn: {
        marginTop: 160,
        justifyContent: 'space-evenly',
        width: 270, 
        height: 45,
        // backgroundColor: '#0086F0',
        // borderBottomColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#FFF',
        flexDirection: 'row',
        alignItems: 'center'
    },
    confirm_txt:{
        color: '#fff',
    },
    confirm_icon:{
        color: '#fff',
        
        // paddingRight: 40
    }
})

export default Success;