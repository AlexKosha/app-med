import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  imageLogo: {
    width: 150,
    height: 170,
    marginTop: 20,
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
  text: {
    fontFamily: "Montserrat-Medium",
    fontSize: 17,
  },
  imageContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  btnContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  gradient: {
    width: 200,
    height: 60,
    backgroundColor: "orange",
    borderRadius: 50,
    paddingVertical: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
});
