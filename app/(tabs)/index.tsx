import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Button, FlatList, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Compras</Text>
      <TextInput
        style={styles.input}
        placeholder="Adicionar item"
        value={newItem}
        onChangeText={setNewItem}
      />
      <Button title="Adicionar" onPress={addItem} />
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text>{item}</Text>
            <TouchableOpacity onPress={() => removeItem(index)}>
              <Text style={styles.removeButton}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  removeButton: {
    color: 'red',
    fontWeight: 'bold',
  },
});
