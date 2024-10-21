import { Text, View } from "react-native"
import { styles } from "./styles";
import { DescriptionComponentProps } from "../../@types/components/DescriptionComponentProps";

const DescriptionComponent: React.FC<DescriptionComponentProps> = ({title, description}) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  )
}

export default DescriptionComponent