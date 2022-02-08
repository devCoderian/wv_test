import React, {useState, useEffect} from 'react';
import Navigator from './src/Screens/Navigator';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import {Provider as ReduxProvider} from 'react-redux';
import { makeStore } from './src/store/store';
import { useDispatch } from 'react-redux'
 const App = () => {
  const store = makeStore();
  
  const [main, setMain] = useState('');
  useEffect(() => {
      RNSecureKeyStore.get("privkey")
      .then((res) => {
        console.log(res);
       setMain('Main')
      }, (err) => {
        console.log(err);
      setMain('Home')
      });
  },[])
   return (
    <ReduxProvider store ={store}>
      <Navigator main= {main} />
    </ReduxProvider>
   );
 }
 export default App;