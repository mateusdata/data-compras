import React, { createContext, useContext, useEffect } from 'react';
import { Platform } from 'react-native';
import Purchases, { LOG_LEVEL, PurchasesPackage, CustomerInfo } from 'react-native-purchases';


export const API_KEYS = {
  ios: null,
  android: '',
};

interface PaymentContextProps {
  // Define aquí las propiedades que quieras compartir en el contexto
}

const PaymentContext = createContext<PaymentContextProps>({});


export default function PaymentProvider({ children }: React.PropsWithChildren) {

  const [user, setUser] = React.useState<CustomerInfo | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [packages, setPackages] = React.useState<PurchasesPackage[]>([]);

  useEffect(() => {

    const init = async () => {
      setIsLoading(true);
      if (Platform.OS === 'ios') {
        Purchases.configure({ apiKey: API_KEYS.ios });
      }
      if (Platform.OS === 'android') {
        Purchases.configure({ apiKey: API_KEYS.android });
      }
      Purchases.setLogLevel(LOG_LEVEL.DEBUG);
      await fetchOffers();

    }
    // carregar ofertas
    init();
  }, [])


  const fetchOffers = async () => {
    try {
      const offerings = await Purchases.getOfferings();
      if (offerings.current) {
        setPackages(offerings.current.availablePackages);
        console.log('Ofertas carregadas:', offerings.current.availablePackages);
      }
    } catch (error) {
      console.error('Error fetching offers:', error);

    }
  }

  return (
    <PaymentContext.Provider value={{}}>

      {children}
    </PaymentContext.Provider>
  );
}

export const usePayment = () => useContext(PaymentContext);
