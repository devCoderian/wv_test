import React, { useState, useCallback, useEffect} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Button, Image, ImageBackground, SafeAreaView} from 'react-native';
import BG from '../../../src/assets/images/bg_2.png';
import { useNavigation } from '@react-navigation/native';
//pincode 저장 라이브러리
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import bip39 , {wordlists} from 'react-native-bip39';

import rizonjs from '../../../rizonjs/dist/rizon'

const PincodeConfirm = () => {

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

  
    const makeAddress = (mnemonic) => {
        const chainId = "groot-14";
        const rizon = rizonjs.network("http://seed-2.testnet.rizon.world:1317", chainId);
        rizon.setBech32MainPrefix("rizon");
        rizon.setPath("m/44'/118'/0'/0/0");
        const address = rizon.getAddress(mnemonic);
        const ecpairPriv = rizon.getECPairPriv(mnemonic);
        console.log(ecpairPriv);
        console.log(ecpairPriv.toString('hex'));
        // goRight(); 
        RNSecureKeyStore.set("address", address, {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
        .then(()=> {
            RNSecureKeyStore.set("privkey", ecpairPriv.toString('hex'), {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
            .then(()=> {
                //wordlists -> 니모닉 단어 리스트 불러오기(wordlists)
                //goRight(); 
            });
        });
        console.log(Buffer.from(ecpairPriv.toString('hex'), "hex"));
      
    }

    const makeSecureKey = async (code) => {
      
        const pincode = code.join('');
        console.log('pincode', pincode);
       
        //testPincode => 복구 끝나면 pincode로 변경하기
        RNSecureKeyStore.get("pincode")
	    .then((res) => {
		    console.log(res);
            if(pincode === res){
                console.log('일치, 니모닉 화면으로 넘어가기');
                // let check = bip39.generateMnemonic();
                // console.log(check);
                bip39.generateMnemonic(256).then(mnemonic => {
                    RNSecureKeyStore.set("mnemonic", mnemonic , {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
                    .then(() => {
                        makeAddress(mnemonic);
                    }, (err) => {
                        console.log(err);
                    });
                  });
            }else{
                console.log('불일치 이전 페이지 확인..??')
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
                    // code[i] = id;
                     // RNSecureKeyStore.set(pincode);
                    // 4 되면  securestorage 저장 
                    makeSecureKey(code);
                    
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
        fontSize: 20,
        fontWeight: '500',
        lineHeight: 35,
        textAlign: 'center',
        color: '#000',
    },
    txt_subtitle: {
        fontSize: 15,
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
        shadowOpacity: 0.45,
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
        marginTop: 115,
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
        left: 95,
        top: -45
    }
    });

export default PincodeConfirm;
