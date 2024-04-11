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
import { imagesQuotes } from "../helpers/imagesQuotes";
import Icon from "react-native-vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import MainModal from "./Modal";

// !! TODO - відкривається модалка - там фото
// чому на айфоін не вибиває клавіатура
// додати лоадер у апп 40 рядок
//  щоб нижнє меню було на всіх скрінах - глобально

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
            style={styles.imagesBack}
            source={imagesQuotes[index]}
            resizeMode="cover"
          />
        </View>
      </Pressable>
    );
  };
  return (
    <View>
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
        <Text style={styles.positionPass}>Вибери картинку</Text>
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
        <Pressable style={styles.btn} onPress={handleNavigationToHome}>
          <LinearGradient
            style={styles.gradient}
            colors={["orange", "white", "orange"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.positionPass}>Ознайомитись</Text>
          </LinearGradient>
        </Pressable>
        <Pressable style={styles.btn} onPress={handleNavigationToHome}>
          <LinearGradient
            style={styles.gradient}
            colors={["orange", "white", "orange"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.positionPass}>Автоматичне відправлення</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  headerContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  imageLogo: {
    width: 150,
    height: 170,
  },
  btnGoBack: {
    width: 170,
    height: 80,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  positionPass: {
    textAlign: "center",
    fontSize: 20,
  },
  quotesContainer: {
    padding: 10,
  },
  imageContainer: {
    marginTop: 10,
    borderRadius: 16,
    overflow: "hidden",
    marginRight: 10,
  },
  imagesBack: {
    width: 150,
    height: 250,
  },
  modalContainer: {
    position: "relative",
    height: "100%",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  btnContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    marginBottom: 20,
  },
  gradient: {
    width: 200,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  closeButtonSave: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "orange",
    borderRadius: 8,
  },
  closeButton: {
    fontSize: 18,
    color: "orange",
    position: "absolute",
    right: -10,
    top: -10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Quotes;
