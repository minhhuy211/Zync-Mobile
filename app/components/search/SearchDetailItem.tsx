import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {History, HistoryType} from "../../screens/SearchDetail";
import UserModel from "../../models/UserModel";
import Ionicons from "react-native-vector-icons/Ionicons";

interface SearchDetailItemProps {
    history: History,
    onDeleteHistory: (id: number) => void;
    onSearch: (text: string) => void
    onSearchUser: (user: UserModel) => void
}

function isUserModel(data: UserModel | string): data is UserModel {
    return (data as UserModel).id !== undefined && (data as UserModel).username !== undefined;
}

const SearchDetailItem = ({history, onDeleteHistory, onSearch, onSearchUser}: SearchDetailItemProps) => {
    const handleClear = () => {
        onDeleteHistory(history.id);
    };

    return (
        <View style={styles.item}>
            {history.type === HistoryType.PEOPLE && history.data && isUserModel(history.data) ?
                <>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatarBox}>
                            <Image source={require('../../../assets/logo.png')} style={styles.avatar}/>
                        </View>
                    </View>
                    <View style={styles.contentComponent}>
                        <View style={styles.wrapper}>
                            <TouchableOpacity style={styles.info} onPress={() => {
                                if (typeof history.data === 'object' && 'id' in history.data) {
                                    onSearchUser(history.data);
                                }
                            }}>
                                <Text style={styles.username}>{history.data.username}</Text>
                                <Text style={styles.name}>{history.data.name}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{}} onPress={handleClear}>
                                <Ionicons name="close-outline" size={24} color="black"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </> :
                <>
                    <View style={styles.avatarContainer}>
                        <View style={[styles.avatarBox, {paddingLeft: 10}]}>
                            <Ionicons name="search-outline" size={24} color="black"/>
                        </View>
                    </View>
                    <View style={styles.contentComponent}>
                        <View style={styles.wrapper}>
                            <TouchableOpacity style={styles.info} onPress={() => {
                                if (typeof history.data === 'string') {
                                    onSearch(history.data)
                                }
                            }}>
                                <Text style={styles.username}>{history.data.toString()}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{}} onPress={handleClear}>
                                <Ionicons name="close-outline" size={24} color="black"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#ffffff',
    },

    avatarContainer: {
        position: 'relative',
        top: 16,
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

    contentComponent: {
        flex: 1, // Giúp phần contentComponent chiếm không gian còn lại
        marginLeft: 10,
    },

    wrapper: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: .55,
        paddingVertical: 16,
        borderColor: '#ccc',
    },

    info: {
        display: 'flex',
        flexDirection: 'column',
    },

    username: {
        fontSize: 14,
        fontFamily: "SF Pro",
        fontWeight: "bold",
        marginBottom: 2,
    },

    name: {
        fontSize: 14,
        fontFamily: "SF Pro",
        color: "#7E7E7E",
    },

    button: {
        backgroundColor: 'transparent',
        display: 'flex',
        width: 120,
        height: 30,
        borderStyle: 'solid',
        borderWidth: 1.5,
        borderColor: 'rgba(221,221,221,0.7)',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        color: '#3c3c3c',
        fontFamily: 'SF Pro',
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
    },

    followedText: {
        color: '#7E7E7E'
    },
});

export default SearchDetailItem;