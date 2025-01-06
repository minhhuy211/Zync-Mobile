import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import {StatusBar} from "expo-status-bar";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Searchbar} from "react-native-paper";
import TopSearchFragment from "../Result/TopSearchFragment";
import RecentSearchFragment from "../Result/RecentSearchFragment";
import ProfilesSearchFragment from "../Result/ProfilesSearchFragment";

interface SearchResultFragProps {
    query: string
    onBack: () => void
}

const SearchResultFragment = ({query, onBack}: SearchResultFragProps) => {
    const [activeTab, setActiveTab] = useState('Top'); // Quản lý tab hiện tại
    const [search, setSearch] = useState<string>(query);

    const handleSearch = (text: string) => {
        // setSearch(text);
        console.log("Search...")
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent={true}/>
            <View style={styles.searchArea}>
                <TouchableOpacity style={{paddingRight: 10}} onPress={onBack}>
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
            {/* Thanh tabs */}
            <View style={styles.tabs}>
                <TouchableOpacity style={[styles.tab, activeTab === 'Top' && styles.activeTab]}
                                  onPress={() => setActiveTab('Top')}>
                    <Text style={[styles.tabText, activeTab === 'Top' && styles.activeTabText]}>Top</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.tab, activeTab === 'Recent' && styles.activeTab]}
                                  onPress={() => setActiveTab('Recent')}>
                    <Text style={[styles.tabText, activeTab === 'Recent' && styles.activeTabText]}>Recent</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.tab, activeTab === 'Profiles' && styles.activeTab]}
                                  onPress={() => setActiveTab('Profiles')}>
                    <Text style={[styles.tabText, activeTab === 'Profiles' && styles.activeTabText]}>Profiles</Text>
                </TouchableOpacity>
            </View>

            {/* Nội dung của "Fragment" */}
            {activeTab === 'Top' && <TopSearchFragment/>}
            {activeTab === 'Recent' && <RecentSearchFragment/>}
            {activeTab === 'Profiles' && <ProfilesSearchFragment/>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
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
    searchBar: {
        borderRadius: 20,
        backgroundColor: '#f1f1f1',
    },
    tabs: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    activeTab: {
        borderBottomWidth: 3,
        borderBottomColor: '#000',
    },
    tabText: {
        fontSize: 16,
        color: '#666',
    },
    activeTabText: {
        color: '#000',
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default SearchResultFragment;