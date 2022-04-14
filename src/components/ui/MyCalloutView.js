import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const MyCalloutView = (props) => {
    return(
        <View style={{
            display:'flex',
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent:'center',

            height: '100%',
            width: '100%',
            borderWidth: 0,
            borderRadius: 40,
            bottom: 5,
            backgroundColor: 'grey',
            
        }}>
        
            
                 
            <Text style={{marginTop:40, fontSize:30,color:'white'}}>{props.name}</Text>
            <Text>{props.description}</Text>
            <FontAwesome style={{ marginTop: 'auto', marginBottom: 'auto', alignSelf: 'center' }} name={'location-arrow'} size={50} color="#FFFFFF" />

        </View>
    );

}


export default MyCalloutView;