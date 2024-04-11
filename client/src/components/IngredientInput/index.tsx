import { TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {styles} from './styles';
import { IngredientInputProps } from '../../@types/components/IngredientInputProps';
import { theme } from '../../globalStyle/globalStyle';

const IngredientInput: React.FC<IngredientInputProps> = ({ingredient, index, onChangeText, onDelete}) => {
  return (
    <View style={styles.ingredientWrapper} key={index}>
      <TextInput 
        value={ingredient} 
        placeholder="name" 
        style={styles.input} 
        onChangeText={(e) => onChangeText(e, index)}
      />
      <Feather style={styles.trashIcon} name="trash" size={24} color={theme.gray} onPress={() => {onDelete(index)}} />
    </View>
  )
}

export default IngredientInput;