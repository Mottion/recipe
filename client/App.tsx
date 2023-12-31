import Routes from './src/routes/Router';
import { AuthProvider } from './src/context/AuthContext';
import { useFonts } from 'expo-font';
import Notify from './src/components/Notify/Notify';
import { NotifyContextProvider } from './src/context/NotifyContext';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) {return null;}

  return (
    <NotifyContextProvider>
      <AuthProvider>
        <Routes/>
        <Notify />
      </AuthProvider>
    </NotifyContextProvider>
  );
}
