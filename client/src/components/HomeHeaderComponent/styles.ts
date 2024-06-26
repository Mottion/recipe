import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  searchWrapper: {
    width: "100%",
    backgroundColor: "#a8a8a86d",
    borderRadius: 5,
    padding: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  search: {
    width: "auto",
    padding: 5,
    maxWidth: "80%",
    fontSize: 20,
    color: "#6d6d6d",
  },
  filter: {
    width: 24,
    height: 24,
    color: "#6d6d6dcc"
  },
  adSpace: {
    width: "100%",
  },
  ads: {
    width: "100%",
    objectFit: "contain",
  },
  tags: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
  },
})