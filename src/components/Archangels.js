import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ArchangelsModal from "./Modal";
import { LinearGradient } from "expo-linear-gradient";
import Home from "../Screens/Home";
// import * as TherapyService from "../service/therapyService";

const Archangels = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  // const [therapy, setTheraphy] = useState("");

  // useEffect(() => {
  //   const getTherapy = async () => {
  //     try {
  //       const data = await TherapyService.getTherapy();
  //       setTheraphy(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getTherapy();
  // }, []);

  const toggleModalSurvey = () => {
    setModalVisible(!isModalVisible);
  };

  const handleNavigationToHome = () => {
    navigation.navigate("Home");
  };

  const handleNavigationToMeditation = () => {
    navigation.navigate("Meditation");
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
            // style={styles.gradientt}
          >
            <Text style={styles.positionPass}>Ангельська терапія</Text>
          </LinearGradient>
        </Pressable>
      </View>
      <Text style={{ textAlign: "center" }}>
        ...............Text...............
      </Text>
      <View style={styles.imageContainer}>
        <Pressable onPress={toggleModalSurvey}>
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
        <Pressable onPress={toggleModalSurvey}>
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
            <Text style={styles.positionPass}>Медитації</Text>
          </LinearGradient>
        </Pressable>
        <Pressable style={styles.btn} onPress={handleNavigationToHome}>
          <LinearGradient
            colors={["orange", "white", "orange"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <Text style={styles.positionPass}>Навчання</Text>
          </LinearGradient>
        </Pressable>
      </View>
      <ArchangelsModal isVisible={isModalVisible} onClose={toggleModalSurvey}>
        <ImageBackground
          source={{
            uri: "https://img.freepik.com/free-photo/cute-pastel-purple-marble-background_53876-104400.jpg?size=626&ext=jpg&ga=GA1.1.1695762122.1711480779&semt=ais",
          }}
          style={styles.modalContainer}
        >
          <Pressable onPress={toggleModalSurvey}>
            <Icon style={styles.closeButton} name="closecircleo" />
          </Pressable>
          <ScrollView
            style={styles.scrollBox}
            // contentContainerStyle={styles.modalTextBoxContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.modalTextBox}>
              <Text style={styles.title}>АРХАНГЕЛ МИХАЇЛ</Text>
              <Text style={styles.firstParagraph}>
                Захистить і проведе вас у ситуації, що склалася. Дасть мужність
                та силу волі, щоби ви відчули впевненість та легко вийшли із
                ситуації.
              </Text>
              <Text style={styles.secondParagraph}>
                Щоб примножити вашу мужність і упевненість, промовте: «Архангеле
                Михаїле, я закликаю до тебе. Будь ласка, захисти мене своїм
                мечем та щитом зі світла, дозволь мені спертися на твою силу і
                мужність. Дай мені знати і відчувати, що я в безпеці і захищений
                емоційно, фізично, фінансово, енергетично та духовно. Дякую."
                Щоб примножити вашу мужність і упевненість, промовте: «Архангеле
                Михаїле, я закликаю до тебе. Будь ласка, захисти мене своїм
                мечем та щитом зі світла, дозволь мені спертися на твою силу і
                мужність. Дай мені знати і відчувати, що я в безпеці і захищений
                емоційно, фізично, фінансово, енергетично та духовно. Дякую."
                Щоб примножити вашу мужність і упевненість, промовте: «Архангеле
                Михаїле, я закликаю до тебе. Будь ласка, захисти мене своїм
                мечем та щитом зі світла, дозволь мені спертися на твою силу і
                мужність. Дай мені знати і відчувати, що я в безпеці і захищений
                емоційно, фізично, фінансово, енергетично та духовно. Дякую."
              </Text>
            </View>
          </ScrollView>
        </ImageBackground>
      </ArchangelsModal>
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
  modalContainer: {
    position: "relative",
    backgroundColor: "grey",
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  scrollBox: {
    borderWidth: 1,
    borderColor: "#e3cb96",
    borderRadius: 10,
  },
  modalTextBox: {
    paddingTop: 10,
    paddingHorizontal: 15,
    overflow: "scroll",
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
    color: "black",
    fontFamily: "Montserrat-Bold",
  },
  firstParagraph: {
    fontSize: 16,
    marginBottom: 5,
    color: "black",
    fontFamily: "Montserrat-Regular",
  },
  secondParagraph: {
    fontSize: 16,
    color: "black",
    fontFamily: "Montserrat-Regular",
  },
  closeButton: {
    fontSize: 18,
    color: "black",
    position: "absolute",
    right: -10,
    top: -25,
  },
});

export default Archangels;
