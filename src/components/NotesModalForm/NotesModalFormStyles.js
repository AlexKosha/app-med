import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
