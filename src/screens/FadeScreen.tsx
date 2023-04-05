import React, {useRef} from 'react'
import { View, Button, Animated } from 'react-native';
import { useFade } from '../hooks/useFade';


export const FadeScreen = () => {
  
    const {opacity, fadeIn, fadeOut} = useFade()

  return (
    <View style={{
        flex: 1,
        backgroundColor: "grey",
        justifyContent: "center",
        alignItems: "center"
    }}>
        <Animated.View style={{
            height: 150,
            width: 150,
            borderColor: "white",
            backgroundColor: "#023e8a",
            borderWidth: 10,
            opacity
        }}
        />

        <Button
        title="fadeIn"
        onPress={ fadeIn }
        />

        <Button
        title="fadeOut"
        onPress={ fadeOut }
        />
        
    </View>
  )
}
