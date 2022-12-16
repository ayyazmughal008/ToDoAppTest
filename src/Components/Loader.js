import { View, ActivityIndicator } from 'react-native'
import React from 'react'
import { Colors } from '../Utils/colors'

const Loader = () => {
    return (
        <ActivityIndicator
            size={"large"}
            color={Colors.red}
            style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        />
    )
}

export default Loader
