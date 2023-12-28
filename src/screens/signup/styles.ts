import { StyleSheet } from "react-native";
import { theme } from "../../globalStyle/globalStyle";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  contentWrapper: {
    marginTop: 30,
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  title: {
    color: "#FFFFFF",
    fontFamily: "Roboto-Medium",
    letterSpacing: 12,
    fontSize: 32,
    marginBottom: 5
  },
  signup: {
    color: theme.blue,
    fontSize: 15,
    fontFamily: "Roboto-Medium",
  }
})

