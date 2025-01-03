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
    {
        id: 1,
        name: "dungpham_2305",
        avatar: "../../../assets/logo.png",
        createdAt: "1d",
        description: NotifyDescription.FOLLOWED,
        type: NotifyType.FOLLOWED
    },
    {
        id: 2,
        name: "hello_there",
        avatar: "../../../assets/logo.png",
        createdAt: "1d",
        description: NotifyDescription.MENTIONED,
        type: NotifyType.MENTIONED
    },
    {
        id: 3,
        name: "user_123",
        avatar: "../../../assets/logo.png",
        createdAt: "2d",
        description: NotifyDescription.FOLLOW_REQUESTED,
        type: NotifyType.FOLLOW_REQUESTED
    },
    {
        id: 4,
        name: "john_doe",
        avatar: "../../../assets/logo.png",
        createdAt: "3d",
        description: NotifyDescription.FOLLOW_APPROVED,
        type: NotifyType.FOLLOW_APPROVED
    },
    {
        id: 5,
        name: "tech_guru",
        avatar: "../../../assets/logo.png",
        createdAt: "4d",
        description: NotifyDescription.COMMENT,
        type: NotifyType.COMMENT,
        content: "This is a comment about the latest post."
    },
    {
        id: 6,
        name: "dev_master",
        avatar: "../../../assets/logo.png",
        createdAt: "5d",
        description: NotifyDescription.LIKED,
        type: NotifyType.LIKED
    },
    {
        id: 7,
        name: "alex_tech",
        avatar: "../../../assets/logo.png",
        createdAt: "6d",
        description: NotifyDescription.REPOSTED,
        type: NotifyType.REPOSTED
    },
    {
        id: 8,
        name: "susan_234",
        avatar: "../../../assets/logo.png",
        createdAt: "7d",
        description: NotifyDescription.POLL_RESULT_READY,
        type: NotifyType.POLL_RESULT_READY
    },
    {
        id: 9,
        name: "mike_789",
        avatar: "../../../assets/logo.png",
        createdAt: "8d",
        description: NotifyDescription.PICKED_FOR_U,
        type: NotifyType.PICKED_FOR_U
    },
    {
        id: 10,
        name: "emma_smith",
        avatar: "../../../assets/logo.png",
        createdAt: "9d",
        description: NotifyDescription.FOLLOWED,
        type: NotifyType.FOLLOWED
    },
    {
        id: 11,
        name: "james_w",
        avatar: "../../../assets/logo.png",
        createdAt: "10d",
        description: NotifyDescription.MENTIONED,
        type: NotifyType.MENTIONED
    },
    {
        id: 12,
        name: "lucy_rose",
        avatar: "../../../assets/logo.png",
        createdAt: "11d",
        description: NotifyDescription.FOLLOW_REQUESTED,
        type: NotifyType.FOLLOW_REQUESTED
    },
    {
        id: 13,
        name: "nina_jones",
        avatar: "../../../assets/logo.png",
        createdAt: "12d",
        description: NotifyDescription.FOLLOW_APPROVED,
        type: NotifyType.FOLLOW_APPROVED
    },
    {
        id: 14,
        name: "mark_john",
        avatar: "../../../assets/logo.png",
        createdAt: "13d",
        description: NotifyDescription.COMMENT,
        type: NotifyType.COMMENT,
        content: "Great post! I really enjoyed reading it."
    },
    {
        id: 15,
        name: "alice_300",
        avatar: "../../../assets/logo.png",
        createdAt: "14d",
        description: NotifyDescription.LIKED,
        type: NotifyType.LIKED
    },
    {
        id: 16,
        name: "peter_lee",
        avatar: "../../../assets/logo.png",
        createdAt: "15d",
        description: NotifyDescription.REPOSTED,
        type: NotifyType.REPOSTED
    },
    {
        id: 17,
        name: "sophie_121",
        avatar: "../../../assets/logo.png",
        createdAt: "16d",
        description: NotifyDescription.POLL_RESULT_READY,
        type: NotifyType.POLL_RESULT_READY
    },
    {
        id: 18,
        name: "george_love",
        avatar: "../../../assets/logo.png",
        createdAt: "17d",
        description: NotifyDescription.PICKED_FOR_U,
        type: NotifyType.PICKED_FOR_U
    },
    {
        id: 19,
        name: "laura_miller",
        avatar: "../../../assets/logo.png",
        createdAt: "18d",
        description: NotifyDescription.FOLLOWED,
        type: NotifyType.FOLLOWED
    },
    {
        id: 20,
        name: "charlie_green",
        avatar: "../../../assets/logo.png",
        createdAt: "19d",
        description: NotifyDescription.MENTIONED,
        type: NotifyType.MENTIONED
    }
];


const Activity = () => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent={true}/>
            <Text style={styles.title}>Activity</Text>
            <View style={{flex: 1}}>
                <FilterButtonList/>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                    contentContainerStyle={{paddingVertical: 20}} // Padding cho FlatList container cần dùng điều này. Padding bằng CSS bị mất nội dung
                    style={styles.content}
                    data={data}
                    keyExtractor={(item: ActivityProps): string => item.id.toString()}
                    renderItem={({item}) => <ActivityPiece data={item}/>}
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
        paddingHorizontal: 20,
    }
});

export default Activity;
