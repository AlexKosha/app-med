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

const NotesModalForm = ({ route }) => {
  const { leftButtonTitle, onCreateNote, note } = route.params;
  const [newNote, setNewNote] = useState({
    id: note.id,
    title: note.title || "",
    description: note.description || "",
  });

  const func = () => {
    const noteNote = { ...newNote };
    setNewNote({
      id: note.id,
      title: note.title || "",
      description: note.description || "",
    });
    onCreateNote(noteNote);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.modalContent}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 5,
            }}
          >
            <TouchableOpacity style={styles.saveButton} onPress={() => func()}>
              <Text style={{ color: "#fff", textAlign: "center" }}>
                {leftButtonTitle}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => onClose()}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>
                Закрити
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    flex: 1,
    // width: "100%",
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
    height: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  saveButton: {
    padding: 7,
    borderRadius: 5,
    fontSize: 18,
    backgroundColor: "green",
    width: 70,
  },
  closeButton: {
    padding: 7,
    borderRadius: 5,
    fontSize: 18,

    width: 70,
    backgroundColor: "red",
  },
});

export default NotesModalForm;
