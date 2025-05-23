import React, { createContext, useContext, useEffect } from 'react';
import { Platform } from 'react-native';
import Purchases, { LOG_LEVEL, PurchasesPackage, CustomerInfo } from 'react-native-purchases';


export const API_KEYS = {
  ios: "key_ios",
  android: '',
};

interface PaymentContextProps {
  payment: (pack: PurchasesPackage) => Promise<void>;
  restorePayments: () => Promise<void>;
  fetchOffers: () => Promise<void>;
  packages: PurchasesPackage[];
  user: CustomerInfo | null;
  isLoading: boolean;
  updateCustomerInfo: (customerInfo: CustomerInfo) => void;
  setUser: React.Dispatch<React.SetStateAction<CustomerInfo | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;  
}

const PaymentContext = createContext<PaymentContextProps>({} as PaymentContextProps);


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


      Purchases.addCustomerInfoUpdateListener(async (customerInfo) => {
        console.log('Customer info updated:', customerInfo);
        updateCustomerInfo(customerInfo);
      });

       await fetchOffers();

    }
    // carregar ofertas
    init();
  }, [])


  const payment = async (pack: PurchasesPackage) => {
    try {
      await Purchases.purchasePackage(pack);
      console.log('Compra realizada com sucesso', pack);

    } catch (error: any) {
      if (error.userCancelled) {
        console.log('Compra cancelada pelo usuário');
      } else {
        console.error('Erro ao realizar a compra:', error);
      }
    }
  }

  const restorePayments = async () => {
    const customerInfo = await Purchases.restorePurchases();
    console.log('Restaurando compras', customerInfo);

  }


  const updateCustomerInfo = async (customerInfo: CustomerInfo) => {
    console.log('Customer info updated:', customerInfo?.entitlements);
  }
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



  const values = {
    payment,
    restorePayments,
    fetchOffers,
    packages,
    user,
    isLoading,
    updateCustomerInfo,
    setUser,
    setIsLoading,
  };

  return (
    <PaymentContext.Provider value={values}>
      {children}
    </PaymentContext.Provider>
  );
}

export const usePayment = () => useContext(PaymentContext);
