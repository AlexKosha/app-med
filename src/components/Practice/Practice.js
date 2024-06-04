import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import { styles } from "./PracticeStyles";

const Practice = ({ route }) => {
  const { audio, description } = route.params.item;
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      {
        uri: audio,
      },
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
      <Text style={styles.text}>{description}</Text>
      <Text>
        {progress ? `${formatTime(position)} / ${formatTime(duration)}` : ""}
      </Text>
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

export default Practice;
