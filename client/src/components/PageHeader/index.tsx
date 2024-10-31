import React from "react"
import { Text, TextInput, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { styles } from "./styles";
import { PageHeaderProps } from "../../@types/components/PageHeaderProps";
import { theme } from "../../globalStyle/globalStyle";
import { useNavigation } from "@react-navigation/native";
import { useSocket } from "../../context/SocketContext";

const PageHeader: React.FC<PageHeaderProps> = ({title, type, icons = [], search}) => {
  let color = theme[type];
  const size = 28;
  const {notifications} = useSocket();
  const {navigate} = useNavigation();

  const handleNavigation = () => {
    navigate("notifications")
  }
  
  const hasUnreadNotification = () => {
    const unreadNotifications = notifications.filter((notification) => !notification.readed);
    return unreadNotifications.length > 0;
  }

  return (
    <>
      <View style={styles.header}>
        <Text style={[styles.title, {color}]}>{title}</Text>
        <View style={styles.icons}>
          <View style={styles.bellWrapper}>
            {hasUnreadNotification() && <View style={styles.numberOfNotifications} />}
            <Feather name="bell" size={size} color={color} onPress={handleNavigation} />
          </View>
          {icons.map((icon, index) => icon(size, color, index))}
        </View>
      </View>
      {search && 
        <View style={styles.searchWrapper}>
          <TextInput 
            style={styles.search} 
            value={search.state} 
            onChangeText={search.setState} 
            placeholder="Search"
            placeholderTextColor="#6d6d6d"
          />
          <Feather style={styles.filter} name="filter" size={24} />
        </View>
      }
    </>
  )
}

export default PageHeader;