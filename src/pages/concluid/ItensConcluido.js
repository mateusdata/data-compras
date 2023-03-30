import React, { useContext } from "react";
import { Text, View } from "react-native";
import { Context } from "../../context/context";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ItensConcluido = ({ navigation }) => {
  const { completedItems, setCompletedItems } = useContext(Context);
  const removeItens = (item) => {
    const newArray = completedItems?.filter((i) => i !== item); //so Deus sabe oque ta acontecendo aqui

    setCompletedItems(newArray);
    AsyncStorage.setItem("concluidos", JSON.stringify(newArray));
    console.log(item);
  };
  return (
    <View>
      {completedItems?.map((item) => (
        <Pressable
          key={item}
          onPress={() => removeItens(item)}
          style={{
            backgroundColor: "#F2F2F2",
            borderWidth: 0.5,
            borderColor: "#078e34",
            alignItems: "center",
            width: 355,
            height: 60,
            flexDirection: "row",
            padding: 10,
            borderRadius: 10,
            marginBottom: 5,
          }}
        >
          <Ionicons name="checkbox" size={28} color="#0078BD" />
          <Text
            style={{
              color: "white",
              fontWeight: 500,
              color: "black",
              marginLeft: 5,
            }}
          >
            {item}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};
export default ItensConcluido;
