import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const MyCalloutView = (props) => {
    return(
        <View

            style={{
                height: 100,
                width: 100,
                backgroundColor: 'green',
            }}
                    >    
            <Text>{props.name}</Text>

            <FontAwesome size={60} color="#c6c300" icon="fa-solid fa-diamond-turn-right" />
        </View>
    );
}


export default MyCalloutView;