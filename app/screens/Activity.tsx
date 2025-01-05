import React, {useEffect, useState} from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import FilterButtonList from "../components/Activity/FilterButtonList";
import {StatusBar} from "expo-status-bar";
import ActivityPiece from "../components/Activity/ActivityPiece";
import ActivityModel from "../models/ActivityModel";
import {data} from "../constants/notify/ExampleData";
import api from "../api/api";
import {activityApi} from "../api/activityApi";
import {ActivityType} from "../constants/notify/ActivityType";

const xmplData: ActivityModel[] = data;

const Activity = () => {
    const [data, setData] = useState<ActivityModel[]>([]);

    // // Render example data
    // useEffect(() => {
    //     const fetchXmplData = async () => {
    //         try {
    //             console.log("Fetching data...");
    //             // Giả lập gọi API
    //             await new Promise(resolve => setTimeout(resolve, 3000));
    //             console.log("Call API success");
    //             setData(xmplData);
    //             console.log(xmplData);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };
    //
    //     fetchXmplData();
    // }, [xmplData, data]); // Chạy lại nếu `xmplData` hoặc `data` thay đổi


    useEffect(() => {
        console.log("Fetching data...");
        activityApi
            .getActivities(10, 0, [ActivityType.MENTION])
            .then((data: ActivityModel[]) => {
                console.log(data);
                setData(data);
            })
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent={true}/>
            <Text style={styles.title}>Activity</Text>
            <View>
                <FilterButtonList/>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingTop: 20, paddingBottom: 130}}
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
        paddingTop: 40
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
