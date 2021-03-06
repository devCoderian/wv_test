import React ,{ useState, useCallback, useEffect, useRef} from 'react';
import BG from '../../../src/assets/images/bg_2.png';
import { Text, TouchableOpacity, View, ImageBackground,StyleSheet, TextInput, RefreshControl, Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import Topbar from '../../Components/Topbar';
import rizonjs from '../../../rizonjs/dist/rizon'
import bip39 , {wordlists} from 'react-native-bip39';
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
const MnemoinicInput = () => {

    const {t} = useTranslation();
    const navigation = useNavigation();
    const isFocused = useIsFocused(); 
    let numberId = [
        {id: 1, text: ''},
        {id: 2, text: ''},
        {id: 3, text: ''},
        {id: 4, text: ''},
        {id: 5, text: ''},
        {id: 6, text: ''},
        {id: 7, text: ''},
        {id: 8, text: ''},
        {id: 9, text: ''},
        {id: 10, text: ''},
        {id: 11, text: ''},
        {id: 12, text: ''},
    ]
    const [numArray, setNumArray] = useState(numberId);
    const [inputArray, setInputArray] = useState(['','','','','','','','','','','','']);
  
    /*rizonjs*/
    const chainId = "groot-14";
    const rizon = rizonjs.network("http://seed-2.testnet.rizon.world:1317", chainId);
    rizon.setBech32MainPrefix("rizon");
    rizon.setPath("m/44'/118'/0'/0/0");

    const checkMnemonic = () => { 
      
        if (!bip39.validateMnemonic(inputArray.join(' '))){
            Alert.alert(t('mnemonic_warning'));
            setNumArray(numberId);
        }else{
            makeAddress(inputArray.join(' '));
       
            RNSecureKeyStore.set("mnemonic", inputArray.join(' '), {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
            .then((res)=> {
                console.log('니모닉 저장', res)
                navigation.navigate('RestorePincode')
            },(err) => { 
                console.log(err);
            })      
        }
      

       
    }

    //"ghost grape embody hover salon session mirror cattle decrease pair peace visa"
    const makeAddress = async(mnemonic) => {
        console.log('mnemonic',inputArray.join(' '));
        const add = rizon.getAddress(mnemonic);
        const privkey = rizon.getECPairPriv(mnemonic);
        console.log(add);
        console.log(privkey.toString('hex'));

        RNSecureKeyStore.set("address", add, {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
        .then(()=> {
            RNSecureKeyStore.set("privkey", privkey.toString('hex'), {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
            .then(()=> {
                goRight(); 
            });
        });

        // hex code 원복 방법
        // console.log(Buffer.from(ecpairPriv.toString('hex'), "hex"));
    }

    const onChangeMnemonic = (idx, value) => { 
        setNumArray([...numArray], {...numArray[idx].text = value})
        let word = [...inputArray];
        for(let i = 1; i<13; i++){
            word[idx]= value.trim();
        }
      
        console.log([...word].join(' '));
        setInputArray([...word]);
    }

    return (
        <View style = {styles.container}>
              <ImageBackground style ={styles.image_bg} source ={BG}>
                  <Topbar />
            <View style = {styles.content} >
                <View style = {{ marginTop: 40, alignItems: 'center'}} >
                <Text style = {styles.txt_title}>{t('mnemonic_title')}</Text>
                </View>
                <View style = {styles.word_list_wrapper}>
                {
                    numArray.map((item, idx) => {
                        return(
                            <TextInput style={styles.word_wrapper}
                                key={idx.toString()}
                                placeholder= {(idx+1).toString()}
                                placeholderTextColor = "#CECECE"
                                onChangeText={(value) => onChangeMnemonic(idx, value)}
                                value = {item.text}
                            />
                        )
                            })
                }
                </View>
                <View style={{justifyContent: 'center'}}>
                    <TouchableOpacity style = {styles.confirmBtn} onPress={() => checkMnemonic()}>
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
        width: 250,
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 58,
        textAlign: 'center',
        color: '#fff',
    },
    txt_subtitle: {
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 21, 
        color: '#fff'
    },
    word_list_wrapper:{
        flexDirection: 'row',
        marginTop: 30,
        flexWrap:'wrap',
        justifyContent: 'space-between',
    },
    word_wrapper: {
        textAlign:'center',
        width: 100,
        height: 50,
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        color: '#fff',
        
    },
    word: {
        fontSize: 18,
        fontWeight: '500',
        color: '#fff'
    }, 
    confirmBtn: {
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: 320, 
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