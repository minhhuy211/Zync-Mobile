import {View, Text, StyleSheet, TouchableOpacity, FlatList} from "react-native";
import React, {useEffect, useState} from "react";
import {Relationship} from "../../../../constants/Relationship";
import {UserModel} from "../../../../models/UserModel";
import {StatusBar} from "expo-status-bar";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Searchbar} from "react-native-paper";
import SearchDetailItem from "../../SearchDetailItem";

interface SearchDetailFragProps {
    onNavigate: (searchQuery: string) => void;
    onBack: () => void;
}
export enum HistoryType {
    PEOPLE,
    SEARCHING
}
export interface History {
    id: number
    type: HistoryType,
    data: UserModel | string
}
const historyList: History[] = [
    {
        id: 1,
        type: HistoryType.PEOPLE,
        data: {
            "id": "01JEDNK58VN4MZ624EBB8NXR9P",
            "username": "robert_brown",
            "avatar": "https://via.placeholder.com/100",
            "name": "Ja Khang",
            "relationship": Relationship.FOLLOWING,
            "isPrivate": false,
            "verified": false
        },
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
];
let nowId = 4;

const SearchDetailFragment = ({onBack, onNavigate}: SearchDetailFragProps) => {
    const [search, setSearch] = useState<string>('');
    const [histories, setHistories] = useState<History[]>([]);
    const handleClearHistory = (id: number) => {
        // Logic xử lý xóa phần tử, ví dụ: gọi API hoặc update state
        setHistories(prevHistories => prevHistories.filter(history => history.id !== id));
    };
    const handleSearch = (text: string) => {
        // Điều hướng đến màn hình SEARCH_RESULT và truyền tham số query
        const history = {
            id: nowId,
            type: HistoryType.SEARCHING,
            data: text
        }
        if (history.data === '') return;
        setHistories((prevHistories) => {
            const isExist = prevHistories.some((h) => h.data === history.data);
            if (!isExist) {
                return [...prevHistories, history];
            }
            return prevHistories;
        });
        nowId++;
        onNavigate(text);
    };
    const handleSearchUser = (user: UserModel) => {
        // Navigate thẳng đến profile của user đó. Có thể chỉ cần truyền id người dùng.
        // navigation.navigate('USER', {user: user});
        console.log("Search profile user clicked.");
    }

    // Giả sử luôn có history
    useEffect(() => {
        setHistories(historyList);
    }, [historyList]);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent={true}/>
            <View style={styles.searchArea}>
                <TouchableOpacity style={{paddingRight: 10}} onPress={() => onBack()}>
                    <Ionicons name="chevron-back-outline" size={28} color="black"/>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1}}>
                    <Searchbar
                        placeholder="Search"
                        onChangeText={setSearch}
                        value={search}
                        style={styles.searchBar}
                        onSubmitEditing={({ nativeEvent }) => handleSearch(nativeEvent.text)}
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
                    renderItem={({item}) =>
                        <SearchDetailItem history={item}
                                          onDeleteHistory={handleClearHistory}
                                          onSearch={handleSearch}
                                          onSearchUser={handleSearchUser}
                        />}
                />
            </View>
        </View>
    );
};

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

export default SearchDetailFragment;