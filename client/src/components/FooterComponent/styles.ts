import { StyleSheet } from "react-native";
import { theme } from "../../globalStyle/globalStyle";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.white,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
    paddingVertical: 15,
    position: "absolute",
    bottom: 0,
    zIndex: 3,
    width: "100%",
    borderTopColor: "rgba(0,0,0,0.25)",
    borderTopWidth: 2,
  }
}) 