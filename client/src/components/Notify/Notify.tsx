import React from "react";
import { Animated, Text, View } from "react-native";
import styleType from "./styles";
import { useNotify } from "../../context/NotifyContext";

const Notify: React.FC = () => {
  const {message, type, visible} = useNotify();
  const opacity = new Animated.Value(visible ? 1 : 0);

  const styles = styleType[type]
  
  
  return (
    <Animated.View style={[styles.container,{opacity: opacity}]} pointerEvents={"none"}>
      <View style={styles.notifyWrapper}>
        <Text style={styles.notifyText}>{message}</Text>
      </View>
    </Animated.View>
  );
}

export default Notify;