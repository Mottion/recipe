import { View, TouchableOpacity } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { styles } from "./styles";
import { theme } from "../../globalStyle/globalStyle";
import { useNavigation } from "@react-navigation/native";
import { useSocket } from "../../context/SocketContext";
import { useEffect, useState } from "react";

const FooterComponent: React.FC = () => {
  const {navigate} = useNavigation();
  const {messages} = useSocket();
  const [hasNewMessage, setHasNewMessage] = useState<boolean>(true);

  useEffect(() => {
    const newMessage = messages.filter((e) => {return e?.readed == false})
    setHasNewMessage(newMessage.length > 0)
  }, [messages]);

  return (
    <View style={styles.container}>
      <Entypo onPress={() => {navigate("home")}} name="home" size={30} color={theme.primary} />
      <FontAwesome5 onPress={() => {navigate("profile")}} name="user-circle" size={30} color={theme.primary} />
      <View>
        {hasNewMessage && <View style={styles.mark} />}
        <MaterialCommunityIcons onPress={() => {navigate("messages")}} name="email-outline" size={30} color={theme.primary} />
      </View>
      <Fontisto onPress={() => {navigate("save")}} name="favorite" size={30} color={theme.primary} />
    </View>
  )
}

export default FooterComponent;