import React, { useContext, useEffect, useState } from "react";
import * as Notifications from 'expo-notifications';

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
import audio from "../../../assets/audio.wav"
import AsyncStorage from "@react-native-async-storage/async-storage";

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


  async function usarExpoNotifications() {
    // Passo 1: Solicitar permissão para notificações
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.log('Falha ao obter permissão para notificações!');
      return;
    }

    // Passo 2: Configurar o manuseio de notificações
    Notifications.setNotificationHandler({
      handleNotification: async () => {
        // Faça o que quiser com a notificação recebida
        return {
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        };
      },
    });

    // Passo 3: Enviar uma notificação

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Lembrete de compras 🛍️🛒 v2.0.0",
        body: `Olá! Hoje é o dia de compras.  Não se esqueça de utilizar nosso aplicativo para facilitar sua experiência de compras!🛍️🛒 `,
        data: { propriedade: 'Valor da propriedade🔥' }, // Dados extras para a notificação
        color: 'blue',
        sound: audio,
        sound: true, // Reproduzir som na notificação
        vibration: true,

      },
      //trigger: Platform.OS === 'ios' ? { hour: 10, minute: 10, repeats: true } : { day: 21, month: 4, year:2023, hour:18, minute:9, repeats: true },

      trigger: { seconds: 2, repeats: false },
    });

    /* await Notifications.scheduleNotificationAsync({
       content: {
         title: 'Olá, bom dia, ja fez suas compras',
         body: 'Bora fazer suas compras agora, e deixar as coisas em dia 🛒🥳',
         data: { propriedade: 'Valor da propriedade🔥' }, // Dados extras para a notificação
         color: 'blue',
         sound: audio,
         sound: true, // Reproduzir som na notificação
         vibration: true,
       },
       trigger: Platform.OS === 'ios' ? { hour: 20, minute: 10, repeats: true } : { hour: 17, minute: 54, repeats: true },
       trigger: { seconds: 15, repeats: false },
     });*/
  }
  // Chame a função para iniciar o uso do Expo Notifications
  //usarExpoNotifications();
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
          <Pressable style={style.pressable} onPress={() => {
            //usarExpoNotifications();
            openAdd()
          }}>
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
    maxWidth: "100%",
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
    maxWidth: "100%",
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
