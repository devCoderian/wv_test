import React ,{ useState, useCallback, useEffect } from 'react';
import BG from '../../../src/assets/images/bg_2.png';
import { Text, TouchableOpacity, View, ImageBackground,StyleSheet, TextInput, Image, ScrollView, ScrollViewBase} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import rizonjs from '../../../rizonjs/dist/rizon'
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Topbar from '../../Components/Topbar';
const Setting = () => {
  
    const navigation = useNavigation();
    const goRight = useCallback(() => navigation.navigate('SendInfo'),[]) 

    return (
        <View style = {styles.container}>
              <ImageBackground style ={styles.image_bg} source ={BG}>
              <Topbar logo={true}/>
              
                <Text style = {{color: '#fff'}}>다국어 변환</Text>
                <View style={{justifyContent: 'center'}}>
                    <TouchableOpacity style = {styles.confirmBtn} onPress={goRight}>
                    <Text style = {styles.confirm_txt}>Next</Text>
                    <Icon name = 'arrow-right' size={26} color='#fff'/>
                    
                    {/* <Icon name = 'Home' size={20} color='#fff' /> */}
                    </TouchableOpacity>
                </View>
                <Text style = {{color: '#fff'}}>비밀번호 복구 번호 내보내기</Text>
                <View style={{justifyContent: 'center'}}>
                    <TouchableOpacity style = {styles.confirmBtn} onPress={goRight}>
                    <Text style = {styles.confirm_txt}>비밀번호 복구 번호</Text>
                    <Icon name = 'arrow-right' size={26} color='#fff'/>
                    {/* <Icon name = 'Home' size={20} color='#fff' /> */}
                    </TouchableOpacity>
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
        
    },
    confirmBtn: {
        marginTop: 15,
        justifyContent: 'space-around',
        width: 370, 
        height: 45,
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
    }
})

export default Setting;