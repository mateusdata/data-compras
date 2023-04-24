import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View, TextInput, Animated, Pressable, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications';
let diferencaMinutos = 0;
const ShoppingDay = () => {
    const [day, setDay] = useState("")
    const [hors, setHors] = useState("")
    const [modal, setModal] = useState(false)
    const [modalOpacity] = useState(new Animated.Value(0)) // Adicione um Animated.Value para controlar a opacidade do modal
    const [focus, setFocus] = useState(true)
    const [isShoppingStatus, setIsShoppingStatus] = useState(false)
    //alert(new Date().getDate())
    // Função para animar a transição de mostrar/ocultar o modal
 useEffect(()=>{
    AsyncStorage.getItem("statusDay").then((response)=>{
        console.log("deu certo ta no local storage");
        const data = JSON.parse(response)
       // setIsShoppingStatus([data.newDate, data.newHors])
        //console.log(data.newDate)
        if(data !==null){
            setIsShoppingStatus(data)
            console.log("data: " , isShoppingStatus.newDate + data.newHors)
            return
        }

    });
 }, [setIsShoppingStatus])

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
                title: "Lembrete de compras 🛍️🛒",
                body: `Olá! Hoje é o dia de compras. Não se esqueça de utilizar nosso aplicativo para facilitar sua experiência de compras!🛍️🛒 `,
                data: { propriedade: 'Valor da propriedade🔥' }, // Dados extras para a notificação
                sound: true, // Reproduzir som na notificação
                vibration: true,
            },
            //trigger: Platform.OS === 'ios' ? { hour: 10, minute: 10, repeats: true } : { day: 21, month: 4, year:2023, hour:18, minute:9, repeats: true },

            trigger: { seconds: diferencaMinutos * 60, repeats: false },
        });
    }
    const toggleModal = () => {
        if (modal) {
            if (day.length=== 10 && hors.length === 5) {
                // AsyncStorage.setItem("shoppingDay", JSON.stringify(newArray));
                setDay("");
                setHors("");
                const newHors = parseFloat(hors);
                const newDay = parseFloat(day);
                console.log(newHors + newDay)
                let dataErrada = day;
                let partesData = dataErrada.split('/');
                console.log(partesData);
                let diaUsuario = parseFloat(partesData[0]);
                let mesUsuario = parseFloat(partesData[1]) - 1;
                let anoUsuario = parseFloat(partesData[2]);
                console.log(diaUsuario, mesUsuario, anoUsuario);
                let hora = hors;
                let partesHora = hora.split(':');
                console.log(partesHora);
                let horaUsuario = parseFloat(partesHora[0]);
                let minutosUsuario = parseFloat(partesHora[1]);
                console.log(horaUsuario, minutosUsuario);
                const dataUsuario = new Date(anoUsuario, mesUsuario, diaUsuario, horaUsuario, minutosUsuario);
                console.log(dataUsuario);
                const dataAtual = new Date();
                diferencaMinutos = Math.round((dataAtual - dataUsuario) / (1000 * 60));
                if (diferencaMinutos < 0) {
                    diferencaMinutos = Math.abs(diferencaMinutos)
                }
                console.log(diferencaMinutos);
                if (isNaN(diferencaMinutos)) {
                    alert("Data ou hora invalida")
                    return;
                }
                console.log("Minutos:", diferencaMinutos);
                usarExpoNotifications();
                setModal(false);
                /*
                let dataErrada = "21/05/2023"; // Data no formato "dd/MM/yyyy"
                let partesData = dataErrada.split('/'); // Divide a string em três partes, separadas pelo caractere "/"
                let diaUsuario = parseFloat(partesData[0]); // Obtém o dia como um número inteiro
                let mesUsuario = parseFloat(partesData[1]) - 1; // Obtém o mês como um número inteiro, subtraindo 1 para ajustar ao formato do objeto Date em JavaScript
                let anoUsuario = parseFloat(partesData[2]); // Obtém o ano como um número inteiro
                
                let hora = "20:23"; // Hora no formato "HH:mm"
                let partesHora = hora.split(':'); // Divide a string em duas partes, separadas pelo caractere ":"
                let horaUsuario = parseFloat(partesHora[0]); // Obtém a hora como um número inteiro
                let minutosUsuario = parseFloat(partesHora[1]); // Obtém os minutos como um número inteiro
                
                // Cria uma nova data com a data e hora fornecidas
                const dataUsuario = new Date(anoUsuario, mesUsuario, diaUsuario, horaUsuario, minutosUsuario);
                
                // Obtém a data atual
                const dataAtual = new Date();
                
                // Calcula a diferença em minutos entre as duas datas
                const diferencaMinutos = Math.round((dataAtual - dataUsuario) / (1000 * 60));
                
                // Calcula a diferença em dias entre as duas datas
                const diferencaDias = Math.floor((dataAtual - dataUsuario) / (1000 * 60 * 60 * 24));
                
                console.log('Diferença em minutos:', diferencaMinutos); // Exibe a diferença em minutos entre as duas datas
                console.log('Diferença em dias:', diferencaDias); // Exibe a diferença em dias entre as duas datas
                */
                
                AsyncStorage.setItem("statusDay", JSON.stringify({newDate:day, newHors: hors})).then((response)=>{
                    console.log("deu certo ta no local storage");

                   setIsShoppingStatus({newDate:day, newHors: hors})
                    
                });
                return;
            }
            alert("Data ou hora invalida")

            Animated.timing(modalOpacity, {
                toValue: 0, // Anima a opacidade para 0
                duration: 800, // Duração da animação em milissegundos
                useNativeDriver: true,
            }).start(() => {
                setModal(false)
            })
        } else {
            setModal(true)
            Animated.timing(modalOpacity, {
                toValue: 1, // Anima a opacidade para 1
                duration: 800, // Duração da animação em milissegundos
                useNativeDriver: true,
            }).start()
        }
    }

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: modal ? "flex-end" : "center", backgroundColor: modal ? "#00000090" : "#c1c1cc" }}>
           {!modal && <View style={{ padding:15 ,width:"80%", borderWidth:1, borderColor:"blue", height:"50%", alignItems:"center", justifyContent:"center", borderRadius:20, gap:20, backgroundColor:"#eaeaf2"}}>
           <Text style={[style.text, {textAlign:"center"}]}>Escolha o melhor dia para fazer suas compas</Text>
           
                {isShoppingStatus &&<Text style={{textAlign:"center", fontWeight:"800"}}>Suas compras estão agendada para o dia {isShoppingStatus.newDate}  - as {isShoppingStatus.newHors}h</Text>}
                <Image resizeMode='center' source={{uri:"https://media.tenor.com/CpyznooaXxoAAAAC/mercado-compras.gif"}} style={{width:"50%", height:"20%", borderRadius:80}}/>
                <Pressable onPress={toggleModal} style={[style.presable,{padding:15, height:60, backgroundColor:"#007BFF"}]}>
                    <Text style={{ color: "white", fontSize: 20 }}>Escolher data</Text>
                </Pressable>
           
           </View>}
            {modal && <Animated.View style={{
                backgroundColor: "white",
                height: "50%",
                width: "100%",
                padding: 20,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                gap: 5,
                opacity: modalOpacity, // Use o Animated.Value para a opacidade
                transform: [{
                    translateY: modalOpacity.interpolate({
                        inputRange: [0, 1],
                        outputRange: [200, 0],
                    })
                }],
            }}>
                <View style={{ alignItems: "center" }} >
                    <View onTouchStart={() => {
                        Animated.timing(modalOpacity, {
                            toValue: 0, // Anima a opacidade para 0
                            duration: 800, // Duração da animação em milissegundos
                            useNativeDriver: true,
                        }).start(() => {
                            setModal(false)
                        })
                    }} style={{ backgroundColor: "#38393a", height: 7, bottom: 12, width: "15%", borderRadius: 5 }}></View>
                </View>
                <Text style={style.text}>Data ex: 05/10/2022</Text>
                <TextInput value={day} onChangeText={(e) => setDay(e)} placeholder={ !isShoppingStatus ? 'Data ex: 05/10/2022' : isShoppingStatus.newDate+" data atual"} focus={true} style={[style.input, { borderColor: focus ? "gray" : "#4285F4" }]} onTouchEnd={() => setFocus(false)} />
                <Text style={style.text}>Data ex: 05:15</Text>
                <TextInput  value={hors} onChangeText={(e) => setHors(e)} placeholder={ !isShoppingStatus ?'Hora ex: 08:15': isShoppingStatus.newHors+" hora atual"} style={[style.input, { borderColor: focus ? "#4285F4" : "gray" }]} onTouchEnd={() => setFocus(true)} />

                <Pressable onPress={toggleModal} style={style.presable}>
                    <Text style={{ color: "white", fontSize: 25 }}>Salvar</Text>
                </Pressable>
                    <Button color={"#D14A3E"} title='apara Data' onPress={()=>{
                         AsyncStorage.removeItem("statusDay").then((response)=>{
                           console.log("apagou");
                           setIsShoppingStatus("");
                           setDay("");
                           setHors("");
                           
                        });
                    }}/>
            </Animated.View>}
        </View>
    )
}

export default ShoppingDay;

const style = StyleSheet.create({
    input: {
        width: "100%", borderWidth: 2, borderColor: "gray",
        justifyContent: "center", height: 50, borderRadius: 10, padding: 10, fontSize: 18
    },
    presable: {
        height: 50, backgroundColor: "#018337",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10
    },
    text: {
        fontSize: 22,
    }
})
