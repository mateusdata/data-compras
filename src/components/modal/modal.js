import React from 'react'
import { Text } from 'react-native'
import { View } from 'react-native'

const ModalOptions = () => {
  return (
    <View style={{
        flex:1,
        position:"absolute",
        top:0,
        bottom:0,
        left:0,
        right:0,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: 'rgba(0, 0, 0, 0.8)' 
    }}>
       <Text> ModalOptions</Text>
        
    </View>
  )
}

export default ModalOptions