import { LinearGradient } from "expo-linear-gradient"
import { theme } from "../../globalStyle/globalStyle";
import { styles } from "./styles";
import PageHeader from "../../components/PageHeader";
import InputImage from "../../components/InputImage/InputImage";
import { ImagePickerAsset } from "expo-image-picker";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";

const ProfileConfigScreen: React.FC = () => {
  const [image, setImage] = useState<ImagePickerAsset | null>(null);
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  
  return (
    <LinearGradient
      colors={[theme.primary, theme.secondary]}
      style={styles.container}
    >
      <View>
        <PageHeader title="PROFILE" type="white" />
        <InputImage image={image} setImage={setImage} />
        <CustomInput label="Name" value={name} setValue={setName} placeholder="Enter with your name" />
        <CustomInput label="Password" value={password} setValue={setPassword} placeholder="Enter with your password" />
        <CustomInput label="Confirm password" value={password} setValue={setPassword} placeholder="Confirm your password" />
      </View>
      <View>
        <CustomButton onPress={() => {}} text="SAVE" type="purple" />
        <CustomButton onPress={() => {}} text="CANCEL" type="white" />
      </View>

    </LinearGradient>
  );
}

export default ProfileConfigScreen;