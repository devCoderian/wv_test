import React ,{ useState, useCallback, useEffect } from 'react';
import BG from '../../../src/assets/images/bg_2.png';
import { Text, TouchableOpacity, View, ImageBackground,StyleSheet, TextInput, Alert, Image, ScrollView, KeyboardAvoidingView} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Topbar from '../../Components/Topbar';
import { useDispatch } from 'react-redux';
import { sendInfo } from '../../store/actions'

const SendInput = () => {

    const [send_amount, setAmount] = useState(0); // 내가 보낼 수량
    const [charge, setCharge] = useState(''); //내가 보낼 수량 - 수수료
    const [balance, setBalance] = useState(0); // 보유 수량
    const [maxAmount, setMaxAmount] =useState(0); //최대 보유 수량 - 수수료
    const [send_fee, setFee] = useState(0.05); //수수료
    const [send_memo, setMemo] = useState(''); //메모
    
    const dispatch = useDispatch();

    const navigation = useNavigation();
    const goRight = useCallback(() => navigation.navigate('SendInfo'),[]) 

    useEffect(() => {
        RNSecureKeyStore.get('balance').then((item) => {
            console.log('내 보유 수량', balance)
            setBalance(parseInt(item));
            console.log('보유수량 - 수수료', parseInt(item)-(send_fee*100000));
            setMaxAmount(parseInt(item)-(send_fee*1000000)); 
        })
    },[]);

    useEffect(()=> {
        setMaxAmount(parseInt(balance)-(send_fee*1000000)); 
        //수수료 최소값 제한
        if(send_fee < 0.005){
            Alert.alert('수수료는 최소값(0.005)이상을 입금해야 합니다.');
            setFee(0.005);

        }

        
        if(send_amount.toString().indexOf(".") !== -1){
            let afterStr = send_amount.toString().split('.');
            console.log(afterStr[0]);
            console.log(afterStr[1]);
            if(afterStr[0].length > 5){
                // Alert.alert('6자리 이상으로 사용X')
                setAmount((prev) => prev)
            }else if(afterStr[1].length > 5){
                // Alert.alert('6자리 이상으로 사용X')
                setAmount((prev) => prev)
            }
        }else{
            send_amount.toString().length > 5 &&   setAmount((prev) => prev)//Alert.alert('6자리 이상으로 사용X')
        }
        
      
            if((parseFloat(send_amount)*1000000-parseFloat(send_fee)*100000)> maxAmount){
                Alert.alert(t('send_amount_warning'));
                setAmount(0);
            }else{
                setCharge(send_amount - (send_fee*100000));//컴포넌트에 setAmount(초기화) //Alert.alert('최대 수량이상을 입금할 수 없습니다.');
            }
    },[send_amount, send_fee, charge]);

    const onChange = (num) => {
        switch (num) {
            case '0.1':
                //atolo -> 6자리 제한 가능
              setAmount((prev) => (parseFloat(prev)*1000000 + 0.1*1000000)/1000000);
            //   parseInt(send_amount)/1000000
              break;
            case '1':
                setAmount((prev) => (parseInt(prev)+1));
              break;
            case '10':
                setAmount((prev) => (parseInt(prev)+10));
                break;
            case 'half':
                setAmount((maxAmount/2)/1000000)
                break;
            case 'max':
                setAmount(maxAmount/1000000)
                break;    
            default:
              0;
          }
    }

    // 송금 확인 페이지 이동(유효성)
    const onNext = () => { 
        if(send_amount === 0){
            Alert.alert('보낼 수량을 입력해주세요.');
        }else if(send_fee === 0){
            Alert.alert('보낼 수수료를 입력해주세요.');
        }else{
            dispatch(sendInfo({send_amount, send_fee, send_memo}));
            goRight();
        }
    }


    return (
        <ImageBackground style ={styles.image_bg} source ={BG}>
            <KeyboardAvoidingView
                keyboardVerticalOffset = {-600} // adjust the value here if you need more padding
                behavior={Platform.OS === "ios" ? "padding" : null} 
                style = {styles.container}>
        <ScrollView >
              <Topbar />
                <View style = {styles.content} >
                <View style = {styles.progress_wrapper}>
                    <View style = {styles.progress_bar}></View>
                    <View style = {[styles.progress_bar, {
                        backgroundColor: '#0096F0'
                    }]}></View>
                    <View style = {styles.progress_bar}></View>                
                </View>
                <View>
                <Text style = {styles.txt_subtitle}>전송할 토큰의 수량</Text>
                    {/* <Text style = {styles.txt_subtitle}>최대 전송 가능 수량: {balance}</Text> */}
                </View>
                <View style = {styles.amount_wrapper}>
                    <View style={{ justifyContent: 'center' , alignItems:'center', flexDirection: 'row'}}>
                    <TextInput style={styles.word}
                    placeholderTextColor = "#CECECE"
                    keyboardType="numeric"
                    onChangeText={(num) => {
                        let check =num.replace(/(^0+)/, ""); 
                        if(check[0] === '.'){
                            check = check.substring(1, check.length)
                        }
                         num === ''? setAmount(0):setAmount(check);
                    }}               
                    value={send_amount.toString()}    
                    />
                    
                    </View>
                    
                </View>
                  <Text style = {[styles.word,{
                    textAlign:'right', paddingRight: 15, paddingBottom:10
                }]}>전송 수량(수량 + 수수료) : {send_amount === 0 ? '0': (parseFloat(send_amount)*1000000+parseFloat(send_fee)*1000000)/1000000}</Text>
                <Text style = {[styles.word,{
                    textAlign:'right', paddingRight: 15, paddingBottom:10
                }]}>최대 전송 가능 수량(보유량- 수수료): {maxAmount/1000000}</Text>
                <View style = {styles.amount_btn_wrapper}>
                    <TouchableOpacity style = {styles.amount_btn} 
                    onPress={()=> onChange('0.1')}><Text style={{color: '#fff'}}>+ 0.1</Text></TouchableOpacity>
                    <TouchableOpacity style = {styles.amount_btn} 
                    onPress={()=> onChange('1')}
                    ><Text style={{color: '#fff'}}>+ 1</Text></TouchableOpacity>
                    <TouchableOpacity style = {styles.amount_btn}
                      onPress={()=> onChange('10')}><Text style={{color: '#fff'}}>+ 10</Text></TouchableOpacity>    
                    <TouchableOpacity style = {styles.amount_btn}
                     onPress={()=>  onChange('half')}><Text style={{color: '#fff'}}>절반</Text></TouchableOpacity>    
                     <TouchableOpacity style = {styles.amount_btn}
                    onPress={()=>  onChange('max')}><Text style={{color: '#fff'}}>최대</Text></TouchableOpacity>               
                </View>
                <View>
                    <Text style = {styles.txt_subtitle}>수수료</Text>
                </View>
                
                    <View  style={[styles.amount_wrapper,{
                         flexDirection : 'row'
                    }]}> 
                    <TextInput style={styles.word}
                    multiline={true}
                    placeholder={send_fee.toString()}
                    placeholderTextColor = "#fff"
                    onChangeText={(text) => setFee(parseFloat(text))}
                    keyboardType="number-pad"
                    value={send_fee.toString()}
                    />
                     <Text style = {styles.word}>atolo</Text>
                    </View>
                <View style = {styles.amount_btn_wrapper}>
                    <TouchableOpacity style = {styles.fee_btn} onPress={()=> setFee(0.005)}><Text style={{color: '#fff'}}>최소</Text></TouchableOpacity>
                    <TouchableOpacity style = {styles.fee_btn} onPress={()=> setFee(0.01)}><Text style={{color: '#fff'}}>낮음</Text></TouchableOpacity>
                    <TouchableOpacity style = {styles.fee_btn} onPress={()=> setFee(0.05)}><Text style={{color: '#fff'}}>평균</Text></TouchableOpacity>
                </View>
                <View>
                    <Text style = {styles.txt_subtitle}>메모</Text>
                </View>
                <View style = {[styles.amount_wrapper, {
                height:80
                }]}>
                    <TextInput style={styles.word}
                    multiline={true}
                    placeholderTextColor = "#CECECE"
                    onChangeText={(text) => setMemo(text)}
                    value={send_memo}
                    />
                </View>
                
                <View style={{justifyContent: 'center'}}>
                    <TouchableOpacity style = {styles.confirmBtn} onPress={onNext}>
                    <Text style = {styles.confirm_txt}>Next</Text>
                    <Icon name = 'arrow-right' size={26} color='#fff'/>
                    </TouchableOpacity>
                </View>
            </View>
    </ScrollView>

    </KeyboardAvoidingView>
    </ImageBackground>
    )
}



const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
    },
    image_bg:{
      flex: 1,
    //   alignItems: 'center',
    },
    content: {
        // backgroundColor: '#5566ee',
        flex: 1,
        //marginTop: -10,
        //justifyContent: 'space-around',
        //justifyContent: 'center',
        //paddingTop: 20,
        
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
    word:{
     color: '#fff'   
    }
    ,confirmBtn: {
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