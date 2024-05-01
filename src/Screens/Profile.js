import React, { useEffect, useState } from "react";
// import IconSetting from "react-native-vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as imagePicker from "expo-image-picker";
import PasswordForm from "../components/PasswordForm";
import UserInfoForm from "../components/UserInfoForm";
import { updateAvatar } from "../service/authService";

const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "", avatarURL: "" });
  const [avatarSource, setAvatarSource] = useState(null);

  const changeAvatar = async (avatarURL) => {
    const formData = new FormData();
    if (avatarURL) {
      const avatarFile = {
        uri: avatarURL.uri,
        name: "avatar.jpg",
        type: "image/jpeg",
      };
      formData.append("avatarURL", avatarFile);
    }
    try {
      await updateAvatar(formData);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const selectImage = async () => {
    let result = await imagePicker.launchImageLibraryAsync({
      mediaTypes: imagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 2],
      quality: 1,
    });
    if (!result.canceled) {
      setAvatarSource(result.assets[0]);
      changeAvatar(result.assets[0]);
    }
  };

  const getUserInfo = async () => {
    const user = await SecureStore.getItemAsync("user");
    const storedUser = JSON.parse(user);
    setUser((prevNote) => ({
      ...prevNote,
      name: storedUser.name,
      email: storedUser.email,
      avatarURL: storedUser.avatarURL,
    }));
    return;
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <ImageBackground
      source={{
        uri: "https://kartinki.pics/uploads/posts/2021-07/thumbs/1625809191_52-kartinkin-com-p-meditatsiya-art-art-krasivo-54.jpg",
      }}
      style={styles.backImage}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          keyboardVerticalOffset={
            Platform.OS === "android" ? 35 : Platform.OS === "ios" ? 35 : 0
          }
          style={{ flex: 1 }}
        >
          <View style={styles.container}>
            <Image
              source={
                avatarSource || user.avatarURL
                  ? { uri: avatarSource ? avatarSource.uri : user.avatarURL }
                  : { uri: "https://via.placeholder.com/120" }
              }
              style={styles.avatar}
            />
            <TouchableOpacity onPress={selectImage} style={styles.btnAvatar}>
              <Text
                style={{ textAlign: "center", fontFamily: "Montserrat-Bold" }}
              >
                Змінити аватар
              </Text>
            </TouchableOpacity>
            <Text style={styles.userName}>{user.name}</Text>
          </View>

          {user.name && (
            <UserInfoForm user={user} getUserInfoStorega={getUserInfo} />
          )}
          <PasswordForm />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backImage: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
    position: "relative",
  },
  avatar: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  btnAvatar: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  userName: {
    fontSize: 30,
    marginVertical: 10,
    fontFamily: "Montserrat-Bold",
  },
});

export default Profile;
