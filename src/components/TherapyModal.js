import React from "react";
import {
  Text,
  View,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const TherapyModal = ({ closeModal, therapy }) => {
  return (
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/free-photo/cute-pastel-purple-marble-background_53876-104400.jpg?size=626&ext=jpg&ga=GA1.1.1695762122.1711480779&semt=ais",
      }}
      style={styles.modalContainer}
    >
      <Pressable onPress={closeModal}>
        <Icon style={styles.closeButton} name="closecircleo" />
      </Pressable>
      <ScrollView style={styles.scrollBox} showsVerticalScrollIndicator={false}>
        <View style={styles.modalTextBox}>
          <Text style={styles.title}>{therapy.title}</Text>
          <Text style={styles.firstParagraph}>{therapy.description}</Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
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
    paddingBottom: 15,
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

export default TherapyModal;
