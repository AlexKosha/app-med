import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { styles } from "./NotesModalFormStyles";
import { addDiary, updateDiary } from "../../service/diaryServices";

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
      id: note._id || "",
      title: note.title || "",
      description: note.description || "",
    });
  }, [note]);

  const func = async () => {
    if (newNote.title.trim() === "" || newNote.description.trim() === "") {
      Alert.alert("Ой лишенько!", "Тема та вміст нотатки є обов'язковими", [
        { text: "Закрити" },
      ]);
      return;
    }
    const noteNote = {
      title: newNote.title,
      description: newNote.description,
    };

    try {
      let data = "";
      if (leftButtonTitle === "Додати") {
        data = await addDiary(noteNote);
      } else {
        data = await updateDiary(newNote.id, noteNote);
      }

      setNewNote({
        id: "",
        title: "",
        description: "",
      });
      onCreateNote(data);
    } catch (error) {
      console.error(
        "Error updating note:",
        error.response?.data || error.message
      );
    }
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

export default NotesModalForm;
