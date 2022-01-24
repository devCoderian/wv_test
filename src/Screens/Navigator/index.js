import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Home';
import MnemonicConfirm from '../Create/MnemonicConfirm';
import MnemonicRead from '../Create/Mnemonic';
import Pincode from '../Create/Pincode';
import PincodeConfirm from '../Create/PincodConfirm';
import { NavigationContainer } from '@react-navigation/native';
import MnemoinicInput from '../Restore/MnemoinicInput';
import RestorePincode from '../Restore/RestorePincode';
import Main from '../Main/Main';
const Navigator = () => {

  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator  screenOptions = {{ headerShown: false }} >
        <Stack.Screen name = "Home" component = {Home}/>
        <Stack.Screen name = "Pincode" component = {Pincode}/>
        <Stack.Screen name = "PincodeConfirm" component = {PincodeConfirm}/>
        <Stack.Screen name = "MnemonicRead" component = {MnemonicRead}/>
        <Stack.Screen name = "MnemonicConfirm" component = {MnemonicConfirm}/>
        <Stack.Screen name = "MnemonicInput" component = {MnemoinicInput}/>
        <Stack.Screen name = "RestorePincode" component = {RestorePincode}/>
        <Stack.Screen name = "Main" component = {Main}/>
    </Stack.Navigator>
    </NavigationContainer>
    )
};

export default Navigator;