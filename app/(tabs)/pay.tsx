import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PayScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Página de Pagamento</Text>
      <Text>Bem-vindo à tela de pagamento!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default PayScreen;