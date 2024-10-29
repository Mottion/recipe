import { StyleSheet } from "react-native";
import { theme } from "../../globalStyle/globalStyle";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    paddingVertical: 50,
    paddingHorizontal: 25,
    justifyContent: "space-between",
    marginBottom: 50
  },
  scroll: {},
  notification: {
    borderTopColor: "#4a4a4a",
    borderTopWidth: 1,
    display: "flex",
    paddingHorizontal: 10
  },
  infoWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  description: {
    marginBottom: 15
  },
})