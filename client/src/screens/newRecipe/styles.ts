import { StyleSheet } from "react-native";
import { theme } from "../../globalStyle/globalStyle";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    paddingVertical: 50,
    paddingHorizontal: 25,
    marginBottom: 50
  },
  scroll: {
    flex: 1, 
    width: "100%",
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginTop: 20
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: theme.gray,
  },
  headerInfos: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center"
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 5,
    borderRadius: 5,
    width: "100%",
    marginBottom: 5
  },
  datails: {
    display: "flex",
    flexDirection: "row",
    gap: 10
  },
  ingredients: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  label: {
    fontFamily: "Roboto-Medium",
    color: "#FFFFFF",
    fontSize: 22,
    marginBottom: 5,
    marginTop: 20
  },
  addIngredients: {
    width: "auto", 
    paddingHorizontal: 40, 
    paddingVertical: 0, 
    justifyContent: "center"
  },
  save: {
    
  },
  tagWrapper: {
  },
  tagOption: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: theme.gray,
    borderBottomWidth: 0.5
  },
  tagOptionTittle: {
    fontSize: 16,
  },
})