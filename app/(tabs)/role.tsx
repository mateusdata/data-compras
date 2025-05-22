import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Dimensions, useColorScheme, Pressable } from "react-native";
import { TextInput } from "react-native-paper";
import { AntDesign } from '@expo/vector-icons';
import { Text, View } from "@/components/Themed";
import {  Stack } from "expo-router";
import { useInterstitialAd } from "react-native-google-mobile-ads";
import { adUnitId } from "@/utils/adUnitId";
import { colorPrymary } from "@/constants/Colors";

const RuleOfThree: React.FC = () => {
  const [x, setX] = useState<string>("X");
  const [a, setA] = useState<string>("");
  const [b, setB] = useState<string>("");
  const [c, setC] = useState<string>("");
  const [erro, setErro] = useState<boolean>(false);
  const colorScheme = useColorScheme();
  const { isLoaded, isClosed, load, show } = useInterstitialAd(adUnitId);

  useEffect(() => {
    load(); // Load the ad when the component mounts
  }, [load]);

  useEffect(() => {
    if (isClosed) {
      load(); // Reload the ad when it is closed
    }
  }, [isClosed, load]);

  const limparInputs = () => {
    setX("X");
    setA("");
    setB("");
    setC("");
    setErro(false);
    if (isLoaded) {
      show();
    } else {
      console.error('Ad is not loaded yet.');
      load(); // Attempt to reload the ad if it's not loaded
    }
  };

  const regraTres = () => {
    const resultado = (parseFloat(b) / parseFloat(a)) * parseFloat(c);
    if (!isNaN(resultado)) {
      setX(resultado.toFixed(2));
      setErro(false);
    } else {
      setErro(true);
      setX("X");
    }
  };

  useEffect(() => {
    if (a && b && c) regraTres();
  }, [a, b, c]);

  return (

    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Calculadora de Regra de Três Simples</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.subtitle}>Opções</Text>
        <View style={styles.row}>
          <TextInput
            contentStyle={{ backgroundColor: colorScheme === "dark" ? "black" : "white", color: colorScheme === "dark" ? "white" : "black" }}
            activeOutlineColor={colorPrymary}
            placeholder="A"
            keyboardType="numeric"
            style={styles.input}
            onChangeText={setA}
            value={a}
            mode="outlined"
          />
          <AntDesign name="arrowright" size={30} color="orange" style={styles.icon} />
          <TextInput
            contentStyle={{ backgroundColor: colorScheme === "dark" ? "black" : "white", color: colorScheme === "dark" ? "white" : "black" }}
            activeOutlineColor={colorPrymary}
            placeholder="B"
            keyboardType="numeric"
            style={styles.input}
            onChangeText={setB}
            value={b}
            mode="outlined"
          />
        </View>
        <Text style={styles.label}>ASSIM COMO</Text>
        <View style={styles.row}>
          <TextInput
            contentStyle={{ backgroundColor: colorScheme === "dark" ? "black" : "white", color: colorScheme === "dark" ? "white" : "black" }}
            activeOutlineColor={colorPrymary}
            placeholder="C"
            keyboardType="numeric"
            style={styles.input}
            onChangeText={setC}
            value={c}
            mode="outlined"
          />
          <AntDesign name="arrowright" size={30} color="orange" style={styles.icon} />
          <TextInput
            contentStyle={{ backgroundColor: colorScheme === "dark" ? "black" : "white", color: colorScheme === "dark" ? "white" : "black" }}
            activeOutlineColor={colorPrymary}
            placeholder="Resultado"
            keyboardType="numeric"
            style={styles.result}
            value={x}
            mode="outlined"
            outlineColor={x !== "X" && a && b && c ? "green" : undefined}
            editable={false}
          />
        </View>
        {c && (
          <Pressable onPress={limparInputs} style={styles.button}>
            <Text style={styles.buttonText}>Limpar</Text>
          </Pressable>
        )}
        {erro && <Text style={styles.errorText}>Erro! Informe apenas números</Text>}
      </View>
      <Stack.Screen
        options={{
          headerTitle: 'Regra de Três Simples',
          headerTitleAlign: "center"
        }}
      />
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flex: 1,
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 30,
    textAlign: "left",

  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,

  },
  subtitle: {
    fontSize: 24,
    marginBottom: 30,

  },
  row: {
    flexDirection: "row",
    alignItems: "center",

  },
  input: {
    padding: 5,
    width: width * 0.3,
    height: 50,
    fontSize: 30,
    textAlign: "center",
  },
  result: {
    padding: 5,
    width: width * 0.3,
    height: 50,
    fontSize: 30,
    textAlign: "center",
    color: "orange",
  },
  icon: {
    marginTop: 10,
    padding: 5,
  },
  label: {
    fontSize: 20,
  },
  button: {
    marginBottom: 50,
    backgroundColor: "#66b2ff",
    borderRadius: 8,
    width: 150,
    height: 50,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  errorText: {
    color: "red",
  },
});

export default RuleOfThree;
