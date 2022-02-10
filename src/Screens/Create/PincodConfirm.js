import React, { useState, useCallback, useEffect} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Button, Image, ImageBackground, SafeAreaView, Alert} from 'react-native';
import BG from '../../../src/assets/images/bg_2.png';
import { useNavigation } from '@react-navigation/native';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import bip39 , {wordlists} from 'react-native-bip39';
import Topbar from '../../Components/Topbar'
import { Dialog, Portal, Provider as PaperProvider } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import ProgressBar from '../../Components/ProgressBar'
import { useTranslation } from 'react-i18next';

const PincodeConfirm = () => {

    const {t} = useTranslation();
    const [visible, setVisible] = useState(false);
    const [falseCount, setFalseCount] = useState(0);

    const hideDialog = () => {
        setVisible(false);
        falseCount === 3 &&  navigation.navigate('Home');
    };
    const [progress, setProgress] = useState(false);

    const navigation = useNavigation();
    const goRight = useCallback(() => navigation.navigate('MnemonicInfo'),[]);

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

    const makeSecureKey = async (code) => {
        setProgress(true);
        const pincode = code.join('');
        RNSecureKeyStore.get("pincode").then((res) => {
            if(pincode === res){
                console.log('일치');
                bip39.generateMnemonic().then((res) => {
                    RNSecureKeyStore.set("mnemonic", res , {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
                    .then(() => {
                        goRight(); 
                        // makeAddress(res);
                    }, (err) => {
                        setProgress(false);
                        Alert.alert(err);
                    });
                  });
            }else{
                setProgress(false);
                console.log('불일치')
                setFalseCount((prev) => prev+1);
                setVisible(true);
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
    const isFocused = useIsFocused(); 

    useEffect(() => {
        setPincode(['','','',''])
    },[isFocused]);

        
    useEffect(()=> {
        if(falseCount > 0){
            setPincode(['', '', '', '']);
        } 
        if(falseCount === 3){
            hideDialog();
        }
    },[falseCount]);

    return(
        <>
        {progress && <ProgressBar />}
        <SafeAreaView style = {styles.container}>
        <ImageBackground style ={styles.image_bg} source ={BG}>
        <Topbar colorStyle ={{ backgroundColor: '#F1F1F1'}} color = {'#000'}  back='Home'/>
        <View style = {styles.input_box}>
            <View style = {styles.txt_container}>
                <Text style = {styles.txt_title}>{t('pincode_title')}</Text>
                <Text style = {styles.txt_subtitle}>{t('pincode_confirm_subtitle')}</Text>
            </View>
            <View style = {styles.code_wrapper}>
                {
                    pincode.map((item, idx) => {
                        let style = item !== '' ?  styles.code_circle: styles.code_circle_empty;
                        return <View key = {idx} style= {style}></View>
                    })
                }
            </View>
            <PaperProvider>
                <View>
                    <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <View style = {{ marginTop : 50, alignItems: 'center'}}>
                        <Text style = {{ fontSize: 14, fontWeight:'normal', color: '#000' }}>{t('pincode_warning')}{falseCount}/3</Text>
                        <TouchableOpacity style = {{
                            borderRadius:5,
                            alignItems:'center',
                            justifyContent: 'center',
                            marginVertical: 30,
                            backgroundColor: '#092C47',
                            width: 100,
                            height: 40}} onPress={hideDialog}>
                            <Text style = {{
                                color: '#fff',
                                fontFamily: 'Roboto'
                                }} >확인</Text>
                            </TouchableOpacity>
                            </View>
                    </Dialog>
                    </Portal>
                </View>
            </PaperProvider>
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
    </>
  );
        
};
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    absoluteView1:{
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
        
    },  
    absoluteView2:{
        position: 'absolute',
        zIndex: 2,
        right: 120,
        bottom: 330
        
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
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 25, 
        color: '#000',
        textAlign: 'center',
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

export default PincodeConfirm;
