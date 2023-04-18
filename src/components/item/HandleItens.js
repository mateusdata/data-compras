import React, { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";
import { Context } from "../../context/context";
import ItensConcluido from "../../pages/concluid/ItensConcluido";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HandleItens = ({ navigation }) => {
  const {
    itenSelected,
    setItenSelected,
    completedItems,
    setCompletedItems,
    loading,
    setLoading,
    setOpenInput,
  } = useContext(Context);
  const [arrayItens, setArrayItens] = useState([
    "Leite",
    "Arroz",
    "Papel higiênico",
    "Manteiga",
    "Café",
    "Detergente",
    "Ovo",
    "Banana",
    "Pão",
    "Ovos",
    "Cebola",
    "Açúcar",
    "Azeite",
    "Tomate",
    "Papel toalha",
    "Sabonete",
    "Queijo",
    "Requeijão",
    "Alho",
    "Feijão",
    "Óleo",
    "Creme de leite",
    "Amaciante",
    "Sabão em pó",
    "Batata",
    "Limão",
    "Macarrão",
    "logurte",
    "Sal",
    "Desodorante",
    "Pasta de dente",
    "Maionese",
    "Cenoura",
    "Ketchup",
    "Molho de tomate",
    "Batata palha",
    "Leite condensado",
    "Carne",
    "Cerveja",
    "Suco",
    "Frango",
    "Guardanapo",
    "Saco de lixo",
    "Margarina",
    "Chocolate",
    "Alface",
    "Bananas",
    "Queijo ralado",
    "Presunto",
    "Álcool",
    "Desinfetante",
    "Água sanitária",
    "Nescau",
    "Água",
    "Bacon",
    "Pão de queijo",
    "Vinagre",
    "Maçã",
    "Milho",
    "Frutas adicionado",
    "Tapioca",
    "Pão de forma",
    "Cotonete",
    "Xampu",
    "Pipoca",
    "Carne moída",
    "Refrigerante",
    "Farinha de trigo",
    "Mamão",
    "Sabonete líquido",
    "Papel alumínio",
    "Laranja",
    "Aveia",
    "Esponja",
    "Farinha",
    "Água com gás",
    "Bombril",
    "Leite em pó",
    "Filtro de café",
    "Sabão líquido",
    "Miojo",
    "Coca cola",
    "Brócolis",
    "Biscoito",
    "Azeitona",
    "Mostarda",
    "Morango",
    "Bolacha",
    "Chá",
    "Vinho",
    "Granola",
    "Adoçante",
    "Atum",
    "Frios",
    "Peito de frango",
    "Lenço umedecido",
    "Farofa",
    "Salsicha",
    "Calabresa",
    "Batata doce",
  ]);

  useEffect(() => {
    // Lê os dados salvos no AsyncStorage quando recarregar a pagina
    //esse useEfect eeculta primeiro
    AsyncStorage.getItem("concluidos").then((response) => {
      // console.log("Eecultou primeiro")
      if (response !== null) {
        setCompletedItems(JSON.parse(response));
      }
    }); 
    AsyncStorage.getItem("lista").then((response) => {
      // console.log("Eecultou primeiro")
      if (response !== null) {
        setItenSelected(JSON.parse(response));
        setLoading(false);
        return;
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    // Salva os dados no AsyncStorage sempre que itenSelected for atualizado
    AsyncStorage.setItem("concluidos", JSON.stringify(completedItems));
    AsyncStorage.setItem("lista", JSON.stringify(itenSelected));
    // console.log("Eecultou depois")
  }, [itenSelected]);

  const addItensCompleted = (item) => {
    if (!completedItems?.includes(item)) {
      setCompletedItems([...completedItems, item]);
      const newArray = itenSelected?.filter((i) => i !== item); //so Deus sabe oque ta acontecendo aqui
      setItenSelected(newArray);
      AsyncStorage.setItem("lista", JSON.stringify(completedItems));
      AsyncStorage.setItem("concluidos", JSON.stringify(completedItems));
    }
  };
  const removeItensEspecific = (item) => {
    //const newArray = [...itenSelected];
    //console.log(index)
    // newArray.splice(index,1)
    const newArray = itenSelected?.filter((i) => i !== item); //so Deus sabe oque ta acontecendo aqui
    setItenSelected(newArray);
    AsyncStorage.setItem("lista", JSON.stringify(newArray));
    //console.log(index)
  };
  const addItens = (item) => {
    if (!itenSelected?.includes(item)) {
      setItenSelected([...itenSelected, item]);
    }
  };
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginTop: "50%",
        }}
      >
        <ActivityIndicator animating={true} color={"green"} size={40} />
      </View>
    );
  }
  return (
    <View style={style.main}>
     
      {itenSelected?.length > 0 ? (
        <Text style={style.h1}> Itens Adicionados</Text>
      ) : (
        false
      )}

      {itenSelected?.map((item) => {
        item =
          item.toLowerCase().charAt(0).toUpperCase() +
          item.toLowerCase().slice(1);
        return (
          <Pressable
            onTouchStart={() => {
              setOpenInput(true);
            }}
            key={item}
            onPress={() => addItensCompleted(item)}
            style={{
              backgroundColor: "#F2F2F2",
              borderWidth: 0.5,
              borderColor: "#0078BD",
              alignItems: "center",
              width:"49.5%",
              minwidth: "46%",
              maxWidth:"49%",
              height: 60,
              flexDirection: "row",
              padding: 10,
              borderRadius: 10,
             
            }}
          >
            <MaterialCommunityIcons
              name="checkbox-blank-outline"
              size={24}
              color="#686666"
            />
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
        );
      })}
      
        {completedItems.length > 0 ? (
          <Text style={style.h2}> Concluidos</Text>
        ) : (
          false
        )}
        <ItensConcluido navigation={navigation} />
      <Text style={style.h1}> Itens mais procurados da lista</Text>
      {arrayItens?.map((item, index) => (
        <Pressable
          onTouchStart={() => {
            setOpenInput(true);
          }}
          key={item}
          onPress={() => {
            addItens(item);
          }}
          style={style.pressable}
        >
          {!itenSelected?.includes(item) ? (
            <AntDesign name="plus" size={19} color="green" />
          ) : (
            <Ionicons
              onPress={() => removeItensEspecific(item)}
              name="remove-outline"
              size={24}
              color="red"
            />
          )}
          <View>
            <Text style={style.text}> {item}</Text>
            {itenSelected?.includes(item) && (
              <Text style={style.textAdd}>
                {itenSelected.includes(item) && "Adicionado"}
              </Text>
            )}
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default HandleItens;

const style = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  h1: {
    fontSize: 20,
    backgroundColor: "#e8eae9",
    marginTop: 10,
    marginBottom: 15,
    width: 350,
    textAlign: "center",
  },
  h2: {
    fontSize: 20,
    backgroundColor: "#e8eae9",
    marginTop: 10,
    marginBottom: 15,
    width: 350,
    textAlign: "center",
    color: "green",
  },

  pressable: {
    backgroundColor: "#e8eae9",
    alignItems: "center",
    width:"49.5%",
    minwidth: "46%",
    maxWidth:"49%",
    height: 60,
    flexDirection: "row",
    padding: 5,
    borderRadius: 10,
  },
  text: {
    color: "black",
  },
  textAdd: {
    textAlign: "left",
    marginLeft: 3,
  },
});
