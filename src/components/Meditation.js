import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as GroupService from "../service/groupService";

const Meditation = () => {
  const navigation = useNavigation();
  [data, setData] = useState(null);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const data = await GroupService.fetchGroups();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGroup();
  }, []);

  const handleNavigationToHome = () => {
    navigation.navigate("MainMenu");
  };

  const handleNavigationToExercises = (item) => {
    navigation.navigate("Exercises", { item });
  };

  const renderSeparator = () => <View style={{ marginBottom: 20 }} />;

  const renderItem = ({ item }) => (
    <Pressable onPress={() => handleNavigationToExercises(item)}>
      <LinearGradient
        style={styles.listItem}
        colors={["#3498db", "white", "#3498db"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text>{item.name}</Text>
      </LinearGradient>
    </Pressable>
  );
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <Image source={require("../img/logo.png")} style={styles.imageLogo} />
        <Pressable onPress={handleNavigationToHome} style={{ marginTop: 20 }}>
          <LinearGradient
            style={styles.btnGoBack}
            colors={["orange", "white", "orange"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.positionPass}>Медитації</Text>
          </LinearGradient>
        </Pressable>
      </View>

      <View style={styles.containerList}>
        <FlatList
          style={{ width: "100%" }}
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ alignItems: "center" }}
          ItemSeparatorComponent={renderSeparator}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    width: 250,
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  imageLogo: {
    width: 150,
    height: 170,
    marginTop: 20,
  },
  btnGoBack: {
    width: 170,
    height: 80,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  positionPass: {
    fontFamily: "Montserrat-Bold",
    textAlign: "center",
    fontSize: 20,
  },
  containerList: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    backgroundColor: "grey",
  },
});

export default Meditation;
