import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { MessagesProps } from '../../@types/models/MessagesProps';
import { useUtils } from '../../context/Utils';
import { useNavigation } from '@react-navigation/native';

export interface MessageProps {
  message: MessagesProps
}

const MessageComponent: React.FC<MessageProps > = ({message}) => {
  const {formatDate} = useUtils();
  const {navigate} = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigate("home")} style={styles.message}>
      <Image style={styles.image} source={message.sender.image ? {uri: message.sender.image} : require("../../../assets/user.jpg")}/>
      <View style={styles.contentWrapper}>
        <View style={styles.infoWrapper}>
          <Text style={styles.title}>{message.sender.name}</Text>
          <Text>{formatDate(message.createdAt)}</Text>
        </View>
        <View style={styles.markWrapper}>
          {!message.readed && <View style={styles.mark}></View>}
          <Text style={styles.description}>{message.text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default MessageComponent