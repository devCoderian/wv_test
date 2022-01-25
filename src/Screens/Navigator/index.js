import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Home';
import MnemonicConfirm from '../Create/MnemonicConfirm';
import MnemonicInfo from '../Create/MnemonicInfo';
import Pincode from '../Create/Pincode';
import PincodeConfirm from '../Create/PincodConfirm';
import { NavigationContainer } from '@react-navigation/native';
import MnemoinicInput from '../Restore/MnemoinicInput';
import RestorePincode from '../Restore/RestorePincode';
import Main from '../Main/Main';
import Success from '../Create/Success';
import SendAddress from '../Main/SendAddress';
import SendInput from '../Main/SendInput';
import SendInfo from '../Main/SendInfo';


const Navigator = () => {

  const Stack = createNativeStackNavigator ();
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name = "Home" component = {Home}/>
        <Stack.Screen name = "Pincode" component = {Pincode}/>
        <Stack.Screen name = "PincodeConfirm" component = {PincodeConfirm}/>
        <Stack.Screen name = "MnemonicInfo" component = {MnemonicInfo}/>
        <Stack.Screen name = "MnemonicConfirm" component = {MnemonicConfirm}/>
        <Stack.Screen name = "MnemonicInput" component = {MnemoinicInput}/>
        <Stack.Screen name = "Success" component = {Success}/>
        <Stack.Screen name = "RestorePincode" component = {RestorePincode}/>
        <Stack.Screen name = "Main" component = {Main}/>
        <Stack.Screen name = "SendAddress" component = {SendAddress}/>
        <Stack.Screen name = "SendInput" component = {SendInput}/>
        <Stack.Screen name = "SendInfo" component = {SendInfo}/>
    </Stack.Navigator>
    </NavigationContainer>
    )
};

export default Navigator;