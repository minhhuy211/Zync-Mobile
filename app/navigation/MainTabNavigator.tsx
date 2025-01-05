import React from 'react';
import Home from "../screens/Home";
import Search from "../screens/Search";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {AuthenticatedStackParams} from "./AuthenticatedNavigator";
import OctIcon from "@expo/vector-icons/Octicons";
import Activity from "../screens/Activity";

const MainTabNavigator = () => {
    const Tab = createBottomTabNavigator();
    const navigation = useNavigation<NavigationProp<AuthenticatedStackParams>>();
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                title: "",
                tabBarStyle: styles.tabBarStyle,
                headerBackgroundContainerStyle: styles.headerBackgroundContainerStyle,
                tabBarActiveTintColor: "#000",
                tabBarShowLabel: false,
                headerShadowVisible: false,
                headerShown: false
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{tabBarIcon: (props) => <OctIcon name={"home"} {...props} />}}
            />
            <Tab.Screen
                name="SEARCH"
                component={Search}
                options={{tabBarIcon: (props) => (<OctIcon name="search" {...props}/>)}}
            />

            <Tab.Screen
                name="Add"
                component={() => null} // Empty component for the button
                options={{
                    tabBarIcon: (props) => (
                        <View style={styles.search}><OctIcon name="plus"  {...props} size={32} focused={true}/></View>
                    ),
                    tabBarButton: (props) => (
                        //@ts-ignore
                        <TouchableOpacity {...props} onPress={() => navigation.push("PostEditor", {})}/>
                    )
                    ,
                }}
            />

            <Tab.Screen
                name="Activity"
                component={Activity} // Empty component for the button
                options={{
                    tabBarIcon: (props) => <OctIcon size={props.size} color={props.focused ? "#EA333E" : props.color}
                                                    name={props.focused ? "heart-fill" : "heart"}/>,

                }}
            />
            <Tab.Screen
                name="Users"
                component={() => null} // Empty component for the button
                options={{
                    tabBarIcon: (props) => <OctIcon name={props.focused ? "person-fill" : "person"} {...props}/>,

                }}
            />


            {/*<Tab.Screen*/}
            {/*    name="SELF"*/}
            {/*    component={SelfProfile}*/}
            {/*    options={{*/}
            {/*        tabBarIcon: (props) => (*/}
            {/*            <NavigatorTabIcon name="person-circle-outline" {...props} />*/}
            {/*        ),*/}
            {/*        headerLeft: SelfProfile.HeaderLeft,*/}
            {/*        headerRight: SelfProfile.HeaderRight,*/}
            {/*    }}*/}
            {/*/>*/}
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    search: {
        paddingHorizontal: 18,
        paddingVertical: 6,
        backgroundColor: "#eee",
        borderRadius: 6
    },
    tabBarStyle: {
        height: 64, // Custom height for the bottom tab
        backgroundColor: "#fff", // Change background color if necessary
        elevation: 0, // Removes the shadow for Android
        shadowOpacity: 0,
        borderTopWidth: 0, // Removes the top border

    },
    headerBackgroundContainerStyle: {
        backgroundColor: "#fff",
    }
})

export default MainTabNavigator;
