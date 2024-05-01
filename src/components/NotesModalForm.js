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
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          keyboardVerticalOffset={
            Platform.OS === "android" ? 135 : Platform.OS === "ios" ? 100 : 0
          }
          style={styles.innerKeyboard}
        >
          <TextInput
            style={[styles.input, styles.titleInput]}
            placeholder="Тема"
            placeholderTextColor="#d3d3d3"
            value={newNote.title}
            onChangeText={(text) =>
              setNewNote((prevNote) => ({ ...prevNote, title: text }))
            }
          />
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            multiline={true}
            placeholder="Ваші роздуми"
            placeholderTextColor="#d3d3d3"
            value={newNote.description}
            onChangeText={(text) =>
              setNewNote((prevNote) => ({ ...prevNote, description: text }))
            }
          />
          <View style={styles.containerButton}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "green" }]}
              onPress={() => func()}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>
                {leftButtonTitle}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "red" }]}
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
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    flex: 1,
  },
  innerKeyboard: {
    flex: 1,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  titleInput: {
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
  },
  descriptionInput: {
    height: "85%",
    textAlignVertical: "top",
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  button: {
    padding: 7,
    borderRadius: 5,
    fontSize: 18,
    width: 70,
  },
});

export default NotesModalForm;
