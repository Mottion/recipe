import { StyleSheet } from "react-native";

const negative = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    bottom: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  notifyWrapper: {
    width: "90%",
    padding: 10,
    backgroundColor: "#e50707",
    borderRadius: 10
  },
  notifyText: {
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    color: "#FFF",
    textAlign: "center"
  }
});

const positive = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    bottom: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  notifyWrapper: {
    width: "90%",
    padding: 5,
    backgroundColor: "#19c307",
    borderRadius: 5
  },
  notifyText: {
    fontSize: 18,
    fontFamily: "Roboto-Medium",
    color: "#FFFFFF"
  }
});

const styleType = {
  "negative": negative,
  "positive": positive,
}

export default styleType;