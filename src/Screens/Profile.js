import React, { useState } from "react";
import IconSetting from "react-native-vector-icons/Ionicons";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
      <View style={styles.infoBox}>
        <View style={styles.infoContainer}>
          <View style={styles.row}>
            <Text style={[styles.label, styles.alignStart]}>Телефон:</Text>
            <Text style={styles.value}>+123456789</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.label, styles.alignStart]}>email:</Text>
            <Text style={styles.value}>example@example.com</Text>
          </View>
          <View style={styles.btnContainer}>
            <Pressable style={[styles.btnAvatar, styles.btnMargin]}>
              <Text>Змінити Аватар</Text>
            </Pressable>
            <Pressable style={styles.btnAvatar}>
              <Text>Змінити дані</Text>
            </Pressable>
          </View>
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
  textName: {
    fontSize: 30,
    marginTop: 10,
  },
  infoBox: {
    width: "100%",
    height: "100%",
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: 40,
  },
  infoContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#FFFFFF",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
  },
  value: {
    marginLeft: 30,
  },
  alignStart: {
    minWidth: 120,
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
