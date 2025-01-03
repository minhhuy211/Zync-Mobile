import React, {useEffect, useState} from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import FilterButtonList from "../components/activity/FilterButtonList";
import {StatusBar} from "expo-status-bar";
import ActivityPiece from "../components/activity/ActivityPiece";
import ActivityModel from "../models/ActivityModel";
import api from "../api/api";

const apiUrl = 'http://192.168.88.54:8080/api/v1/me/activities';

const Activity = () => {
    const [data, setData] = useState<ActivityModel[]>([]); // Đảm bảo state có kiểu phù hợp

    useEffect(() => {
        console.log("Fetching data...");
        const fetchActivity = async () => {
            try {
                const response= await api.get<ActivityModel[]>(apiUrl);
                console.log(response);
                setData(response); // Cập nhật state đúng kiểu
                console.log(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchActivity(); // Gọi hàm fetchData
    }, []);

    useEffect(() => {
        console.log("Updated data:", data); // Lắng nghe sự thay đổi của `data`
    }, [data]);

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
                    keyExtractor={(item: ActivityModel): string => item.id}
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
