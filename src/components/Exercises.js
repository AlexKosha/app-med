import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import * as SecureStore from "expo-secure-store";

const Exercises = ({ route, navigation }) => {
  const { text, exercise } = route.params.item;

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await SecureStore.getItemAsync("meditations");
        const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
        setFavorites(favorites);
      } catch (error) {
        console.error("Failed to load favorites:", error);
      }
    };

    loadFavorites();
  }, []);

  const handleItemPress = (item) => {
    navigation.navigate("Practice", { item });
  };

  const addMeditation = async (item) => {
    try {
      const storedFavorites = await SecureStore.getItemAsync("meditations");
      console.log(storedFavorites, "----Storage----");
      const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      console.log(favorites);
      const isMeditationExists = favorites.some(
        (meditation) => meditation.name === item.name
      );

      if (isMeditationExists) {
        // If the item exists, remove it
        const newFavorites = favorites.filter(
          (meditation) => meditation.name !== item.name
        );
        await SecureStore.setItemAsync(
          "meditations",
          JSON.stringify(newFavorites)
        );
        setFavorites(newFavorites);
        console.log("Meditation removed:", item);
      } else {
        // If the item does not exist, add it
        favorites.push(item);
        await SecureStore.setItemAsync(
          "meditations",
          JSON.stringify(favorites)
        );
        setFavorites(favorites);
        console.log("Meditation added:", item);
      }
    } catch (error) {
      console.error("Failed to add meditation:", error);
    }
  };

  const isFavorite = (item) => {
    return favorites.some((meditation) => meditation.name === item.name);
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

const styles = StyleSheet.create({
  line: {
    height: 1,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "gray",
    marginBottom: 10,
  },
  itemContainer: {
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "cover",
    marginRight: 10,
  },
  contentContainer: {
    flexDirection: "column",
    marginLeft: 10,
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

export default Exercises;
