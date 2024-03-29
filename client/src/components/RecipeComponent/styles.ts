import { StyleSheet } from "react-native";
import { theme } from "../../globalStyle/globalStyle";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    maxHeight: 150,
    justifyContent: "center",
    alignContent: "center",
    gap: 10,
  },
  image: {
    flex: 2,
    backgroundColor: "red",
    borderRadius: 10
  },
  details: {
    flex: 6,
    overflow: "hidden",
  },
  header: {
    display: "flex",
    flexDirection: "row",
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    marginRight: 2,
    color: theme.black,
  },
  author: {
    color: theme.gray,
    fontSize: 14
  },
  rating: {
    position: "absolute",
    right: 10,
    color: theme.yellow,
    fontWeight: "500",
    fontSize: 18,
    zIndex: 2,
    backgroundColor: "#f0f0f0",
  },
  infos: {
    lineHeight: 14,
    color: theme.gray,
    fontSize: 14,
    marginBottom: 2
  },
  description: {
    overflow: "hidden",
    fontSize: 13,
  },
})