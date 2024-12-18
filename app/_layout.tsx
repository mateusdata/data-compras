import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import { colorBlack, colorPrymary } from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import Splash from '@/components/SplashScreen';
import Toast from 'react-native-toast-message';



export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  const [appIsReady, setAppIsReady] = useState(false);



  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {

    async function prepare() {
      try {

        await new Promise(resolve => setTimeout(resolve, 1500));
        if (loaded) {
          SplashScreen.hideAsync();
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, [loaded]);

  if (!appIsReady || !loaded) {
    return <Splash />;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      
     
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'light'} />
      <Stack screenOptions={{
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? colorBlack : colorPrymary,
        },
        headerTintColor: colorScheme === 'dark' ? DarkTheme.colors.text : "white",
      }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        <Stack.Screen name="role" options={{ presentation: 'modal' }} />
      </Stack>

      
    </ThemeProvider>
  );
}
