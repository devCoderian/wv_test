import * as Progress from 'react-native-progress';
import React, { useState, useCallback, useEffect} from 'react';
import { useIsFocused, useFocusEffect  } from '@react-navigation/native';
import { Text, TouchableOpacity, View, ImageBackground,StyleSheet, BackHandler, Image, ScrollView, Alert, Linking} from 'react-native'
import { useNavigation } from '@react-navigation/native';
const PreventBack = (screen) => {
    const navigation = useNavigation();
    const handleBackChange = () => {
        console.log("확인");
        navigation.navigate(screen)
        return true;
    }
    useFocusEffect(
        useCallback(() => {
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
            handleBackChange
        )
        return () => backHandler.remove()
        },[])
      )
}


export default PreventBack; 