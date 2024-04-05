import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { theme } from "../../globalStyle/globalStyle";
import { styles } from "./styles";
import PageHeader from "../../components/PageHeader";
import { Image, Text, TextInput, View } from "react-native";
import CustomInput from "../../components/CustomInput/CustomInput";
import MultiLineInput from "../../components/MultiLineInput";
import CustomButton from "../../components/CustomButton/CustomButton";

const NewRecipeScreen: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [kcal, setKcal] = useState<string>("");
  
  return (
    <LinearGradient
      colors={[theme.primary, theme.secondary]}
      style={styles.container}
    >
      <PageHeader title="NEW RECIPE" type="white" />
      
      <View style={styles.header} >
        <Image style={styles.image} source={require("../../../assets/user.jpg")} />
        <View style={styles.headerInfos}>
          <TextInput value={name} onChangeText={setName} placeholder="name" style={styles.input}/>
          <View style={styles.datails}>
            <TextInput value={kcal} onChangeText={setKcal} placeholder="kcal" style={[styles.input, {flex: 1}]} keyboardType='numeric'/>
            <TextInput value={name} onChangeText={setName} placeholder="name" style={[styles.input, {flex: 1}]}/>
          </View>
        </View>
      </View>

      <MultiLineInput label="Description" placeholder="enter with your description" setValue={setName} value={name} />
      <MultiLineInput label="Method of preparation" placeholder="enter with your method of preparation" setValue={setName} value={name} />

      <View style={styles.ingredients}>
        <Text style={styles.label}>Ingredients</Text>
        <CustomButton onPress={() => {}} text="+" type="white" style={styles.addIngredients}/>

      </View>
      <CustomButton onPress={() => {}} text="SAVE" type="purple" style={styles.save}/>

    </LinearGradient>
  );
}

export default NewRecipeScreen;