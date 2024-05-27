import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { styles } from "./DiaryStyles";
import {
  getStoredFavoritesDiaries,
  saveDiaryToStorage,
} from "../../helpers/diaryStorage";

const Diary = () => {
  const [notes, setNotes] = useState([]);
  const navigation = useNavigation();

  const loadFavoritesDiary = async () => {
    try {
      const favorites = await getStoredFavoritesDiaries();
      setNotes(favorites);
    } catch (error) {
      console.error("Failed to load favorites:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadFavoritesDiary();
    }, [])
  );

  // const addNote = async (newNote) => {
  //   await saveDiaryToStorage(newNote);
  //   setNotes((prevNotes) => [...prevNotes, newNote]);
  //   navigation.navigate("Diary");
  // };

  const addNote = async (newNote) => {
    setNotes((prevNotes) => {
      console.log("====================================");
      console.log("prevNotes type:", typeof prevNotes);
      console.log("prevNotes isArray:", Array.isArray(prevNotes));
      console.log("====================================");

      const updatedNotes = Array.isArray(prevNotes)
        ? [...prevNotes, newNote]
        : [newNote];
      saveDiaryToStorage(updatedNotes);
      return updatedNotes;
    });
    navigation.navigate("Diary");
  };

  // const deleteNote = (id) => {
  //   setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  // };

  const deleteNote = async (id) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.filter((note) => note.id !== id);
      saveDiaryToStorage(updatedNotes);
      return updatedNotes;
    });
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

    // const filteredNotes = notes.filter((note) => note.id !== updatedNote.id);

    // setNotes([...filteredNotes, updatedNote]);
    // navigation.navigate("Diary");
    const filteredNotes = notes.filter((note) => note.id !== updatedNote.id);
    const updatedNotes = [...filteredNotes, updatedNote];
    await saveDiaryToStorage(updatedNotes);
    setNotes(updatedNotes);
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
            <View style={styles.noteContainer}>
              <View style={styles.textNoteContainer}>
                <Text style={[styles.input, { fontFamily: "Montserrat-Bold" }]}>
                  {item.title}
                </Text>
                <Text style={styles.input}>{item.description}</Text>
              </View>
              <TouchableOpacity onPress={() => deleteNote(item.id)}>
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
