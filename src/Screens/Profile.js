import React, { useEffect, useState } from "react";
import IconSetting from "react-native-vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MainModal from "../components/Modal";
import PasswordForm from "../components/PasswordForm";
import UserInfoForm from "../components/UserInfoForm";

const Profile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] =
    useState(false);

  const toggleChangePasswordModal = () => {
    setIsChangePasswordModalVisible(!isChangePasswordModalVisible);
  };

  const getUserInfo = async () => {
    const user = await SecureStore.getItemAsync("user");
    const storedUser = JSON.parse(user);
    setUser((prevNote) => ({
      ...prevNote,
      name: storedUser.name,
      email: storedUser.email,
    }));
    return;
  };

  useEffect(() => {
    getUserInfo();
    setIsModalVisible(false);
    setIsChangePasswordModalVisible(false);
  }, []);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <ImageBackground
      source={{
        uri: "https://kartinki.pics/uploads/posts/2021-07/thumbs/1625809191_52-kartinkin-com-p-meditatsiya-art-art-krasivo-54.jpg",
      }}
      style={styles.backImage}
    >
      <View style={styles.container}>
        <View style={styles.centeredContent}>
          <Image
            source={
              user.avatarURL
                ? { uri: user.avatarURL }
                : { uri: "https://via.placeholder.com/120" }
            }
            style={styles.avatar}
          />
          <Text style={styles.textName}>{user.name}</Text>
        </View>
      </View>
      <Pressable style={styles.setting} onPress={() => toggleModal()}>
        <IconSetting name="settings-outline" size={30} color="black" />
      </Pressable>
      <MainModal isVisible={isModalVisible} onClose={toggleModal}>
        <UserInfoForm
          toggleModal={toggleModal}
          user={user}
          togglePasswordModal={toggleChangePasswordModal}
          getUserInfoStorega={getUserInfo}
        />
      </MainModal>
      <MainModal
        isVisible={isChangePasswordModalVisible}
        onClose={toggleChangePasswordModal}
      >
        <PasswordForm
          toggleModal={toggleChangePasswordModal}
          togglePasswordModal={toggleChangePasswordModal}
        />
      </MainModal>
    </ImageBackground>
  );
};

styles = StyleSheet.create({
  backImage: {
    flex: 1,
  },
  setting: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  container: {
    paddingTop: 50,
  },
  centeredContent: {
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  textName: {
    fontSize: 30,
    marginTop: 10,
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
  },
  btnMargin: {
    marginRight: 30,
  },
});

export default Profile;
