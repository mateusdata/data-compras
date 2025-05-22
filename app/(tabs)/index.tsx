import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, useColorScheme, View as RNView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, List, IconButton } from 'react-native-paper';
import { Stack } from 'expo-router';
import { useInterstitialAd, BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { colorBlack, colorPrymary } from '@/constants/Colors';
import { adUnitId, bannerAdUnitId } from '@/utils/adUnitId';
import MainList from '@/components/MainList';
import { Text, View } from '@/components/Themed';
import { ToastAndroid } from 'react-native';
import * as Haptics from 'expo-haptics';

interface ShoppingListProps {}

interface State {
  items: string[];
  newItem: string;
  addCount: number;
}

const ShoppingListScreen: React.FC<ShoppingListProps> = () => {
  const [state, setState] = useState<State>({ items: [], newItem: '', addCount: 0 });
  const { isLoaded, isClosed, load, show } = useInterstitialAd(adUnitId);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [storedItems, storedAddCount] = await Promise.all([
          AsyncStorage.getItem('shoppingItems'),
          AsyncStorage.getItem('addCount'),
        ]);
        setState((prev) => ({
          ...prev,
          items: storedItems ? JSON.parse(storedItems) : [],
          addCount: storedAddCount ? Number(storedAddCount) : 0,
        }));
      } catch (error) {
        console.error('Error loading data:', error);
      }
      load();
    };
    loadData();
  }, [load]);

  useEffect(() => {
    if (isClosed) load();
  }, [isClosed, load]);

  const saveItems = async (items: string[]) => {
    try {
      await AsyncStorage.setItem('shoppingItems', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving items:', error);
    }
  };

  const saveAddCount = async (count: number) => {
    try {
      await AsyncStorage.setItem('addCount', JSON.stringify(count));
    } catch (error) {
      console.error('Error saving add count:', error);
    }
  };

  const addItem = (item: string) => {
    if (item.trim() === '') return;
    if (state.items.includes(item)) {
      ToastAndroid.showWithGravity(
        'Este item já está na lista.',
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    const updatedItems = [...state.items, item];
    const newAddCount = state.addCount + 1;

    setState({ items: updatedItems, newItem: '', addCount: newAddCount });
    saveItems(updatedItems);
    saveAddCount(newAddCount);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (newAddCount % 5 === 0 && isLoaded) {
      show();
    } else if (!isLoaded) {
      console.error('Ad is not loaded yet.');
      load();
    }
  };

  const removeItem = (index: number) => {
    const updatedItems = state.items.filter((_, i) => i !== index);
    setState((prev) => ({ ...prev, items: updatedItems }));
    saveItems(updatedItems);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerTitle: 'Data coints' }} />
      <TextInput
        placeholder="Adicionar item"
        value={state.newItem}
        onChangeText={(text) => setState((prev) => ({ ...prev, newItem: text }))}
        onSubmitEditing={() => addItem(state.newItem)}
        contentStyle={{
          backgroundColor: colorScheme === 'dark' ? colorBlack : '#fff',
          color: colorScheme === 'dark' ? '#fff' : '#000',
        }}
        mode="flat"
        returnKeyType="done"
        activeOutlineColor={colorPrymary}
        style={styles.input}
      />
      <FlatList
        data={state.items}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={<MainList onAddItem={addItem} />}
        renderItem={({ item, index }) => (
          <RNView style={[styles.listItem, {
            backgroundColor: colorScheme === 'dark' ? '#1A1A1A' : '#fff',
            borderColor: colorScheme === 'dark' ? '#333' : '#ddd',
            shadowColor: colorScheme === 'dark' ? '#fff' : '#000',
          }]}>
            <List.Item
              title={`${index + 1}. ${item}`}
              titleStyle={[styles.itemTitle, {
                color: colorScheme === 'dark' ? '#fff' : '#000',
              }]}
              right={() => (
                <IconButton
                  icon="delete"
                  iconColor="#FF7F7F"
                  onPress={() => removeItem(index)}
                />
              )}
            />
          </RNView>
        )}
        contentContainerStyle={styles.listContainer}
      />
      {false && (
        <BannerAd
          unitId={bannerAdUnitId}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{ requestNonPersonalizedAdsOnly: true }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 80,
  },
  listItem: {
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ShoppingListScreen;