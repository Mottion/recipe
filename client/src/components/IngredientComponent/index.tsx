import { Text, View } from "react-native"
import { styles } from "./styles";
import { IngredientComponentProps } from "../../@types/components/IngredientComponentProps";

const IngredientComponent: React.FC<IngredientComponentProps> = ({title, ingredients}) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.ingredientsWrapper}>
        {ingredients.map((ingredient, index) => (
          <Text style={styles.ingredient} key={index}>●  {ingredient}</Text>
        ))}
      </View>
    </View>
  )
}

export default IngredientComponent