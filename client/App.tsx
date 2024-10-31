import Routes from './src/routes/Router';
import { AuthProvider } from './src/context/AuthContext';
import { useFonts } from 'expo-font';
import Notify from './src/components/Notify/Notify';
import { NotifyProvider } from './src/context/NotifyContext';
import { ServerProvider } from './src/context/ServerContext';
import { UtilsProvider } from './src/context/Utils';
import { SocketProvider } from './src/context/SocketContext';

export default function App() {

  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;}

  return (
    <NotifyProvider>
      <AuthProvider>
        <ServerProvider>
          <UtilsProvider>
            <SocketProvider>
              <Routes/>
            </SocketProvider>
            <Notify />
          </UtilsProvider>
        </ServerProvider>
      </AuthProvider>
    </NotifyProvider>
  );
}