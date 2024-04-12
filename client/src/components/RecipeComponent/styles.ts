import { StyleSheet } from "react-native";
import { theme } from "../../globalStyle/globalStyle";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.white,
    marginVertical: 5,
    display: "flex",
    flexDirection: "row",
    maxHeight: 150,
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 10,
    overflow: "hidden",
    gap: 5,
  },
  image: {
    flex: 2,
    margin: 5,
    borderRadius: 10,
  },
  details: {
    paddingVertical: 5,
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
    backgroundColor: theme.white,
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