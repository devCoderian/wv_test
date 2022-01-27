import React , {useState, useMemo, useEffect, useCallback} from 'react';
import { StyleSheet, View, Text  } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { WithLocalSvg } from 'react-native-svg';
import TestSvg from '../assets/images/rizonlogo.svg';
import { Switch } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux'
import { changeAction } from '../store/actions'
import { useNavigation } from '@react-navigation/native'
const Topbar = ({ back, logo, title, colorStyle, color='#fff'}) => {
    
    const { t, i18n } = useTranslation();
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const dispatch = useDispatch();
    const onToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn)
    };
    
    const navigation = useNavigation();
    useEffect(() => {
        isSwitchOn ? dispatch(changeAction('ko')) : dispatch(changeAction('en'));
    },[isSwitchOn]); 
    
    const goSettings = useCallback(() => navigation.navigate('Settings'),[]) ;
    
    return (
      <View style = {[colorStyle, styles.container]}>
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
         <Icon name = 'cog' size={26} color = {color}  onPress={goSettings}/>
            {/* <Switch value={isSwitchOn} onValueChange={onToggleSwitch} /> */}
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
