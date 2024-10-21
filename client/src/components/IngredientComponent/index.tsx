import { Text, View } from "react-native"
import { styles } from "./styles";
import { IngredientComponentProps } from "../../@types/components/IngredientComponentProps";

const IngredientComponent: React.FC<IngredientComponentProps> = ({title, ingredients}) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.ingredientsWrapper}>
        {ingredients.map(ingredient => (
          <Text style={styles.ingredient}>●  {ingredient}</Text>
        ))}
      </View>
    </View>
  )
}

export default IngredientComponent