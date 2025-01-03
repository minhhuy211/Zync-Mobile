import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import ActivityInfo from "./ActivityInfo";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import {ActivityIconColor} from "../../constants/notify/ActivityIconColor";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import {ActivityIcon} from "../../constants/notify/ActivityIcon";
import {ActivityType} from "../../constants/notify/ActivityType";
import ActivityModel from "../../models/ActivityModel";

interface ActivityPieceProps {
    data: ActivityModel;
}

const ActivityPiece = (pieces: ActivityPieceProps) => {
    const backgroundIcon: string = getBackgroundIcon(pieces.data.type);
    const iconName: string | null = pieces.data.type === ActivityType.MENTION ? null : getIcon(pieces.data.type);

    return (
        <TouchableOpacity style={styles.piece}>
            <View style={styles.avatarContainer}>
                <View style={styles.avatarBox}>
                    <Image source={require('../../../assets/logo.png')} style={styles.avatar}/>
                </View>
                {iconName !== '' ?
                    (<View style={[styles.iconBox,
                        {backgroundColor: backgroundIcon}]}>
                        {(pieces.data.type !== ActivityType.MENTION && iconName !== null) ?
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

// Mapping để lấy ra String tương ứng với ActivityType
const getBackgroundIcon: ((type: ActivityType) => string) = (type: ActivityType) => {
    const mapping: Record<ActivityType, string> = {
        // [NotifyType.FIRST_POST]: ActivityIconColor.FIRST_POST,
        [ActivityType.FOLLOW]: ActivityIconColor.FOLLOWED,
        [ActivityType.REQUEST_FOLLOW]: ActivityIconColor.FOLLOW_REQUEST,
        [ActivityType.ACCEPT_FOLLOW]: ActivityIconColor.FOLLOW_APPROVED,
        [ActivityType.REPLY]: ActivityIconColor.COMMENT,
        [ActivityType.LIKE]: ActivityIconColor.LIKED,
        [ActivityType.REPOST]: ActivityIconColor.REPOSTED,
        [ActivityType.MENTION]: ActivityIconColor.MENTIONED,
        [ActivityType.UNFOLLOW]: 'transparent',
        [ActivityType.SHARE]: 'transparent',
        [ActivityType.RECOMMEND_USER]: 'transparent',
        [ActivityType.RECOMMEND_POST]: 'transparent',
        [ActivityType.REPORT]: 'transparent',
        [ActivityType.BOOKMARK]: 'transparent',
        // [NotifyType.POLL_RESULT_READY]: ActivityIconColor.POLL_RESULT_READY,
        // [NotifyType.PICKED_FOR_U]: 'transparent'
    };
    return mapping[type] || '#CCCCCC';
}

const getIcon: ((type: ActivityType) => string) = (type: ActivityType) => {
    const mapping: Record<ActivityType, string> = {
        // [NotifyType.FIRST_POST]: ActivityIcon.FIRST_POST,
        [ActivityType.FOLLOW]: ActivityIcon.FOLLOWED,
        [ActivityType.REQUEST_FOLLOW]: ActivityIcon.FOLLOW_REQUEST,
        [ActivityType.ACCEPT_FOLLOW]: ActivityIcon.FOLLOW_APPROVED,
        [ActivityType.REPLY]: ActivityIcon.COMMENT,
        [ActivityType.LIKE]: ActivityIcon.LIKED,
        [ActivityType.REPOST]: ActivityIcon.REPOSTED,
        [ActivityType.MENTION]: ActivityIcon.MENTIONED,
        [ActivityType.UNFOLLOW]: '',
        [ActivityType.SHARE]: '',
        [ActivityType.RECOMMEND_USER]: '',
        [ActivityType.RECOMMEND_POST]: '',
        [ActivityType.REPORT]: '',
        [ActivityType.BOOKMARK]: '',
        // [NotifyType.POLL_RESULT_READY]: ActivityIcon.POLL_RESULT_READY,
        // [NotifyType.PICKED_FOR_U]: ''
    };
    return mapping[type] || '';
}

export default ActivityPiece;