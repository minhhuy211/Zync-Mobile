import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, ToastAndroid} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import {UserModel} from "../models/UserModel";
import {Relationship} from "../constants/FollowStatus";
import {useTranslation} from "react-i18next";
import * as ImagePicker from 'expo-image-picker';
import {ImagePickerAsset} from 'expo-image-picker';
import {Image} from "expo-image"
import PostEditorGallery, {GalleryItemModel} from "../components/PostEditorGallery";
import MentionEditor from "../components/MentionEditor";
import {Visibility} from "../models/PostRequest";
import {PostType} from "../models/PostModel";
import mediaApi from "../api/mediaApi";
import postApi from "../api/postApi";
import {useAuthSelector} from "../features/auth";



const PostEditor = () => {
    const {user} = useAuthSelector()

    const [content, setContent] = useState("")
    const [visibility, setVisibility] = useState(Visibility.ANY)
    const [images, setImages] = useState<ImagePickerAsset[]>([])
    const {t} = useTranslation()
    const [type, setType] = useState(PostType.POST)

    async function handleTouchCamera() {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: false,
            quality: 1,
        });


        if (!result.canceled) {
            setImages(result.assets)
        }
    }

    function handleRemoveItem(image: GalleryItemModel) {
        let newImages = images.filter(i => i.uri !== image.uri);
        setImages(newImages)
    }

    useEffect(() => {
        console.log(content)
    }, [content]);

    async function handleTouchPhoto() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: false,
            quality: 1,
            selectionLimit: 8,
            allowsMultipleSelection: true,
            legacy: true
        });


        if (!result.canceled) {
            setImages(result.assets)
        }
    }

    function handleSubmit() {
        let files = images.map(m => mediaApi.convertToFile(m));
        mediaApi.upload(files)
            .then((mediaIds) => {
                console.log(mediaIds)
                postApi.newPost({mediaIds, content, visibility})
            }).catch(e => console.log(e))
            .finally(() =>     ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT))
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.editorLayout}>
                <View style={styles.avtarCol}>
                    <Image source={{uri: user?.avatar}}
                           style={styles.primaryAvatar}
                    />
                    <View style={styles.line}></View>
                    <Image source={{uri: user?.avatar}}
                           style={styles.secondAvatar}
                    />
                </View>
                <View style={styles.rightCol}>
                    <Text style={styles.username}>
                        {user?.username}
                    </Text>
                    <MentionEditor placeholder={t('what is new')} onChangeValue={(text) => setContent(text)}/>
                    <PostEditorGallery onRemove={handleRemoveItem} maxHeight={300} maxWidth={270}
                                       items={images.map(value => value as GalleryItemModel)}/>

                    <View style={styles.actions}>
                        <TouchableOpacity onPress={handleTouchPhoto}>
                            <Icon name="image-outline" size={26} color="#858282"/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleTouchCamera}>
                            <Icon name="camera-outline" size={26} color="#858282"/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name="mic-outline" size={26} color="#858282"/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name="pricetag-outline" size={26} color="#858282"/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name="location-outline" size={26} color="#858282"/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name="cellular-outline" size={26} color="#858282"/>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.subtitle}>
                        {t("add to thread")}
                    </Text>
                </View>
            </View>
            <View style={{flexGrow: 1}}>

            </View>

            <View style={{display: "flex", flexDirection: "row", gap: 15, justifyContent: "space-between" ,alignItems: "center"}}>
                <View>
                    <Text style={{fontSize: 14, wordWrap: "wrap", color: "#B8B8B8"}}>
                        {t(visibility.toString().toLowerCase())}
                    </Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                        <Text style={{color: "#fff", fontWeight: "500"}}>
                            {t("post")}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        borderTopColor: "#999",
        borderTopWidth: 0.5,

    },
    avtarCol: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: 'center',
        gap: 10
    },
    primaryAvatar: {
        aspectRatio: "1/1",
        width: 38,
        borderRadius: 10000,

    },
    editorLayout: {
        display: "flex",
        flexDirection: "row",
        gap: 16,
    },
    rightCol: {
        flexGrow: 1
    },
    textInput: {
        marginBottom: 8,
        fontSize: 14
    },
    username: {
        fontSize: 16,
        fontWeight: "600"
    },
    secondAvatar: {
        aspectRatio: "1/1",
        width: 20,
        borderRadius: 10000,
        opacity: 0.6
    },
    line: {
        width: 1.8,
        flexGrow: 1,
        backgroundColor: '#E9E9E9',
        minHeight: 40
    },
    actions: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12
    },
    subtitle: {
        fontSize: 14,
        opacity: 0.3,
        fontWeight: "500"
    },
    previewImage: {

        aspectRatio: 1,
        width: 200,
        height: 200,
    },
    previewImages: {
        marginBottom: 8,

    },
    imageContainer: {},
    stickyBar: {
        backgroundColor: '#fff',
        padding: 10,
        borderColor: '#ddd',
    },
    submitBtn: {
        backgroundColor: "#000",
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        padding: 10,
        width: 80,
        borderRadius: 20
    }

});

export default PostEditor;
