import {FlatList, StyleSheet, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {StatusBar} from "expo-status-bar";
import {Searchbar} from "react-native-paper";
import UserModel from "../models/UserModel";
import {NavigationProp} from "@react-navigation/native";
import {Relationship} from "../constants/Relationship";
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchDetailItem from "../components/search/SearchDetailItem";

export enum HistoryType {
    PEOPLE,
    SEARCHING
}

export interface History {
    id: number
    type: HistoryType,
    data: UserModel | string
}

const user: UserModel[] = [
    {
        "id": "01JEDNK58VN4MZ624EBB8NXR9P",
        "username": "robert_brown",
        "avatar": "../../../assets/logo.png",  // Đổi ảnh đại diện
        "name": "Ja Khang",
        "relationship": Relationship.FOLLOWING,
        "isPrivate": false,
        "isVerified": false
    },
    {
        "id": "01JEDNK58VN4MZ624EBB8NXR9S",
        "username": "robert_brown",
        "avatar": "../../../assets/logo.png",  // Đổi ảnh đại diện
        "name": "Ja Khang",
        "relationship": Relationship.FOLLOWING,
        "isPrivate": false,
        "isVerified": false
    },
    {
        "id": "01JEDNK58VN4MZ624EBB8NXR9A",
        "username": "robert_brown",
        "avatar": "../../../assets/logo.png",  // Đổi ảnh đại diện
        "name": "Ja Khang",
        "relationship": Relationship.FOLLOWING,
        "isPrivate": false,
        "isVerified": false
    },
    {
        "id": "01JEDNK58VN4MZ624EBB8NXR95",
        "username": "robert_brown",
        "avatar": "../../../assets/logo.png",  // Đổi ảnh đại diện
        "name": "Ja Khang",
        "relationship": Relationship.FOLLOWING,
        "isPrivate": false,
        "isVerified": false
    },
    {
        "id": "01JEDNK58VN4MZ624EBB8NXR9O",
        "username": "robert_brown",
        "avatar": "../../../assets/logo.png",  // Đổi ảnh đại diện
        "name": "Ja Khang",
        "relationship": Relationship.FOLLOWING,
        "isPrivate": false,
        "isVerified": false
    },
    {
        "id": "01JEDNK58VN4MZ624EBB8NXR9Y",
        "username": "robert_brown",
        "avatar": "../../../assets/logo.png",  // Đổi ảnh đại diện
        "name": "Ja Khang",
        "relationship": Relationship.FOLLOWING,
        "isPrivate": false,
        "isVerified": false
    },
    {
        "id": "01JEDNK58VN4MZ624EBB8NXR9R",
        "username": "robert_brown",
        "avatar": "../../../assets/logo.png",  // Đổi ảnh đại diện
        "name": "Ja Khang",
        "relationship": Relationship.FOLLOWING,
        "isPrivate": false,
        "isVerified": false
    },
    {
        "id": "01JEDNK58VN4MZ624EBB8NXR96",
        "username": "robert_brown",
        "avatar": "../../../assets/logo.png",  // Đổi ảnh đại diện
        "name": "Ja Khang",
        "relationship": Relationship.FOLLOWING,
        "isPrivate": false,
        "isVerified": false
    },
    {
        "id": "01JEDNK58VN4MZ624EBB8NXR98",
        "username": "robert_brown",
        "avatar": "../../../assets/logo.png",  // Đổi ảnh đại diện
        "name": "Ja Khang",
        "relationship": Relationship.FOLLOWING,
        "isPrivate": false,
        "isVerified": false
    },
    {
        "id": "01JEDNK58VN4MZ624EBB8NXR93",
        "username": "robert_brown",
        "avatar": "../../../assets/logo.png",  // Đổi ảnh đại diện
        "name": "Ja Khang",
        "relationship": Relationship.FOLLOWING,
        "isPrivate": false,
        "isVerified": false
    },
    {
        "id": "01JEDNK58VN4MZ624EBB8NXR9N",
        "username": "robert_brown",
        "avatar": "../../../assets/logo.png",  // Đổi ảnh đại diện
        "name": "Ja Khang",
        "relationship": Relationship.FOLLOWING,
        "isPrivate": false,
        "isVerified": false
    },
    {
        "id": "01JEDNK58VN4MZ624EBB8NXR9X",
        "username": "robert_brown",
        "avatar": "../../../assets/logo.png",  // Đổi ảnh đại diện
        "name": "Ja Khang",
        "relationship": Relationship.FOLLOWING,
        "isPrivate": false,
        "isVerified": false
    },
    {
        "id": "01JEDNK58VN4MZ624EBB8NXR9V",
        "username": "robert_brown",
        "avatar": "../../../assets/logo.png",  // Đổi ảnh đại diện
        "name": "Ja Khang",
        "relationship": Relationship.FOLLOWING,
        "isPrivate": false,
        "isVerified": false
    },
    {
        "id": "01JEDNK58VN4MZ624EBB8NXR9T",
        "username": "robert_brown14",
        "avatar": "../../../assets/logo.png",  // Đổi ảnh đại diện
        "name": "Ja Khang",
        "relationship": Relationship.FOLLOWING,
        "isPrivate": false,
        "isVerified": false
    },
];

const historyList: History[] = [
    {
        id: 1,
        type: HistoryType.PEOPLE,
        data: user[0]
    },
    {
        id: 2,
        type: HistoryType.SEARCHING,
        data: 'Xin chào Việt Nam'
    },
    {
        id: 3,
        type: HistoryType.SEARCHING,
        data: 'Hi'
    }
]

const SearchDetail = ({navigation}: { navigation: NavigationProp<any> }) => {
    const [search, setSearch] = useState<string>('');
    const [histories, setHistories] = useState<History[]>([]);

    const handleClearHistory = (id: number) => {
        // Logic xử lý xóa phần tử, ví dụ: gọi API hoặc update state
        setHistories(prevHistories => prevHistories.filter(history => history.id !== id));
    };

    // Giả sử luôn có history
    useEffect(() => {
        setHistories(historyList);
    }, [historyList]);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent={true}/>
            <View style={styles.searchArea}>
                <TouchableOpacity style={{paddingRight: 10}} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={28} color="black"/>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1}}>
                    <Searchbar
                        placeholder="Search"
                        onChangeText={setSearch}
                        value={search}
                        style={styles.searchBar}
                    />
                </TouchableOpacity>
            </View>
            <View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                    contentContainerStyle={{paddingTop: 0, paddingBottom: 150}}
                    style={styles.followSuggest}
                    data={histories}
                    keyExtractor={(item: History): string => item.id.toString()}
                    renderItem={({item}) => <SearchDetailItem history={item} onDeleteHistory={handleClearHistory}/>}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10
    },

    searchArea: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 10,
    },

    title: {
        fontFamily: 'SF Pro',
        fontWeight: 'bold',
        fontSize: 32,
        padding: 20,
        alignItems: 'center',
    },

    searchBar: {
        borderRadius: 20,
        backgroundColor: '#f1f1f1',
    },

    followSuggest: {
        paddingHorizontal: 20,
    }
});

export default SearchDetail;
