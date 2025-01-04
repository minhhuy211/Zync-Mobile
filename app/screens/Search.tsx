import React, {useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {Searchbar} from "react-native-paper";
import {NavigationProp} from "@react-navigation/native";

const Search = () => {
    const [search, setSearch] = useState<string>('');

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent={true}/>
            <Text style={styles.title}>Search</Text>
            <View style={{paddingHorizontal: 20}}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={setSearch}
                    value={search}
                    editable={false}
                    style={styles.searchBar}
                    // onPress={() => navigation.navigate('SEARCH_DETAIL')}
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
        borderRadius: 6,
        backgroundColor: '#f1f1f1',
    },
});

export default Search;
