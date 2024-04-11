import { LinearGradient } from "expo-linear-gradient"
import { theme } from "../../globalStyle/globalStyle";
import { styles } from "./styles";
import PageHeader from "../../components/PageHeader";
import InputImage from "../../components/InputImage/InputImage";
import { ImagePickerAsset } from "expo-image-picker";
import { useEffect, useState } from "react";
import { View } from "react-native";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { UserProps } from "../../@types/models/UserProps";
import { useServer } from "../../context/ServerContext";
import { useNavigation } from "@react-navigation/native";

const ProfileConfigScreen: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [user, setUser] = useState<UserProps>();
  const server = useServer();
  const navigation = useNavigation();

  useEffect(() => {
    getMyUser();
  }, []);

  async function getMyUser(){
    const response = await server.getMyUser();
    setUser(response);
    setImage(response.image);
    setName(response.name);
  }

  if(!user) return
  
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
        <CustomInput label="Confirm password" value={passwordConfirm} setValue={setPasswordConfirm} placeholder="Confirm your password" />
      </View>
      <View>
        <CustomButton onPress={() => {}} text="SAVE" type="purple" />
        <CustomButton onPress={() => navigation.navigate("profile")} text="CANCEL" type="white" />
      </View>

    </LinearGradient>
  );
}

export default ProfileConfigScreen;