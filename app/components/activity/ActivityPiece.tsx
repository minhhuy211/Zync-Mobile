import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import ActivityInfo from "./ActivityInfo";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import {ActivityProps} from "../../screens/Activity";
import {NotifyIconColor} from "../../constants/notify/NotifyIconColor";
import {NotifyType} from "../../constants/notify/NotifyType";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import {NotifyIcon} from "../../constants/notify/NotifyIcon";

interface ActivityPieceProps {
    data: ActivityProps;
}

const ActivityPiece = (pieces: ActivityPieceProps) => {
    const backgroundIcon: string = getBackgroundIcon(pieces.data.type);
    const iconName: string | null = pieces.data.type === NotifyType.MENTIONED ? null : getIcon(pieces.data.type);

    return (
        <TouchableOpacity style={styles.piece}>
            <View style={styles.avatarContainer}>
                <View style={styles.avatarBox}>
                    <Image source={require('../../../assets/logo.png')} style={styles.avatar}/>
                </View>
                {iconName !== '' ?
                    (<View style={[styles.iconBox,
                        {backgroundColor: backgroundIcon}]}>
                        {(pieces.data.type !== NotifyType.MENTIONED && iconName !== null) ?
                            <Ionicons name={iconName} size={10} color="white"/> :
                            <FontAwesome6Icon name="threads" size={10} color="white"/>}
                    </View>) : null
                }
            </View>
            <View style={styles.contentComponent}>
                <ActivityInfo data={pieces.data}/>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    piece: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 4,  // Tạo khoảng cách trên dưới cho phần tử
    },

    avatarContainer: {
        position: 'relative',
        top: 10,
        left: 0
    },

    avatarBox: {
        width: 37,
        height: 37,
        borderRadius: 20, // Đảm bảo hình avatar là hình tròn
        marginRight: 10,
        overflow: 'hidden',  // Ẩn phần thừa nếu ảnh không đúng tỷ lệ
    },

    avatar: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // Giữ nguyên tỷ lệ ảnh trong hình tròn
    },

    iconBox: {
        position: 'absolute',
        top: 22,
        left: 22,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    },

    contentComponent: {
        flex: 1, // Giúp phần contentComponent chiếm không gian còn lại
        marginLeft: 10,
    },
});

// Mapping để lấy ra String tương ứng với NotifyType
const getBackgroundIcon: ((type: NotifyType) => string) = (type: NotifyType) => {
    const mapping: Record<NotifyType, string> = {
        [NotifyType.FIRST_POST]: NotifyIconColor.FIRST_POST,
        [NotifyType.FOLLOWED]: NotifyIconColor.FOLLOWED,
        [NotifyType.FOLLOW_REQUESTED]: NotifyIconColor.FOLLOW_REQUEST,
        [NotifyType.FOLLOW_APPROVED]: NotifyIconColor.FOLLOW_APPROVED,
        [NotifyType.COMMENT]: NotifyIconColor.COMMENT,
        [NotifyType.LIKED]: NotifyIconColor.LIKED,
        [NotifyType.REPOSTED]: NotifyIconColor.REPOSTED,
        [NotifyType.MENTIONED]: NotifyIconColor.MENTIONED,
        [NotifyType.POLL_RESULT_READY]: NotifyIconColor.POLL_RESULT_READY,
        [NotifyType.PICKED_FOR_U]: 'transparent'
    };
    return mapping[type] || '#CCCCCC';
}

const getIcon: ((type: NotifyType) => string | null) = (type: NotifyType) => {
    const mapping: Record<NotifyType, string> = {
        [NotifyType.FIRST_POST]: NotifyIcon.FIRST_POST,
        [NotifyType.FOLLOWED]: NotifyIcon.FOLLOWED,
        [NotifyType.FOLLOW_REQUESTED]: NotifyIcon.FOLLOW_REQUEST,
        [NotifyType.FOLLOW_APPROVED]: NotifyIcon.FOLLOW_APPROVED,
        [NotifyType.COMMENT]: NotifyIcon.COMMENT,
        [NotifyType.LIKED]: NotifyIcon.LIKED,
        [NotifyType.REPOSTED]: NotifyIcon.REPOSTED,
        [NotifyType.MENTIONED]: NotifyIcon.MENTIONED,
        [NotifyType.POLL_RESULT_READY]: NotifyIcon.POLL_RESULT_READY,
        [NotifyType.PICKED_FOR_U]: ''
    };
    return mapping[type] || '';
}

export default ActivityPiece;