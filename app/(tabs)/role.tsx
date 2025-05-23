// imports
import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Dimensions, useColorScheme, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { Text, View } from '@/components/Themed';
import { Stack } from 'expo-router';
import { useInterstitialAd } from 'react-native-google-mobile-ads';
import { adUnitId } from '@/utils/adUnitId';
import { colorPrymary } from '@/constants/Colors';
import { usePayment } from '@/contexts/PaymentProvider';

const RuleOfThree = () => {
  const [inputs, setInputs] = useState({ a: '', b: '', c: '', result: 'X' });
  const [error, setError] = useState('');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const { hasPlan } = usePayment();
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
      setInputs((prev) => ({ ...prev, result: 'X' }));
      setError('');
      return;
    }

    const numA = parseFloat(a);
    const numB = parseFloat(b);
    const numC = parseFloat(c);

    if (isNaN(numA) || isNaN(numB) || isNaN(numC)) {
      setError('Insira apenas números válidos');
      setInputs((prev) => ({ ...prev, result: 'X' }));
      return;
    }

    if (numA === 0) {
      setError('O valor de A não pode ser zero');
      setInputs((prev) => ({ ...prev, result: 'X' }));
      return;
    }

    const result = ((numB * numC) / numA).toFixed(2);
    setInputs((prev) => ({ ...prev, result }));
    setError('');
  };

  useEffect(() => {
    calculate();
  }, [inputs.a, inputs.b, inputs.c]);

  const clearInputs = () => {
    setInputs({ a: '', b: '', c: '', result: 'X' });
    setError('');
    if (!hasPlan && isLoaded) show();
    else if (!hasPlan) load();
  };

  const handleChange = (key: keyof typeof inputs, value: string) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? 'transparent' : '#fff' }]}>
      <View style={styles.body}>
        <Text style={[styles.subtitle, { color: isDark ? '#fff' : '#000' }]}>Regra de Três</Text>

        <View style={styles.row}>
          <TextInput
            placeholder="A"
            keyboardType="numeric"
            value={inputs.a}
            onChangeText={(text) => handleChange('a', text)}
            mode="outlined"
            style={styles.input}
            contentStyle={{borderWidth: 0.5 ,  backgroundColor: isDark ? '#1e1e1e' : '#fff' }}
            theme={{ colors: { text: isDark ? '#fff' : '#000' }, roundness: 8 }}
            activeOutlineColor={colorPrymary}
          />
          <AntDesign name="arrowright" size={30} color="orange" style={styles.icon} />
          <TextInput
            placeholder="B"
            keyboardType="numeric"
            value={inputs.b}
            onChangeText={(text) => handleChange('b', text)}
            mode="outlined"
            style={styles.input}
            contentStyle={{borderWidth: 0.5 ,  backgroundColor: isDark ? '#1e1e1e' : '#fff' }}
            theme={{ colors: { text: isDark ? '#fff' : '#000' }, roundness: 8 }}
            activeOutlineColor={colorPrymary}
          />
        </View>

        <Text style={[styles.label, { color: isDark ? '#ccc' : '#333' }]}>ASSIM COMO</Text>

        <View style={styles.row}>
          <TextInput
            placeholder="C"
            keyboardType="numeric"
            value={inputs.c}
            onChangeText={(text) => handleChange('c', text)}
            mode="outlined"
            style={styles.input}
            contentStyle={{borderWidth: 0.5 ,  backgroundColor: isDark ? '#1e1e1e' : '#fff' }}
            theme={{ colors: { text: isDark ? '#fff' : '#000' }, roundness: 8 }}
            activeOutlineColor={colorPrymary}
          />
          <AntDesign name="arrowright" size={30} color="orange" style={styles.icon} />
          <TextInput
            placeholder="Resultado"
            value={inputs.result}
            editable={false}
            mode="outlined"
            style={styles.result}
            contentStyle={{borderWidth: 0.5 ,  backgroundColor: isDark ? '#1e1e1e' : '#fff', color: 'orange'}}
            theme={{ colors: { text: 'orange' }, roundness: 8 }}
            outlineColor={inputs.result !== 'X' && !error ? 'green' : undefined}
          />
        </View>

        {(inputs.a || inputs.b || inputs.c) && (
          <Pressable onPress={clearInputs} style={[styles.button, { backgroundColor: isDark ? '#2980b9' : '#3cb371' }]}>
            <Text style={styles.buttonText}>Limpar</Text>
          </Pressable>
        )}

        {error !== '' && <Text style={styles.errorText}>{error}</Text>}
      </View>

      <Stack.Screen options={{ headerTitle: 'Regra de Três Simples', headerTitleAlign: 'center' }} />
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  body: {
    marginTop: 30,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: width * 0.3,
    height: 50,
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 5,
  },
  result: {
    width: width * 0.3,
    height: 50,
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 5,
  },
  icon: {
    marginHorizontal: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 10,
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    fontSize: 14,
  },
});

export default RuleOfThree;
