import React  from 'react';
import { StyleSheet, View, Text  } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { WithLocalSvg } from 'react-native-svg';
import TestSvg from '../assets/images/rizonlogo.svg';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native'
const Topbar = ({ back = null, logo, title, colorStyle, color='#fff', close = false}) => {
    
    const { t, i18n } = useTranslation();
    const navigation = useNavigation();
    
    const goNavi = () => {
        back === null ? navigation.goBack(): navigation.navigate(back);
    }
    return (
      <View style = {[colorStyle, styles.container]}>
            {logo ?  <WithLocalSvg
                width={100}
                height={40}
                fill={"#000000"}
                asset={TestSvg}
            /> : <Icon name = 'arrow-left' size={26} color ={color} onPress={() =>goNavi()}/>}
            {/* Text는 없는 거 고려해서 디자인 */}
            <View style={styles.center}>
                <Text style = {styles.text}>{title}</Text>
            </View>
                  {close ? <Icon name = 'close' size={26} color ={color} onPress={() => navigation.goBack()}/>
                : <Icon name = 'cog' size={26} color = {color}  onPress={() => navigation.navigate('Settings')}/>}
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
