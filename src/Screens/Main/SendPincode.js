import React, { useState, useCallback, useEffect} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ImageBackground, SafeAreaView} from 'react-native';
import BG from '../../../src/assets/images/bg_2.png';
import { useNavigation } from '@react-navigation/native';
//pincode 저장 라이브러리
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import bip39 from 'react-native-bip39';
import rizonjs from '../../../rizonjs/dist/rizon'
import { useSelector, useDispatch } from 'react-redux';
import { removeAddress } from '../../store/actions'

const SendPincode = () => {
    
    //보낼때 성공하면 꼭 초기화 해주기!!!!!!!
    const send_address = useSelector((state) => state.send_address);
    const [privkey, setPriveKey] =useState('');
    // const [address, setAddress] =useState('rizon1rjp4thfjf4arxnh37u6stu8usr9quwe0zpqqtp');
    const [balance, setBalance] = useState('')
    const { send_amount, send_fee, send_memo } = useSelector((state) => state.sendInfo);
   
    useEffect(()=> {
        // RNSecureKeyStore.get('address').then((item) => {
        //     setAddress(item);
        //     console.log('address', item)
        // });
     
        // RNSecureKeyStore.get('privkey').then((item) => {
        //     setPriveKey(item);
        //     console.log('privkey', item)
        // });

        console.log('send_amount', send_amount);
        console.log('send_fee',send_fee);
        RNSecureKeyStore.get('balance').then((balance) => {
            setBalance(balance);
            console.log('balance', balance)
        });
        
   
      
    })

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

    const goRight = useCallback(() => {
        //통신 성공 여부
        const chainId = "groot-14";
        const rizon = rizonjs.network("http://seed-2.testnet.rizon.world:1317", chainId);
        rizon.setBech32MainPrefix("rizon");
        rizon.setPath("m/44'/118'/0'/0/0");
        const address = rizon.getAddress('left merge august enemy sadness human diagram proof wild eagle shoot better board humor word media motor firm zebra indicate flock thing trial protect');
        const ecpairPriv = rizon.getECPairPriv('left merge august enemy sadness human diagram proof wild eagle shoot better board humor word media motor firm zebra indicate flock thing trial protect');
       
        console.log(address);
        rizon.getAccounts(address).then(data => {
            let stdSignMsg = rizon.newStdMsg({
                msgs: [
                    {
                        type: "cosmos-sdk/MsgSend",
                        value: {
                            amount: [
                                {
                                    amount: String(send_amount), 	// 6 decimal places (1000000 uatolo = 1 ATOLO)
                                    denom: "uatolo"
                                }
                            ],
                            from_address: address,
                            to_address: "rizon10pqkrq4feec3f6c6unyjhh5rnwnsstq3l38k0d"
                            // to_address: "rizon1rt8u24lxw4hqxecq0gcf7jf99e25kpw2x7yprm"
                        }
                    }
                ],
                chain_id: chainId,
                //fee: { amount: [ { amount: String(3), denom: "uatolo" } ], gas: String(100000) },
                fee: { amount: [ { amount: String(send_fee*1000000), denom: "uatolo" } ], gas: String(100000) },
                memo: send_memo,
                account_number: String(data.account.account_number),
                sequence: String(data.account.sequence)
            });
        
            const signedTx = rizon.sign(stdSignMsg, ecpairPriv);
           
            rizon.broadcast(signedTx).then(() => {
                try {
                    console.log('송금 성공 모달 안 Main 넣가')
                    navigation.navigate('Main');
                } catch (error) {
                    
                }
            });
        })

        // useDispatch(removeAddress());

    },[]) 


    const makeSecureKey = async (code) => {
      
        const pincode = code.join('');
        console.log('pincode', pincode);
       
        //testPincode => 복구 끝나면 pincode로 변경하기
        RNSecureKeyStore.get("pincode")
	    .then((res) => {
		    console.log(res);
            if(pincode === res){
                console.log('일치, 니모닉 화면으로 넘어가기');
               
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

        
        console.warn(code);
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

export default SendPincode;
