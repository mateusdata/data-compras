import { SplashScreen, Stack } from 'expo-router'
import React, { useEffect, useState } from 'react'
import Calculator from '../components/Calculator';
import { colorPrimary } from '../../constants/constants';
import { Image, Text, View } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

SplashScreen.preventAutoHideAsync();

export default function _layout() {
    const [appIsReady, setAppIsReady] = useState(false);
    useEffect(() => {
        async function prepare() {
            try {
                // Artificially delay for two seconds to simulate a slow loading
                // experience. Please remove this if you copy and paste the code!
                await new Promise(resolve => setTimeout(resolve, 5000));
                // Simulate an error during loading
                // await new Promise((_, reject) => reject('Error'));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
                await SplashScreen.hideAsync();
            }
        }

        prepare();
    }, []);


    if (!appIsReady) {
        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "red",
            }}>
                <Text>Carregando app</Text>
                <Image
                    source={{ uri: "https://cdn.dribbble.com/users/967334/screenshots/3742472/dribbble.gif" }} // Path to your GIF
                    style={{ height: 100, width: 150 }}
                />
                <Video

                    style={{
                        with:200,
                        height:200
                    }}
                    source={{
                        uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                    }}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping
                    
                   
                />
            </View>
        )
    }


    return (
        <>
            <Stack screenOptions={{
                headerStyle: {
                    backgroundColor: colorPrimary,
                },
                headerTitleStyle: {
                    color: "white"
                },
                headerTintColor: "white"
            }}>
                <Stack.Screen name='index' options={{
                    headerTitle: "Home",
                    headerRight: () => <Calculator icon="calculator" route='regraDeTres' />
                }} />

                <Stack.Screen name='regraDeTres' options={{
                    headerTitle: "Calculadora de regra de 3",
                    headerRight: () => <Calculator icon="home" route='index' />
                }} />

            </Stack>

        </>
    )
}
