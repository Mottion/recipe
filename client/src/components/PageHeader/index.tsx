import React from "react"
import { Text, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { styles } from "./styles";
import { PageHeaderProps } from "../../@types/components/PageHeaderProps";

const PageHeader: React.FC<PageHeaderProps> = ({title, icons}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Feather name="bell" size={28} color="black" />
    </View>
  )
}

export default PageHeader;