import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { ContextProvide } from "./src/context/context";
import { View } from "react-native";
import Screen from "./src/screen/screen";


export default function App() {
  return (
    <View style={{ flex: 1}}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <ContextProvide>
          <Screen />
        </ContextProvide>
      </NavigationContainer>
    </View>
  );
}
