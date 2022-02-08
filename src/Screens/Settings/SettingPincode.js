import React, { useState, useCallback, useEffect} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ImageBackground, SafeAreaView, Alert} from 'react-native';
import BG from '../../../src/assets/images/bg_2.png';
import { useNavigation } from '@react-navigation/native';
//pincode 저장 라이브러리
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import bip39 from 'react-native-bip39';
import rizonjs from '../../../rizonjs/dist/rizon'
import { useSelector, useDispatch } from 'react-redux';
import { removeAddress } from '../../store/actions'
import { useIsFocused } from '@react-navigation/native';
const SettingPincode = () => {
    const isFocused = useIsFocused(); 

    const navigation = useNavigation();

    let numberId = [
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5},
        {id: 6},
        {id: 7},
        {id: 8},
        {id: 9},
        {id: 0},
        
    ]
    const [pincode, setPincode] = useState(['', '', '', '']);
    const [number, setNumber]  = useState(numberId);
    const [falseCount, setFalseCount] = useState(0);


    useEffect(()=> {
        if(falseCount > 0){
            setPincode(['', '', '', '']);
            Alert.alert(`비밀번호가 일치하지 않습니다.${falseCount}/3`);
        } 
        if(falseCount === 3){
            Alert.alert(`비밀번호가 일치하지 않습니다.${falseCount}/3`);
            navigation.navigate('Settings', {
                checkRoute: false,
            });
            console.log('불일치 이전 페이지 확인..??')   
        }
    },[falseCount]);
 
    const makeSecureKey = async (code) => {
      
        const pincode = code.join('');
        console.log('pincode', pincode);
       
        //testPincode => 복구 끝나면 pincode로 변경하기
        RNSecureKeyStore.get("pincode")
	    .then((res) => {
		    console.log(res);
            if(pincode === res){
                // navigation.navigate('Settings');
                navigation.navigate('Settings', {
                    checkRoute: true,
                  });
                console.log('일치, 니모닉 화면으로 넘어가기');
               
            }else{
                setFalseCount((prev) => prev+1);
            }
	    }, (err) => {
		    console.log(err);
	    });
     
    }

    const onPressNum = (id) => {
   
      
        let code = [...pincode];
        for(let i = 0; i<code.length; i++){
            if(code[i] === ''){
                code[i] = id;
                setPincode(code);
                if(i === 3){
                }
                break;
            }else{
                continue;
            }
        }
    }

    const onDelete = () => {
        
        let code = [...pincode];
      
        for(let i = code.length-1; i >= 0; i--){
            console.log('code[i]', i, code[i])
            if(code[i] !== ''){
                code[i] = ''
                console.log('code[i]', i, code[i])
                break;
            }else{
                continue;
            }
        }
        console.warn(code);
        setPincode(code);
    }

    return(
        <SafeAreaView style = {styles.container}>
            <ImageBackground style ={styles.image_bg} source ={BG}>
            <View style = {styles.input_box}>
                <View style = {styles.txt_container}>
                    <Text style = {styles.txt_title}>Enter Your PIN Code</Text>
                    <Text style = {styles.txt_subtitle}>지갑 복구 시 사용될  PIN 번호 4자리를 입력해주세요.</Text>
                </View>
                <View style = {styles.code_wrapper}>
                    {
                        pincode.map(item => {
                            let style = item !== '' ?  styles.code_circle: styles.code_circle_empty;
                            return <View style= {style}></View>
                        })
                    }
                </View>
                <View style = {styles.number_container}>
                    {number.map((item, idx)=>{
                        return(
                            <TouchableOpacity key={idx} style= {styles.number_pad} onPress= {() => onPressNum(item.id)}>
                                <Text style = {styles.number}>{item.id}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                <TouchableOpacity style = {styles.delete_btn} onPress={() => onDelete()}>
                        <Text style= {{color: '#fff'}}>delete</Text>
                </TouchableOpacity>
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
    input_box:{
        width: '100%',
        height: '37%',
        backgroundColor: '#F1F1F1',
        alignItems:'center'
    },
    txt_container:{
        marginTop: 50,
        alignItems:'center'
    },
    txt_title: {
        width: 250,
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 58,
        textAlign: 'center',
        color: '#000',
    },
    txt_subtitle: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 21, 
        color: '#000'
    },
    code_wrapper:{
        marginTop:  37,
        flexDirection: 'row',
        marginVertical: 10,
    },
    code_circle: {
        backgroundColor: '#CECECE',
        width: 45,
        height: 45,
        borderRadius: 45,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    code_circle_empty: {
        backgroundColor: '#fff',
        width: 45,
        height: 45,
        borderRadius: 45,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
	    width: 0,
	    height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    number_container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 90,
        width: 280,
        height: 348,
        alignItems: 'center',
        justifyContent: 'center'
    },
    number_pad:{
        width: 75,
        height: 75,
        borderRadius: 75,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: 'rgba(225, 255, 255, 0.2)',
        marginHorizontal: 9,
        marginVertical: 7
    },
    number:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },
    delete_btn: {
        left: 95,
        top: -45
    }
    });

export default SettingPincode;
