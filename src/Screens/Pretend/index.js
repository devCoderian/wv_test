import React, {useState, useEffect, useCallback} from 'react';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import { useNavigation } from '@react-navigation/native';
import ProgressBar from '../../Components/ProgressBar';
const Pretend = () => {
    const [main, setMain] = useState('');
    const navigation = useNavigation();
    const [progress, setProgress] = useState(true);
  useEffect(() => {
    console.log('######준비');
    // setProgress(true);
      RNSecureKeyStore.get("privkey")
      .then((res) => {
        console.log('######',res);
        //setProgress(false);
        navigation.navigate('Main');
      }, (err) => {
        navigation.navigate('Home');
        // console.log(err);
        //setProgress(false);
        // goHome();
      });
  },[])
  return progress ? <ProgressBar /> : null
  
 }
 export default Pretend;