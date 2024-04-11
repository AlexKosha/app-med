import React, { useState } from "react";
import IconSetting from "react-native-vector-icons/Ionicons";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Options from "../components/Options";
import MainModal from "../components/Modal";

const Profile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      <TouchableOpacity style={styles.setting} onPress={() => toggleModal()}>
        <IconSetting name="settings-outline" size={30} color="black" />
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.centeredContent}>
          <Image
            source={{ uri: "https://via.placeholder.com/120" }}
            style={styles.avatar}
          />
          <Text style={styles.textName}>Ім'я користувача</Text>
        </View>
      </View>
      <MainModal isVisible={isModalVisible} onClose={toggleModal}>
        <Options />
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
    top: 30,
    right: 10,
  },
  container: {
    paddingTop: 50,
  },
  centeredContent: {
    alignItems: "center",
  },
  avatar: {
    width: 200,
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});

export default Profile;
