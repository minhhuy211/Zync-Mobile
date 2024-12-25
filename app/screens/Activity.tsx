import React from "react";
import {FlatList, ScrollView, StyleSheet, Text, View} from "react-native";
import FilterButtonList from "../components/activity/FilterButtonList";
import {StatusBar} from "expo-status-bar";
import ActivityPiece from "../components/activity/ActivityPiece";
import {NotifyDescription} from "../constants/notify/NotifyDescription";
import {NotifyType} from "../constants/notify/NotifyType";

export interface ActivityProps {
    id: number,
    name: string,
    avatar: string,
    createdAt: string,
    description: NotifyDescription,
    content?: string,
    type: NotifyType
}

const data: ActivityProps[] = [
    {id: 1, name: "dungpham_2305", avatar: "../../../assets/logo.png", createdAt: "1d", description: NotifyDescription.FOLLOW, type: NotifyType.FOLLOW},
    {id: 2, name: "hello_there", avatar: "../../../assets/logo.png", createdAt: "1d", description: NotifyDescription.FIRST_POST, type: NotifyType.FIRST_POST},
    {id: 3, name: "testing", avatar: "../../../assets/logo.png", createdAt: "1d", description: NotifyDescription.COMMENT, type: NotifyType.COMMENT},
];

const Activity = () => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent={true}/>
            <Text style={styles.title}>Activity</Text>
            <View>
                <FilterButtonList/>
                    <FlatList
                        style={styles.content}
                        data={data}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <ActivityPiece data={item} />}
                    />
            </View>
        </View>
    );
};

// Định nghĩa các style ở đây
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    activityItem: {
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
    },

    title: {
        fontFamily: 'SF Pro',
        fontWeight: 'bold',
        fontSize: 32,
        padding: 20,
        alignItems: 'center',
    },

    buttonRow: {},

    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },

    activityDetails: {
        flex: 1,
    },

    username: {
        fontWeight: 'bold',
    },

    action: {
        color: 'gray',
    },

    time: {
        color: '#aaa',
    },

    content: {
        padding: 20,
    }
});

export default Activity;
