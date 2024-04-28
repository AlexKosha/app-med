import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MainModal from "./Modal";
import TherapyModal from "./TherapyModal";
import * as TherapyService from "../service/therapyService";
import { getTwoRandomTherapies } from "../helpers/randomTherapy";

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
        console.log(1);
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
    <View>
      <View style={styles.headerContainer}>
        <Image source={require("../img/logo.png")} style={styles.imageLogo} />
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

      <Text style={styles.TextBtn}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua.
      </Text>

      <View style={styles.imageContainer}>
        <Pressable onPress={() => handleTherapySelection(FIRST_THERAPY)}>
          <View style={{ borderRadius: 16, overflow: "hidden" }}>
            <ImageBackground
              style={styles.imageBtn}
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
              style={styles.imageBtn}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaWLHGHL13JmM4wDa_DIZQbBcYMMai2uK6AA&usqp=CAU",
              }}
              resizeMode="cover"
            />
          </View>
        </Pressable>
      </View>
      <View style={styles.btnContainer}>
        <Pressable style={styles.btn} onPress={handleNavigationToMeditation}>
          <LinearGradient
            colors={["orange", "white", "orange"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <Text style={styles.TextBtn}>Медитації</Text>
          </LinearGradient>
        </Pressable>
        <Pressable style={styles.btn} onPress={handleNavigationToHome}>
          <LinearGradient
            colors={["orange", "white", "orange"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <Text style={styles.TextBtn}>Навчання</Text>
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

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  imageLogo: {
    width: 150,
    height: 170,
    marginTop: 20,
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
    fontFamily: "Montserrat-Bold",
  },
  TextBtn: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Montserrat-Medium",
  },
  imageContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  imageBtn: {
    width: 150,
    height: 200,
  },
  imageBtnLast: {
    margin: 0,
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
    backgroundColor: "orange",
    borderRadius: 50,

    paddingVertical: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Archangels;
