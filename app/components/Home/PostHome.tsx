import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import CommentHome from "../../components/Home/CommentHome";
import { PostModel } from "../../models/PostModel";
import { useNavigation } from "@react-navigation/native";
import PostDetail from "./PostDetail";
import { Image } from "expo-image";
import { Video, Audio } from "expo-av";
import { MediaModel, MediaType } from "../../models/MediaModel";

interface PostHomeProps {
  post: PostModel;
  maxWidth: number;
  maxHeight: number;
  item?: MediaSizeModel[];
}

export interface MediaSizeModel {
  media: MediaModel;
  width: number;
  height: number;
}

interface ImageItemProps {
  item: MediaSizeModel;
  onRemove?: (image: MediaSizeModel) => void;
  onTouch?: (image: MediaSizeModel) => void;
}

const PostHome = ({ post, item, maxWidth, maxHeight }: PostHomeProps) => {
  const [max, setMax] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const navigation = useNavigation<any>();

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  // Hàm chuyển hướng PostDetails
  const handleNavigation = () => {
    console.log("Navigating to PostDetail with postId:", post.id);
    navigation.navigate("PostDetails", { postId: post.id });
  };

  // const GalleryItem = ({ onRemove, onTouch, item }: ImageItemProps) => {
  //   console.log(item.media.type);
  //   if (item.media.type == "VIDEO") return <VideoItem item={item} />;

  //   return <ImageItem item={item} />;
  // };

  // Hàm tính toán size của media
  useEffect(() => {
    let tmp = maxHeight;
    if (item)
      for (let i of item) {
        if (i.width && i.height) {
          let aspectRatio = getAR(i.height, i.width);

          let newHeight = tmp;
          let newWidth = newHeight * aspectRatio;

          if (newWidth > maxWidth) {
            newWidth = maxWidth;
            newHeight = newWidth / aspectRatio;
            tmp = newHeight;
          }
        }
      }
    console.log("max height" + tmp);
    setMax(tmp);
  }, [item]);

  function getAR(height: number, width: number) {
    let aspectRatio = width / height;

    if (aspectRatio < 1) aspectRatio = 2 / 3;
    else if (aspectRatio > 1) aspectRatio = 3 / 2;
    else aspectRatio = 1;
    return aspectRatio;
  }

  function resizeImages(): MediaSizeModel[] {
    if (item) {
      return item.map((image) => {
        if (image.width && image.height) {
          // Calculate the aspect ratio
          let aspectRatio = getAR(image.height, image.width);

          let newHeight = max;
          let newWidth = newHeight * aspectRatio;

          return { ...image, width: newWidth, height: newHeight };
        }
        return image; // return the original image if it doesn't have width/height
      });
    }
    return []; // Return an empty array if item is undefined
  }

  // Hàm render Media
  const renderMedia = (media: MediaModel) => {
    console.log(media);
    switch (media.type) {
      case MediaType.IMAGE:
        return (
          // <FlatList
          //   data={resizeImages()}
          //   renderItem={({ item }) => (
          //     <GalleryItem item={item} onRemove={onRemove} />
          //   )}
          //   horizontal
          //   ListFooterComponent={<View style={{ width: 35 }} />}
          //   style={{
          //     marginBottom: 10,
          //   }}
          // />
          <View>
            <Image source={{ uri: media.url }} style={styles.media} />
          </View>
        );
      case MediaType.VIDEO:
        return (
          <View>
            <Video
              style={styles.media}
              source={{ uri: media.url }}
              useNativeControls
              // resizeMode="contain"
              isLooping
            />
          </View>
        );
      case MediaType.AUDIO:
        return (
          <View>
            <Text>audio</Text>
          </View>
        );
    }
  };

  return (
    <TouchableOpacity onPress={handleNavigation}>
      <View style={styles.postContainer}>
        <View style={styles.headerPost}>
          <View style={styles.headerpost_left}>
            <Image source={post.author.avatar} style={styles.avatarPost} />

            <TouchableOpacity style={styles.addFollow}>
              <Icon name="add-circle" size={20}></Icon>
            </TouchableOpacity>

            <Text style={styles.usernamePost}>{post.author.name}</Text>
          </View>
          <View style={styles.headerpost_right}>
            <Text style={styles.timePost}>{post.createdAt}</Text>

            <TouchableOpacity style={styles.otherButton}>
              <Icon name="ellipsis-horizontal" size={20}></Icon>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.post}>
          {/* Content */}
          <Text style={styles.contextPost}>{post.content}</Text>

          {/* Media */}
          {post.media.length > 0 && renderMedia(post.media[0])}

          <View style={styles.actionPost}>
            <TouchableOpacity style={styles.iconButton} onPress={handleLike}>
              <Icon
                name={liked ? "heart" : "heart-outline"}
                size={25}
                color={liked ? "red" : "black"}
              />
            </TouchableOpacity>
            <Text style={styles.likes}>{post.likes}</Text>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="chatbubble-outline" size={25}></Icon>
            </TouchableOpacity>
            <Text style={styles.likes}>{post.likes}</Text>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="repeat-outline" size={25}></Icon>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="paper-plane-outline" size={25}></Icon>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* {post.comments && post.comments.length > 0 && (
        <View style={styles.verticalLine}></View>
      )} */}
      {/* <FlatList
        data={post.comments}
        keyExtractor={(comment) => comment.id.toString()}
        renderItem={({ item }) => <CommentHome item={item} />}
      /> */}

      <View style={styles.crossbar}></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  media: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  comment: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerLogo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
  },
  // Post
  postContainer: {},
  headerPost: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    flexDirection: "row",
  },
  headerpost_left: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  headerpost_right: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  avatarPost: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#fff",
    aspectRatio: "1/1",
    position: "relative",
    zIndex: 1,
  },
  addFollow: {
    position: "absolute",
    top: 30,
    left: 28,
    backgroundColor: "#fff",
    borderRadius: 100,
    padding: 0.1,
    overflow: "hidden",
    zIndex: 2,
  },
  usernamePost: {
    marginBottom: 10,
    marginLeft: 5,
    fontSize: 20,
    fontWeight: 700,
  },
  timePost: {
    fontSize: 15,
    color: "#7e7e7e",
    marginRight: 10,
  },
  otherButton: {},
  post: {
    width: "80%",
    alignSelf: "center",
    marginLeft: 35,
    marginTop: -25,
  },
  contextPost: { fontSize: 18 },
  actionPost: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginTop: 12,
    marginRight: 10,
  },
  likes: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: -5,
    marginRight: 10,
  },
  crossbar: {
    marginTop: 12,
    marginBottom: 10,
    height: 1,
    backgroundColor: "#000",
    opacity: 0.2,
    width: "100%",
  },
  verticalLine: {
    position: "absolute",
    top: 0,
    left: 23,
    height: "80%",
    marginTop: 12,
    backgroundColor: "#000",
    opacity: 0.2,
    width: 2,
  },
});

export default PostHome;
