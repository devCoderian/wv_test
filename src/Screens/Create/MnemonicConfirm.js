import React, {useState, useEffect, useCallback} from 'react';
import BG from '../../../src/assets/images/bg_2.png';
import {Button, SafeAreaView, Text, StatusBar, TouchableOpacity, View, StyleShee, ImageBackground,StyleSheet  } from 'react-native'
// import Svg, { Path } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Paragraph, Dialog, Portal, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import { useNavigation } from '@react-navigation/native';

const MnemonicConfirm = () => {

    const [visible, setVisible] = useState(false);
    const hideDialog = () => {
        setVisible(false);
        goLeft();
    };

    const [words, setWords] = useState([]);
    const [randomWords, setRandomWords] = useState([]);
    const [num, setNum] = useState(0);
    const [falseCount, setFalseCount] = useState(0);
    const navigation = useNavigation();

    const goLeft = useCallback(() => navigation.navigate('MnemonicRead'),[]);

    useEffect(() => {
        RNSecureKeyStore.get("mnemonic")
	    .then((res) => {
            // setWord(res.split(' '));
            // console.log(res);
            let wordList = res.split(" ");
            setWords(wordList);
            setRandomWords([...wordList].sort(()=> Math.random() -0.5));
	    }, (err) => {
		    console.log(err);
	    });
    },[]);
   
    useEffect(() => {
        //통과 여부 체크하기
        num === 12 && navigation.navigate('Main');
        //navigation.navigate('Main');
    }, [num]);
    useEffect(() => {
        //통과 여부 체크하기
        falseCount === 3  && setVisible(true);
    }, [falseCount]);
    
    const isOrder = (idx) => {
        
        //idx 올리기
        // console.log(num);
        // console.log(randomWords[idx],words[num])
        
        if(randomWords[idx] === words[num]){
       
            //자르기
            setRandomWords(randomWords.filter((item, idx) => 
                words[num] !== randomWords[idx]
            ));
            console.log('+');
            setNum((prev) => prev+1);
            console.log('num', num);
            
            //setRandomWords(randomWords);
        }else{
            setFalseCount((prev) => prev+1);
            console.log('falseCount', falseCount);
        }

        }

    return (
        <View style = {styles.container}>
              <ImageBackground style ={styles.image_bg} source ={BG}>
            <View style = {styles.content} >
                <View style = {{ marginTop: 40, alignItems: 'center'}} >
                <Text style = {styles.txt_title}>복구 단어 확인하기</Text>
                <Text style = {styles.txt_subtitle}>복구 단어의 순서를 맞추세요.</Text>
                <Text style = {[styles.txt_subtitle, {
                     marginTop: 5
                }]}>*틀릴 경우 전 화면으로 돌아가 다시 한번 확인하세요.</Text>
                </View>
                <View style = {styles.word_list_wrapper}>
                    {randomWords.map((item, idx) => {
                        return(
                            <>
                         <TouchableOpacity key={item.id} style= {[styles.word_wrapper]} onPress={()=> isOrder(idx)}>
                            <Text key = {item.id} style = {[styles.word]} >{item}</Text>
                        </TouchableOpacity>
                        </>
                        )
                    })}
                </View>
                <PaperProvider>
                <View style={{justifyContent: 'center'}}>
                    {/* <TouchableOpacity onPress = {showDialog} style = {styles.confirmBtn}>
                    <Text style = {styles.confirm_txt}>확인하기</Text>
                    </TouchableOpacity> */}
                    <Portal>
                        {/* Potal 체크 */}
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <View style = {{ marginTop : 50, alignItems: 'center'}}>
                        <Text style = {{ fontSize: 14, fontWeight:'normal', color: '#000' }}>3번 이상 순서가 틀렸습니다.</Text>
                        <Text style = {{ fontSize: 14, fontWeight:'normal', color: '#000' }}>다시 한번 확인해주세요.</Text>

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
                                }}>확인</Text>
                            </TouchableOpacity>
                            </View>
                    </Dialog>
                    </Portal>
                </View>
                </PaperProvider>
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
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#151515',
        justifyContent: 'center'
    },
    iconHeader:{
        color: '#151515'
    },
    svgWrapper:{
        height: 100, 
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
        color: '#fff',
        textAlign: 'center'
    },
    word_list_wrapper:{
        flexDirection: 'row',
        marginTop: 30,
        flexWrap:'wrap',
        justifyContent: 'space-between',
        
    },
    word_wrapper: {
        width: 77,
        height: 50,
        // borderRadius: 5,
        // marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 2,
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
        width: 270, 
        height: 45,
        backgroundColor: '#0086F0',
        // borderBottomColor: '#fff',
        borderRadius: 5,
        // borderColor: '#0086F0'
    },
    confirm_txt:{
       
        color: '#fff',
    }
})

export default MnemonicConfirm;