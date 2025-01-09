import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import { colorBlack, colorPrymary } from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';


export default function RootLayout() {
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
     
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <Tabs screenOptions={{
        headerStyle:{
          backgroundColor: colorScheme === 'dark' ? "black": "white"
        }
        
      }}>
 
        <Tabs.Screen name="index"  />
        <Tabs.Screen name="role"  />
      </Tabs>

    </ThemeProvider>
  );
}
