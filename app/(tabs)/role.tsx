import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Dimensions, useColorScheme, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { Text, View } from '@/components/Themed';
import { Stack } from 'expo-router';
import { useInterstitialAd } from 'react-native-google-mobile-ads';
import { adUnitId } from '@/utils/adUnitId';
import { colorPrymary } from '@/constants/Colors';

interface RuleOfThreeProps {}

const RuleOfThree: React.FC<RuleOfThreeProps> = () => {
  const [inputs, setInputs] = useState({ a: '', b: '', c: '', result: 'X' });
  const [error, setError] = useState('');
  const colorScheme = useColorScheme();
  const { isLoaded, isClosed, load, show } = useInterstitialAd(adUnitId);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (isClosed) load();
  }, [isClosed, load]);

  const calculate = () => {
    const { a, b, c } = inputs;
    if (!a || !b || !c) {
      setInputs({ ...inputs, result: 'X' });
      setError('');
      return;
    }

    const numA = parseFloat(a);
    const numB = parseFloat(b);
    const numC = parseFloat(c);

    if (isNaN(numA) || isNaN(numB) || isNaN(numC)) {
      setError('Insira apenas números válidos');
      setInputs({ ...inputs, result: 'X' });
      return;
    }

    if (numA === 0) {
      setError('O valor de A não pode ser zero');
      setInputs({ ...inputs, result: 'X' });
      return;
    }

    setInputs({ ...inputs, result: ((numB * numC) / numA).toFixed(2) });
    setError('');
  };

  useEffect(() => {
    calculate();
  }, [inputs.a, inputs.b, inputs.c]);

  const clearInputs = () => {
    setInputs({ a: '', b: '', c: '', result: 'X' });
    setError('');
    if (isLoaded) show();
    else {
      console.error('Ad not loaded');
      load();
    }
  };

  const handleInputChange = (key: keyof typeof inputs, value: string) => {
    setInputs({ ...inputs, [key]: value });
  };

  return (
    <ScrollView style={styles.container}>
     
      <View style={styles.body}>
        <Text style={styles.subtitle}>Opções</Text>
        <View style={styles.row}>
          <TextInput
            contentStyle={{
              backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
              color: colorScheme === 'dark' ? 'white' : 'black',
            }}
            activeOutlineColor={colorPrymary}
            placeholder="A"
            keyboardType="numeric"
            style={styles.input}
            onChangeText={(text) => handleInputChange('a', text)}
            value={inputs.a}
            mode="outlined"
          />
          <AntDesign name="arrowright" size={30} color="orange" style={styles.icon} />
          <TextInput
            contentStyle={{
              backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
              color: colorScheme === 'dark' ? 'white' : 'black',
            }}
            activeOutlineColor={colorPrymary}
            placeholder="B"
            keyboardType="numeric"
            style={styles.input}
            onChangeText={(text) => handleInputChange('b', text)}
            value={inputs.b}
            mode="outlined"
          />
        </View>
        <Text style={styles.label}>ASSIM COMO</Text>
        <View style={styles.row}>
          <TextInput
            contentStyle={{
              backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
              color: colorScheme === 'dark' ? 'white' : 'black',
            }}
            activeOutlineColor={colorPrymary}
            placeholder="C"
            keyboardType="numeric"
            style={styles.input}
            onChangeText={(text) => handleInputChange('c', text)}
            value={inputs.c}
            mode="outlined"
          />
          <AntDesign name="arrowright" size={30} color="orange" style={styles.icon} />
          <TextInput
            contentStyle={{
              backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
              color: colorScheme === 'dark' ? 'white' : 'black',
            }}
            activeOutlineColor={colorPrymary}
            placeholder="Resultado"
            keyboardType="numeric"
            style={styles.result}
            value={inputs.result}
            mode="outlined"
            outlineColor={inputs.result !== 'X' && inputs.a && inputs.b && inputs.c && !error ? 'green' : undefined}
            editable={false}
          />
        </View>
        {(inputs.a || inputs.b || inputs.c) && (
          <Pressable onPress={clearInputs} style={styles.button}>
            <Text style={styles.buttonText}>Limpar</Text>
          </Pressable>
        )}
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
      <Stack.Screen
        options={{
          headerTitle: 'Regra de Três Simples',
          headerTitleAlign: 'center',
        }}
      />
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 30,
    textAlign: 'left',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: "trasnparent",
  },
  subtitle: {
    fontSize: 24,
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    padding: 5,
    width: width * 0.3,
    height: 50,
    fontSize: 30,
    textAlign: 'center',
  },
  result: {
    padding: 5,
    width: width * 0.3,
    height: 50,
    fontSize: 30,
    textAlign: 'center',
    color: 'orange',
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
    backgroundColor: '#66b2ff',
    borderRadius: 8,
    width: 150,
    height: 50,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  errorText: {
    color: 'red',
  },
});

export default RuleOfThree;