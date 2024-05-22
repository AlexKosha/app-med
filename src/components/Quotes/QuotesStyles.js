import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 10,
    borderRadius: 16,
    overflow: "hidden",
    marginRight: 10,
  },
  headerContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  imageLogo: {
    width: 170,
    height: 100,
  },
  btnGoBack: {
    width: 170,
    height: 80,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  positionPass: {
    fontFamily: "Montserrat-Bold",
    textAlign: "center",
    fontSize: 20,
  },
  quotesContainer: {
    flex: 2,
    padding: 10,
    paddingTop: 0,
  },
  text: {
    fontFamily: "Montserrat-Medium",
    fontSize: 16,
  },
  modalContainer: {
    position: "relative",
    height: "100%",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  closeButton: {
    fontSize: 18,
    color: "orange",
    position: "absolute",
    right: -10,
    top: -10,
  },
  closeButtonSave: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "orange",
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: "Montserrat-Bold",
    textAlign: "center",
    fontSize: 16,
  },
  btnContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  gradient: {
    width: 200,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
