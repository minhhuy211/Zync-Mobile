import React, { useEffect } from "react";
import { View, Image, StyleSheet, ActivityIndicator } from "react-native";

const Splash: React.FC<{ onHide?: () => void }> = ({ onHide }) => {


    return (
        <View style={styles.container}>
            <Image source={require("../../assets/logo.png")} style={styles.image} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff", // Màu nền
    },
    image: {
        width: 100, // Điều chỉnh kích thước
        height: 100,
        resizeMode: "contain", // Hoặc "cover" để thay đổi cách hiển thị
    },
    loader: {
        marginTop: 20, // Khoảng cách giữa hình ảnh và loader
    },
});

export default Splash;