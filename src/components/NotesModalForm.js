import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
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
  Alert,
} from "react-native";

const NotesModalForm = ({ route }) => {
  const { leftButtonTitle, onCreateNote, note } = route.params;
  const navigation = useNavigation();
  const [newNote, setNewNote] = useState({
    id: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    setNewNote({
      id: note.id || "",
      title: note.title || "",
      description: note.description || "",
    });
  }, [note]);

  const func = () => {
    if (newNote.title.trim() === "" || newNote.description.trim() === "") {
      Alert.alert("Ой лишенько!", "Тема та вміст нотатки є обов'язковими", [
        { text: "Закрити" },
      ]);
      return;
    }
    const noteNote = { ...newNote };
    setNewNote({
      id: "",
      title: "",
      description: "",
    });
    onCreateNote(noteNote);
  };

  const onClose = () => {
    navigation.navigate("Diary");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.modalContent}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          keyboardVerticalOffset={
            Platform.OS === "android" ? 100 : Platform.OS === "ios" ? 100 : 0
          }
          style={styles.inner}
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
  inner: {
    flex: 1,
    paddingBottom: 10,
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
    height: "85%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    textAlignVertical: "top",
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
