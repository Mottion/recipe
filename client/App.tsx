import Routes from './src/routes/Router';
import { AuthProvider } from './src/context/AuthContext';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) {return null;}

  return (
    <AuthProvider>
      <Routes/>
    </AuthProvider>
  );
}
