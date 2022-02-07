import React ,{ useState, useCallback, useEffect} from 'react';
import BG from '../../../src/assets/images/bg_2.png';
import { Text, TouchableOpacity, View, ImageBackground,StyleSheet, TextInput} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import Topbar from '../../Components/Topbar';
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
    const [inputArray, setInputArray] = useState(['','','','','','','','','','','','','','', ]);
    const [inputText, setInputText] = useState('');
    // const [inputText, setInputText] = useState('leftmergeaugustenemysadnesshumandiagramproofwildeagleshootbetterboardhumorwordmediamotorfirmzebraindicateflockthingtrialprotect');
    const [mnemonic, setMnemonic] = useState("left merge august enemy sadness human diagram proof wild eagle shoot better board humor word media motor firm zebra indicate flock thing trial protect");

        // let seq = [];
        // for(let i = 1; i<13; i++){
        //     seq.push(i);
        // }
     
    // useEffect(() => {
    //     RNSecureKeyStore.get("mnemonic")
    //     .then((res) => {
    //         setMnemonic(res);
    //     });
    // },[])

        
    
    const onChangeMnemonic = (idx, text) => { 
        let word = [...inputArray];
        for(let i = 0; i<12; i++){
                word[idx]= text;
        }
        


        //문자열 공백 제거 정규식
        //setInputText(text.replace(/(\s*)/g, ""));
        // console.log(text);
        // let check = [];
        // check.push(text);
        // setInputText(...check);
        setInputArray([...word]);
        setInputText(inputArray.join(' '));
    }
    

    const checkMnemonic = () => { 
        // setInputText(inputArray.join(','));
        console.log('inputText', inputText);
        console.log("mnemonic", mnemonic.replace(/(\s*)/g, ""));
        console.log(inputText === mnemonic.replace(/(\s*)/g, ""));
        console.log(typeof inputText);
        if(inputText == mnemonic.replace(/(\s*)/g, "")){
            //goRight();
        }else{
            //컨펌창 만들기
            //navigation.navigate('Home')
        }
       
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