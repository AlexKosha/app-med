import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  container: {
    position: "relative",
    flex: 6 / 10,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  input: {
    fontFamily: "Montserrat-Regular",
    backgroundColor: "#F6F6F6",
    height: 40,
    width: "100%",
    height: 50,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  showPasswordText: {
    fontFamily: "Montserrat-Regular",
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  button: {
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: 343,
    height: 51,
  },
  buttonActive: {
    backgroundColor: "#FF6C00",
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: "#CCCCCC",
    pointerEvents: "none",
  },
  buttonText: {
    fontFamily: "Montserrat-Bold",
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
  forgotPass: {
    width: 100,
    fontFamily: "Montserrat-Bold",
    fontSize: 12,
    lineHeight: 16,
  },
});
