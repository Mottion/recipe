import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#FFFFFF",
    marginTop: 15,
    borderRadius: 10,
    position: "relative",
  },
  square: {
    width: 15,
    height: 15,
    backgroundColor: "#ffff",
    position: "absolute",
    transform: 'rotate(45deg)',
  }
})