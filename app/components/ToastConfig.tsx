import React from 'react';
import {Text, View, StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native';
import {BaseToastProps, ToastConfig} from 'react-native-toast-message';
import {Ionicons} from "@expo/vector-icons";


const toastConfig: ToastConfig = {
    postToast: ({ text1}) => (
        <View style={styles.customToastContainer}>
            <ActivityIndicator color="#fff" size={28}/>
            <Text style={styles.customToastText1}>{text1}</Text>
            <Text style={{flexGrow: 1}}></Text>

        </View>
    ),
    postSuccessToast: ({ text1}) => (
        <View style={styles.customToastContainer}>
            <Ionicons name="checkmark-circle-outline" color="#fff" size={28}/>
            <Text style={styles.customToastText1}>{text1}</Text>
            <Text style={{flexGrow: 1}}></Text>

        </View>
    ),

    postErrorToast: ({ text1}) => (
        <View style={styles.customToastContainer}>
            <Ionicons name="alert-circle-outline" color="#fff" size={28}/>
            <Text style={styles.customToastText1}>{text1}</Text>
            <Text style={{flexGrow: 1}}></Text>

        </View>
    ),
};

const styles = StyleSheet.create({
    customToastContainer: {
        width: '85%',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        padding: 12,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        gap: 12,
        paddingHorizontal: 15
    },
    customToastText1: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    customToastText2: {
        color: '#fff',
        fontSize: 14,
        marginTop: 5,
    },
});

export default toastConfig;
