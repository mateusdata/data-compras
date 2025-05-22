import { Text, View } from '@/components/Themed';
import { colorPrymary } from '@/constants/Colors';
import { rewardedInterstitialAdUnitId } from '@/utils/adUnitId';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  RewardedInterstitialAd,
  RewardedAdEventType,
  AdEventType,
} from 'react-native-google-mobile-ads';
import { ActivityIndicator, Button } from 'react-native-paper';

const adUnitId = rewardedInterstitialAdUnitId;

const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(adUnitId, {
  keywords: ['fashion', 'clothing'],
});


export default function Premium() {
  const [loaded, setLoaded] = useState(false);
  const [money, setMoney] = useState<number>(0);

  const saveMoney = async (amount: number) => {
    const storedMoney = (await AsyncStorage.getItem('money')) || '0';
    const newMoney = Number(storedMoney) + amount;
    await AsyncStorage.setItem('money', JSON.stringify(newMoney));
    setMoney(newMoney);
  };

  useEffect(() => {

    const fetchMoney = async () => {
      const storedMoney = await AsyncStorage.getItem('money');
      if (storedMoney) setMoney(Number(storedMoney));
    };
    fetchMoney();

  }, []);

  useEffect(() => {

    const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        console.log("Carregando anúncio");
        setLoaded(true);
      }
    );
    const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => saveMoney(reward.amount)
    );
    const unsubscribeClosed = rewardedInterstitial.addAdEventListener(AdEventType.CLOSED, () => {
      setLoaded(false);
      rewardedInterstitial.load();
    });
    rewardedInterstitial.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
      unsubscribeClosed();
    };

  }, [])

  const showRewardedInterstitial = async () => {
    if (loaded) rewardedInterstitial.show();
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { paddingBottom: 18 }]}>Ganhe estrelass para recompensas futuras</Text>
      <Text style={styles.title}>{`Meu estrelas: ${money},00`}</Text>
      {loaded ? (
        <Button
          mode='text'
          buttonColor={colorPrymary}
          textColor="white"
          onPress={showRewardedInterstitial}
          style={styles.button}
        >
          Ganhar estrelas
        </Button>
      ) : (
        <View>
          <ActivityIndicator animating={true} size={18} color={colorPrymary} />
          <Text style={styles.title}>Carregando Anúncio</Text>
        </View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    width: '60%',
    borderRadius: 8,
    marginVertical: 10,
  },
});
