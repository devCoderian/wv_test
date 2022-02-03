import React ,{ useState, useCallback, useEffect } from 'react';
import BG from '../../../src/assets/images/bg_2.png';
import { Text, TouchableOpacity, View, ImageBackground,StyleSheet, TextInput, Image, ScrollView, ScrollViewBase} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Topbar from '../../Components/Topbar';
import { useSelector, useDispatch } from 'react-redux';
import rizonjs from '../../../rizonjs/dist/rizon'
import { removeAddress } from '../../store/actions'
const SendInfo = () => {
  
    //보낼때 성공하면 꼭 초기화 해주기!!!!!!!
    const send_address = useSelector((state) => state.send_address);
    const navigation = useNavigation();
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
            rizon.broadcast(signedTx).then(response => console.log(response));
        })

        // useDispatch(removeAddress());
        // navigation.navigate('Main')
    },[]) 

    return (
        <View style = {styles.container}>
              <ImageBackground style ={styles.image_bg} source ={BG}>
              <Topbar logo={true}/>
                <View style = {styles.content} >
                <View style = {styles.progress_wrapper}>
                    <View style = {styles.progress_bar}></View>
                    <View style = {styles.progress_bar}></View>                
                    <View style = {[styles.progress_bar, {
                        backgroundColor: '#0096F0'
                    }]}></View>
                </View>
                <View style = {{ marginTop: 40}} >
                    <Text style = {{color: '#fff'}}>입력하신 정보를 확인하세요.</Text>
                    {/* <Text style = {{color: '#fff'}}>주소</Text> */}
                </View>
                <View style = {[styles.info_wrapper, {height: 250}]}>
                    <View style={{flexDirection: 'row', justifyContent:'space-between', paddingHorizontal: 10}}>
                        <Text style = {styles.txt_subtitle}>수량</Text>
                        <Text style = {styles.txt_subtitle}>{send_amount/1000000} atolo</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'space-between', paddingHorizontal: 10}}>
                        <Text style = {styles.txt_subtitle}>수수료</Text>
                        <Text style = {styles.txt_subtitle}>{send_fee/10} atolo</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'space-between', paddingHorizontal: 10}}>
                        <Text style = {styles.txt_subtitle}>Total</Text>
                        {/* <Text style = {styles.txt_subtitle}>{(parseInt(send_amount)+send_fee)/1000000} atolo</Text> */}
                        <Text style = {styles.txt_subtitle}>{(send_amount+(send_fee*100000))/1000000} atolo</Text>
                    </View>
                    <View style ={{width: 370, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.4)', alignSelf: 'center'}}></View>
                    <View style={{flexDirection: 'row', justifyContent:'space-between', paddingHorizontal: 10}}>
                        <Text style = {styles.txt_subtitle}>현재 가능 수량</Text>
                        <Text style = {styles.txt_subtitle}>{parseInt(balance)/1000000} atolo</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'space-between', paddingHorizontal: 10}}>
                        <Text style = {styles.txt_subtitle}>전송 후 가능 수량</Text>
                        {/* <Text style = {styles.txt_subtitle}>{(parseInt(balance)-(parseInt(send_amount)+ parseInt(send_fee)))/1000000} atolo</Text> */}
                        <Text style = {styles.txt_subtitle}>{((balance-(send_amount+(send_fee*100000)))/1000000)} atolo</Text>
                    </View>
                </View>
                <View style = {{ marginTop: 10}} >
                    <Text style = {{color: '#fff'}}>수취인 주소</Text>
                </View>
                <View style = {[styles.address_wrapper,{
                    alignItems: 'center'
                }]}>
                        <Text style = {styles.txt_subtitle}>{send_address}</Text>
                </View>
                <View style={{justifyContent: 'center'}}>
                    <TouchableOpacity style = {styles.confirmBtn} onPress={goRight}>
                    <Text style = {styles.confirm_txt}>송금하기</Text>
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
        alignItems: 'center'
        
    },
    progress_wrapper: {
        flexDirection: 'row',
        marginTop: 7,
        marginBottom: 10 , 
        justifyContent: 'center'
    },
    progress_bar:{
        marginHorizontal: 10,
        width: 60, 
        height: 3,
        backgroundColor: ' rgba(160, 160, 160, 0.4);'
    },
    txt_subtitle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#fff'
    },
    info_wrapper:{
        width: 370,
        height: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 5,
        marginVertical: 17,
        padding: 10,
        justifyContent: 'space-around'
    },
    address_wrapper:{
        width: 370,
        height: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 5,
        marginVertical: 17,
        padding: 10,
        justifyContent: 'center'
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

export default SendInfo;