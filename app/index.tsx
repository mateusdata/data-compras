import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, useColorScheme, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, List, IconButton } from 'react-native-paper';
import { Link, Stack } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TestIds, useInterstitialAd, BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { colorBlack, colorPrymary } from '@/constants/Colors';
import { DarkTheme } from '@react-navigation/native';
import { adUnitId, bannerAdUnitId } from '@/utils/adUnitId';
import MainList from '@/components/MainList';
import { Text, View } from '@/components/Themed';
import Toast from 'react-native-toast-message';

export default function ShoppingListScreen() {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState<string>('');
  const { isLoaded, isClosed, load, show } = useInterstitialAd(adUnitId);

  useEffect(() => {
    loadItems();
    load();
  }, [load]);

  useEffect(() => {
    if (isClosed) {
      load();
    }
  }, [isClosed, load]);

  const loadItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('shoppingItems');
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveItems = async (items: string[]) => {
    try {
      await AsyncStorage.setItem('shoppingItems', JSON.stringify(items));
      if (isLoaded) {
        show();
      } else {
        console.error('Ad is not loaded yet.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addItem = (item: string) => {
    if (item.trim() === "") return;
    if (items.includes(item)) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Este item já está na lista.',
        position: 'top',
        text1Style: { fontSize: 16 },
        text2Style: { fontSize: 14 },
      });
      return;
    }
    const updatedItems = [...items, item];
    setItems(updatedItems);
    setNewItem('');
    saveItems(updatedItems);
  };
  

  const removeItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    saveItems(updatedItems);
  };

  const colorScheme = useColorScheme();
  return (
    <>

     
    
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerTitle: 'Data Compras',
            headerRight: () => (
              <Link href="/role" asChild>
                <Pressable style={{ padding: 10 }}>
                  {({ pressed }) => (
                    <FontAwesome
                      name="calculator"
                      size={20}
                      color={colorScheme === 'dark' ? DarkTheme.colors.text : 'white'}
                      style={{ marginRight: 0, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />

        <TextInput
          label={colorScheme === 'dark' ? '' : 'Adicionar item'}
          placeholder='Adicionar item'
          value={newItem}
          outlineColor={colorScheme === 'dark' ? colorBlack : colorPrymary}
          contentStyle={colorScheme === 'dark' ? { backgroundColor: colorBlack, color: "white" } : {}}

          mode="outlined"
          onChangeText={setNewItem}
          onSubmitEditing={() => addItem(newItem)}
          returnKeyType="done"
          activeOutlineColor={colorPrymary}
        />
         <Toast bottomOffset={150} />

        <FlatList
          data={items}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={<MainList onAddItem={addItem} />}
          renderItem={({ item, index }) => (
            <List.Item
              title={item}
              titleStyle={colorScheme === 'dark' ? { color: 'white' } : {}}
              contentStyle={colorScheme === 'dark' ? { backgroundColor: '#1A1A1A' } : {}}
              right={() => (
                <IconButton
                  icon="delete"
                  iconColor={"#FF7F7F"}
                  onPress={() => removeItem(index)}
                />
              )}
              style={styles.listItem}
            />
          )}
          contentContainerStyle={styles.listContainer}
        />
      </View>

      <BannerAd
        unitId={bannerAdUnitId}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 80,
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
