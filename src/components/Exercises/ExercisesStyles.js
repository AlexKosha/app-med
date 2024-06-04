import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  line: {
    height: 1,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "gray",
    marginBottom: 10,
  },
  itemContainer: {
    paddingLeft: 10,
    flexDirection: "row",
    // alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginRight: 10,
  },
  contentContainer: {
    flexDirection: "column",
    marginLeft: 10,
  },
  iconContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 10,
    paddingTop: 5,
  },
  heartIcon: {
    fontSize: 24,
    color: "red",
  },
});
