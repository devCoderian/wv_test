import React , {useState, useMemo} from 'react';
import { StyleSheet, View, Text  } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { WithLocalSvg } from 'react-native-svg';
import TestSvg from '../assets/images/rizonlogo.svg';
import AsyncStorage from '@react-native-community/async-storage';
import { Switch } from 'react-native-paper';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
const Topbar = ({ back, logo, title, colorStyle, color='#fff'}) => {
    console.log('title', title);
    console.log('color', color)
    const { t, i18n } = useTranslation();
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [lang, setLang] = useState('ko');
    
    const onToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn)
    };
   
    useMemo(() => {
        // AsyncStorage.getItem('lang', (lang) => {
        //     lang === 'ko' ? i18n.changeLanguage('ko') : i18n.changeLanguage('en');
        //     console.log(lang);
        // });
        // i18n.changeLanguage('ko');
        isSwitchOn === true ?  i18n.changeLanguage('en') : i18n.changeLanguage('ko');
    }, [isSwitchOn]);
    
    const changeLang = () => {
        console.log('언어선택 버튼 만들기');r
          AsyncStorage.setItem('lang', lang, () => {
                console.log('성공')
          });
    }

    
    
    return (
      <View style = {[colorStyle, styles.container]}>
        {/* SVG 파일 임포트 */}
            {logo ?  <WithLocalSvg
                width={100}
                height={40}
                fill={"#000000"}
                asset={TestSvg}
            /> : <Icon name = 'arrow-left' size={26} color ={color}/>}
        {/* Text는 없는 거 고려해서 디자인 */}
            <View style={styles.center}>
                <Text style = {styles.text}>{title}</Text>
            </View>
         {/* <Icon name = 'cog' size={26} color = {color}  onPress={changeLang}/> */}
         <Text style= {{color: '#fff', marginRight: 10}}>{t('lang')}</Text><Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12
    },
    logo: {
        width: 60, height: 40, borderRadius: 20
    },
    text:{ 
        fontSize: 20, textAlign: 'center',
        color: '#fff'
    },
    center: { 
        flex: 1
    }
})

export default Topbar;
