import { usePayment } from '@/contexts/PaymentProvider';
import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';

const PayScreen = () => {

  const { payment, packages } = usePayment();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Página de Pagamento</Text>
      <Text>Bem-vindo à tela de pagamento!</Text>

      <ScrollView>
        <Text>{JSON.stringify(packages, null, 2)}</Text>
        {packages.map((pack, index) => (
          <View key={index} style={{ margin: 10 }}>
            <Text>{pack?.product?.title}</Text>
            <Text>{pack?.product?.description}</Text>
            <Text>{pack?.product?.priceString}</Text>
            <Button
              title="Comprar"
              onPress={() => payment(pack)}
            />
          </View>
        ))}
      </ScrollView>
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