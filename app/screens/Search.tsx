import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import SearchFragment from "../components/Search/Fragment/General/SearchFragment";
import SearchResultFragment from "../components/Search/Fragment/General/SearchResultFragment";
import SearchDetailFragment from "../components/Search/Fragment/General/SearchDetailFragment";

const Search = () => {
    const [currentFragment, setCurrentFragment] = useState<'Search' | 'SearchDetail' | 'SearchResult'>('Search');
    const [query, setQuery] = useState<string>('');

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent={true}/>
            {currentFragment === 'Search' && (
                <SearchFragment onNavigate={() => setCurrentFragment('SearchDetail')}/>
            )}
            {currentFragment === 'SearchDetail' && (
                <SearchDetailFragment
                    onNavigate={
                        (searchQuery: string) => {
                            setQuery(searchQuery)
                            setCurrentFragment('SearchResult')
                        }
                    }
                    onBack={() => setCurrentFragment('Search')}
                />
            )}
            {currentFragment === 'SearchResult' && (
                <SearchResultFragment
                    query={query}
                    onBack={() => setCurrentFragment('SearchDetail')}/>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40
    },
});

export default Search;
