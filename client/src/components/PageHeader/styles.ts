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
  }
})