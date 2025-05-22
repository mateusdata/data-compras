import React, { useEffect, useState } from 'react';
import { StyleSheet, View as RNView, useColorScheme } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import {
  RewardedInterstitialAd,
  RewardedAdEventType,
  AdEventType,
} from 'react-native-google-mobile-ads';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View } from '@/components/Themed';
import { rewardedInterstitialAdUnitId } from '@/utils/adUnitId';
import { colorPrymary } from '@/constants/Colors';

interface PremiumProps {}

const adUnitId = rewardedInterstitialAdUnitId;
const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(adUnitId, {
  keywords: ['fashion', 'clothing'],
});

const Premium: React.FC<PremiumProps> = () => {
  const [state, setState] = useState<{ loaded: boolean; money: number }>({ loaded: false, money: 0 });
  const colorScheme = useColorScheme();

  const saveMoney = async (amount: number) => {
    const storedMoney = Number(await AsyncStorage.getItem('money') ?? '0');
    const newMoney = storedMoney + amount;
    await AsyncStorage.setItem('money', JSON.stringify(newMoney));
    setState((prev) => ({ ...prev, money: newMoney }));
  };

  useEffect(() => {
    const fetchMoney = async () => {
      const storedMoney = await AsyncStorage.getItem('money');
      if (storedMoney) setState((prev) => ({ ...prev, money: Number(storedMoney) }));
    };
    fetchMoney();

    const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        console.log('Carregando anúncio');
        setState((prev) => ({ ...prev, loaded: true }));
      }
    );
    const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => saveMoney(reward.amount)
    );
    const unsubscribeClosed = rewardedInterstitial.addAdEventListener(AdEventType.CLOSED, () => {
      setState((prev) => ({ ...prev, loaded: false }));
      rewardedInterstitial.load();
    });

    rewardedInterstitial.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
      unsubscribeClosed();
    };
  }, []);

  const showRewardedInterstitial = () => {
    if (state.loaded) rewardedInterstitial.show();
  };

  return (
    <View style={styles.container}>
      <RNView style={[styles.card, { 
        shadowColor: colorScheme === 'dark' ? '#fff' : '#000',
        borderColor: colorScheme === 'dark' ? '#333' : '#ddd',
      }]}>
        <Text style={[styles.title, { 
          color: colorScheme === 'dark' ? '#fff' : '#000' 
        }]}>Acumule pontos para recompensas futuras</Text>
        <Text style={[styles.subtitle, { 
          color: colorScheme === 'dark' ? '#fff' : '#000' 
        }]}>{`Meus pontos: ${state.money},00`}</Text>
        {state.loaded ? (
          <Button
            mode="contained"
            buttonColor={colorPrymary}
            textColor="white"
            onPress={showRewardedInterstitial}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Assistir Anúncio
          </Button>
        ) : (
          <RNView style={styles.loadingContainer}>
            <ActivityIndicator animating={true} size={24} color={colorPrymary} />
            <Text style={[styles.loadingText, { 
              color: colorScheme === 'dark' ? '#ccc' : '#666' 
            }]}>Carregando Anúncio...</Text>
          </RNView>
        )}
      </RNView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    width: '90%',
    borderWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    borderRadius: 8,
    width: '70%',
    marginVertical: 12,
  },
  buttonContent: {
    height: 48,
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 12,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 8,
  },
});

export default Premium;