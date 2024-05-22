import React, { useCallback, useState } from "react";
import { FlatList, Text, View, Image, Pressable } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useFocusEffect } from "@react-navigation/native";
import {
  getStoredFavorites,
  saveMeditationsToStorage,
} from "../../helpers/favoriteMeditationsStorage";
import { styles } from "./ExercisesStyles";

const Exercises = ({ route, navigation }) => {
  const { exercise } = route.params.item;
  const [favorites, setFavorites] = useState([]);

  const removeDuplicateMeditations = (favorites, item) =>
    favorites.filter((meditation) => meditation.name !== item.name);

  const isFavorite = (item) => {
    return favorites.some((meditation) => meditation.name === item.name);
  };

  const loadFavorites = async () => {
    try {
      const favorites = await getStoredFavorites();
      setFavorites(favorites);
    } catch (error) {
      console.error("Failed to load favorites:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
      console.log(2);
    }, [])
  );

  const handleItemPress = (item) => {
    navigation.navigate("Practice", { item });
  };

  const addMeditation = async (item) => {
    try {
      const favorites = await getStoredFavorites();
      const isMeditationExists = isFavorite(item);
      if (isMeditationExists) {
        const newFavorites = removeDuplicateMeditations(favorites, item);
        await saveMeditationsToStorage(newFavorites);
        setFavorites(newFavorites);
      } else {
        favorites.push(item);
        await saveMeditationsToStorage(favorites);
        setFavorites(favorites);
      }
    } catch (error) {
      console.error("Failed to add meditation:", error);
    }
  };

  const renderItem = ({ item }) => {
    const favorite = isFavorite(item);
    return (
      <View>
        <View style={styles.line}></View>
        <Pressable onPress={() => handleItemPress(item)}>
          <View style={styles.itemContainer}>
            <Image style={styles.image} source={{ uri: item.img }} />
            <View style={styles.contentContainer}>
              <Text style={{ fontSize: 24, marginBottom: 20 }}>
                {item.name}
              </Text>
              <Text>{item.time}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Pressable onPress={() => addMeditation(item)}>
                <Icon
                  name={favorite ? "heart" : "hearto"}
                  style={styles.heartIcon}
                />
              </Pressable>
            </View>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={exercise}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Exercises;
