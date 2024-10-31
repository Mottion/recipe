import React from 'react';
import { ScrollView, View } from 'react-native';
import { styles } from './styles';
import PageHeader from '../../components/PageHeader';
import { useSocket } from '../../context/SocketContext';
import MessageComponent from '../../components/Message';

const MessagesScreen: React.FC = () => {
  const {messages} = useSocket();
  
  return (
    <View style={styles.container}>
      <PageHeader title="MESSAGES" type="purple" />
      <ScrollView style={styles.scroll}>
        {messages.map((message, index) => (
          <MessageComponent key={index}  message={message}/>
        ))}
      </ScrollView>
    </View>
  )
}

export default MessagesScreen