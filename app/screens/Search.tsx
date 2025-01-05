import React from "react";
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {Searchbar} from "react-native-paper";
import {NavigationProp} from "@react-navigation/native";
import UserModel from "../models/UserModel";
import SearchItem from "../components/search/SearchItem";
import {Relationship} from "../constants/Relationship";

const data: UserModel[] = [
    {
        "id": "01JEDNK58VN4MZ624EBB8NXR9P",
        "username": "robert_brown",
        "avatar": "https://via.placeholder.com/100",
        "name": "Ja Khang",
        "relationship": Relationship.FOLLOWING,
        "isPrivate": false,
        "isVerified": false
    },
    {
        "id": "01JEDNK58VN4MZ624EBB8NXR9S",
        "username": "robert_brown",
        "avatar": "https://via.placeholder.com/100",
        "name": "Ja Khang",
        "relationship": Relationship.FOLLOWING,
        "isPrivate": false,
        "isVerified": false
    },
    {
        "id": "01JEDNK58VN4MZ624EBB8NXR9A",
        "username": "robert_brown",
        "avatar": "https://via.placeholder.com/100",
        "name": "Ja Khang",
        "relationship": Relationship.FOLLOWING,
        "isPrivate": false,
        "isVerified": false
    },
    {
        "id": "01JEDNK58VN4MZ624EBB8NXR95",
        "username": "robert_brown",
        "avatar": "https://via.placeholder.com/100",
        "name": "Ja Khang",
        "relationship": Relationship.FOLLOWING,
        "isPrivate": false,
        "isVerified": false
    },
    {
        "id": "01JEDNK58VN4MZ624EBB8NXR9O",
        "username": "robert_brown",
        "avatar": "https://via.placeholder.com/100",
        "name": "Ja Khang",
        "relationship": Relationship.FOLLOWING,
        "isPrivate": false,
        "isVerified": false
    },
    {
        "id": "01JEDNK58VN4MZ624EBB8NXR9Y",
        "username": "robert_brown",
        "avatar": "https://via.placeholder.com/100",
        "name": "Ja Khang",
        "relationship": Relationship.FOLLOWING,
        "isPrivate": false,
        "isVerified": false
    },
    {
        "id": "01JEDNK58VN4MZ624EBB8NXR9R",
        "username": "robert_brown",
        "avatar": "https://via.placeholder.com/100",
        "name": "Ja Khang",
        "relationship": Relationship.FOLLOWING,
        "isPrivate": false,
        "isVerified": false
    },
    {
        "id": "01JEDNK58VN4MZ624EBB8NXR96",
        "username": "robert_brown",
        "avatar": "https://via.placeholder.com/100",
        "name": "Ja Khang",
        "relationship": Relationship.FOLLOWING,
        "isPrivate": false,
        "isVerified": false
    },
    {
        "id": "01JEDNK58VN4MZ624EBB8NXR98",
        "username": "robert_brown",
        "avatar": "https://via.placeholder.com/100",
        "name": "Ja Khang",
        "relationship": Relationship.FOLLOWING,
        "isPrivate": false,
        "isVerified": false
    },
    {
        "id": "01JEDNK58VN4MZ624EBB8NXR93",
        "username": "robert_brown",
        "avatar": "https://via.placeholder.com/100",
        "name": "Ja Khang",
        "relationship": Relationship.FOLLOWING,
        "isPrivate": false,
        "isVerified": false
    },
    {
        "id": "01JEDNK58VN4MZ624EBB8NXR9N",
        "username": "robert_brown",
        "avatar": "https://via.placeholder.com/100",
        "name": "Ja Khang",
        "relationship": Relationship.FOLLOWING,
        "isPrivate": false,
        "isVerified": false
    },
    {
        "id": "01JEDNK58VN4MZ624EBB8NXR9X",
        "username": "robert_brown",
        "avatar": "https://via.placeholder.com/100",
        "name": "Ja Khang",
        "relationship": Relationship.FOLLOWING,
        "isPrivate": false,
        "isVerified": false
    },
    {
        "id": "01JEDNK58VN4MZ624EBB8NXR9V",
        "username": "robert_brown",
        "avatar": "https://via.placeholder.com/100",
        "name": "Ja Khang",
        "relationship": Relationship.FOLLOWING,
        "isPrivate": false,
        "isVerified": false
    },
    {
        "id": "01JEDNK58VN4MZ624EBB8NXR9T",
        "username": "robert_brown14",
        "avatar": "https://via.placeholder.com/100",
        "name": "Ja Khang",
        "relationship": Relationship.FOLLOWING,
        "isPrivate": false,
        "isVerified": false
    }
];

const Search = ({navigation}: { navigation: NavigationProp<any> }) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent={true}/>
            <Text style={styles.title}>Search</Text>
            <View style={{paddingHorizontal: 20, paddingBottom: 10}}>
                <TouchableOpacity activeOpacity={1}
                                  onPress={() => navigation.navigate('SEARCH_DETAIL')}>
                    <Searchbar
                        placeholder="Search"
                        value={""}
                        editable={false} // Không cho chỉnh sửa ở màn hình này
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
                    data={data}
                    keyExtractor={(item: UserModel): string => item.id}
                    renderItem={({item}) => <SearchItem data={item}/>}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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

export default Search;
