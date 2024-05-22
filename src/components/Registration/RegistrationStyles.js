import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  container: {
    position: "relative",
    flex: 2 / 3,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  imageContainer: {
    position: "absolute",
    top: -90,
    left: "50%",
    transform: [{ translateX: -50 }],
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  addButton: {
    position: "absolute",
    right: -10,
    bottom: 15,
    backgroundColor: "#F6F6F6",
    borderRadius: 50,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FF6C00",
  },
  input: {
    fontFamily: "Montserrat-Regular",
    position: "relative",
    height: 40,
    width: "100%",
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  errorMessage: {
    fontFamily: "Montserrat-Regular",
    position: "absolute",
    fontSize: 12,
    color: "red",
    left: 0,
  },
  positionPass: {
    fontFamily: "Montserrat-Regular",
    position: "absolute",
    bottom: 11,
    right: 16,
  },
  button: {
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: 343,
    height: 51,
    backgroundColor: "#FF6C00",
  },
  buttonDisabled: {
    backgroundColor: "#CCCCCC",
    pointerEvents: "none",
  },
  buttonText: {
    fontFamily: "Montserrat-Regular",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  question: {
    fontFamily: "Montserrat-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 16,
  },
  logIn: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    color: "blue",
    textDecorationLine: "underline",
    lineHeight: 16,
  },
});