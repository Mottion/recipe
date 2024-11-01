import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { MessagesProps } from '../../@types/models/MessagesProps';
import { useUtils } from '../../context/Utils';
import { useNavigation } from '@react-navigation/native';

const ContactComponent: React.FC<{contact: MessagesProps}> = ({contact}) => {
  const {formatDate} = useUtils();
  const {navigate} = useNavigation();

  if(!contact?.sender) return;

  return (
    <TouchableOpacity onPress={() => navigate("messagesUser", {id: contact.senderId})} style={styles.message}>
      <Image style={styles.image} source={contact.sender.image ? {uri: contact.sender.image} : require("../../../assets/user.jpg")}/>
      <View style={styles.contentWrapper}>
        <View style={styles.infoWrapper}>
          <Text style={styles.title}>{contact.sender.name}</Text>
          <Text>{formatDate(contact.createdAt)}</Text>
        </View>
        <View style={styles.markWrapper}>
          {!contact.readed && <View style={styles.mark}></View>}
          <Text style={styles.description}>{contact.text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ContactComponent