import { Link } from 'expo-router'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';
export default function Calculator({route, icon}:{route: string, icon:any}) {
    return (
        <Link href={route} asChild>
            <Pressable >
                <Entypo name={icon} size={25} color="white" style={{  }} />
            </Pressable>
        </Link>
    )
}
