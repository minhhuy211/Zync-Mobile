

import React, { useEffect, useState } from 'react';
import {PostModel, PostType } from '../../models/PostModel';
import Tabs from '../Tabs';
import postApi from '../../api/postApi';
import { View } from 'react-native-animatable';
import { FlatList, TouchableOpacity } from 'react-native';
import PostHome from '../Home/PostHome';
import meApi from '../../api/meApi';
interface PostsTabProps {
    posts: PostModel[]
    onLoadMore: () => void;
    onRefresh: () => void;
    onPostPress: (post: PostModel) => void;
    onChangeType: (type: PostType) => void;
}

const items = [
    {value: PostType.POST, label: 'Zyncs'},
    {value: PostType.REPLY, label: 'Zyncs trả lời'},
    {value: PostType.REPOST, label: 'Bài đăng lại'},
];
 const PostTab = ({onChangeType, onPostPress} : PostsTabProps) => {
    const [posts, setPosts] = useState<PostModel[]>([]);
    const [tabValue, setTabValue] = useState(PostType.POST);
    const [filterPosts, setFilterPosts] = useState<PostModel[]>([]);
    
    useEffect(() => {
        const fectchPosts = async () => {
            try{
                const data = await meApi.getPosts(5, 0, tabValue);
                setPosts(data);
                setFilterPosts(data.filter(post => post.type === tabValue));
            } catch(error){
                console.error("Failed to fetch posts:", error);
            }
        };
        fectchPosts();
    }, [])

    useEffect(() => {
        const filtered = posts.filter(post => post.type === tabValue);
        setFilterPosts(filtered);
    }, [ tabValue, posts]);

     function handleTabChange(value: any): void {
         setTabValue(value.value);
         onChangeType(value);
        console.log(value);
        
     }

    return(
        <View >
            <Tabs value={tabValue} onTabChange={handleTabChange} items={items}/>
            <FlatList
                data={filterPosts}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => onPostPress(item)} >
                        <PostHome post={item}/>
                    </TouchableOpacity>
                    
                )}
                keyExtractor={item => item.id}
                onEndReachedThreshold={0.5}
            />
        </View>
        
    )
}

export default PostTab;