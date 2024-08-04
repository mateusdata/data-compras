import { SplashScreen, Stack } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import Calculator from '../components/Calculator';
import { colorPrimary } from '../../constants/constants';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

SplashScreen.preventAutoHideAsync();

export default function _layout() {

    const videoRef = useRef<any>(null);

    useEffect(() => {
        const handleVideoPlayback = async () => {
            if (videoRef.current) {
                await videoRef.current.presentFullscreenPlayer();
            }
        };
        handleVideoPlayback();
    }, []);
    const [appIsReady, setAppIsReady] = useState(false);
    useEffect(() => {

        async function prepare() {
            try {

                await new Promise(resolve => setTimeout(resolve, 3000));

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
                backgroundColor: "white",
            }}>

                <Video
                    style={styles.video}
                    source={require("../assents/video.mp4")}
                    useNativeControls={true}
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping
                    shouldPlay
                    isMuted


                />
                <ActivityIndicator style={styles.indicator} size={50} color={colorPrimary} />
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


const styles = StyleSheet.create({
    video: {
        width: "100%",
        height: 1000,
        borderRadius: 2,
        borderWidth: 10,
        backgroundColor: "white"
    },
    indicator:{
        position:"absolute",
        bottom:50
    }
})