import { Text, View } from '@/components/Themed';
import { colorPrymary } from '@/constants/Colors';
import { rewardedInterstitialAdUnitId, rewardedInterstitialAdUnitIdTwo } from '@/utils/adUnitId';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  RewardedInterstitialAd,
  RewardedAdEventType,
  TestIds,
  AdEventType,
} from 'react-native-google-mobile-ads';
import { ActivityIndicator, Button } from 'react-native-paper';

// Ad Unit IDs
const adUnitId1 = rewardedInterstitialAdUnitId;
const adUnitId2 = rewardedInterstitialAdUnitIdTwo;

// Create two independent instances
const rewardedInterstitial1 = RewardedInterstitialAd.createForAdRequest(adUnitId1, {
  keywords: ['fashion', 'clothing'],
});
const rewardedInterstitial2 = RewardedInterstitialAd.createForAdRequest(adUnitId2, {
  keywords: ['tech', 'gadgets'],
});

function Premium() {
  const [loaded1, setLoaded1] = useState(false);
  const [loaded2, setLoaded2] = useState(false);
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


  useFocusEffect(

    React.useCallback(() => {

      const unsubscribeLoaded1 = rewardedInterstitial1.addAdEventListener(
        RewardedAdEventType.LOADED,
        () => {

          console.log("Carregando anúncio 1");
          setLoaded1(true)
        },
      );
      const unsubscribeEarned1 = rewardedInterstitial1.addAdEventListener(
        RewardedAdEventType.EARNED_REWARD,
        reward => saveMoney(reward.amount),
      );
      const unsubscribeClosed1 = rewardedInterstitial1.addAdEventListener(AdEventType.CLOSED, () => {
        setLoaded1(false);
        rewardedInterstitial1.load();
      });
      rewardedInterstitial1.load();

      return () => {
        unsubscribeLoaded1();
        unsubscribeEarned1();
        unsubscribeClosed1();
      };
    }, []),
  );

  // Setup for Ad Instance 2
  useEffect(() => {

    const unsubscribeLoaded2 = rewardedInterstitial2.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {

        console.log("Carregando anúncio 2");
        setLoaded2(true)
      },
    );
    const unsubscribeEarned2 = rewardedInterstitial2.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => saveMoney(reward.amount),
    );
    const unsubscribeClosed2 = rewardedInterstitial2.addAdEventListener(AdEventType.CLOSED, () => {
      setLoaded2(false);
      rewardedInterstitial2.load();
    });
    rewardedInterstitial2.load();

    return () => {
      unsubscribeLoaded2();
      unsubscribeEarned2();
      unsubscribeClosed2();
    };
  }, []);

  const showRewardedInterstitial1 = async () => {
    if (loaded1) rewardedInterstitial1.show();
  };

  const showRewardedInterstitial2 = async () => {
    if (loaded2) rewardedInterstitial2.show();
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { paddingBottom: 18 }]}>Ganhe créditos para recompensas futuras</Text>
      <Text style={styles.title}>{`Meu crédito: ${money},00`}</Text>
      {loaded1 ?

        <Button
          mode='text'
          buttonColor={colorPrymary}
          textColor="white"
          onPress={showRewardedInterstitial1}
          style={styles.button}
        >
          Ganhar crédito do Anúncio 1
        </Button>
        : <View>
          <ActivityIndicator animating={true} size={18} color={colorPrymary} />
          <Text style={styles.title}>Carregando Anúncio 1</Text>
        </View>
      }

      {loaded2 ?
        <Button
          mode='text'
          buttonColor={colorPrymary}
          textColor="white"
          onPress={showRewardedInterstitial2}
          style={styles.button}
        >
          Ganhar crédito do Anúncio 2
        </Button>
        : <View>
          <ActivityIndicator animating={true} size={18} color={colorPrymary} />
          <Text style={styles.title}>Carregando Anúncio 2</Text>
        </View>
      }
    </View>
  );
}

export default Premium;

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
