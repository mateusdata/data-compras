import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, Text, View, ScrollView } from 'react-native';

export default function RuleOfThreeCalculator() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [result, setResult] = useState<string | number | null>(null);

  const calculate = () => {
    if (a && b && c) {
      const x = (parseFloat(b) * parseFloat(c)) / parseFloat(a);
      setResult(x);
    } else {
      setResult('Por favor, preencha todos os campos.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Calculadora de Regra de Três Simples</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>A</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={a}
          onChangeText={setA}
          placeholder="Valor de A"
        />
      </View>
      <Text style={styles.equalsText}>ESTÁ PARA</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>B</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={b}
          onChangeText={setB}
          placeholder="Valor de B"
        />
      </View>
      <Text style={styles.equalsText}>ASSIM COMO</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>C</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={c}
          onChangeText={setC}
          placeholder="Valor de C"
        />
      </View>
      <Button title="Calcular" onPress={calculate} />
      {result !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Resultado: {result}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    width: '80%',
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 4,
  },
  equalsText: {
    fontSize: 18,
    marginVertical: 8,
    textAlign: 'center',
  },
  resultContainer: {
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
