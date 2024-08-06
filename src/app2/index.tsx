import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { PlatformPay, PlatformPayButton, StripeProvider, usePlatformPay } from '@stripe/stripe-react-native';

const API_URL = 'https://api.fonotherapp.com.br';

const App = () => {
  const { isPlatformPaySupported, confirmPlatformPayPayment } = usePlatformPay();

  React.useEffect(() => {
    (async () => {
      if (!(await isPlatformPaySupported({ googlePay: { testEnv: true } }))) {
       alert('Google Pay is not supported.');
        return;
      }
    })();
  }, [isPlatformPaySupported]);

  const fetchPaymentIntentClientSecret = async () => {
    try {
      const response = await fetch(`${API_URL}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'mateuspele201ssss5@gmail.com',
          priceId: 'price_1Pj8aRP46Puj1sJSvvwHVWZs'
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      return data.client_secret;

    } catch (error) {
      console.error('Error fetching client secret:', error);
      console.log('Error', 'Failed to fetch client secret');
      return null;
    }
  };

  const pay = async () => {
    const clientSecret = await fetchPaymentIntentClientSecret();

    if (clientSecret) {
      const { error } = await confirmPlatformPayPayment(clientSecret, {
        googlePay: {
          testEnv: true,
          merchantName: 'Your Merchant Name',
          merchantCountryCode: 'US',
          currencyCode: 'USD',
          billingAddressConfig: {
            format: PlatformPay.BillingAddressFormat.Full,
            isPhoneNumberRequired: true,
            isRequired: true,
          },
        },
      });

      if (error) {
        console.log('Payment Error', error.message);
      } else {
        console.log('Payment Success', 'The payment was confirmed successfully.');
      }
    }
  };

  return (
    <StripeProvider
      publishableKey="pk_test_51PkZocF3eT0VBesaSkxkDLEKMJuMgzSPXtLh1pWBSe2U8Cv9NiAFbgkem6VoqbaNJpkp3C2sgYBpGMxDkmMp7phS00hK9OiRlo"
    >
      <View style={styles.container}>
        <PlatformPayButton
          type={PlatformPay.ButtonType.Pay}
          onPress={pay}
          style={styles.button}
        />
      </View>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  button: {
    width: '100%',
    height: 80,
    borderWidth:10
  },
});

export default App;
