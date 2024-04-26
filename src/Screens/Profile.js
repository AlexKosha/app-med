import React, { useEffect, useState } from "react";
import IconSetting from "react-native-vector-icons/Ionicons";
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // style={styles.inner}
      >
        <View style={styles.container}>
          <View style={styles.centeredContent}>
            <Image
              source={
                avatarSource || user.avatarURL
                  ? { uri: avatarSource ? avatarSource.uri : user.avatarURL }
                  : { uri: "https://via.placeholder.com/120" }
              }
              style={styles.avatar}
            />

            <Text style={styles.textName}>{user.name}</Text>
          </View>
        </View>

        {user.name && (
          <UserInfoForm user={user} getUserInfoStorega={getUserInfo} />
        )}
        <Pressable onPress={selectImage} style={styles.btnAvatar}>
          <Text style={{ textAlign: "center" }}>Змінити аватар</Text>
        </Pressable>

        <PasswordForm />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

styles = StyleSheet.create({
  backImage: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  setting: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  container: {
    paddingTop: 40,
  },
  centeredContent: {
    alignItems: "center",
    position: "relative",
  },
  avatar: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  addButton: {
    position: "absolute",
    right: 135,
    bottom: 55,
    backgroundColor: "#F6F6F6",
    borderRadius: 50,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FF6C00",
  },
  textName: {
    fontSize: 30,
    marginVertical: 10,
  },
  infoContainer: {
    justifyContent: "center",
    alignContent: "center",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    fontFamily: "Montserrat-Bold",
  },
  value: {
    // marginLeft: 10,
  },
  alignStart: {
    minWidth: 80,
  },
  changeInfoBtn: {
    position: "absolute",
    right: 20,
    top: 5,
  },
  submitBtn: {
    position: "absolute",
    right: 20,
    top: -5,
  },
  closeBtn: {
    position: "absolute",
    right: 20,
    top: 25,
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  btnAvatar: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  btnMargin: {
    marginRight: 30,
  },
});

export default Profile;
