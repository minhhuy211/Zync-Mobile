import React, { useEffect, useRef, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import {
  AVPlaybackStatus,
  AVPlaybackStatusSuccess,
  ResizeMode,
  Video,
} from "expo-av";

interface PostEditorGalleryProps {
  items: GalleryItemModel[];
  maxWidth: number;
  maxHeight: number;
  onRemove?: (image: GalleryItemModel) => void;
  onTouchItem?: (item: GalleryItemModel) => void;
}

export interface GalleryItemModel {
  id: string;
  uri: string;
  width: number;
  height: number;
  type?: "image" | "video" | "livePhoto" | "pairedVideo";
}

const PostEditorGallery = ({
  items,
  maxHeight,
  maxWidth,
  onRemove,
  onTouchItem,
}: PostEditorGalleryProps) => {
  const [max, setMax] = useState(0);

  useEffect(() => {
    let tmp = maxHeight;
    for (let i of items) {
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
  }, [items]);

  function getAR(height: number, width: number) {
    let aspectRatio = width / height;

    if (aspectRatio < 1) aspectRatio = 2 / 3;
    else if (aspectRatio > 1) aspectRatio = 3 / 2;
    else aspectRatio = 1;
    return aspectRatio;
  }

  function resizeImages(): GalleryItemModel[] {
    return items.map((image) => {
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

  return (
    <FlatList
      data={resizeImages()}
      renderItem={({ item }) => (
        <GalleryItem item={item} onRemove={onRemove} onTouch={onTouchItem} />
      )}
      horizontal
      ListFooterComponent={<View style={{ width: 35 }} />}
      style={{
        marginBottom: 10,
      }}
    />
  );
};

interface ImageItemProps {
  item: GalleryItemModel;
  onRemove?: (image: GalleryItemModel) => void;
  onTouch?: (image: GalleryItemModel) => void;
}

const VideoItem = ({ onRemove, onTouch, item }: ImageItemProps) => {
  const video = useRef<Video>(null);
  const [isMuted, setMuted] = useState(false);
  useEffect(() => {
    video.current?.playAsync();
    video.current?.setIsMutedAsync(true);
  }, [video.current]);

  useEffect(() => {
    video.current?.setIsMutedAsync(isMuted);
  }, [isMuted]);

  return (
    <View style={{ position: "relative", marginRight: 12 }}>
      <Video
        style={{
          borderRadius: 10,
          borderColor: "#eee",
          borderWidth: 1,
          width: item.width,
          height: item.height,
        }}
        ref={video}
        resizeMode={ResizeMode.CONTAIN}
        source={{
          uri: item.uri,
        }}
        isLooping
        onPlaybackStatusUpdate={(status) =>
          setMuted((status as AVPlaybackStatusSuccess).isMuted)
        }
      />
      {isMuted ? (
        <TouchableOpacity
          onPress={(event) => setMuted(false)}
          style={{
            width: 32,
            height: 32,
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            right: 10,
            bottom: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 42,
          }}
        >
          <Ionicons name="volume-mute-outline" color="#fff" size={20} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={(event) => setMuted(true)}
          style={{
            width: 32,
            height: 32,
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            right: 10,
            bottom: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 42,
          }}
        >
          <Ionicons name="volume-high-outline" color="#fff" size={20} />
        </TouchableOpacity>
      )}

      {onRemove && (
        <TouchableOpacity
          onPress={(event) => onRemove(item)}
          style={{
            width: 32,
            height: 32,
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            right: 10,
            top: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 42,
          }}
        >
          <Ionicons name="close-outline" color="#fff" size={20} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const ImageItem = ({ onRemove, onTouch, item }: ImageItemProps) => {
  return (
    <View style={{ position: "relative", marginRight: 12 }}>
      <Image
        source={item.uri}
        onProgress={(event) => onTouch && onTouch(item)}
        style={{
          borderRadius: 10,
          borderColor: "#eee",
          borderWidth: 1,
          width: item.width,
          height: item.height,
        }}
        contentPosition="center"
        contentFit="cover"
      />

      {onRemove && (
        <TouchableOpacity
          onPress={(event) => onRemove(item)}
          style={{
            width: 32,
            height: 32,
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            right: 10,
            top: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 42,
          }}
        >
          <Ionicons name="close-outline" color="#fff" size={20} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const GalleryItem = (props: ImageItemProps) => {
  if (props.item.type == "video") return <VideoItem {...props} />;

  return <ImageItem {...props} />;
};

export default PostEditorGallery;
