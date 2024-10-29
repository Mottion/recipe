import React from 'react';
import { styles } from "./styles";
import { Text, View } from 'react-native';
import { NotificationProps } from '../../@types/models/NotificationProps';
import { useUtils } from '../../context/Utils';

interface NotificationComponentProps {
  notification: NotificationProps
}

const NotificationComponent: React.FC<NotificationComponentProps> = ({notification}) => {
  const {formatDate} = useUtils();

  return (
    <View style={[{...styles.notification}, notification.readed ? {backgroundColor: "#e3e3e3"} : null]}>
      <View style={styles.infoWrapper}>
        <Text style={styles.title}>{notification.title}</Text>
      <Text>{formatDate(notification.createAt)}</Text>
      </View>
      <Text style={styles.description}>{notification.description}</Text>
    </View>
  )
}

export default NotificationComponent