import React ,{ useState, useCallback, useEffect } from 'react';
import BG from '../../../src/assets/images/bg_2.png';
import { Text, TouchableOpacity, View, ImageBackground,StyleSheet, TextInput, Image, ScrollView, ScrollViewBase} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import rizonjs from '../../../rizonjs/dist/rizon'
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Topbar from '../../Components/Topbar';
import { color } from 'react-native-reanimated';
const SendInput = () => {
  
    const navigation = useNavigation();
    const goRight = useCallback(() => navigation.navigate('SendInfo'),[]) 

    return (
        <View style = {styles.container}>
              <ImageBackground style ={styles.image_bg} source ={BG}>
              <Topbar logo={true}/>
                <View style = {styles.content} >
                <View style = {styles.progress_wrapper}>
                    <View style = {styles.progress_bar}></View>
                    <View style = {[styles.progress_bar, {
                        backgroundColor: '#0096F0'
                    }]}></View>
                    <View style = {styles.progress_bar}></View>                
                </View>
                <View>
                    <Text style = {styles.txt_subtitle}>최대 전송 가능 수량</Text>
                </View>
                <View style = {styles.amount_wrapper}>
                    <View style={{ justifyContent: 'center' , flexDirection: 'row'}}>
                    <TextInput style={styles.word}
                    multiline={true}
                    placeholder='보낼 수량을 입력하세요.'
                    placeholderTextColor = "#CECECE"
                    // onChangeText={(text) => onChangeAmount(text)}
                    />
                    </View>
                </View>
                <View style = {styles.amount_btn_wrapper}>
                    <View style = {styles.amount_btn}><Text style={{color: '#fff'}}>+ 1</Text></View>
                    <View style = {[styles.amount_btn, {
                        borderColor: '#0096F0'
                    }]}><Text style={{color: '#0096F0'}}>+ 10</Text></View>
                    <View style = {styles.amount_btn}><Text style={{color: '#fff'}}>+ 100</Text></View>    
                    <View style = {styles.amount_btn}><Text style={{color: '#fff'}}>절반</Text></View>    
                    <View style = {styles.amount_btn}><Text style={{color: '#fff'}}>최대</Text></View>                
                </View>
                <View>
                    <Text style = {styles.txt_subtitle}>수수료</Text>
                </View>
                
                {/* <View style = {styles.amount_wrapper}> */}
                <View style ={{ flexDirection : 'row', alignItems:'center'}}>
                    <View  style={[styles.amount_wrapper,{
                        width: 230, 
                    }]}>
                    <TextInput style={styles.word}
                    multiline={true}
                    placeholderTextColor = "#fff"
                    placeholder='0.025'
                    />
                    {/* </View> */}
                </View>
                <Text style={{color: '#fff', marginLeft: 10}}>=</Text>
                <View style={{width: 120, alignItems: 'center'}}>
                <Text style ={{color: '#fff',  fontSize: 18}}>1000000</Text>
                <Text style ={{color: '#fff',   fontSize: 18}}>atolo</Text>
                </View>
                </View>
                <View style = {styles.amount_btn_wrapper}>
                    <View style = {styles.fee_btn}><Text style={{color: '#fff'}}>최소</Text></View>
                    <View style = {[styles.fee_btn, {
                        borderColor: '#0096F0'
                    }]}><Text style={{color: '#0096F0'}}>낮음</Text></View>
                    <View style = {styles.fee_btn}><Text style={{color: '#fff'}}>평균</Text></View>              
                </View>
                <View>
                    <Text style = {styles.txt_subtitle}>메모</Text>
                </View>
                <View style = {[styles.amount_wrapper, {
                height:150
                }]}>
                    <View style={{ justifyContent: 'center' , flexDirection: 'row'}}>
                    <TextInput style={styles.word}
                    multiline={true}
                    placeholderTextColor = "#CECECE"
                    // onChangeText={(text) => onChangeAmount(text)}
                    />
                    </View>
                </View>
                
                <View style={{justifyContent: 'center'}}>
                    <TouchableOpacity style = {styles.confirmBtn} onPress={goRight}>
                    <Text style = {styles.confirm_txt}>Next</Text>
                    <Icon name = 'arrow-right' size={26} color='#fff'/>
                    {/* <Icon name = 'Home' size={20} color='#fff' /> */}
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
        
    },
    progress_wrapper: {
        flexDirection: 'row',
        marginTop: 7,
        marginBottom: 25, 
        justifyContent: 'center'
    },
    progress_bar:{
        margin: 10,
        width: 60, 
        height: 3,
        backgroundColor: ' rgba(160, 160, 160, 0.4);'
    },
    txt_subtitle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#fff'
    },
    amount_wrapper:{
        width: 370,
        height: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 5,
        marginVertical: 17,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    amount_btn_wrapper: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 15,
        justifyContent: 'space-around',
    },
    amount_btn:{
        marginHorizontal: 7,
        justifyContent: 'space-around',
        width: 62, 
        height: 35,
        // backgroundColor: '#0086F0',
        // borderBottomColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#FFF',
        flexDirection: 'row',
        alignItems: 'center',
    },
    fee_btn:{
       justifyContent: 'center',
        width: 100, 
        height: 35,
        // backgroundColor: '#0086F0',
        // borderBottomColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#FFF',
        flexDirection: 'row',
        alignItems: 'center',
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

export default SendInput;