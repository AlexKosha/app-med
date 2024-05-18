import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import { imagesQuotes } from "../helpers/imagesQuotes";
import MainModal from "./Modal";

const Quotes = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalImgUrl, setModalImgUrl] = useState(null);

  const handleNavigationToHome = () => {
    navigation.navigate("MainMenu");
  };

  const toggleModal = (imgUrl) => {
    setModalImgUrl(imgUrl);
    setIsModalVisible(!isModalVisible);
  };

  const renderItem = ({ index }) => {
    return (
      <Pressable onPress={() => toggleModal(imagesQuotes[index])}>
        <View style={styles.imageContainer}>
          <ImageBackground
            style={{ width: 200, height: "100%" }}
            source={imagesQuotes[index]}
            resizeMode="cover"
          />
        </View>
      </Pressable>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <Image source={require("../img/logo.png")} style={styles.imageLogo} />
        <Pressable onPress={handleNavigationToHome}>
          <LinearGradient
            style={styles.btnGoBack}
            colors={["orange", "white", "orange"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.positionPass}>Мудрість дня</Text>
          </LinearGradient>
        </Pressable>
      </View>
      <View style={styles.quotesContainer}>
        <Text style={styles.text}>
          Друзі, ми подбали про те, щоб корисні афірмації завжди були у вас під
          рукою. Гортайте галерею із зображеннями, обирайте ту, що відгукується
          - і завантажуйте у форматі заставки на телефон.
        </Text>
        <Text style={styles.text}>
          Або натисніть кнопку і активуйте щоденне автоматизоване відправлення
          однієї нової афірмації на ваш мобільний телефон.
        </Text>
        <FlatList
          data={imagesQuotes}
          keyExtractor={(item) => item}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <MainModal isVisible={isModalVisible} onClose={() => toggleModal(null)}>
          <ImageBackground style={styles.modalContainer} source={modalImgUrl}>
            <Pressable onPress={() => toggleModal(null)}>
              <Icon style={styles.closeButton} name="closecircleo" />
            </Pressable>
          </ImageBackground>
          <TouchableOpacity
            onPress={() => toggleModal(null)}
            style={styles.closeButtonSave}
          >
            <Text style={styles.buttonText}>Завантажити в галерею</Text>
          </TouchableOpacity>
        </MainModal>
      </View>
      <View style={styles.btnContainer}>
        <Pressable
          style={{ marginBottom: 20 }}
          onPress={handleNavigationToHome}
        >
          <LinearGradient
            style={styles.gradient}
            colors={["orange", "white", "orange"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.text}>Автоматичне відправлення</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 10,
    borderRadius: 16,
    overflow: "hidden",
    marginRight: 10,
  },
  headerContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  imageLogo: {
    width: 170,
    height: 100,
  },
  btnGoBack: {
    width: 170,
    height: 80,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  positionPass: {
    fontFamily: "Montserrat-Bold",
    textAlign: "center",
    fontSize: 20,
  },
  quotesContainer: {
    flex: 2,
    padding: 10,
    paddingTop: 0,
  },
  text: {
    fontFamily: "Montserrat-Medium",
    fontSize: 16,
  },
  modalContainer: {
    position: "relative",
    height: "100%",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  closeButton: {
    fontSize: 18,
    color: "orange",
    position: "absolute",
    right: -10,
    top: -10,
  },
  closeButtonSave: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "orange",
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: "Montserrat-Bold",
    textAlign: "center",
    fontSize: 16,
  },
  btnContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  gradient: {
    width: 200,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Quotes;
