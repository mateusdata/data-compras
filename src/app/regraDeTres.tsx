import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function RegraDeTres() {
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [c, setC] = useState('');
    const [d, setD] = useState('');

    useEffect(() => {
        if (a && b && c) {
            // Calcula D com base na fórmula da regra de três
            const result = (parseFloat(b) * parseFloat(c)) / parseFloat(a);
            setD(result.toString());
        } else {
            setD('');
        }
    }, [a, b, c]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Calculadora de Regra de Três</Text>
            <View style={styles.row}>
                <TextInput
                    style={styles.input}
                    placeholder="Valor de A"
                    keyboardType="numeric"
                    value={a}
                    onChangeText={setA}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Valor de B"
                    keyboardType="numeric"
                    value={b}
                    onChangeText={setB}
                />
            </View>
            <View style={styles.row}>
                <TextInput
                    style={styles.input}
                    placeholder="Valor de C"
                    keyboardType="numeric"
                    value={c}
                    onChangeText={setC}
                />
                <TextInput
                    style={[styles.input, styles.result]}
                    placeholder="Resultado (D)"
                    value={d}
                    editable={false}
                />
            </View>

            <View style={styles.exampleContainer}>
                <Text style={styles.helpText}>
                    Exemplo:
                </Text>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>{`${a ? a + " Kilos de arroz": "Exemplo de (A)" }`} </Text>
                        <Text style={styles.tableCell}>{`${a && b ? " custa R" + b + " Reais": "Exemplo de (B)" }`}</Text>
                    </View>

                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>{`${a && b && c ? "Então "+  c + " Kilos de arroz": "Exemplo de (C)" }`} </Text>
                        <Text style={styles.tableCellCheck}>{`${d ? "custa " +d + " Reais": "Resultado (D)"}`}</Text>
                    </View>
                    
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      padding: 20,
      paddingTop:50,
      backgroundColor: 'white',
  },
  title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
  },
  row: {
      flexDirection: 'row',
      width: '100%',
      marginBottom: 10,
  },
  input: {
      height: 40,
      borderColor: '#ddd',
      borderWidth: 1,
      marginHorizontal: 5,
      paddingHorizontal: 10,
      width: '50%',
  },
  result: {
      backgroundColor: 'white',
      color:"green"
  },
  exampleContainer: {
      marginTop: 20,
      width: '100%',
      paddingHorizontal: 0,
      top:20
  },
  helpText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
  },
  table: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      overflow: 'hidden',
  },
  tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      padding: 10,
      justifyContent: 'space-between',
  },
  tableCell: {
      fontSize: 16,
      flex: 1,
  },
  tableCellCheck:{
    fontSize: 16,
    flex: 1,
    color:"green"
  }
});