import React ,{ useState, useCallback, useEffect } from 'react';
import BG from '../../../src/assets/images/bg_2.png';
import { Text, TouchableOpacity, View, ImageBackground,StyleSheet, TextInput, Image} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import rizonjs from '../../../rizonjs/dist/rizon'
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import { color } from 'react-native-reanimated';
const MnemoinicInput = () => {
  
    const navigation = useNavigation();
    const goRight = useCallback(() => navigation.navigate('Home'),[]) 

    const chainId = "groot-14";
    const rizon = rizonjs.network("http://seed-2.testnet.rizon.world:1317", chainId);
    rizon.setBech32MainPrefix("rizon");
    rizon.setPath("m/44'/118'/0'/0/0"); 

    const [ecpairPriv, setEcpairPriv] = useState();
    const [mnemonic, setMnemonic] = useState("left merge august enemy sadness human diagram proof wild eagle shoot better board humor word media motor firm zebra indicate flock thing trial protect");
    const [amount, setAmount] = useState(0);
    const [add, setAdd] = useState("");
    const [price, setPrice] = useState(0);
    const coinInfo = async(address) => {
        console.log('set')
        const balanceAPI = `http://seed-2.testnet.rizon.world:1317/cosmos/bank/v1beta1/balances/${address}`
        let balanceResponse = await fetch(balanceAPI).then(res => {
            return res.json();
        });
        console.log(balanceResponse)
        setAmount(balanceResponse.balances[0].amount);
        const atoloPriceAPI = `https://api.bithumb.com/public/ticker/atolo_KRW`
        let priceResponse = await fetch(atoloPriceAPI).then(res => {
            return res.json();
        });
        console.log(priceResponse)
        setPrice(priceResponse.data.opening_price)
    }

    useEffect(() => {
        //더미데이터
        coinInfo('rizon1rjp4thfjf4arxnh37u6stu8usr9quwe0zpqqtp');
        setAdd('rizon1rjp4thfjf4arxnh37u6stu8usr9quwe0zpqqtp');
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
                <View style = {styles.content} >
                <View style = {{ marginTop: 40}} >
                    <Text style = {styles.txt_title}>my wallet</Text>
                    {/* <Text style = {{color: '#fff'}}>주소</Text> */}
                </View>
                <View style = {styles.address_wrapper} >
                    <Text style ={{ color: '#fff'}}>{add}</Text>
                </View>
                <View style = {styles.coin_info_wrapper}>
                    <Image style = {styles.coin_img} source={require('../../assets/images/logo.png')} />
                    <View style={{marginLeft: 30,  justifyContent: 'center'}}>
                        <Text style = {styles.txt_title}>{amount.toString().replace(/\B(?=(\d{6})+(?!\d))/g, '.')}</Text>
                        <Text style = {styles.txt_subtitle}>{Number(price)*Number(amount.toString().replace(/\B(?=(\d{6})+(?!\d))/g, '.'))} KRW</Text>
                    </View>
                </View>
                <View style={{justifyContent: 'center'}}>
                    <TouchableOpacity style = {styles.confirmBtn} onPress={goRight}>
                    <Text style = {styles.confirm_txt}>Next</Text>
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
        alignItems:'center'
        
    },
    txt_title: {
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        color: '#fff',
    },
    txt_subtitle: {

        fontSize: 13,
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
      marginTop: 20,
      padding: 20,
      flexDirection: 'row',
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
        fontSize: 18
    }, 
    confirmBtn: {
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: 370, 
        height: 45,
        // backgroundColor: '#0086F0',
        borderWidth: 1,
        borderColor: '#FFF',
        borderRadius: 5,
        // borderColor: '#0086F0'
    },
    confirm_txt:{
        color: '#fff',
    }
})

export default MnemoinicInput;