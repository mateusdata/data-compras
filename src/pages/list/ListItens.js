import React, { useContext, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Context } from "../../context/context";
import HandleItens from "../../components/item/HandleItens";

const ListItens = ({ navigation }) => {
  const [addItens, setAddItens] = useState("");
  const {
    itenSelected,
    setItenSelected,
    setOpen,
    openInput,
    setOpenInput,
    loading,
  } = useContext(Context);

  const openAdd = () => {
    setOpenInput(false);
  };
  const closeIput = () => {
    setOpenInput(true);
  };
  const sendItens = () => {
    if (!itenSelected?.includes(addItens) && addItens) {
      setItenSelected([...itenSelected, addItens]);
      setAddItens("");
    }
  };

  return (
    <View style={style.main} onTouchStart={() => setOpen(false)}>
      <View>
        {openInput ? (
          <Pressable style={style.pressable} onPress={() => openAdd()}>
            <Text style={style.text}>Adicionar item</Text>
          </Pressable>
        ) : (
          <View>
            <View style={style.mainIcon}>
              <AntDesign
                name="close"
                size={24}
                color="black"
                onPress={() => closeIput()}
              />
            </View>
            <TextInput
              autoFocus={true}
              keyboardType="email-address"
              maxLength={19}
              onSubmitEditing={sendItens} // evento acionado ao pressionar a tecla "Enter"
              value={addItens}
              onChangeText={(text) => setAddItens(text)}
              returnKeyType="send" // exibe um botão "Enviar" ao pressionar a tecla "Enter"
              selectionColor={"#0078bd"}
              placeholder="Adicionar item"
              style={style.input}
            />
          </View>
        )}
      </View>
      <ScrollView style={style.scrow} showsVerticalScrollIndicator={false}>
        <HandleItens navigation={navigation} />
      </ScrollView>
    </View>
  );
};

export default ListItens;
const style = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#f7f7fc",
  },
  mainIcon: {
    width: 370,
    alignItems: "flex-end",
  },
  input: {
    height: 55,
    width: 370,
    borderWidth: 2,
    borderColor: "#066ca3",
    borderRadius: 10,
    fontSize: 16,
    padding: 13,
    backgroundColor: "#E8EAE9",
    borderWidth: 2,
    marginBottom: 10,
  },
  scrow: {
    flex: 1,
    //borderWidth: 2,
    //  borderColor: "orange",
    borderRadius: 15,
  },
  pressable: {
    backgroundColor: "#0078BD",
    borderRadius: 8,
    height: 42,
    width: 370,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  text: {
    color: "white",
    fontSize: 17,
    fontWeight: 600,
  },
});
