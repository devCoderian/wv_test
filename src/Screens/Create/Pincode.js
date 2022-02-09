import React, { useCallback, useState, useEffect} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ImageBackground, SafeAreaView} from 'react-native';
import BG from '../../../src/assets/images/bg_2.png';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import { useNavigation } from '@react-navigation/native';
import Topbar from '../../Components/Topbar'
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const Pincode = () => {

    const {t} = useTranslation();
    const isFocused = useIsFocused(); 
    const navigation = useNavigation();
    const goRight = useCallback(() => navigation.navigate('PincodeConfirm'),[]);
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
   
    useEffect(() => {
        setPincode(['','','',''])
    },[isFocused]);

    const makeSecureKey = async (code) => {
        const pincode = code.join('');
        RNSecureKeyStore.set("pincode", pincode , {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
        .then((res) => {
            console.log(res);
            goRight();
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
                i === 3 && makeSecureKey(code);   
                break;
            }else{
                continue; 
            }
        }
    }

    const onDelete = () => {
        let code = [...pincode];
        for(let i = code.length-1; i >= 0; i--){
            if(code[i] !== ''){
                code[i] = '';
                break; 
            }else{
                continue;
            }
        }
        setPincode(code);
    }

    return(
        <SafeAreaView style = {styles.container}>
            <ImageBackground style ={styles.image_bg} source ={BG}>
            <Topbar colorStyle ={{ backgroundColor: '#F1F1F1'}} color = {'#000'} back='Home'/>
            <View style = {styles.input_box}>
                <View style = {styles.txt_container}>
                    <Text style = {styles.txt_title}>{t('pincode_title')}</Text>
                    <Text style = {styles.txt_subtitle}>{t('pincode_subtitle')}</Text>
                </View>
                <View style = {styles.code_wrapper}>
                    {
                        pincode.map((item, idx) => {
                            let style = item !== '' ?  styles.code_circle: styles.code_circle_empty;
                            return <View key = {idx} style= {style}></View>
                        })
                    }
                </View>
            </View>
                <View style = {styles.number_container}>
                    {number.map((item) =>{
                        return(
                            <TouchableOpacity key = {item.id} style= {styles.number_pad} onPress= {() => onPressNum(item.id)}>
                                <Text style = {styles.number}>{item.id}</Text>
                            </TouchableOpacity>
                        )
                    })}
                     </View>
                    <TouchableOpacity style={styles.delete_btn} onPress={() => onDelete()}>
                        <Text style= {{color: '#fff'}}>delete</Text>
                    </TouchableOpacity>
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
        flex: 1,
        backgroundColor: '#F1F1F1',
        alignItems:'center'
    },
    txt_container:{
        width: 350,
        marginTop: 30,
        alignItems:'center',
    },
    txt_title: {
        width: 250,
        fontSize: 20,
        fontWeight: '500',
        lineHeight: 35,
        textAlign: 'center',
        color: '#000',
    },
    txt_subtitle: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 25, 
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
        shadowOpacity: 0.45,
        shadowRadius: 3.84,
        elevation: 5,
    },
    number_container: {
        flex: 1.8,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 25,
        width: 300,
        height: 348,
        alignItems: 'center',
        justifyContent: 'center'
    },
    number_pad:{
        width: 80,
        height: 80,
        borderRadius: 80,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: 'rgba(225, 255, 255, 0.2)',
        marginHorizontal: 10,
        marginVertical: 8
    },
    number:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },
    delete_btn: {
        left: 101,
        top: -90
    }
    });

export default Pincode;
