import React from "react"
import { Text, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { styles } from "./styles";
import { PageHeaderProps } from "../../@types/components/PageHeaderProps";
import { theme } from "../../globalStyle/globalStyle";

const PageHeader: React.FC<PageHeaderProps> = ({title, type, icons}) => {
  let color = theme[type];

  return (
    <View style={styles.header}>
      <Text style={[styles.title, {color}]}>{title}</Text>
      <Feather name="bell" size={28} color={color} />
    </View>
  )
}

export default PageHeader;