import React from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import IconHeart from "react-native-vector-icons/Feather";

const Exercises = ({ route, navigation }) => {
  const { text, exercise } = route.params.item;

  const handleItemPress = (item) => {
    navigation.navigate("DetailsExercise", { item });
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
              <Pressable onPress={() => addMedation()}>
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
      <FlatList
        data={exercise}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Exercises;
