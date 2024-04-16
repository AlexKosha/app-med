import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const NotesModalForm = ({ leftButtonTitle, note, onCreateNote, onClose }) => {
  const [newNote, setNewNote] = useState(note);

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <TextInput
          style={styles.titleInput}
          placeholder="Тема"
          value={newNote.title}
          onChangeText={(text) =>
            setNewNote((prevNote) => ({ ...prevNote, title: text }))
          }
        />
        <TextInput
          style={styles.descriptionInput}
          multiline={true}
          placeholder="Ваші роздуми"
          value={newNote.description}
          onChangeText={(text) =>
            setNewNote((prevNote) => ({ ...prevNote, description: text }))
          }
        />
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => onCreateNote(newNote)}
        >
          <Text style={{ color: "#fff" }}>{leftButtonTitle}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={() => onClose()}>
          <Text style={{ color: "#fff" }}>Закрити</Text>
        </TouchableOpacity>
      </View>
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

export default NotesModalForm;
