import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const MyCalloutView = () => {
    return(
        <View>
            <TouchableOpacity
                        style={{
                            height: 100,
                            width: 100,
                            backgroundColor: 'green',
                        }}
                        onPress={
                            () =>{
                                openGoogleMaps(loewensaal,'What');
                                console.log('bruh');
                        }}
                    ><Text>Navigate</Text></TouchableOpacity>
        </View>
    );
}

export default MyCalloutView;