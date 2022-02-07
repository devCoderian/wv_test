import React ,{ useState, useCallback, useEffect } from 'react';
import BG from '../../../src/assets/images/bg_2.png';
import { Text, TouchableOpacity, View, ImageBackground,StyleSheet, BackHandler, Image, ScrollView, Alert, Linking} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import rizonjs from '../../../rizonjs/dist/rizon'
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import Topbar from '../../Components/Topbar';
import moment from "moment-timezone"

const Main = () => {
  
    const navigation = useNavigation();
    const goRight = useCallback(() => navigation.navigate('SendAddress'),[]) 
    const { t, i18n } = useTranslation();
    const chainId = "groot-14";
    const rizon = rizonjs.network("http://seed-2.testnet.rizon.world:1317", chainId);
    rizon.setBech32MainPrefix("rizon");
    rizon.setPath("m/44'/118'/0'/0/0");

    const [ecpairPriv, setEcpairPriv] = useState();
    const [mnemonic, setMnemonic] = useState("left merge august enemy sadness human diagram proof wild eagle shoot better board humor word media motor firm zebra indicate flock thing trial protect");
    const [amount, setAmount] = useState(0);
    const [add, setAdd] = useState('rizon1rjp4thfjf4arxnh37u6stu8usr9quwe0zpqqtp');
    //http://seed-2.testnet.rizon.world:1317/cosmos/bank/v1beta1/balances/rizon1rjp4thfjf4arxnh37u6stu8usr9quwe0zpqqtp
    const [price, setPrice] = useState(0);
    const [txInfo, setTxInfo] = useState([]);



    const getTxInfo = async(address) => {
        const txAPI = `https://api-rizon-testnet.cosmostation.io/v1/account/new_txs/${address}?limit=100`
        let txInfoArray = await fetch(txAPI).then(res => {
            return res.json();
        })
        console.log(txInfoArray[0].data.timestamp);
        // console.log(txInfoArray);
        var date = new Date(txInfoArray[0].data.timestamp);
        console.log(date);
        console.log(
          date.getFullYear()+'.'+(date.getMonth()+1)+'.'+date.getDate()
          + " "+date.getHours()+":"+date.getMinutes()
        )
        setTxInfo(txInfoArray);
    }

    const getCoinPrice = async() => {
        const atoloPriceAPI = `https://api.bithumb.com/public/ticker/atolo_KRW`
        let priceResponse = await fetch(atoloPriceAPI).then(res => {
            return res.json();
        });
        console.log(priceResponse)
        setPrice(priceResponse.data.opening_price);
    }

    const getCoinInfo = async(address) => {
        console.log('set')
        const balanceAPI = `http://seed-2.testnet.rizon.world:1317/cosmos/bank/v1beta1/balances/${address}`
        let balanceResponse = await fetch(balanceAPI).then(res => {
            return res.json();
        });
        console.log(balanceResponse)
        setAmount(balanceResponse.balances[0].amount);
        RNSecureKeyStore.set('balance', balanceResponse.balances[0].amount, {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY} ).then((item) => {
            console.log('성공');
        });
        getCoinPrice();
    }

    const txInfoComponent = ()=> {
        return(
            <TouchableOpacity>
            {txInfo.map((item, idx) => {
                return(
                <View key ={idx} style={styles.list_box}><Text>{item.data.timestamp}</Text></View>
                )
            })}
            
             </TouchableOpacity>
        )
    }

    useEffect(() => {
        const backAction = () => {
          Alert.alert("Hold on!", "앱을 종료하시겠습니까?", [
            {
              text: "취소",
              onPress: () => null,
            },
            { text: "확인", onPress: () => BackHandler.exitApp() }
          ]);
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, []);
    
    useEffect(() => {
        //더미데이터
        getCoinInfo('rizon1rjp4thfjf4arxnh37u6stu8usr9quwe0zpqqtp');
        setAdd('rizon1rjp4thfjf4arxnh37u6stu8usr9quwe0zpqqtp');
        getTxInfo('rizon1rjp4thfjf4arxnh37u6stu8usr9quwe0zpqqtp');
        // RNSecureKeyStore.get("mnemonic")
	    // .then((mnemonic) => {
        //     setMnemonic(mnemonic);
        // })
        // .then(()=>{
        //     RNSecureKeyStore.get("adreess")
        //     .then((address) => {
        //            setAdd(address);
        //         // coinInfo(address);
        //         coinInfo('rizon1rjp4thfjf4arxnh37u6stu8usr9quwe0zpqqtp');
        //     })
        // })

        // (price*amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','
        
    },[]);

    return (
        <View style = {styles.container}>
              <ImageBackground style ={styles.image_bg} source ={BG}>
              <Topbar logo={true}/>
                <View style = {styles.content} >
                <View style={styles.container} >
                    {/* <Text style = {styles.txt_title}>my wallet</Text> */}
                    {/* <Text style = {{color: '#fff'}}>주소</Text> */}
                </View>
                <View style = {styles.address_wrapper} >
                    <Text style ={{ color: '#fff'}}>{add}</Text>
                </View>
                <View style = {styles.coin_info_wrapper}>
                    <Image style = {styles.coin_img} source={require('../../assets/images/logo.png')} />
                    <View style={{ justifyContent: 'center' , flexDirection: 'row'}}>
                        <View>
                        <Text style = {styles.txt_title}>{(amount/1000000).toString()}</Text>
                        {/* <Text style = {styles.txt_subtitle}>{Number(price)*Number(amount.toString().replace(/\B(?=(\d{6})+(?!\d))/g, '.'))} KRW</Text> */}
                       
                        <Text style = {styles.txt_subtitle}>{(price*(amount/1000000)).toFixed(4).toString()} KRW</Text>
                        </View>
                        {/* 리로드 */}
                        <TouchableOpacity style = {styles.reload} onPress={() => getCoinInfo(add)}>
                        <Icon name = 'refresh' size={30} color={'#fff'} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{justifyContent: 'center'}}>
                    <TouchableOpacity style = {styles.confirmBtn} onPress={goRight}>
                    <Text style = {styles.confirm_txt}>{t('msg3')}</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.list_box_container}>
                    <Text style = {styles.title_text}>History</Text>    
                               {/* {txInfoComponent()} */}
                                    {/* <TouchableOpacity> */}
                                        {txInfo.map((item, idx) => {
                                            //   var date = new Date(item.header.timestamp);
                                            //   const nowTime = moment(item.header.timestamp).format('YYYY-MM-DD HH:mm:ss');
                                          //  const nowTime = moment(item.header.timestamp).format('YYYY-MM-DD HH:mm:ss');
                                            return(
                                            <TouchableOpacity key ={idx} style={styles.list_box} onPress={() => Linking.openURL(`https://testnet.mintscan.io/rizon-testnet/txs/${item.data.txhash}`)   
                                            // return(
                                            //     <View style={{flex: 1}}>
                                            // <WebView
                                            //     // source={{ uri: `https://testnet.mintscan.io/rizon-testnet/txs/${item.data.txhash}` }}
                                            //     source={{ uri: 'https://www.naver.com' }} 
                                            //     style={{ marginTop: 20 }}
                                            //   />
                                            //   </View>
                                            // )
                                            }>
                                                <Text style={{color: '#fff'}}>
                                                {/* {date.getFullYear()+'.'+(date.getMonth()+1)+'.'+date.getDate()
                                                + " "+date.getHours()+":"+date.getMinutes()} */}
                                                {
                                                    moment(item.header.timestamp).tz('Asia/Seoul').format('YYYY.MM.DD HH:mm:ss')
                                                }
                                                </Text>
                                              
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
                                                {item.data.logs.length === 0 ? <Text style={{color: 'red'}}>실패</Text>: null}
                                            

                                                </TouchableOpacity>
                                            )
                                        })}
                                        
                                {/* </TouchableOpacity> */}
                </ScrollView>
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
        marginTop: 20,
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
        fontSize: 18
    }
})

export default Main;