import React, { useState } from "react";
import {
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import MainModal from "./Modal";

const News = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const renderItem = () => {
    return (
      <Pressable style={styles.itemContainer} onPress={() => toggleModal()}>
        <View style={styles.item}>
          <Text style={styles.title}>Title</Text>
          <Text style={styles.description}>Description</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={arr}
        keyExtractor={(item) => item.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
      <MainModal isVisible={isModalVisible} onClose={() => toggleModal()}>
        <ImageBackground
          source={{
            uri: "https://img.freepik.com/free-photo/cute-pastel-purple-marble-background_53876-104400.jpg?size=626&ext=jpg&ga=GA1.1.1695762122.1711480779&semt=ais",
          }}
          style={styles.modalContainer}
        >
          <Pressable onPress={() => toggleModal(null)}>
            <Icon style={styles.closeButton} name="closecircleo" />
          </Pressable>
          <View style={styles.modalTextBox}>
            <Text style={styles.title}>АРХАНГЕЛ МИХАЇЛ</Text>
            <Text style={styles.description}>
              Захистить і проведе вас у ситуації, що склалася. Дасть мужність та
              силу волі, щоби ви відчули впевненість та легко вийшли із
              ситуації. Захистить і проведе вас у ситуації, що склалася. Дасть
              мужність та силу волі, щоби ви відчули впевненість та легко вийшли
              із ситуації. Захистить і проведе вас у ситуації, що склалася.
              Дасть мужність та силу волі, щоби ви відчули впевненість та легко
              вийшли із ситуації.
            </Text>
          </View>
        </ImageBackground>
      </MainModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#f0f0f0",
  },
  itemContainer: {
    marginBottom: 20,
  },
  item: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: "#666",
  },
  modalContainer: {
    position: "relative",
    backgroundColor: "grey",
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  closeButton: {
    fontSize: 18,
    color: "orange",
    position: "absolute",
    right: -10,
    top: -25,
  },
  modalTextBox: {
    paddingTop: 10,
    paddingHorizontal: 15,
    paddingBottom: 15,
    overflow: "scroll",
  },
});

export default News;
