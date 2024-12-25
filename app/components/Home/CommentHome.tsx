import React, { useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const CommentHome = ({ item }: { item: any }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const [showCommentInput, setShowCommentInput] = useState(false); // Quản lý trạng thái hiển thị khung nhập
  const [newComment, setNewComment] = useState(""); // Lưu nội dung comment

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      // Thêm comment mới vào danh sách comment
      item.comments.push({
        id: Math.random() * 1000000 + 1, // Generate a random number between 1 and 1,000,000
        username: "CurrentUser", // Đổi theo tên người dùng hiện tại
        avatar: require("../../../assets/logo.png"), // Avatar của người dùng
        content: newComment,
        likes: 0,
        time: "just now",
        comments: [],
      });
      setNewComment("");
      setShowCommentInput(false); // Reset khung nhập
    }
  };

  return (
    <View style={styles.comment}>
      <View style={styles.postContainer}>
        <View style={styles.headerPost}>
          <View style={styles.headerpost_left}>
            <Image source={item.avatar} style={styles.avatarPost} />

            <TouchableOpacity style={styles.addFollow}>
              <Icon name="add-circle" size={20}></Icon>
            </TouchableOpacity>

            <Text style={styles.usernamePost}>{item.username}</Text>
          </View>
          <View style={styles.headerpost_right}>
            <Text style={styles.timePost}>{item.time}</Text>

            <TouchableOpacity style={styles.otherButton}>
              <Icon name="ellipsis-horizontal" size={20}></Icon>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.post}>
          <Text style={styles.contextPost}>{item.content}</Text>

          <View style={styles.actionPost}>
            <TouchableOpacity style={styles.iconButton} onPress={handleLike}>
              <Icon
                name={liked ? "heart" : "heart-outline"}
                size={25}
                color={liked ? "red" : "black"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setShowCommentInput(!showCommentInput)}
            >
              <Icon name="chatbubble-outline" size={25}></Icon>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="repeat-outline" size={25}></Icon>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="paper-plane-outline" size={25}></Icon>
            </TouchableOpacity>
          </View>
          <Text style={styles.likes}>{item.likes} like</Text>
        </View>
      </View>

      {/* Hiển thị khung nhập comment */}
      {showCommentInput && (
        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Thêm bình luận..."
            value={newComment}
            onChangeText={(text) => setNewComment(text)}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleAddComment}
          >
            <Icon name="send" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      )}

      {item.comments && item.comments.length > 0 && (
        <View style={styles.verticalLine}></View>
      )}

      <FlatList
        data={item.comments}
        keyExtractor={(comment) => comment.id.toString()}
        renderItem={({ item }) => <CommentHome item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    overflow: "hidden",
    zIndex: 8,
  },
  addFollow: {
    position: "absolute",
    top: 30,
    left: 28,
    backgroundColor: "#fff",
    borderRadius: 100,
    padding: 0.1,
    overflow: "hidden",
    zIndex: 10,
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
  },
  iconButton: {
    marginTop: 12,
    marginRight: 10,
  },
  likes: {
    marginTop: 2,
    marginLeft: 5,
    marginBottom: 10,
    color: "#7e7e7e",
  },
  crossbar: {
    marginTop: 12,
    height: 1,
    backgroundColor: "#000",
    opacity: 0.2,
    width: "100%",
  },
  verticalLine: {
    position: "absolute",
    top: 0,
    left: 23,
    height: "100%",
    marginTop: 12,
    backgroundColor: "#000",
    opacity: 0.2,
    width: 2,
  },

  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  commentInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    backgroundColor: "#f9f9f9",
  },
  sendButton: {
    marginLeft: 10,
    padding: 10,
  },
});

export default CommentHome;
