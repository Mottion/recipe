import React from "react"
import { Text, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { styles } from "./styles";
import { PageHeaderProps } from "../../@types/components/PageHeaderProps";
import { theme } from "../../globalStyle/globalStyle";

const PageHeader: React.FC<PageHeaderProps> = ({title, type, icons = []}) => {
  let color = theme[type];
  const size = 28

  return (
    <View style={styles.header}>
      <Text style={[styles.title, {color}]}>{title}</Text>
      <View style={styles.icons}>
        <Feather name="bell" size={size} color={color} />
        {icons.map((icon, index) => icon(size, color, index))}
      </View>
    </View>
  )
}

export default PageHeader;