import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  backImage: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
    position: "relative",
  },
  avatar: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  btnAvatar: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  userName: {
    fontSize: 30,
    marginVertical: 10,
    fontFamily: "Montserrat-Bold",
  },
});
