import React ,{ useState, useCallback, useEffect } from 'react';
import BG from '../../../src/assets/images/bg_2.png';
import { Text, TouchableOpacity, View, ImageBackground,StyleSheet, Alert, Image, ScrollView, ScrollViewBase} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import rizonjs from '../../../rizonjs/dist/rizon'
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Topbar from '../../Components/Topbar';
import { RadioButton, List  } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

const Setting = ({ route }) => {
    const navigation = useNavigation();
    const isFocused = useIsFocused(); 
    console.log(route.params);
    const [expanded, setExpanded] = useState(false);
    const [isExpended, setIsExpended] = useState(false);
    const [hasMemonic, setHasMemonic] = useState(false);
    const init = () => {
        console.log('초기화')
        RNSecureKeyStore.remove("privkey")
        .then((res) => {
            navigation.navigate('Home');
        }, (err) => {
            console.log(res);
        });
       
    }
    useEffect(()=>{
        if(route.params !== undefined){
            route.params.checkRoute === true && setIsExpended(true)
        }
    },[route,isFocused])

    useEffect(()=>{
        expanded === true && navigation.navigate('SettingPincode');
    },[expanded, isFocused]);
    
    const lang = useSelector((state) => state.language);
    const [checked, setChecked] = useState(lang);
    const { t, i18n } = useTranslation();
    useEffect(() => {
        console.log(checked)
        checked === 'ko' ?  i18n.changeLanguage('ko') :i18n.changeLanguage('en');
    },[checked, isFocused]); 
    const [word, setWord] = useState([]);
    useEffect(() => {
        RNSecureKeyStore.get("mnemonic")
        .then((res) => {
            console.log('res',res);
            let wordList = res.split(" ");
            setWord(wordList);
        }, (err) => {
            console.log(err);
        });
    },[isFocused]);

    useEffect(() => {
        setChecked('en')
    },[]);  

    const handlePress = () => {
        if(hasMemonic === true){
            setExpanded(!expanded)
            isExpended && setIsExpended(false);
        }else{
            Alert.alert('먼저 지갑을 생성하거나 복구해주세요.')
        }
    };

    const check = () => {
        return(
        <View style = {styles.word_list_wrapper}>
        {word.map((item, idx) => {
            return(
                <>
            <View key={idx} style= {[styles.word_wrapper]}>
                <Text style = {[styles.word]}>{item}</Text>
            </View>
            </>
            )
        })}
     
    </View>
        )
    }
    return (
        <View style = {styles.container}>
              <ImageBackground style ={styles.image_bg} source ={BG}>
              <Topbar logo={true} close={true}/>
              <View style = {styles.content} >
                
                <View style={{ marginTop:20}}>
                    <Text style = {{color: '#fff'}}>{t('lang_title')}</Text>
                        <View style = {styles.confirmBtn} >
                            <Text style = {styles.confirm_txt}>Laguage</Text>
                            <Text style = {styles.confirm_txt}>{t('lang1')}</Text>
                                <RadioButton
                                value="ko"
                                status={ checked === 'ko' ? 'checked' : 'unchecked' }
                                onPress={() => setChecked('ko')}
                                 />
                            <Text style = {styles.confirm_txt}>{t('lang2')}</Text>
                                <RadioButton
                                value="en"
                                status={ checked === 'en' ? 'checked' : 'unchecked' }
                                onPress={() => setChecked('en')}
                                />
                        </View>
                    </View>
                        <View style = {styles.content} >
                                <View style={{ marginVertical:5}}>
                                <Text style = {{color: '#fff'}}>{t('lang_title')}</Text>
                                <TouchableOpacity style = {styles.confirmBtn} onPress={()=> handlePress()}>
                                <Text style = {{color: '#fff'}}>비밀번호 복구 단어 찾기</Text>
                                    <Icon name = {isExpended ? 'arrow-up': 'arrow-down'} size={26} color ='#fff'/>
                                </TouchableOpacity>
                            
                                {isExpended ? check() : null}
                            </View>
                            <View style={{ marginVertical:5}}>
                                <Text style = {{color: '#fff'}}>초기화</Text>
                                <TouchableOpacity style = {styles.confirmBtn} onPress={()=> init()}>
                                <Text style = {{color: '#fff'}}>초기화</Text>
                                    <Icon name = 'arrow-down' size={26} color ='#fff'/>
                                </TouchableOpacity>
                            </View>
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
        alignItems:'center',
        
    },
    confirmBtn: {
        marginTop: 15,
        justifyContent: 'space-between',
        width: 370, 
        height: 60,
        // backgroundColor: '#0086F0',
        // borderBottomColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#FFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 30
    },
    confirm_txt:{
        color: '#fff',
        fontSize: 18
    },
    word_list_wrapper:{
        flexDirection: 'row',
        marginTop: 10,
         flexWrap:'wrap',
        // justifyContent: 'space-between',
        
    },
    word_wrapper: {
        width: 70,
        height: 50,
        // borderRadius: 5,
        marginHorizontal: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 2,
    },
    word: {
        fontSize: 18,
        fontWeight: '400',
        color: '#fff'
    }, 
})

export default Setting;