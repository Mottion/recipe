import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { theme } from "../../globalStyle/globalStyle";
import { styles } from "./styles";
import PageHeader from "../../components/PageHeader";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import MultiLineInput from "../../components/MultiLineInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useServer } from "../../context/ServerContext";
import { TagProps } from "../../@types/models/TagProps";
import SelectDropdown from "react-native-select-dropdown";
import IngredientInput from "../../components/IngredientInput";
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerAsset } from "expo-image-picker";
import { useNotify } from "../../context/NotifyContext";
import { useUtils } from "../../context/Utils";
import { baseUrl } from "../../services/axiosConfig";

const NewRecipeScreen: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [kcal, setKcal] = useState<string>("");
  const [tags, setTags] = useState<TagProps[]>([]);
  const [selectedTag, setSelectedTag] = useState<TagProps>();
  const [description, setDescription] = useState<string>("");
  const [methodOfPreparation, setMethodOfPreparation] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>(["1 cooo", "2 cooo"]);
  const [image, setImage] = useState<ImagePickerAsset | null>(null);
  const server = useServer();
  const {showNotify} = useNotify();
  const utils = useUtils();

  useEffect(() => {
    getTags();
  }, [])

  async function getTags() {
    const response = await server.getTags();
    setTags(response);
  }

  function changeIngredient(newValue: string, index: number){
    ingredients[index] = newValue
    setIngredients([...ingredients]);
  } 

  function deleteIngredient(index: number){
    ingredients.splice(index, 1);
    setIngredients([...ingredients]);
  } 

  function addIngredient(){
    ingredients.push("");
    setIngredients([...ingredients]);
  } 
  
  async function pickImage(){
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  }

  async function createRecipe(){
    if(!image || !name || !kcal || !selectedTag || !description || !methodOfPreparation){
      showNotify("All fields must be filled in to create a recipe", "negative");
      return 
    }
    if(ingredients.length == 0){
      showNotify("The recipe must have at least one ingredient", "negative");
      return 
    }
    const imagePath = await utils.uploadImage(image);

    const response = await server.createRecipe({
      name,
      description,
      ingredients,
      methodOfPreparation,
      kcal: Number(kcal),
      tagId: selectedTag.id,
      image: `${baseUrl}/${imagePath}`,
    });
  }
  
  return (
    <LinearGradient
      colors={[theme.primary, theme.secondary]}
      style={styles.container}
    >
      <ScrollView style={styles.scroll}>
        <PageHeader title="NEW RECIPE" type="white" />

        <View style={styles.header} >
          <TouchableOpacity style={{alignItems: "center"}} onPress={pickImage}>
            <Image style={styles.image} source={image ? {uri: image.uri} : require("../../../assets/upload.png")}/>
          </TouchableOpacity>
          <View style={styles.headerInfos}>
            <TextInput value={name} onChangeText={setName} placeholder="name" style={styles.input}/>
            <View style={styles.datails}>
              <TextInput value={kcal} onChangeText={setKcal} placeholder="kcal" style={[styles.input, {flex: 1}]} keyboardType='numeric'/>
              <SelectDropdown 
                data={tags}
                onSelect={(selectedItem) => setSelectedTag(selectedItem)}
                renderButton={(item) => {
                  return (
                    <View style={[styles.input, {flex: 1}]}>
                      <Text>{item?.name ?? "tag"}</Text>
                    </View>
                  )
                }}
                renderItem={(item, index, isSelected) => {
                  return (
                    <View style={styles.tagOption}>
                      <Text style={styles.tagOptionTittle}>{item.name}</Text>
                    </View>
                  )
                }}
                dropdownStyle={styles.tagWrapper}
              />
            </View>
          </View>
        </View>

        <MultiLineInput label="Description" placeholder="enter with your description" setValue={setDescription} value={description} />
        <MultiLineInput label="Method of preparation" placeholder="enter with your method of preparation" setValue={setMethodOfPreparation} value={methodOfPreparation} />

        <View style={styles.ingredients}>
          <Text style={styles.label}>Ingredients</Text>
          <CustomButton onPress={addIngredient} text="+" type="white" style={styles.addIngredients}/>

        </View>
        {ingredients.map((ingredient, index) => (
          <IngredientInput 
            key={index}
            ingredient={ingredient} 
            index={index} 
            onChangeText={changeIngredient} 
            onDelete={deleteIngredient}
          />
        ))}
      </ScrollView>
      <CustomButton onPress={createRecipe} text="SAVE" type="purple" style={styles.save}/>
    </LinearGradient>
  );
}

export default NewRecipeScreen;