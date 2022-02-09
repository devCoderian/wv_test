import React, { useState, useEffect} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ImageBackground, SafeAreaView} from 'react-native';
import BG from '../../../src/assets/images/bg_2.png';
import { useNavigation } from '@react-navigation/native';
//pincode 저장 라이브러리
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import rizonjs from '../../../rizonjs/dist/rizon'
import { useSelector } from 'react-redux';
import { Dialog, Portal, Provider as PaperProvider } from 'react-native-paper';
import Topbar from '../../Components/Topbar';

const SendPincode = () => {
    const [visible, setVisible] = useState(false);
    const [falseCount, setFalseCount] = useState(0);

    const hideDialog = () => {
        setVisible(false);
        falseCount === 3 &&  navigation.navigate('Main');
        isSuccess && navigation.navigate('Main');
    };

    //보낼때 성공하면 꼭 초기화 해주기!!!!!!!
    const send_address = useSelector((state) => state.send_address);
    const [privkey, setPriveKey] =useState('');
    const [add, setAdd] =useState('');
    const [ balance, setBalance] = useState('')
    const { send_amount, send_fee, send_memo } = useSelector((state) => state.sendInfo);
    const [resMsg, setResMsg] = useState('송금완료');

    useEffect(()=> {
        RNSecureKeyStore.get('privkey').then((item) => {
            setPriveKey(Buffer.from(item.toString('hex'), "hex"));
            console.log('privkey', item)
        });

        console.log('send_amount', send_amount);
        console.log('send_fee',send_fee);
        RNSecureKeyStore.get('balance').then((balance) => {
            setBalance(balance);
            console.log('balance', balance)
        });
     
         RNSecureKeyStore.get('address').then((address) => {
            console.log('address',address)
            setAdd(address);
        });

    },[]);

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
    const [isSuccess, setIsSuceess] = useState(false);
    useEffect(() => {
        setPincode(['','','',''])
    },[falseCount]);

    const goRight = () => {
        //통신 성공 여부
        const chainId = "groot-14";
        const rizon = rizonjs.network("http://seed-2.testnet.rizon.world:1317", chainId);
        rizon.setBech32MainPrefix("rizon");
        rizon.setPath("m/44'/118'/0'/0/0");
    
        rizon.getAccounts(add).then(data => {
            console.log(data);
            let stdSignMsg = rizon.newStdMsg({
                msgs: [
                    {
                        type: "cosmos-sdk/MsgSend",
                        value: {
                            amount: [
                                {
                                    amount: String(parseFloat(send_amount)*1000000), 	// 6 decimal places (1000000 uatolo = 1 ATOLO)
                                    denom: "uatolo"
                                }
                            ],
                            from_address: add,
                            to_address: send_address
                        }
                    }
                ],
                chain_id: chainId,
                fee: { amount: [ { amount: String(send_fee*100000), denom: "uatolo" } ], gas: String(100000) },
                memo: send_memo,
                account_number: String(data.account.account_number),
                sequence: String(data.account.sequence)
            });
        
            const signedTx = rizon.sign(stdSignMsg, privkey);
           
            rizon.broadcast(signedTx).then((res) => {
                try {
                    console.log('송금 결과',res);
                    setIsSuceess(true);
                    setVisible(true);
                } catch (error) {
                    setResMsg(error);
                    setIsSuceess(true);
                    setVisible(true);
                }
            });
        })
    };

    const makeSecureKey = async (code) => {
      
        const pincode = code.join('');
        RNSecureKeyStore.get("pincode")
	    .then((res) => {
		    console.log(res);
            if(pincode === res){
                console.log('일치');
                goRight();
            }else{
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
                if(i === 3){
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
            <Topbar colorStyle ={{ backgroundColor: '#F1F1F1'}} color = {'#000'} />
            <View style = {styles.input_box}>
                <View style = {styles.txt_container}>
                    <Text style = {styles.txt_title}>Enter Your PIN Code</Text>
                    <Text style = {styles.txt_subtitle}>PIN 번호 4자리를 입력해주세요.</Text>
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
            <PaperProvider>
                <View>
                    <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <View style = {{ marginTop : 50, alignItems: 'center'}}>
                            {
                                isSuccess ? <Text style = {{ fontSize: 14, fontWeight:'normal', color: '#000' }}>{resMsg}</Text>:
                                <Text style = {{ fontSize: 14, fontWeight:'normal', color: '#000' }}>비밀번호가 일치하지 않습니다.{falseCount}/3</Text>
                            }
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
