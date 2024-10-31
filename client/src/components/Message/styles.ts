import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  message: {
    borderTopColor: "#4a4a4a",
    borderTopWidth: 1,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    padding: 5
  },
  infoWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  description: {
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignSelf: "center",
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    flex: 1
  },
  mark: {
    width: 10,
    height: 10,
    backgroundColor: "red",
    borderRadius: 50,
  },
  markWrapper: {
    display: "flex", 
    flexDirection: "row", 
    alignItems: "center",
    gap: 5,
    marginBottom: 10
  }
})