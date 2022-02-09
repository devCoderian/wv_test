import React ,{ useState, useCallback, useEffect, useRef } from 'react';
import BG from '../../../src/assets/images/bg_2.png';
import { Text, TouchableOpacity, View, ImageBackground,StyleSheet, BackHandler, Image, ScrollView, Alert, Linking} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import rizonjs from '../../../rizonjs/dist/rizon'
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import Topbar from '../../Components/Topbar';
import moment from "moment-timezone"
import { useIsFocused, useFocusEffect} from '@react-navigation/native';
import ProgressBar from '../../Components/ProgressBar';
import AsyncStorage from '@react-native-community/async-storage';

const Main = () => {
    const isFocused = useIsFocused(); 
    const navigation = useNavigation();
    const { t, i18n } = useTranslation();
    const goRight = () =>{ 
        isSend ? navigation.navigate('SendAddress') : Alert.alert(t('main_result'))
    };
    const [progress, setProgress] = useState(false);
    const chainId = "groot-14";
    const rizon = rizonjs.network("http://seed-2.testnet.rizon.world:1317", chainId);
    rizon.setBech32MainPrefix("rizon");
    rizon.setPath("m/44'/118'/0'/0/0");

    // const [mnemonic, setMnemonic] = useState("left merge august enemy sadness human diagram proof wild eagle shoot better board humor word media motor firm zebra indicate flock thing trial protect");
    const [mnemonic, setMnemonic] = useState('');
    const [amount, setAmount] = useState(0);
    const [add, setAdd] = useState('');
    const [price, setPrice] = useState(0);
    const [txInfo, setTxInfo] = useState([]);
    const [isSend, setIsSend] = useState(false);

    const getTxInfo = async(address) => {
        const txAPI = `https://api-rizon-testnet.cosmostation.io/v1/account/new_txs/${address}?limit=100`
        let txInfoArray = await fetch(txAPI).then(res => {
            return res.json();
        })
        setTxInfo(txInfoArray);
    }

    const getCoinPrice = async() => {
        const atoloPriceAPI = `https://api.bithumb.com/public/ticker/atolo_KRW`
        let priceResponse = await fetch(atoloPriceAPI).then(res => {
            return res.json();
        });
        setPrice(priceResponse.data.opening_price);
        setProgress(false);
    }

    const getCoinInfo = async(address) => {
        setProgress(true);
        const balanceAPI = `http://seed-2.testnet.rizon.world:1317/cosmos/bank/v1beta1/balances/${address}`
        let balanceResponse = await fetch(balanceAPI).then(res => {
            return res.json();
        });
    
        //잔액이 없을 경우
        if(balanceResponse.balances.length === 0){
            RNSecureKeyStore.set('balance', '0', {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY} ).then((item) => {
                setAmount(0);
                setIsSend(false); //송금 불가
            });
        }else{
            setAmount(balanceResponse.balances[0].amount);
            RNSecureKeyStore.set('balance', balanceResponse.balances[0].amount, {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY} ).then((item) => {
                setIsSend(true);
            });
        }
       
        getCoinPrice();
    }

    useFocusEffect(
        useCallback(() => {
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          function(){
            console.log(isFocused)
            Alert.alert("Stop","앱을 종료하시겠습니까?",[
              { text:"아니오",
                onPress: ()=> null,
                style:"cancel" },
              { text:"네",
                onPress: ()=> {
                    AsyncStorage.setItem('lang', i18n.language ).then((res) => {
                        console.log(res)
                        BackHandler.exitApp();
                   });
                    BackHandler.exitApp()
                }}
            ]);
            return true;
          }
        )
        return () => backHandler.remove();
        },[])
      )

    useEffect(() => {
        setProgress(true);
        RNSecureKeyStore.get("mnemonic")
	    .then((mnemonic) => {
            setMnemonic(mnemonic);
        });
        RNSecureKeyStore.get("address")
        .then((address) => {
            console.log(address)
               setAdd(address);
               getCoinInfo(address);
               getTxInfo(address);
        });
    },[isFocused]);
    const copyAdd = (text) => {
        console.log('value', text);
    }
    return (
        <>
        {progress && <ProgressBar />}
        <View style = {styles.container}>
              <ImageBackground style ={styles.image_bg} source ={BG}>
              <Topbar logo={true}/>
                <View style = {styles.content} >
                <View style={styles.container} >
                </View>
                <View style = {styles.address_wrapper} >
                    {/* <TouchableOpacity onPress={(text) =>copyAdd(text)}> */}
                        <Text style ={{ color: '#fff'}} selectable>{add}</Text>
                    {/* </TouchableOpacity> */}
                </View>
                <View style = {styles.coin_info_wrapper}>
                    <Image style = {styles.coin_img} source={require('../../assets/images/logo.png')} />
                    <View style={{ justifyContent: 'center' , flexDirection: 'row'}}>
                        <View>
                        <Text style = {styles.txt_title}>{(amount/1000000).toString()}</Text>
                        <Text style = {styles.txt_subtitle}>{amount === 0 ?  0: (price*(amount/1000000)).toFixed(4).toString() } KRW</Text>
                        </View>
                        {/* 리로드 */}
                        <TouchableOpacity style = {styles.reload} onPress={() => getCoinInfo(add)}>
                        <Icon name = 'refresh' size={30} color={'#fff'} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{justifyContent: 'center'}}>
                    <TouchableOpacity style = {styles.confirmBtn} onPress={goRight}>
                    <Text style = {styles.confirm_txt}>{t('send_btn')}</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.list_box_container}>
                    <Text style = {styles.title_text}>History</Text>    
                            {txInfo.length !== 0 ? txInfo.map((item, idx) => {
                                            return(
                                            <View key ={idx} style={styles.list_box}>
                                                <TouchableOpacity style={{color: '#fff'}} onPress={() => Linking.openURL(`https://testnet.mintscan.io/rizon-testnet/txs/${item.data.txhash}`)}>
                                                <Text>
                                                {
                                                    moment(item.header.timestamp).tz('Asia/Seoul').format('YYYY.MM.DD HH:mm:ss')
                                                }
                                                </Text>
                                                </TouchableOpacity>
                                              
                                                {item.data.tx.body.messages[0].from_address === add ?
                                                <Text style={{color: 'red'}}>To</Text>: 
                                                <Text style={{color: 'blue'}}>From</Text>
                                                }
                                                <Text style={{color: '#fff'}}>
                                                {item.data.tx.body.messages[0].from_address === add ?
                                                  `${item.data.tx.body.messages[0].to_address}`
                                                : `${item.data.tx.body.messages[0].from_address}`
                                                }
                                                </Text>
                                                <Text style={{color: '#fff'}}>
                                                {item.data.tx.body.messages[0].amount[0].amount/1000000} atolo
                                                </Text>
                                                {item.data.logs.length === 0 ? <Text style={{color: 'red'}}>{t('main_fail')}</Text>: null
                                              }                        
                                            </View>
                                            )                         
                                        })
                                        :<View style={styles.list_box} >
                                            <Text style={{color: '#fff'}}>{t('main_result')}</Text>
                                        </View>    
                                          
                                        }
                </ScrollView>
            </View>
            </ImageBackground>
    </View>
    </>
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
        // marginTop: 20,
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
        fontSize: 22
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
    },
    reload:{
        padding: 10
    },
    list_box_container:{
        marginTop: 20,
        width: '100%',
        height: 350,
    },  
    list_box: {
        width: 350,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 5,
        marginTop: 15,
        padding: 20,
    },
    title_text:{
        paddingTop: 5,
        color: '#fff',
        fontSize: 18,
    }
})

export default Main;