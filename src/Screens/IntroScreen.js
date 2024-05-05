import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Video } from "expo-av";

const IntroScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Registration");
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Video
        source={require("../img/firstvideo.mp4")} // шлях до вашого відеофайлу
        style={styles.video}
        resizeMode="cover"
        shouldPlay
        isLooping={false}
        // onPlaybackStatusUpdate={(status) => {
        //   if (
        //     !status.isPlaying &&
        //     status.durationMillis === status.positionMillis
        //   ) {
        //     navigation.navigate("Registration");
        //   }
        // }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default IntroScreen;
