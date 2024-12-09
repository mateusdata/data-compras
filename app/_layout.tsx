import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import { colorPrymary } from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';



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

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
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
          backgroundColor: colorScheme === 'dark' ? "#191c1b" : colorPrymary,
        },
        headerTintColor: colorScheme === 'dark' ? DarkTheme.colors.text : "white",
      }}>
        <Stack.Screen name="index"  />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        <Stack.Screen name="role" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
