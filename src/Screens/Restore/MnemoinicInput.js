import React ,{ useState, useCallback, useEffect} from 'react';
import BG from '../../../src/assets/images/bg_2.png';
import { Text, TouchableOpacity, View, ImageBackground,StyleSheet, TextInput, RefreshControl, Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import Topbar from '../../Components/Topbar';
import rizonjs from '../../../rizonjs/dist/rizon'
import bip39 , {wordlists} from 'react-native-bip39';
const MnemoinicInput = () => {

    const navigation = useNavigation();
    const goRight = useCallback(() => navigation.navigate('RestorePincode'),[]) 
    
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
        {id: 10},
        {id: 11},
        {id: 12},
    ]
    const [numArray, setNumArray] = useState(numberId);
    const [inputArray, setInputArray] = useState(['','','','','','','','','','','','']);
    const [inputText, setInputText] = useState('');
    // const [inputText, setInputText] = useState('leftmergeaugustenemysadnesshumandiagramproofwildeagleshootbetterboardhumorwordmediamotorfirmzebraindicateflockthingtrialprotect');
    //const [mnemonic, setMnemonic] = useState("left merge august enemy sadness human diagram proof wild eagle shoot better board humor word media motor firm zebra indicate flock thing trial protect");

  
    /*rizonjs*/
    const chainId = "groot-14";
    const rizon = rizonjs.network("http://seed-2.testnet.rizon.world:1317", chainId);
    rizon.setBech32MainPrefix("rizon");
    rizon.setPath("m/44'/118'/0'/0/0");
        
    
    const onChangeMnemonic = (idx, text) => { 
        //문자열 공백 제거 정규식
        //setInputText(text.replace(/(\s*)/g, ""));
        let word = [...inputArray];
        for(let i = 0; i<12; i++){
            word[idx]= text.trim();
        }
      
        console.log([...word].join(' '));
        setInputArray([...word]);
    }
    

    const [check, setCheck] =useState('');
    const checkMnemonic = () => { 
      
        if (!bip39.validateMnemonic(inputArray.join(' '))){
            Alert.alert('유효하지 않은 단어입니다. 다시 입력해주세요.');
        }
      
        makeAddress(inputArray.join(' '));
       
        RNSecureKeyStore.set("mnemonic", inputArray.join(' '), {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
        .then((res)=> {
            console.log('니모닉 저장', res)
        },(err) => { 
            Alert.alert('유효하지 않은 단어입니다. 다시 입력해주세요.');
            // navigation.navigate('MnemonicInput')
            //setInputArray(['','','','','','','','','','','','']);
        })

       
    }
    //ghost grape embody hover salon session mirror cattle decrease pair peace visa
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

    
    return (
        <View style = {styles.container}>
              <ImageBackground style ={styles.image_bg} source ={BG}>
                  <Topbar />
            <View style = {styles.content} >
                <View style = {{ marginTop: 40, alignItems: 'center'}} >
                <Text style = {styles.txt_title}>비밀번호 백업 복구 단어</Text>
                </View>
                <View style = {styles.word_list_wrapper}>
                {
                    numArray.map((item, idx) => {
                        return(
                            <TextInput style={styles.word_wrapper}
                                key={item.id}
                                placeholder= {item.id.toString()}
                                placeholderTextColor = "#CECECE"
                                onChangeText={(text) => onChangeMnemonic(idx, text)}
                            />
                        )
                            })
                }
                    {/* <TextInput style={styles.word}
                    multiline={true}
                    placeholder='메모했던 비밀번호 복구 단어 24개를 순서대로 입력하세요.'
                    placeholderTextColor = "#CECECE"
                    onChangeText={(text) => onChangeMnemonic(text)}
                    onFocus={() => console.log('onFocus')}
                    onBlur={() => console.log('onBlur')}
                    onEndEditing={() => console.log('onEndEditing')} /> */}
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