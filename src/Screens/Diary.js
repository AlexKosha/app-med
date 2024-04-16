import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import MainModal from "../components/Modal";
import NotesModalForm from "../components/NotesModalForm";

const Diary = () => {
  const [isVisibleCreateNoteModal, setIsVisibleCreateNoteModal] =
    useState(false);
  const [isVisibleUpdateNoteModal, setIsVisibleUpdateNoteModal] =
    useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({});

  const openUpdateModal = (note) => {
    setIsVisibleUpdateNoteModal(true);
    setCurrentNote(note);
  };

  const addNote = (newNote) => {
    if (newNote.title.trim() === "" || newNote.description.trim() === "") {
      // alert
      return;
    }
    setNotes((prevNotes) => [...prevNotes, newNote]);
    setIsVisibleCreateNoteModal(false);
  };

  const handleDeleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const renderAddNoteModalComponent = (note) => {
    return (
      <MainModal
        isVisible={isVisibleCreateNoteModal}
        onClose={() => setIsVisibleCreateNoteModal(false)}
      >
        <NotesModalForm
          leftButtonTitle={"Додати"}
          onCreateNote={addNote}
          note={note}
          onClose={() => setIsVisibleCreateNoteModal(false)}
        />
      </MainModal>
    );
  };

  const renderUpdateNoteModalComponent = (note) => {
    return (
      <MainModal
        isVisible={isVisibleUpdateNoteModal}
        onClose={() => setIsVisibleUpdateNoteModal(false)}
      >
        <NotesModalForm
          leftButtonTitle={"Оновити"}
          onCreateNote={updateNote}
          note={note}
          onClose={() => setIsVisibleUpdateNoteModal(false)}
        />
      </MainModal>
    );
  };

  const updateNote = (updatedNote) => {
    const filteredNotes = notes.filter((note) => note.id !== updatedNote.id);

    setNotes([...filteredNotes, updatedNote]);
    setIsVisibleUpdateNoteModal(false);
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
              <TouchableOpacity onPress={() => handleDeleteNote(item.id)}>
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
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsVisibleCreateNoteModal(true)}
      >
        <Text style={styles.buttonText}>
          <Icon name="pluscircleo" size={20} color={"black"} />
        </Text>
      </TouchableOpacity>
      {isVisibleCreateNoteModal &&
        renderAddNoteModalComponent({
          id: Math.random().toString(),
          title: "",
          description: "",
        })}
      {isVisibleUpdateNoteModal !== 0 &&
        renderUpdateNoteModalComponent(currentNote)}
      {/* <MainModal
        isVisible={isModalVisible}
        onClose={() => setIsVisibleCreateNoteModal(false)}
      >
        {isAddModal ? (
          <AddNote
            onCreateNote={addNote}
            note={{ id: Math.random().toString(), title: "", description: "" }}
            onClose={() => setIsVisibleCreateNoteModal(false)}
          />
        ) : (
          <AddNote
            onCreateNote={addNote}
            note={{ id: Math.random().toString(), title: "", description: "" }}
            onClose={() => setIsVisibleCreateNoteModal(false)}
          />
        )}
      </MainModal> */}

      {/* !2 */}
      {/* {isUpdateModalVisible && (
        <MainModal
          isVisible={isUpdateModalVisible}
          onClose={() => setIsUpdateModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.titleInput}
                placeholder="Тема"
                value={infoNote.title}
                onChangeText={(text) =>
                  setInfoNote((prevInfoNote) => ({
                    ...prevInfoNote,
                    title: text,
                  }))
                }
              />
              <TextInput
                style={styles.descriptionInput}
                multiline={true}
                placeholder="Ваші роздуми"
                value={infoNote.description}
                onChangeText={(text) =>
                  setInfoNote((prevInfoNote) => ({
                    ...prevInfoNote,
                    description: text,
                  }))
                }
              />
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleAddUpdatedNote(
                  infoNote.title,
                  infoNote.description
                )}
              >
                <Text style={{ color: "#fff" }}>Оновити</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleAddUpdatedNote}
              >
                <Text style={{ color: "#fff" }}>Закрити</Text>
              </TouchableOpacity>
            </View>
          </View>
        </MainModal>
      )} */}
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
