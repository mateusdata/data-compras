import {  DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import 'react-native-reanimated';
//import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useColorScheme } from '@/components/useColorScheme';
import { StatusBar } from 'expo-status-bar';
import CustomBottomNavigation from '@/components/CustomBottomNavigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function RootLayout() {
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      <Tabs key={1} tabBar={(props) => <CustomBottomNavigation {...props} />} >

        <Tabs.Screen name="index" options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ focused, color, size }) => (
        <Icon
          name='home'
          size={size}
        />
          )
        }} />
        <Tabs.Screen name="role" options={{
          tabBarLabel: 'Calculadora',
          tabBarIcon: ({ focused, color, size }) => (
        <Icon
          name='calculator'
          size={size}
        />
          )
        }} />
        <Tabs.Screen name="premium" options={{
          tabBarLabel: 'Crédito',
          tabBarIcon: ({ focused, color, size }) => (
        <Icon
          name='cash'
          size={size}
        />
          ),
          headerTitle: "Ganhe crédito"
        }} />
      </Tabs>

    </ThemeProvider>
  );
}

