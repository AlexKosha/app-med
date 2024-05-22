import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MainModal from "../Modal";
import TherapyModal from "../TherapyModal";
import * as TherapyService from "../../service/therapyService";
import { getTwoRandomTherapies } from "../../helpers/randomTherapy";
import { styles } from "./ArchanglesStyles";

const FIRST_THERAPY = 0;
const SECOND_THERAPY = 1;

const Archangels = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const [therapy, setTherapy] = useState(null);
  const [selectedTherapyIndex, setSelectedTherapyIndex] = useState(null);

  useEffect(() => {
    const fetchTherapy = async () => {
      try {
        const data = await TherapyService.getTherapy();
        setTherapy(getTwoRandomTherapies(data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchTherapy();
  }, []);

  const toggleModalSurvey = () => {
    setModalVisible(!isModalVisible);
  };

  const handleTherapySelection = (therapyIndex) => {
    setSelectedTherapyIndex(therapyIndex);
    toggleModalSurvey();
  };

  const handleNavigationToHome = () => {
    navigation.navigate("MainMenu");
  };

  const handleNavigationToMeditation = () => {
    navigation.navigate("Meditation");
  };

  return (
    <View style={{ paddingHorizontal: 15 }}>
      <View style={styles.headerContainer}>
        <Image
          source={require("../../img/logo.png")}
          style={styles.imageLogo}
        />
        <Pressable onPress={handleNavigationToHome} style={{ marginTop: 20 }}>
          <LinearGradient
            style={styles.btnGoBack}
            colors={["orange", "white", "orange"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.positionPass}>Ангельська терапія</Text>
          </LinearGradient>
        </Pressable>
      </View>
      <Text style={styles.text}>
        Друзі, перед вами дві карти. Заплющте очі та подумайте про ситуацію, в
        якій потребуєте підтримки вищих сил. Тепер відкрийте очі.
      </Text>
      <Text style={styles.text}>
        Натисніть на карту, яка вам відгукується і прочитайте підказку від
        Архангелів, що допоможе вирішити ваш запит самим легким та благісним
        чином.
      </Text>
      <View style={styles.imageContainer}>
        <Pressable onPress={() => handleTherapySelection(FIRST_THERAPY)}>
          <View style={{ borderRadius: 16, overflow: "hidden" }}>
            <ImageBackground
              style={{ width: 150, height: 200 }}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLUThBvMeLWZI_CHHlDlntaAjYpC8e7Uk8Bw&usqp=CAU",
              }}
              resizeMode="cover"
            />
          </View>
        </Pressable>
        <Pressable onPress={() => handleTherapySelection(SECOND_THERAPY)}>
          <View style={{ borderRadius: 16, overflow: "hidden" }}>
            <ImageBackground
              style={{ width: 150, height: 200 }}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaWLHGHL13JmM4wDa_DIZQbBcYMMai2uK6AA&usqp=CAU",
              }}
              resizeMode="cover"
            />
          </View>
        </Pressable>
      </View>
      <View style={styles.btnContainer}>
        <Pressable
          style={{ marginBottom: 20 }}
          onPress={handleNavigationToMeditation}
        >
          <LinearGradient
            colors={["orange", "white", "orange"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <Text style={styles.text}>Медитації</Text>
          </LinearGradient>
        </Pressable>
        <Pressable
          style={{ marginBottom: 20 }}
          onPress={handleNavigationToHome}
        >
          <LinearGradient
            colors={["orange", "white", "orange"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <Text style={styles.text}>Навчання</Text>
          </LinearGradient>
        </Pressable>
      </View>
      <MainModal isVisible={isModalVisible} onClose={toggleModalSurvey}>
        {therapy && selectedTherapyIndex !== null && (
          <TherapyModal
            therapy={therapy[selectedTherapyIndex]}
            closeModal={toggleModalSurvey}
          />
        )}
      </MainModal>
    </View>
  );
};

export default Archangels;
