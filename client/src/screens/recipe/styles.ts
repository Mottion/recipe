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
  recipe: {
    marginVertical: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    gap: 5,
  },
  image: {
    flex: 2,
    margin: 5,
    borderRadius: 10,
    height: 85,
  },
  details: {
    paddingVertical: 5,
    flex: 6,
    overflow: "hidden",
  },
  header: {
    display: "flex",
    flexDirection: "row",
  },
  name: {
    fontWeight: "600",
    fontSize: 18,
    fontFamily: "Roboto-Regular",
    marginRight: 2,
    color: theme.black,
  },
  author: {
    color: theme.gray,
    fontSize: 16,
    marginRight: "auto"
  },
  rating: {
    zIndex: 2,
    backgroundColor: theme.white,
    marginRight: 10,
    display: "flex",
    flexDirection: "row"
  },
  number: {
    color: theme.yellow,
    fontWeight: "500",
    fontSize: 22,
  },
  infos: {
    lineHeight: 15,
    color: theme.gray,
    fontSize: 16,
    marginBottom: 2
  },
  modalContainer: {
    backgroundColor: "#00000030",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  modal: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 5
  },
  title: {
    fontSize: 22,
    width: "100%",
    textAlign: "center"
  },
  stars: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  }
})