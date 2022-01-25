import React ,{ useState, useCallback, useEffect} from 'react';
import BG from '../../../src/assets/images/bg_2.png';
import { Text, TouchableOpacity, View, ImageBackground,StyleSheet, TextInput} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";

const MnemoinicInput = () => {
    const navigation = useNavigation();
    const goRight = useCallback(() => navigation.navigate('RestorePincode'),[]) 

    const [inputText, setInputText] = useState('leftmergeaugustenemysadnesshumandiagramproofwildeagleshootbetterboardhumorwordmediamotorfirmzebraindicateflockthingtrialprotect');
    const [mnemonic, setMnemonic] = useState("left merge august enemy sadness human diagram proof wild eagle shoot better board humor word media motor firm zebra indicate flock thing trial protect");

    // useEffect(() => {
    //     RNSecureKeyStore.get("mnemonic")
    //     .then((res) => {
    //         setMnemonic(res);
    //     });
    // },[])

    const onChangeMnemonic = (text) => { 
        //문자열 공백 제거 정규식
        setInputText(text.replace(/(\s*)/g, ""));
    }
    
    const checkMnemonic = () => { 
        console.log('inputText', inputText);
        console.log("mnemonic", mnemonic.replace(/(\s*)/g, ""));
        console.log(inputText === mnemonic.replace(/(\s*)/g, ""));
        console.log(typeof inputText);
        if(inputText == mnemonic.replace(/(\s*)/g, "")){
            console.log('통과');
            goRight();
        }else{
            //컨펌창 만들기
            goLeft();
        }
       
    }

    return (
        <View style = {styles.container}>
              <ImageBackground style ={styles.image_bg} source ={BG}>
            <View style = {styles.content} >
                <View style = {{ marginTop: 40, alignItems: 'center'}} >
                <Text style = {styles.txt_title}>비밀번호 백업 복구 단어</Text>
                </View>
                <View style = {styles.word_list_wrapper}>
                    <TextInput style={styles.word}
                    multiline={true}
                    placeholder='메모했던 비밀번호 복구 단어 24개를 순서대로 입력하세요.'
                    placeholderTextColor = "#CECECE"
                    onChangeText={(text) => onChangeMnemonic(text)}
                    onFocus={() => console.log('onFocus')}
                    onBlur={() => console.log('onBlur')}
                    onEndEditing={() => console.log('onEndEditing')} />
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
      width: 370,
      height: 230,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: 5,
      marginTop: 20,
      padding: 10
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