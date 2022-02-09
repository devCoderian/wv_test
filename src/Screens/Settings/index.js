import React ,{ useState, useCallback, useEffect } from 'react';
import BG from '../../../src/assets/images/bg_2.png';
import { Text, TouchableOpacity, View, ImageBackground,StyleSheet, Alert, ScrollView, ScrollViewBase} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Topbar from '../../Components/Topbar';
import { RadioButton, List  } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useIsFocused } from '@react-navigation/native';

const Setting = ({ route }) => {
    const navigation = useNavigation();
    const isFocused = useIsFocused(); 
    console.log(route.params);
    const [isExpanded, setIsExpanded] = useState(false);
    const init = () => {
        console.log('초기화')
        RNSecureKeyStore.remove("privkey")
        .then((res) => {
            navigation.navigate('Home');
        }, (err) => {
            console.log(res);
        });
       
    }
    const [word, setWord] = useState([]);
    useEffect(()=>{
        console.log('check')
        if(route.params !== undefined){
            route.params.checkRoute === true && setIsExpanded(!isExpanded)
        }
    },[route])

    const [hasMnemonic, setHasMnemonic]= useState(false);
    useEffect(()=>{
        RNSecureKeyStore.get("mnemonic")
        .then((res) => {
            let wordList = res.split(" ");
            setWord(wordList);
            setHasMnemonic(true);
        }, (err) => {
            console.log(err);
            setHasMnemonic(false);
        });
    },[isFocused]);
    
    //const lang = useSelector((state) => state.language);
    const { t, i18n } = useTranslation();
    const [checked, setChecked] = useState(i18n.language);
    
    useEffect(() => {
        console.log(checked);
        checked === 'ko' ?  i18n.changeLanguage('ko') :i18n.changeLanguage('en');
    },[checked, isFocused]); 

    const handlePress = () => {
       
       if(hasMnemonic){
        if(isExpanded === false) {
            navigation.navigate('SettingPincode');
        }else{
            setIsExpanded(false);
        };
       }else{
        const warn = t('setting_alert');
        Alert.alert(warn);
       }
    };

    const mnem = () => {
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
                    <Text style = {{color: '#fff'}}>{t('setting_title_1')}</Text>
                        <View style = {styles.confirmBtn} >
                            <Text style = {{color: '#fff'}}>{t('setting_lang')}</Text>
                            <Text style = {styles.confirm_txt}>{t('setting_ko')}</Text>
                                <RadioButton
                                value="ko"
                                status={ checked === 'ko' ? 'checked' : 'unchecked' }
                                onPress={() => setChecked('ko')}
                                 />
                            <Text style = {styles.confirm_txt}>{t('setting_en')}</Text>
                                <RadioButton
                                value="en"
                                status={ checked === 'en' ? 'checked' : 'unchecked' }
                                onPress={() => setChecked('en')}
                                />
                        </View>
                    </View>
                        <View style = {styles.content} >
                                <View style={{ marginVertical:5}}>
                                <Text style = {{color: '#fff'}}>{t('setting_title_2')}</Text>
                                <TouchableOpacity style = {styles.confirmBtn} onPress={()=> handlePress()}>
                                <Text style = {{color: '#fff'}}>{t('setting_word')}</Text>
                                    <Icon name = {isExpanded ? 'arrow-up': 'arrow-down'} size={26} color ='#fff'/>
                                </TouchableOpacity>
                            
                                {isExpanded ? mnem() : null}
                            </View>
                            <View style={{ marginVertical:5}}>
                                <Text style = {{color: '#fff'}}>{t('setting_title_3')}</Text>
                                <TouchableOpacity style = {styles.confirmBtn} onPress={()=> init()}>
                                <Text style = {{color: '#fff'}}>{t('setting_title_3')}</Text>
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