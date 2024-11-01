import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    paddingVertical: 50,
    paddingHorizontal: 25,
    justifyContent: "space-between",
    marginBottom: 50
  },
  scroll: {
  },
  header: {
    display: "flex",
    paddingHorizontal: 10,
    paddingVertical: 5, 
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    gap: 15, 
    borderRadius: 5
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 50
  },
  nameUser: {
    fontSize: 18
  },
  message: {

  },
  ListHeaderWrapper: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    borderTopColor: "white",
    borderTopWidth: 1,
    paddingTop: 10,
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 10,
    flex: 1
  },
  icon: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 10
  }
})