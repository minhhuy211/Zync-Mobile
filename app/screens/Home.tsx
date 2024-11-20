import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Key} from "../constants/Key";
import {useAppDispatch} from "../store";
import {useAuthAction} from "../features/auth";
import {accountApi} from "../api/accountApi";

const Home = () => {
    function onPress() {

    }

    useEffect(() => {
    }, []);

    return (
        <Text>Home</Text>
    );
};
const styles = StyleSheet.create({
    iconButton: {

        padding: 10,
        borderRadius: 100,
        aspectRatio: "1/1",
        width: 44,
        alignContent: "center",
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainer: {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#fff"
    }
});

Home.Header = () => {
    const dispatch = useAppDispatch();
    const {logout} = useAuthAction();
    async function handleLogout() {
        await AsyncStorage.getItem(Key.REFRESH_TOKEN)
        dispatch(logout())

    }

    return(
        <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
                <Icon name="log-out" size={24} color="#000" />
            </TouchableOpacity>
        </View>
    );
}

export default Home;
