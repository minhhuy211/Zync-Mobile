import {StyleSheet, Text, View} from 'react-native';
import React from "react";

const TopSearchFragment = () => (
    <View style={styles.content}>
        <Text style={styles.contentText}>Đây là nội dung của tab Top (Bài viết)</Text>
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

export default TopSearchFragment;