import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Pressable } from "react-native";
function RuleOfThree() {
  const [x, setX] = useState("X");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [erro, setErro] = useState();

  function limparInputs() {
    setX("X");
    setA("");
    setB("");
    setC("");
    setErro(false);
  }

  function regraTres() {
    let resultado = (parseFloat(b) / parseFloat(a)) * parseFloat(c);
    if (!isNaN(resultado)) {
      setX(resultado.toFixed(2));
      setErro(false);
    } else {
      setErro(true);
      setX("X");
    }
  }

  useEffect(() => {
    if (a && b && c) regraTres();
  }, [a, b,c]);

  return (
    <View style={{ flex: 1, padding:10}}>
      <View style={{ flex: 1, padding:10, justifyContent: "flex-start", alignItems: "flex-start" }}>
        <Text style={{ fontSize: 30, textAlign:"left"}}>Calculadora de Regra de Três Simples</Text>
        
      </View>
      <View style={{ flex: 1,justifyContent: "center", alignItems: "center"}}>
        <Text  style={{ fontSize:24, marginBottom:10}} >Opções</Text>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            keyboardType="numeric"
            style={{ padding:5, borderWidth: 1, borderColor: "green", padding: 5, width: "30%", height: "100%", fontSize:30, textAlign:"center" }}
            onChangeText={(text) => setA(text)}
            value={a}
            placeholder="A"
          />
          <AntDesign name="arrowright" size={30} color="orange" style={{marginTop:10, padding:5}} />
          <TextInput
            keyboardType="numeric"
             style={{ padding:5, borderWidth: 1, borderColor: "green", padding: 5, width: "30%", height: "100%", fontSize:30, textAlign:"center" }}
            onChangeText={(text) => setB(text)}
            value={b}
            placeholder="B"
          />
        </View>
        <Text style={{ fontSize: 20 }}>ASSIM COMO</Text>
        <View style={{ flexDirection: "row" , }}>
          <TextInput
            keyboardType="numeric"
             style={{ padding:5, borderWidth: 1, borderColor: "green", padding: 5, width: "30%", height: "100%", fontSize:30, textAlign:"center" }}
            onChangeText={(text) => setC(text)}
            value={c}
            placeholder="C"
          />
          <AntDesign name="arrowright" size={30} color="orange" style={{marginTop:10, padding:5}} />
          <TextInput
            keyboardType="numeric"
             style={{ padding:5, borderWidth: 1, borderColor: "#0078BD", padding: 5, width: "30%", height: "100%", fontSize:30, textAlign:"center", color:"orange" }}
            value={x}
            editable={false}
          />
        </View>
        {c && (
         <Pressable onPress={limparInputs} style={{marginBottom:50, backgroundColor:"#0078BD", borderRadius:8, width:150, height:50, marginTop:10,alignItems:"center", justifyContent:"center"}}> 
          <Text style={{color:"white", fontSize:20}}>Limpar</Text>
         </Pressable>
        )}
        <Text style={{ color: "red" }}>{erro ? "Erro! informe apenas números" : false}</Text>
      </View>
    </View>
  );
}

export default RuleOfThree;
