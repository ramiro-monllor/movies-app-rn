import React from 'react'
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Movie } from '../interfaces/movieInterface'
import { useNavigation } from '@react-navigation/core';

interface Props {
    movie: Movie,
    width?: number,
    height?: number,
}

export const MoviePoster = ({movie, width=300, height=420}: Props) => {

    const navigation = useNavigation()
    
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

  return (

    <TouchableOpacity 
        activeOpacity={0.8}
        onPress={ () => navigation.navigate("DetailScreen", movie)}
        style={{
            width,
            height,
            marginHorizontal: 2,
            paddingBottom: 20,
            paddingHorizontal :7
        }}>

        <View style={styles.imageContainer}>
            <Image 
                source={{uri}}
                style={styles.image}
            />
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    image:{
        flex:1,
        borderRadius:18
    },
    imageContainer:{
        flex:1,
        borderRadius:18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,
        elevation: 10,
    }
});