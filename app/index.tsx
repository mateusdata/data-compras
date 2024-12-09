import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, KeyboardAvoidingView, Platform, Button, useColorScheme, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View } from '@/components/Themed';
import { TextInput, List, IconButton } from 'react-native-paper';
import { colorPrymary } from '@/constants/Colors';
import { Link, Stack } from 'expo-router';
import { DarkTheme } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ShoppingListScreen() {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState<string>('');

  useEffect(() => {
    loadItems();
  }, []);

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
    } catch (error) {
      console.error(error);
    }
  };

  const addItem = () => {
    if (newItem.trim() === "") return;
    const updatedItems = [...items, newItem];
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
    <View
      style={styles.container}

    >

      <Stack.Screen
        options={{
         headerTitle: 'Home',
          headerRight: () => (
            <Link href="/role" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={colorScheme === 'dark' ? DarkTheme.colors.text : 'white'}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Text style={styles.title}>Data Compras</Text>
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <List.Item
            title={item}
            right={() => (
              <IconButton
                icon="delete"
                iconColor="red"
                onPress={() => removeItem(index)}
              />
            )}
            style={styles.listItem}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
      <TextInput
        label="Adicionar item"
        value={newItem}
        mode='outlined'
        onChangeText={setNewItem}
        onSubmitEditing={addItem}
        returnKeyType="done"
        activeOutlineColor={colorPrymary}
      />
    </View>
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
    paddingBottom: 80, // Add padding to avoid overlap with the input
  },
  input: {
    position: 'absolute',
    bottom: 10,
    left: '5%',
    right: '5%',
    backgroundColor: 'white', // Required for TextInput from react-native-paper
    borderRadius: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
