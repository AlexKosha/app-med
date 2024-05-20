import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";

const Practice = () => {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0); // Total duration of the audio
  const [position, setPosition] = useState(0); // Current position of the audio playback

  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../img/Kate_Bush-Running_up_That_Hill.mp3"),
      {},
      onPlaybackStatusUpdate
    );
    setSound(sound);
    const status = await sound.getStatusAsync();
    setDuration(status.durationMillis);
    await sound.playAsync();
    setIsPlaying(true);
  };

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      if (status.didJustFinish) {
        setIsPlaying(false);
      }
    }
  };

  const handleSliderChange = async (value) => {
    if (sound) {
      await sound.setPositionAsync(value);
    }
  };

  const togglePlayPause = async () => {
    if (!sound) {
      await loadSound();
    }
    if (sound) {
      if (isPlaying) {
        console.log("Pausing Sound");
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        console.log("Playing Sound");
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  };

  const formatTime = (timeMillis) => {
    const minutes = Math.floor(timeMillis / 60000);
    const seconds = Math.floor((timeMillis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const progress = position ? (position / duration) * 100 : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
        odio. Praesent libero. Sed cursus ante dapibus diam.
      </Text>
      <Text>
        {progress ? `${formatTime(position)} / ${formatTime(duration)}` : ""}
      </Text>
      {/* <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View> */}
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onSlidingComplete={handleSliderChange}
        minimumTrackTintColor="#1EB1FC"
        maximumTrackTintColor="#8E8E93"
        thumbTintColor="#1EB1FC"
      />
      <Pressable onPress={togglePlayPause}>
        <Icon name={isPlaying ? "pause" : "play"} style={styles.icon} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Practice;
