import { StyleSheet } from "react-native";
import { theme } from "../../globalStyle/globalStyle";

const purple = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    backgroundColor: theme.purple,
    borderRadius: 5,
    marginTop: 15,
  },
  label: {
    color: "#FFFFFF",
    fontFamily: "Roboto-Bold",
    fontSize: 20,
    textAlign: "center"
  }
})

const white = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    marginTop: 15,
  },
  label: {
    color: theme.purple,
    fontFamily: "Roboto-Bold",
    fontSize: 20,
    textAlign: "center"
  }
})

const styleType = {
  "purple": purple,
  "white": white
}

export default styleType;