import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface HandleItensProps {
  itens: string[];
  setItens: React.Dispatch<React.SetStateAction<string[]>>;
}

const HandleItens: React.FC<HandleItensProps> = ({ itens, setItens }) => {
  const removeItem = (item: string) => {
    const newArray = itens.filter((i) => i !== item);
    setItens(newArray);
  };

  return (
    <View>
      {itens.map((item) => (
        <Pressable
          key={item}
          onPress={() => removeItem(item)}
          style={styles.item}
        >
          <Text style={styles.text}>{item}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default HandleItens;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#E8EAE9",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
  },
});
