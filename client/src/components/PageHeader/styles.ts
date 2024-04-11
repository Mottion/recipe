import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center"
  },
  title: {
    fontSize: 25,
    fontWeight: "500",
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    gap: 15
  },
  searchWrapper: {
    width: "100%",
    backgroundColor: "#a8a8a86d",
    borderRadius: 5,
    padding: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
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
})