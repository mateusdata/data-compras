import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import 'react-native-reanimated';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useColorScheme } from '@/components/useColorScheme';
import { StatusBar } from 'expo-status-bar';
import { colorPrymary } from '@/constants/Colors';


export default function RootLayout() {
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      <Tabs screenOptions={{
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? "black" : "white"
        },
        tabBarStyle: {
          height: 70
        },
        tabBarIconStyle: {
          marginTop: 10,
        },
        tabBarShowLabel: false,
        tabBarInactiveTintColor:"gray"
      }}>

        <Tabs.Screen name="index" options={{
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome
              name='home'
              color={focused ? colorPrymary : undefined}
              size={28}
            />
          )
        }} />
        <Tabs.Screen name="role"
          options={{
            tabBarIcon: ({ focused, color }) => (
              <FontAwesome
                name='calculator'
                color={focused ? colorPrymary : undefined}

                size={28}
              />
            )
          }}
        />

        <Tabs.Screen name="premium"
          options={{
            tabBarIcon: ({ focused, color }) => (
              <FontAwesome
                name='money'
                color={focused ? colorPrymary : undefined}
                size={28}
              />
            ),
            headerTitle:"Ganhe money"
          }}
        />
      </Tabs>

    </ThemeProvider>
  );
}
