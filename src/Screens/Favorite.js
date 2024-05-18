import React, { useCallback, useState } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import IconHeart from "react-native-vector-icons/AntDesign";
import { useFocusEffect } from "@react-navigation/native";
import {
  getStoredFavorites,
  saveMeditationsToStorage,
} from "../helpers/favoriteMeditationsStorage";

const Favorite = () => {
  const [favorite, setFavorites] = useState([]);

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

  const renderItem = ({ item }) => {
    return (
      <View>
        <View style={styles.line}></View>
        <Pressable>
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

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "lightgray",
  },
  selectedTabButton: {
    backgroundColor: "orange",
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemContainer: {
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  line: {
    height: 1,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "gray",
    marginBottom: 10,
  },
  contentContainer: {
    flexDirection: "column",
    marginLeft: 10,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "cover",
    marginRight: 10,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  iconContainer: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 10,
    paddingTop: 5,
  },
  heartIcon: {
    fontSize: 24,
    color: "red",
  },
});

export default Favorite;
