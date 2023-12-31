import { StyleSheet } from "react-native";
import { theme } from "../../globalStyle/globalStyle";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  scroll: {
    width: "100%",
  },
  scrollContainer: {
    justifyContent: "center", 
    flex: 1
  },
  contentWrapper: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#FFFFFF",
    fontFamily: "Roboto-Medium",
    letterSpacing: 12,
    fontSize: 32,
    marginBottom: 5
  },
  forgetWrapper: {
    width: "100%",
    alignItems: "flex-end"
  },
  forget: {
    marginTop: 5,
    fontSize: 15,
    fontFamily: "Roboto-Medium",
    color: theme.blue,
    marginRight: 10
  },
  signup: {
    color: theme.blue,
    fontSize: 15,
    fontFamily: "Roboto-Medium",
  }
})