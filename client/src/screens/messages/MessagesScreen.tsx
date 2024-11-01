import React from 'react';
import { ScrollView, View } from 'react-native';
import { styles } from './styles';
import PageHeader from '../../components/PageHeader';
import { useSocket } from '../../context/SocketContext';
import ContactComponent from '../../components/Contact';

const MessagesScreen: React.FC = () => {
  const {messages} = useSocket();
  
  return (
    <View style={styles.container}>
      <PageHeader title="MESSAGES" type="purple" />
      <ScrollView style={styles.scroll}>
        {messages.map((message, index) => (
          <ContactComponent key={index}  contact={message}/>
        ))}
      </ScrollView>
    </View>
  )
}

export default MessagesScreen