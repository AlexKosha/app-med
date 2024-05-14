import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { Audio } from "expo-av";

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

  const progress = position ? (position / duration) * 100 : 0;

  return (
    <View style={styles.container}>
      <Text>Track is {isPlaying ? "Playing" : "Stopped"}</Text>
      <Text>{`Position: ${Math.round(position / 1000)}s / ${Math.round(
        duration / 1000
      )}s`}</Text>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
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
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
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
    marginTop: 20,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "blue",
    borderRadius: 10,
  },
});

// const Practice = () => {
//   const [sound, setSound] = useState();
//   const [isPlaying, setIsPlaying] = useState(false);

//   const loadSound = async () => {
//     const { sound } = await Audio.Sound.createAsync(
//       require("../img/Kate_Bush-Running_up_That_Hill.mp3"),
//       {},
//       onPlaybackStatusUpdate
//     );
//     setSound(sound);
//   };

//   useEffect(() => {
//     return sound
//       ? () => {
//           console.log("Unloading Sound");
//           sound.unloadAsync();
//         }
//       : undefined;
//   }, [sound]);

//   const onPlaybackStatusUpdate = (status) => {
//     if (status.didJustFinish) {
//       setIsPlaying(false);
//     }
//   };

//   const togglePlayPause = async () => {
//     if (!sound) {
//       await loadSound();
//     }
//     if (isPlaying) {
//       console.log("Pausing Sound");
//       await sound.pauseAsync();
//       setIsPlaying(false);
//     } else {
//       console.log("Playing Sound");
//       await sound.playAsync();
//       setIsPlaying(true);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Track is {isPlaying ? "Playing" : "Stopped"}</Text>
//       <Pressable onPress={togglePlayPause}>
//         <Icon name={isPlaying ? "pause" : "play"} style={styles.icon} />
//       </Pressable>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ecf0f1",
//     padding: 10,
//   },
//   heartIcon: {
//     fontSize: 24,
//     color: "red",
//   },
// });

export default Practice;
