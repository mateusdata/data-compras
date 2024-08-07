import { Stack } from 'expo-router'
import Calculator from '../components/Calculator';
import { colorPrimary } from '../../constants/constants';
import { StyleSheet } from 'react-native';


export default function _layout() {


    return (

        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: colorPrimary,
            },
            statusBarColor:colorPrimary,
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
                headerTitle: "Regra de 3",
                headerRight: () => <Calculator icon="home" route='/' />
            }} />

        </Stack>


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
    indicator: {
        position: "absolute",
        bottom: 50
    }
})