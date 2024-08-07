import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, IconButton, Button } from 'react-native-paper';
import { colorPrimary } from '../../constants/constants';

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

    function resetValues() {
        setA("");
        setB("");
        setC("");
        setD("");
        Alert.alert("Campos limpos", "Os item foram removidos")
    }

    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <Text style={styles.title}>Calculadora de Regra de Três</Text>
                <View style={styles.row}>
                    <TextInput
                        mode="outlined"
                        label="Valor de A"
                        keyboardType="numeric"
                        value={a}
                        onChangeText={setA}
                        style={styles.input}
                    />
                    <TextInput
                        mode="outlined"
                        label="Valor de B"
                        keyboardType="numeric"
                        value={b}
                        onChangeText={setB}
                        style={styles.input}
                    />
                </View>
                <View style={styles.row}>
                    <TextInput
                        mode="outlined"
                        label="Valor de C"
                        keyboardType="numeric"
                        value={c}
                        onChangeText={setC}
                        style={styles.input}
                    />
                    <TextInput
                        mode="outlined"
                        label="Resultado (D)"
                        value={Number(d).toFixed(2)}
                        editable={false}
                        style={[styles.input, styles.result]}
                    />
                </View>

                <View style={styles.exampleContainer}>
                    <Text style={styles.helpText}>
                        Exemplo:
                    </Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>{`${a ? a + " Kilos de arroz" : "Exemplo de (A)"}`} </Text>
                            <Text style={styles.tableCell}>{`${a && b ? " custa R" + b + " Reais" : "Exemplo de (B)"}`}</Text>
                        </View>

                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>{`${a && b && c ? "Então " + c + " Kilos de arroz" : "Exemplo de (C)"}`} </Text>
                            <Text style={[styles.tableCellCheck, { color: d && colorPrimary }]}>{`${d ? "custa " + Number(d).toFixed(2) + " Reais" : "Resultado (D)"}`}</Text>
                        </View>
                    </View>
                </View>


            </View>
            <Button
                textColor='white'
                buttonColor={"red"}
                onPress={resetValues}
                style={styles.pressable}>
                Limpar formulario
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 15,
        paddingTop: 50,
        backgroundColor: 'white',
    },
    container2: {
        flex: 1,
        alignItems: 'center',
        padding: 15,
        paddingTop: 50,
        backgroundColor: 'white',
        width:"100%",

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
        flex: 1,
        marginHorizontal: 5,
        fontSize: 18,
    },
    result: {
        backgroundColor: 'white',
        color: "green"
    },
    exampleContainer: {
        marginTop: 20,
        width: '100%',
        paddingHorizontal: 0,
        top: 20
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
    tableCellCheck: {
        fontSize: 16,
        flex: 1,
    },
    pressable: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
});
