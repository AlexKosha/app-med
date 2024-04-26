import React, { useState } from "react";
import { useWindowDimensions } from "react-native";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const NotesModalForm = ({ leftButtonTitle, note, onCreateNote, onClose }) => {
  const [newNote, setNewNote] = useState({
    id: note.id,
    title: note.title || "",
    description: note.description || "",
  });

  const { height } = useWindowDimensions();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // style={{ justifyContent: "center" }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.titleInput}
            placeholder="Тема"
            placeholderTextColor="#d3d3d3"
            value={newNote.title}
            onChangeText={(text) =>
              setNewNote((prevNote) => ({ ...prevNote, title: text }))
            }
          />

          <TextInput
            style={styles.descriptionInput}
            multiline={true}
            placeholder="Ваші роздуми"
            placeholderTextColor="#d3d3d3"
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
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => onClose()}
          >
            <Text style={{ color: "#fff" }}>Закрити</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    position: "relative",
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
    height: "75%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  saveButton: {
    padding: 7,
    borderRadius: 5,
    fontSize: 18,
    position: "absolute",
    left: 20,
    bottom: 20,
    marginTop: 30,
    backgroundColor: "green",
  },
  closeButton: {
    padding: 7,
    borderRadius: 5,
    fontSize: 18,
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "red",
  },
});

export default NotesModalForm;
