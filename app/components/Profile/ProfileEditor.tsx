import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Switch,
  Button,
  Modal,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import meApi from "../../api/meApi";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { ProfileModel } from "../../models/ProfileModel";

interface ProfileEditorProps {
  profile: ProfileModel;
  visible: boolean;
  onUpdated: () => void;
  onclose: () => void;
}
export const ProfileEditor = ({
  profile,
  visible,
  onclose,
  onUpdated,
}: ProfileEditorProps) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [link, setLink] = useState("");
  const [avatar, setAvatar] = useState("");
  const [showBioInput, setShowBioInput] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [isPrivateProfile, setPrivateProfile] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null); // Bottom sheet reference
  const snapPoints = ["50%"];

  useEffect(() => {
    if (visible) {
      setName(profile.name);
      setBio(profile.bio);
      setLink(profile.links[0]);
      setAvatar(profile.avatar);
      setPrivateProfile(profile.isPrivate);
      setShowBioInput(!!profile.bio);
      setShowLinkInput(!!profile.links[0]);
    }
  }, [visible]);

  const handleSave = async () => {
    const updatedProfile = {
      name: name,
      bio: bio.trim(),
      links: [link.trim()],
    };
    await meApi.postProfile(updatedProfile).then(() => {
      onUpdated();
      onclose();
    });
  };

  const changePrivacyProfile = () => {
    if (isPrivateProfile) {
      meApi.putProfilePublic().then(() => {});
    } else {
      meApi.putProfilePrivate().then(() => {});
    }
    setPrivateProfile(!isPrivateProfile);
  };

  const handleAvatarEdit = () => {
    console.log("Expanding Bottom Sheet...");
    bottomSheetRef.current?.expand();
  };

  const handleCancel = () => {
    bottomSheetRef.current?.close();
  };

  const uploadAvatar = (file: File) => {
    meApi.uploadAvatar(file);
  };

  const selectFromLibrary = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled && result.assets?.[0]?.uri) {
        const file = {
          uri: result.assets[0].uri,
          type: "image/jpeg",
          name: "avatar.jpg",
        };
        // uploadAvatar(file);
        bottomSheetRef.current?.close();
      }
    } catch (error) {
      console.error("Error selecting image:", error);
    }
  };

  const captureFromCamera = () => {
    //    
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => onclose()}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.container]}>
          {/* Header */}
          <View style={styles.overlay}>
            <View style={styles.header}>
              <Button title="Hủy" onPress={() => onclose()} />
              <Text style={styles.headerTitle}>Chỉnh sửa trang cá nhân</Text>
              <Button title="Xong" onPress={() => handleSave()} />
            </View>

            {/* Body */}
            <View style={styles.body}>
              {/* Avatar Section */}
              <View style={styles.avatarSection}>
                <Image
                  source={{
                    uri: avatar,
                  }}
                  style={styles.avatar}
                />
                <TouchableOpacity onPress={handleAvatarEdit}>
                  <Text style={styles.editAvatarText}>
                    Chỉnh sửa ảnh đại diện
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.section}>
                <Text style={styles.label}>Tên</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={styles.section}>
                <Text style={styles.label}>Tiểu sử</Text>
                {showBioInput ? (
                  // Nếu đã có tiểu sử, hiển thị văn bản và cho phép chỉnh sửa
                  <TextInput
                    style={[styles.input, { height: 100 }]}
                    multiline={true}
                    numberOfLines={4}
                    value={bio}
                    onChangeText={setBio}
                    textAlignVertical="top" // Căn văn bản theo chiều dọc (trên cùng)
                  />
                ) : (
                  // Nếu chưa có tiểu sử, hiển thị nút "Thêm tiểu sử"
                  <TouchableOpacity onPress={() => setShowBioInput(true)}>
                    <Text style={styles.addBioText}>Thêm tiểu sử</Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.section}>
                <Text style={styles.label}>Liên kết</Text>
                {showLinkInput ? (
                  // Nếu đã có liên kết, hiển thị TextInput
                  <View style={styles.linkContainer}>
                    <TextInput
                      style={styles.input}
                      multiline={true}
                      value={link}
                      onChangeText={setLink}
                    />
                  </View>
                ) : (
                  // Nếu chưa có liên kết, hiển thị nút "Thêm liên kết"
                  <TouchableOpacity onPress={() => setShowLinkInput(true)}>
                    <Text style={styles.addLinkText}>Thêm liên kết</Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.toggleContainer}>
                <Text style={styles.toggleLabel}>Trang cá nhân riêng tư</Text>
                <Switch
                  value={isPrivateProfile}
                  onValueChange={changePrivacyProfile}
                />
              </View>
              {isPrivateProfile ? (
                <Text style={styles.note}>
                  Chỉ những người bạn theo dõi mới xem được trang cá nhân của
                  bạn
                </Text>
              ) : (
                <Text style={styles.note}>
                  Mọi người đều có thể xem trang cá nhân của bạn
                </Text>
              )}
            </View>
            <BottomSheet
              ref={bottomSheetRef}
              index={-1}
              snapPoints={snapPoints}
              backgroundStyle={{ backgroundColor: "#fff" }}
            >
              <BottomSheetView style={styles.contentContainer}>
                <View style={styles.bottomSheetContainer}>
                  <TouchableOpacity onPress={selectFromLibrary}>
                    <Text style={styles.bottomSheetOption}>
                      Chọn từ thư viện
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={captureFromCamera}>
                    <Text style={styles.bottomSheetOption}>Chụp ảnh</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleCancel()}>
                    <Text style={[styles.bottomSheetOption, { color: "red" }]}>
                      Hủy
                    </Text>
                  </TouchableOpacity>
                </View>
              </BottomSheetView>
            </BottomSheet>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {/* Bottom Sheet */}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    flex: 1,
    backgroundColor: "white",
  },
  overlay: {
    // ...StyleSheet.absoluteFillObject,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Độ mờ của overlay
    // zIndex: 1, // Hiển thị trên các thành phần khác
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  body: {
    padding: 20,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  editAvatarText: {
    fontSize: 14,
    color: "#007bff",
  },
  section: {
    marginBottom: 20,
  },
  addBioText: {
    fontSize: 14,
    color: "#007bff",
    fontStyle: "italic",
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  linkItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  removeLink: {
    marginLeft: 10,
    color: "red",
  },
  addLinkText: {
    fontSize: 14,
    color: "#007bff",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  toggleLabel: {
    fontSize: 14,
    color: "#333",
  },
  note: {
    fontSize: 12,
    color: "#777",
    marginTop: 5,
  },
  bottomSheetContainer: {
    padding: 20,
  },
  bottomSheetOption: {
    fontSize: 16,
    paddingVertical: 10,
    color: "#007bff",
  },
});

export default ProfileEditor;
