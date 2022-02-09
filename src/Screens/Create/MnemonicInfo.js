import React ,{ useState, useCallback, useEffect } from 'react';
import BG from '../../../src/assets/images/bg_2.png';
import { Text, TouchableOpacity, View, ImageBackground, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
// const data = ['damage', 'clog', 'aler', 'hurt', 'fork',  'purchase', 'iron', 'cotton', 'apple' ,'buffalo','survey','vast','damage', 'clog', 'aler', 'hurt', 'fork',  'purchase', 'iron', 'cotton', 'apple' ,'buffalo','survey','vast'];
import Topbar from '../../Components/Topbar'
import PreventBack from '../../Components/PreventBack'
import { useTranslation } from 'react-i18next';

const MnemonicInfo  = () => {

    const {t} = useTranslation();
    const navigation = useNavigation();
    const goRight = useCallback(() => navigation.navigate('MnemonicConfirm'),[]) 
    const [word, setWord] = useState([]);
    useEffect(() => {
        RNSecureKeyStore.get("mnemonic")
	    .then((res) => {
            console.log(res);
            let wordList = res.split(" ");
            setWord(wordList);
	    }, (err) => {
		    console.log(err);
	    });
    },[]);

    PreventBack('Pincode');
    return (
        <View style = {styles.container}>
            <ImageBackground style ={styles.image_bg} source ={BG}>
                <Topbar back='Pincode' />
                <View style = {styles.content} >
                    <View style = {{ marginTop: 40, alignItems: 'center'}} >
                        <Text style = {styles.txt_title}>{t('mnemonic_title')}</Text>
                        <Text style = {styles.txt_subtitle}>{t('mnemonic_subtitle_1')}</Text>
                        <Text style = {styles.txt_subtitle}>{t('mnemonic_subtitle_2')}</Text>
                    </View>
                <View style = {styles.word_list_wrapper}>
                    {word.map((item) => {
                        return(
                            <>
                                <View key={item.id} style= {[styles.word_wrapper]}>
                                    <Text key = {item.id} style = {[styles.word]}>{item}</Text>
                                </View>
                            </>
                        )
                    })}
                </View>
                <View style={{justifyContent: 'center'}}>
                    <TouchableOpacity style = {styles.confirmBtn} onPress={goRight}>
                    <Text style = {styles.confirm_txt}>{t('mnemonic_confirm_btn')}</Text>
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

export default MnemonicInfo;