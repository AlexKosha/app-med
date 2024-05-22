import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    marginBottom: 30,
    fontWeight: "bold",
  },
  list: {
    flex: 1,
  },
  noteContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10,
  },
  textNoteContainer: {
    flex: 1,
    marginRight: 10,
  },
  input: {
    fontSize: 18,
    marginBottom: 5,
  },
  deleteNoteButton: {
    padding: 3,
    backgroundColor: "red",
    marginRight: 5,
  },
  editNoteButton: {
    padding: 3,
    backgroundColor: "orange",
  },
  addNoteButton: {
    backgroundColor: "lightgreen",
    padding: 10,
    borderRadius: 5,
    alignContent: "center",
    marginTop: 20,
  },
  addNoteButtonText: {
    textAlign: "center",
  },
});
