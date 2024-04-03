import { StyleSheet } from "react-native";
import { theme } from "../../globalStyle/globalStyle";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    paddingVertical: 50,
    paddingHorizontal: 25,
    backgroundColor: theme.primary
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: "center",
    marginTop: 50
  },
  userName: {
    color: theme.white,
    fontFamily: "Roboto-Bold",
    fontSize: 30,
    textAlign: "center",
    paddingVertical: 10
  },
  line: {
    borderBottomColor: theme.white,
    borderBottomWidth: 2,
    marginVertical: 20,
    width: "100%"
  },
})
