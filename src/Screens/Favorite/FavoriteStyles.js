import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "lightgray",
  },
  selectedTabButton: {
    backgroundColor: "orange",
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemContainer: {
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  line: {
    height: 1,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "gray",
    marginBottom: 10,
  },
  contentContainer: {
    flexDirection: "column",
    marginLeft: 10,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "cover",
    marginRight: 10,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  iconContainer: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 10,
    paddingTop: 5,
  },
  heartIcon: {
    fontSize: 24,
    color: "red",
  },
});
