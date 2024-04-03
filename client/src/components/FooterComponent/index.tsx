import { View, TouchableOpacity } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { styles } from "./styles";
import { theme } from "../../globalStyle/globalStyle";
import { useNavigation } from "@react-navigation/native";

const FooterComponent: React.FC = () => {
  const {navigate} = useNavigation();

  return (
    <View style={styles.container}>
      <Entypo onPress={() => {navigate("home")}} name="home" size={30} color={theme.primary} />
      <FontAwesome5 onPress={() => {navigate("profile")}} name="user-circle" size={30} color={theme.primary} />
      <MaterialCommunityIcons name="email-outline" size={30} color={theme.primary} />
      <Fontisto name="favorite" size={30} color={theme.primary} />
    </View>
  )
}

export default FooterComponent;