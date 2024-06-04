import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  Text,
  View,
  TouchableOpacity,
  Alert,
  s,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import Icon from "react-native-vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import { imagesQuotes } from "../../helpers/imagesQuotes";
import MainModal from "../Modal";
import { styles } from "./QuotesStyles";
import { fetchQuotes } from "../../service/quoteService";

const Quotes = () => {
  const navigation = useNavigation();
  const [quotesData, setQuotesData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalImgUrl, setModalImgUrl] = useState(null);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  const getQuotes = async () => {
    try {
      const data = await fetchQuotes();
      setQuotesData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuotes();
  }, []);

  const handleNavigationToHome = () => {
    navigation.navigate("MainMenu");
  };

  const toggleModal = (imgUrl) => {
    setModalImgUrl(imgUrl);
    setIsModalVisible(!isModalVisible);
  };

  const downloadFormUrl = async () => {
    const filename = "quotes.png";
    const results = await FileSystem.downloadAsync(
      modalImgUrl,
      FileSystem.documentDirectory + filename
    );

    downloadAndSaveImage(results.uri);
  };

  const downloadAndSaveImage = async (uri) => {
    try {
      if (permissionResponse.status !== "granted") {
        await requestPermission();
        Alert.alert(
          "Permission Denied",
          "Storage permission is required to save photos."
        );
        return;
      }

      MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert("Success", "Photo saved to gallery!");
      toggleModal(null);
    } catch (error) {
      console.error("Saving Error:", error);
      Alert.alert("Saving Error", error.message);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => toggleModal(item.img)}>
        <View style={styles.imageContainer}>
          <ImageBackground
            style={{ width: 200, height: "100%" }}
            source={{ uri: item.img }}
            resizeMode="cover"
          />
        </View>
      </Pressable>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <Image
          source={require("../../img/logo.png")}
          style={styles.imageLogo}
        />
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
        {quotesData && (
          <FlatList
            data={quotesData}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
        <MainModal isVisible={isModalVisible} onClose={() => toggleModal(null)}>
          <ImageBackground
            style={styles.modalContainer}
            source={{ uri: modalImgUrl }}
          >
            <Pressable onPress={() => toggleModal(null)}>
              <Icon style={styles.closeButton} name="closecircleo" />
            </Pressable>
          </ImageBackground>
          <TouchableOpacity
            onPress={() => downloadFormUrl()}
            style={styles.closeButtonSave}
          >
            <Text style={styles.buttonText}>Завантажити в галерею</Text>
          </TouchableOpacity>
        </MainModal>
      </View>
      <View style={styles.btnContainer}>
        <Pressable style={{ marginBottom: 20 }}>
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

export default Quotes;
