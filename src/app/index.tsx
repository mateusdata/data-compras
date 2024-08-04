import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign';
import { colorPrimary } from "../../constants/constants";

// Define a type for the items
interface Item {
  id: string;
  name: string;
  selected: boolean;
}

export default function DataCompras() {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<string>('');
  
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

  const toggleSelectItem = (id: string) => {
    setItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      );
      saveItems(updatedItems);
      return updatedItems;
    });
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
    }
  };

  const removeItem = (id: string) => {
    Alert.alert(
      "Remover Item",
      "Tem certeza de que deseja remover este item?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          onPress: () => {
            const updatedItems = items.filter(item => item.id !== id);
            setItems(updatedItems);
            saveItems(updatedItems);
          }
        }
      ]
    );
  };

  const renderItem = ({ item }: { item: Item }) => (
    <View style={[styles.item, item.selected ? styles.itemSelected : styles.itemUnselected]}>

      <Text style={[styles.itemText, item.selected && styles.itemTextSelected]}>
        {item.name}
      </Text>
      <View style={styles.itemActions}>
        {item.selected && (
          <AntDesign name="checkcircle" size={24} color="#28a745" style={styles.icon} />
        )}
        <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeButton}>
          <AntDesign name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

 
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Lista de Compras</Text>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newItem}
            onChangeText={setNewItem}
            placeholder="Adicionar item"
          />
          <TouchableOpacity style={styles.button} onPress={addItem}>
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
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
  },
  main: {
    flex: 1,
    width: '100%',
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
  },
  item: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemSelected: {
    backgroundColor: colorPrimary,
  },
  itemUnselected: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: colorPrimary,
  },
  itemText: {
    fontSize: 18,
    flex: 1,
  },
  itemTextSelected: {
    color: "#ffffff",
  },
  icon: {
    marginLeft: 10,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeButton: {
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  input: {
    flex: 1,
    borderColor: colorPrimary,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
    fontSize: 18,
  },
  button: {
    backgroundColor: colorPrimary,
    borderRadius: 8,
    padding: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  itemImage: {
    width: 50, // Adjust the size as needed
    height: 50,
    marginRight: 10,
  },
});
