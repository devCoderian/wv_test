import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ImageBackground, SafeAreaView} from 'react-native';
import BG from '../../../src/assets/images/bg_2.png';
import MAIN from '../../../src/assets/images/spaceship.png';

const Home = () => {

//  컴포넌트 1) 지갑 생성 화면 이동
//  컴포넌트 2) 지갑 복구 화면 이동

  
    const navigation = useNavigation();
    const goRight = useCallback(() => navigation.navigate('Pincode'),[]) 

    return(
        <SafeAreaView style = {styles.container}>
            <ImageBackground style ={styles.image_bg} source ={BG}>
            <View style = {styles.contents}>
            {/* <Logo width={120} height={40} /> */}
                <Text style = {styles.txt_title}>RIZON WALLET</Text>
                <Image style = {styles.image_main}source = {MAIN} /> 
                {/* <Image>rizon 이미지</Image> */}
                <Text style = {styles.txt_subtitle}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                <View styles = {styles.btn_container}>
                    <TouchableOpacity style = {styles.btn_create} onPress = {goRight}>
                    <Text style ={{  color: '#fff', textAlign: 'center'}}>지갑 생성하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.btn_restore} onPress = {goRight}>
                        <Text  style ={{  color: '#fff', textAlign: 'center'}}>지갑 복구하기</Text>
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
    // logo:{
    //     marginTop: '10%', 
    //     width: 150,
    //     height: 35, 
    //     borderColor: '#fff',
    // },
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
        width: 270,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 21, 
        color: '#AFB1B9'
    },
    btn_container: {
        marginTop: 50
    },
    btn_create:{
        backgroundColor: '#0086F0',
        borderRadius: 5,
        width: 270,
        height: 45,
        justifyContent: 'center',
        marginTop: 20
    },
    btn_restore:{
        backgroundColor: '#092C47',
        borderRadius: 5,
        width: 270,
        height: 45,
        justifyContent: 'center',
        marginTop: 20
    }
    });

export default Home;
