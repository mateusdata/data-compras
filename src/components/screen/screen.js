import React, { useContext} from "react";
import { Image, Text, View } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ListItens from "../../pages/list/ListItens";
import { Context } from "../../context/context";
import Compras from "../../../assets/carinho.jpg";
import RuleOfThree from "../../pages/rule of three/ruleOfThree";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
function Screen() {
  const { setItenSelected, open, setOpen, setCompletedItems } =
    useContext(Context);
  /*
    import { useNavigation } from '@react-navigation/native';
    const navigation = useNavigation()
    eu posso usar assim ou passar um paramentro e uma função que retorna um objeto contendo as propriedades
    por exemplo a propriedade headerTitleLeft: () => (<View>Meu condigo</View>), demais propriedades...
    */

  const removeAdd = () => {
    AsyncStorage.removeItem("lista");
    setOpen(false);
    setItenSelected([]);
  };
  const removeConcluded = () => {
    AsyncStorage.removeItem("concluidos");
    setOpen(false);
    setCompletedItems([]);
  };
  const removeAll = () => {
    AsyncStorage.removeItem("lista");
    AsyncStorage.removeItem("concluidos");
    setOpen(false);
    setItenSelected([]);
    setCompletedItems([]);
  };
  function openModal() {
    if (open) {
      setOpen(false);
      return;
    }
    setOpen(true);
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Listas de compras"
        component={ListItens}
        options={({ navigation }) => ({
          headerTitle: () => (
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={Compras} style={{ width: 80, height: 65 }} />
                <Text
                  style={{
                    marginLeft: 20,
                    fontSize: 18,
                    fontWeight: "bold",
                    fontSize: 25,
                  }}
                >
                  Data Compras
                </Text>
                <Ionicons
                  style={{ marginLeft: 20 }}
                  name="calculator-sharp"
                  size={26}
                  color={"orange"}
                  onPress={() => navigation.navigate("Compras")}
                />
                <SimpleLineIcons
                  onTouchStart={() => openModal()}
                  style={{
                    marginLeft: 2,
                    paddingHorizontal: 25,
                    paddingVertical: 20,
                  }}
                  name="options-vertical"
                  size={24}
                  color="#066ca3"
                />
              </View>
              {open ? (
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    top: 600,
                    left: -15,
                    paddingTop: 15,
                    backgroundColor: "#cccfd1",
                    width: 389,
                    height: 260,
                    borderRadius: 20,
                    alignItems: "flex-start",
                    padding: 0,
                  }}
                >
                  <View
                    onTouchStart={() => removeAdd()}
                    style={{
                      width: 380,
                      marginBottom: 20,
                      paddingLeft: 20,
                      borderBottomColor: "#2f3133",
                      borderBottomWidth: 0.5,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        marginBottom: 20,
                        color: "#2f3133",
                      }}
                    >
                      Remover todos Adicionados
                    </Text>
                  </View>

                  <View
                    onTouchStart={() => removeConcluded()}
                    style={{
                      width: 380,
                      marginBottom: 20,
                      paddingLeft: 20,
                      borderBottomColor: "#2f3133",
                      borderBottomWidth: 0.5,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        marginBottom: 20,
                        color: "#2f3133",
                      }}
                    >
                      Remover todos concluidos
                    </Text>
                  </View>

                  <View
                    onTouchStart={() => removeAll()}
                    style={{
                      width: 380,
                      paddingLeft: 20,
                      borderBottomColor: "#2f3133",
                      borderBottomWidth: 0.5,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        marginBottom: 20,
                        color: "#2f3133",
                      }}
                    >
                      Remover todos os itens
                    </Text>
                  </View>
                </View>
              ) : (
                false
              )}
            </View>
          ),
          headerStyle: {
            backgroundColor: "white",
            minHeight: 100,
            maxHeight: 100,
            height: 100,
          },
          headerTintColor: "black",
          tabBarIcon: ({ color }) => (
            <AntDesign name="shoppingcart" size={40} color={color} />
          ),
          tabBarLabelStyle: {
            fontSize: 0,
          },
        })}
      />
      <Stack.Screen
        name="Compras"
        component={RuleOfThree}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="calculator-sharp"
              size={36}
              color={color}
              style={{ top: 2.5 }}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 0,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default Screen;
