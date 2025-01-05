import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from "react";

const RecentSearchFragment = () => (
    <View style={styles.content}>
    <Text style={styles.contentText}>Đây là nội dung của tab Recent (Thêm các bài viết vào đây)</Text>
</View>
);

const styles = StyleSheet.create({
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

export default RecentSearchFragment;