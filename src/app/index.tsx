import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define a type for the items
interface Item {
  id: string;
  name: string;
  selected: boolean;
}

export default function DataCompras() {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<string>('');
  const inputRef = useRef<any>(null); // Reference for the TextInput

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('items');
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error('Failed to load items from AsyncStorage:', error);
    }
  };

  const saveItems = async (items: Item[]) => {
    try {
      await AsyncStorage.setItem('items', JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save items to AsyncStorage:', error);
    }
  };

  const addItem = () => {
    if (newItem.trim() !== '') {
      const newItemObj = {
        id: (items.length + 1).toString(),
        name: newItem,
        selected: false
      };
      const updatedItems = [...items, newItemObj];
      setItems(updatedItems);
      saveItems(updatedItems);
      setNewItem('');
      inputRef.current?.blur(); // Remove focus from the TextInput
    } else {
      // Show error message directly
      alert("O item não pode estar vazio.");
    }
  };

  const removeItem = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    saveItems(updatedItems);
  };

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Button
        mode="contained"
        onPress={() => removeItem(item.id)}
        style={styles.removeButton}
      >
        Remover
      </Button>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Compras</Text>
      <FlatList
        data={items}
        style={{width:"100%"}}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef} // Attach the ref to the TextInput
          mode="outlined"
          label="Adicionar item"
          value={newItem}
          onChangeText={setNewItem}
          style={styles.input}
        />
        <Button
          mode="contained"
          onPress={addItem}
          style={styles.addButton}
        >
          Adicionar
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f4f4f4",
    width: '100%',

  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  list: {
    flexGrow: 1,
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    width: '100%',
  },
  itemText: {
    fontSize: 18,
    marginBottom: 8,
  },
  removeButton: {
    width: '100%',
    borderRadius: 5,
    padding: 5,
    marginTop: 15,
    backgroundColor:"red",
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 16,
    width: '100%',
  },
  input: {
    width: '100%',
    marginBottom: 8,
  },
  addButton: {
    width: '100%',
    borderRadius: 5,
    padding: 5,
    marginTop: 15,
  },
});
