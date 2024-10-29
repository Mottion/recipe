import React, { useEffect, useState } from 'react';
import { styles } from "./styles";
import { ScrollView, View } from 'react-native';
import PageHeader from '../../components/PageHeader';
import { useBell } from '../../context/BellContext';
import NotificationComponent from '../../components/Notification';
import { useServer } from '../../context/ServerContext';

const NotificationsScreen: React.FC = () => {
  const server = useServer();
  const {notifications} = useBell();

  useEffect(() => {
    readNotifications();
  }, [notifications])

  const readNotifications = async () => {
    const response = await server.readNotification();
    if(response){
      notifications.map((notification) => {
        notification.readed = true;
      });
    }
  }

  return (
    <View style={styles.container}>
      <PageHeader title="NOTIFICATIONS" type="purple" />
      <ScrollView style={styles.scroll}>
        {notifications.map((notification, index) => (
          <NotificationComponent  key={index}  notification={notification}/>
        ))}
      </ScrollView>
    </View>
  )
}

export default NotificationsScreen