import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ecf0f1",
      padding: 20,
      alignItems: "center",
    },
    text: {
      fontFamily: "Montserrat-Bold",
      marginBottom: 20,
    },
    icon: {
      fontSize: 24,
      color: "red",
    },
    progressBarContainer: {
      height: 20,
      width: "100%",
      backgroundColor: "#ddd",
      borderRadius: 10,
      marginTop: 10,
      marginBottom: 10,
    },
    progressBar: {
      height: "100%",
      backgroundColor: "blue",
      borderRadius: 10,
    },
    slider: {
      width: "100%",
      height: 40,
    },
  });