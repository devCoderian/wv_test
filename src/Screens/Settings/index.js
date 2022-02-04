import React ,{ useState, useCallback, useEffect } from 'react';
import BG from '../../../src/assets/images/bg_2.png';
import { Text, TouchableOpacity, View, ImageBackground,StyleSheet, TextInput, Image, ScrollView, ScrollViewBase} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import rizonjs from '../../../rizonjs/dist/rizon'
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Topbar from '../../Components/Topbar';
import { RadioButton, List  } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux'
import { changeAction } from '../../store/actions';
import { useSelector } from 'react-redux';

const Setting = ({ route }) => {
  
    const navigation = useNavigation();
  
    console.log(route.params);
    const [expanded, setExpanded] = useState(false);
    useEffect(()=>{
        if(route.params !== undefined){
            
    // const { checkRoute } = route.params;
    // const { otherParam } = route.params;

    console.log(route.params.checkRoute);
    route.params.checkRoute === true && setExpanded(true)
        }
        
    },[route])
  
    const goRight = useCallback(() => navigation.navigate('SendInfo'),[]) 
    const dispatch = useDispatch();//dispatch 사용
    const lang = useSelector((state) => state.language);
    const [checked, setChecked] = useState(lang);
    const { t, i18n } = useTranslation();
    useEffect(() => {
        checked === 'ko' ? dispatch(changeAction('ko')) : dispatch(changeAction('en'));
    },[checked]); 
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

 

    const handlePress = () => {
        setExpanded(!expanded)
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
              <Topbar logo={true}/>
              <View style = {styles.content} >
                
                <View style={{ marginVertical:15}}>
                    <Text style = {{color: '#fff'}}>{t('lang_title')}</Text>
                        <View style = {styles.confirmBtn} onPress={goRight}>
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
                            {/* <TouchableOpacity style = {styles.confirmBtn} onPress={()=> handlePress()}> */}
                            <TouchableOpacity style = {styles.confirmBtn} onPress={()=> navigation.navigate('SettingPincode')}>
                            <Text style = {{color: '#fff'}}>비밀번호 복구 단어 찾기</Text>
                                <Icon name = 'arrow-right' size={26} color ='#fff'/>
                            </TouchableOpacity>
                            
                            {expanded ? check(): null}
                            {/* <View style = {styles.word_list_wrapper}>
                                {word.map((item, idx) => {
                                    return(
                                        <>
                                    <View key={idx} style= {[styles.word_wrapper]}>
                                        <Text style = {[styles.word]}>{item}</Text>
                                    </View>
                                    </>
                                    )
                                })}
                            </View> */}

                            
                        </View>
                        </View>
                        </View>
                        {/* </View> */}
                      
                       

                    

                        {/* <List.Section title="Accordions">
                        <List.Accordion
                            title="비밀번호 복구 단어"
                            left={props => <List.Icon {...props} icon="folder" />}
                            expanded={expanded}
                            onPress={handlePress}>
                            <View style={{justifyContent: 'center'}}>
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
                            </View>
                        </List.Accordion>
                        </List.Section>
                     */}
               



        
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
    confirmBtn: {
        marginTop: 15,
        justifyContent: 'space-around',
        width: 370, 
        height: 60,
        // backgroundColor: '#0086F0',
        // borderBottomColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#FFF',
        flexDirection: 'row',
        alignItems: 'center',
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