import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const Diary = () => {
  const [notes, setNotes] = useState([]);
  const navigation = useNavigation();

  const addNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
    navigation.navigate("Diary");
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const updateNote = (updatedNote) => {
    if (
      updatedNote.title.trim() === "" ||
      updatedNote.description.trim() === ""
    ) {
      Alert.alert("Ой лишенько!", "Тема та вміст нотатки є обов'язковими", [
        { text: "Закрити" },
      ]);
      return;
    }

    const filteredNotes = notes.filter((note) => note.id !== updatedNote.id);

    setNotes([...filteredNotes, updatedNote]);
    navigation.navigate("Diary");
  };

  const openModal = () => {
    navigation.navigate("NotesModalForm", {
      leftButtonTitle: "Додати",
      onCreateNote: addNote,
      note: {
        id: Math.random().toString(),
        title: "",
        description: "",
      },
    });
  };

  const openUpdateModal = (note) => {
    navigation.navigate("NotesModalForm", {
      leftButtonTitle: "Змінити",
      onCreateNote: updateNote,
      note,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Привіт! На цій сторінці ти можеш занотувати свої думки, свої рефлексії
        та усвідомлення, які прийшли тобі під час медитацій :)
      </Text>

      <FlatList
        style={styles.list}
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View style={[styles.inputContainer, styles.noteItem]}>
              <View style={styles.groupNote}>
                <Text style={[styles.input, { fontFamily: "Montserrat-Bold" }]}>
                  {item.title}
                </Text>
                <Text style={[styles.input, styles.inputDescr]}>
                  {item.description}
                </Text>
              </View>
              <TouchableOpacity onPress={() => deleteNote(item.id)}>
                <Text style={styles.deleteButton}>
                  <Icon name="delete" size={20} color={"black"} />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openUpdateModal(item)}>
                <Text style={styles.editButton}>
                  <Icon name="edit" size={20} color={"black"} />
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <TouchableOpacity style={styles.addButton} onPress={openModal}>
        <Text style={styles.buttonText}>
          <Icon name="pluscircleo" size={20} color={"black"} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    marginBottom: 30,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "lightgreen",
    padding: 10,
    borderRadius: 5,
    alignContent: "center",
    marginTop: 20,
  },
  buttonText: {
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 1,
    // borderWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10,
  },
  groupNote: {
    flex: 1,
    marginRight: 10,
  },
  input: {
    fontSize: 18,
    marginBottom: 5,
    // width: "100%",
  },
  // inputDescr: {
  //   width: "100%",
  // },
  deleteButton: {
    padding: 3,
    backgroundColor: "red",
    marginRight: 5,
  },
  editButton: {
    padding: 3,
    backgroundColor: "orange",
  },
  list: {
    flex: 1,
  },
  modalContainer: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "100%",
    height: "100%",
    position: "relative",
  },
  plusButton: {
    fontSize: 18,
    color: "green",
    position: "absolute",
    right: -5,
    top: -15,
  },

  titleInput: {
    fontSize: 20,
    fontFamily: "Montserrat-Bold",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  descriptionInput: {
    height: "70%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveButton: {
    padding: 10,
    borderRadius: 5,
    fontSize: 18,
    position: "absolute",
    left: 20,
    bottom: 20,
    backgroundColor: "green",
  },
  closeButton: {
    fontSize: 18,
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
});

export default Diary;
