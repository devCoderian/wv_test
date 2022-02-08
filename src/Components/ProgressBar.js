import * as Progress from 'react-native-progress';
import React, { useState, useCallback, useEffect} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Button, Image, ImageBackground, SafeAreaView} from 'react-native';
const ProgressBar = (stop) => {
    return(
        <>
        <View style ={[styles.absoluteView1]}>
        </View>
        <View style ={[styles.absoluteView2]}>
            <Progress.CircleSnail  size={180} animated={stop} />
        </View>
        </>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    absoluteView1:{
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
        
    },  
    absoluteView2:{
        position: 'absolute',
        zIndex: 2,
        right: 110,
        bottom: 330
        
    },  
    });

export default ProgressBar; 