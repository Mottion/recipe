import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import PageHeader from '../../components/PageHeader';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../globalStyle/globalStyle';
import { useServer } from '../../context/ServerContext';
import { useNavigation } from '@react-navigation/native';
import { MessageProps } from '../../@types/models/MessageProps';
import { UserProps } from '../../@types/models/UserProps';
import MessageComponent from '../../components/Message';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSocket } from '../../context/SocketContext';

const UserMessagesScreen: React.FC = () => {
  const [userMessages, setUserMessages] = useState<MessageProps[]>([]);
  const [user, setUser] = useState<UserProps>();
  const server = useServer();
  const navigation = useNavigation();
  const { params } = navigation.getState().routes[navigation.getState().index];
  const [loading, setLoading] = useState<boolean>(false);
  const [lastIndex, setLastIndex] = useState<number>();
  const {messages, setMessages} = useSocket();

  const [text, setText] = useState("");

  useEffect(() => {
    getUserMessages(0);
    getUser();

    return () => {readMessages()}
  }, []);

  const readMessages = async () => {
    await server.readMessages(params!.id);
  } 

  useEffect(() => {
    const newMessageIndex = messages.findIndex((e) => e?.senderId == params!.id);
    if(!messages[newMessageIndex]?.readed) {
      setToReaded(newMessageIndex);
      userMessages.unshift(messages[newMessageIndex]);
    }
  }, [messages])

  const setToReaded = async (index: number) => {
    messages[index].readed = true;
    setMessages([...messages])
  }

  const getUser = async () => {
    const response = await server.getUser(params!.id);
    setUser(response);
  }

  const getUserMessages = async (skip: number) => {
    if(loading || lastIndex == skip) return;
    setLoading(true);
    const response = await server.getUserMessages(params!.id, skip);
    
    if(skip == 0) {
      setUserMessages([...response])
    }
    else {
      setUserMessages([...userMessages, ...response]);
    }

    setLastIndex(userMessages.length)
    setLoading(false)
  }

  const createMessage = async () => {
    const response = await server.createMessage(text, params!.id);
    userMessages.unshift(response)
    setUserMessages([...userMessages]);
    setText("");
  }

  if(!user) return;

  return (
    <LinearGradient
      colors={[theme.primary, theme.secondary]}
      style={styles.container}
    >
      <TouchableOpacity onPress={() => navigation.navigate("user", {id: params!.id})} style={styles.header}>
        <Image style={styles.image} source={user.image ? {uri: user.image} : require("../../../assets/user.jpg")}/>
        <Text style={styles.nameUser} >{user.name.toUpperCase()}</Text>
      </TouchableOpacity>
   
      <FlatList 
        showsVerticalScrollIndicator={false}
        data={userMessages}
        renderItem={({item}) => {
          return <MessageComponent message={item} targetUserId={params!.id} />
        }}
        onEndReached={() => getUserMessages(userMessages.length)}
        onEndReachedThreshold={0.1}
        inverted={true}
        keyExtractor={item => item.id}
      />
      <View style={styles.ListHeaderWrapper}>
        <TextInput 
          value={text}
          onChangeText={setText}
          placeholder={"message"}
          style={styles.input}
        />
        <TouchableOpacity onPress={createMessage}>
          <Ionicons style={styles.icon} name="send" size={24} color="black" />
        </TouchableOpacity>
      </View>
  </LinearGradient>
  )
}

export default UserMessagesScreen