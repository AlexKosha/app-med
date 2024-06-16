import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { styles } from "./DiaryStyles";
import {
  getStoredFavoritesDiaries,
  saveDiaryToStorage,
} from "../../helpers/diaryStorage";
import { deleteDiary, fetchDiary } from "../../service/diaryServices";

const Diary = () => {
  const [notes, setNotes] = useState([]);
  const navigation = useNavigation();

  const loadFavoritesDiary = async () => {
    try {
      let favorites = await getStoredFavoritesDiaries();

      if (favorites.length === 0) {
        favorites = await fetchDiary();
        await saveDiaryToStorage(favorites);
      }
      setNotes(favorites);

      // await SecureStore.deleteItemAsync("diaries");
      // setNotes([]);
    } catch (error) {
      console.error("Failed to load favorites:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadFavoritesDiary();
    }, [])
  );

  const addNote = async (newNote) => {
    setNotes((prevNotes) => {
      const updatedNotes = Array.isArray(prevNotes)
        ? [...prevNotes, newNote]
        : [newNote];

      return updatedNotes;
    });

    try {
      const updatedNotes = await SecureStore.getItemAsync("diaries");
      const parsedNotes = updatedNotes ? JSON.parse(updatedNotes) : [];
      parsedNotes.push(newNote);

      await saveDiaryToStorage(parsedNotes);

      navigation.navigate("Diary");
    } catch (error) {
      console.error("Failed to add note:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await deleteDiary(id);
      setNotes((prevNotes) => {
        const updatedNotes = prevNotes.filter((note) => note._id !== id);
        saveDiaryToStorage(updatedNotes);
        return updatedNotes;
      });
    } catch (error) {
      console.error(
        "Error deleting note:",
        error.response?.data || error.message
      );
    }
  };

  const updateNote = async (updatedNote) => {
    if (
      updatedNote.title.trim() === "" ||
      updatedNote.description.trim() === ""
    ) {
      Alert.alert("Ой лишенько!", "Тема та вміст нотатки є обов'язковими", [
        { text: "Закрити" },
      ]);
      return;
    }

    try {
      const filteredNotes = notes.filter(
        (note) => note._id !== updatedNote._id
      );
      const updatedNotes = [...filteredNotes, updatedNote];
      await saveDiaryToStorage(updatedNotes);
      setNotes(updatedNotes);
      navigation.navigate("Diary");
    } catch (error) {
      console.error(
        "Error updating note:",
        error.response?.data || error.message
      );
    }
  };

  const openModal = () => {
    navigation.navigate("NotesModalForm", {
      leftButtonTitle: "Додати",
      onCreateNote: addNote,
      note: {
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
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <View style={styles.noteContainer}>
              <View style={styles.textNoteContainer}>
                <Text style={[styles.input, { fontFamily: "Montserrat-Bold" }]}>
                  {item.title}
                </Text>
                <Text style={styles.input}>{item.description}</Text>
              </View>
              <TouchableOpacity onPress={() => deleteNote(item._id)}>
                <Text style={styles.deleteNoteButton}>
                  <Icon name="delete" size={20} color={"black"} />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openUpdateModal(item)}>
                <Text style={styles.editNoteButton}>
                  <Icon name="edit" size={20} color={"black"} />
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <TouchableOpacity style={styles.addNoteButton} onPress={openModal}>
        <Text style={styles.addNoteButtonText}>
          <Icon name="pluscircleo" size={20} color={"black"} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Diary;
