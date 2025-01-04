import {StyleSheet, View} from 'react-native';
import React, {useEffect} from "react";

interface ProfilesFragProps {

}

const ProfilesSearchFragment = () => {
    useEffect(() => {

    }, []);

    return (
        <View style={styles.content}>
            <View>

            </View>
        </View>);
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ProfilesSearchFragment;