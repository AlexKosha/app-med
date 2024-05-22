import React, { useCallback, useState } from "react";
import { FlatList, Text, View, Image, Pressable } from "react-native";
import IconHeart from "react-native-vector-icons/AntDesign";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  getStoredFavorites,
  saveMeditationsToStorage,
} from "../../helpers/favoriteMeditationsStorage";
import { styles } from "./FavoriteStyles";

const Favorite = () => {
  const [favorite, setFavorites] = useState([]);
  const navigation = useNavigation();

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
    }, [])
  );

  const removeMeditation = async (item) => {
    const isMeditationExists = favorite.some(
      (meditation) => meditation.name === item.name
    );

    if (isMeditationExists) {
      const newFavorites = favorite.filter(
        (meditation) => meditation.name !== item.name
      );
      await saveMeditationsToStorage(newFavorites);
      setFavorites(newFavorites);
    }
  };
  const handleItemPress = (item) => {
    navigation.navigate("Practice", { item });
  };
  const renderItem = ({ item }) => {
    return (
      <View>
        <View style={styles.line}></View>
        <Pressable onPress={() => handleItemPress(item)}>
          <View style={styles.itemContainer}>
            <Image style={styles.image} source={{ uri: item.img }} />
            <View style={styles.contentContainer}>
              <Text style={styles.text}>{item.name}</Text>
              <Text>{item.time}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Pressable onPress={() => removeMeditation(item)}>
                <IconHeart name="heart" style={styles.heartIcon} />
              </Pressable>
            </View>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <View>
      {favorite.length !== 0 && (
        <FlatList
          data={favorite}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default Favorite;
