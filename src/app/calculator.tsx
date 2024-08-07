import { Link } from 'expo-router'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';
export default function Calculator() {
    return (
        <Link href={"regraDeTres"}>
            <Pressable>
                <Entypo name="calculator" size={24} color="orange" style={{ left: 2, top: 2 }} />
            </Pressable>
        </Link>
    )
}
