import React, { useState } from 'react';
import { Text, View } from './Themed';
import { FlatList, Pressable, StyleSheet, useColorScheme } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colorPrymary } from '@/constants/Colors';

interface FormatItem {
  id: number;
  name: string;
}

interface MainListProps {
  onAddItem: (item: string) => void;
}

export default function MainList({ onAddItem }: MainListProps) {
  const colorScheme = useColorScheme();
  const [list, setList] = useState<FormatItem[]>([
    { id: 1, name: 'Arroz' },
    { id: 2, name: 'Feijão' },
    { id: 3, name: 'Macarrão' },
    { id: 4, name: 'Açúcar' },
    { id: 5, name: 'Sal' },
    { id: 6, name: 'Café' },
    { id: 7, name: 'Leite' },
    { id: 8, name: 'Pão' },
    { id: 9, name: 'Manteiga' },
    { id: 10, name: 'Queijo' },
    { id: 11, name: 'Presunto' },
    { id: 12, name: 'Tomate' },
    { id: 13, name: 'Alface' },
    { id: 14, name: 'Cenoura' },
    { id: 15, name: 'Batata' },
    { id: 16, name: 'Cebola' },
  ]);
   

  const renderItem = ({ item }: { item: FormatItem }) => (
    <Pressable
      android_ripple={{ color: colorPrymary }}
      style={[styles.pressable, { backgroundColor: colorScheme === 'dark' ? '#1C1C1C' : '#F5F5F5' }]}
      onPress={() => onAddItem(item.name)}
    >
      <FontAwesome name="plus" color={colorPrymary} size={12} />
      <Text style={styles.text}>{item.name}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Itens mais procurados da lista</Text>
      <FlatList
        contentContainerStyle={{ alignItems: 'flex-end' }}
        numColumns={2}
        data={list}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  pressable: {
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 12,
    width: '45%',
    maxWidth: 200,
    minWidth: 100,
    alignItems: 'center',
    gap: 15,
    flexDirection: 'row',
  },
  text: {
    fontSize: 15,
    textAlign: 'left',
  },
});
