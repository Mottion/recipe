import React from 'react';
import { MessageProps } from '../../@types/models/MessageProps';
import { Text, View } from 'react-native';
import { styles } from './styles';

const MessageComponent: React.FC<{message: MessageProps, targetUserId: string}> = ({message, targetUserId}) => {
  const isTargetUser = message.senderId == targetUserId;
  const margin = isTargetUser ? {marginLeft: 50} : {marginRight: 50};
  
  return (
    <View style={[styles.container, margin]}>
      <Text>{message.text}</Text>
    </View>
  )
}

export default MessageComponent