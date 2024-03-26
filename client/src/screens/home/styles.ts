import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal: 25,
  },
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
  searchWrapper: {
    width: "100%",
    backgroundColor: "#a8a8a86d",
    borderRadius: 5,
    padding: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  search: {
    width: "auto",
    padding: 5,
    maxWidth: "80%",
    fontSize: 20,
    color: "#6d6d6d",
  },
  filter: {
    width: 24,
    height: 24,
    color: "#6d6d6dcc"
  },
  adSpace: {
    width: "100%",
  },
  ads: {
    width: "100%",
    objectFit: "contain",
  },
  tags: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  tagWrapper: {
    borderRadius: 5,
    overflow: "hidden",
    marginHorizontal: 5,
  },
  tagBg: {
  },
  tagTitle: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: "#00000033",
    alignContent: "center",
    justifyContent: "center",
    color: "#FFFFFF",
    fontSize: 29,
    fontWeight: "700",
    textDecorationStyle: "solid"
  },
})
