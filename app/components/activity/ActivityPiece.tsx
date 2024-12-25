import {FlatList, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import ActivityInfo from "./ActivityInfo";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import {ActivityProps} from "../../screens/Activity";

interface ActivityPieceProps {
    data: ActivityProps;
}

const ActivityPiece = (pieces: ActivityPieceProps) => {
    return (
        <TouchableOpacity style={styles.piece}>
            <View style={styles.avatarContainer}>
                <View style={styles.avatarBox}>
                    <Image source={require('../../../assets/logo.png')} style={styles.avatar}/>
                </View>
                <View style={styles.iconBox}>
                    <Ionicons name="person" size={16} color="white"/>
                </View>
            </View>
            <View style={styles.contentComponent}>
                <ActivityInfo data={pieces.data}/>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    piece: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 10,  // Tạo khoảng cách trên dưới cho phần tử
    },

    avatarContainer: {
        position: 'relative',
        top: 0,
        left: 0
    },

    avatarBox: {
        width: 37,
        height: 37,
        borderRadius: 20, // Đảm bảo hình avatar là hình tròn
        marginRight: 10,
        overflow: 'hidden',  // Ẩn phần thừa nếu ảnh không đúng tỷ lệ
    },

    avatar: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // Giữ nguyên tỷ lệ ảnh trong hình tròn
    },

    iconBox: {
        position: 'absolute',
        top: 22,
        left: 22,
        width: 20,
        height: 20,
        borderRadius: 50,
        backgroundColor: 'black',
    },

    contentComponent: {
        flex: 1, // Giúp phần contentComponent chiếm không gian còn lại
        marginLeft: 10,
    },
});

export default ActivityPiece;