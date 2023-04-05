import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { View, Text, ScrollView, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { RootStackParams } from '../navigation/Navigation'
import Icon from 'react-native-vector-icons/Ionicons';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';
import { TouchableOpacity } from 'react-native';

interface Props extends StackScreenProps <RootStackParams,"DetailScreen"> {};

const screenHeight =  Dimensions.get('screen').height

export const DetailScreen = ( {route, navigation} : Props) => {

  const movie = route.params
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

 const { isLoading, movieFull, cast } = useMovieDetails( movie.id )

 console.log(cast)
  
  return (
    <ScrollView>
        <View style={styles.imageContainer}>

          <View style={styles.imageBorder}>
            <Image
            style={styles.posterImage}
            source={{uri}}
            />
          </View>

        </View>

        <View style={styles.marginContainer}>
          <Text style={styles.subtitle}>{movie.original_title}</Text>
          <Text style={styles.title}>{movie.title}</Text>
        </View>

          {
            isLoading
            ? <ActivityIndicator color="red" size={70} style={{marginTop:20}}/>
            : <MovieDetails movieFull={movieFull!} cast={cast} />
          }
        
          {/* Boton para cerrar */}
          <View style={styles.backButton}>
            <TouchableOpacity
            onPress={() => navigation.pop()}
            >
              <Icon
                name='arrow-back-circle-outline'
                size={70}
                color="#faedcd"
              />
            </TouchableOpacity>
          </View>
          
    </ScrollView>
  )
}


const styles = StyleSheet.create({
    imageContainer:{
      // backgroundColor: "red",
      // overflow: "hidden",
      width: "100%",
      height: screenHeight * 0.7,
      shadowColor: "#00",
      shadowOffset: {
        width: 0,
        height: 10
      },
      shadowOpacity: 0.24,
      shadowRadius: 7,
      elevation: 9,
      borderBottomStartRadius: 25,
      borderBottomEndRadius: 25,
    },
    imageBorder:{
      flex: 1,
      overflow: "hidden",
      borderBottomStartRadius: 25,
      borderBottomEndRadius: 25,
    },
    posterImage:{
      flex: 1
    },
    marginContainer:{
      marginHorizontal: 20,
      marginTop: 20
    },
    subtitle:{
      fontSize: 16
    },
     title:{
      fontSize:20,
      fontWeight:'bold'      
    },
    backButton:{
      position: "absolute",
      zIndex: 999,
      elevation: 9,
      top: 30,
      left: 5
    }
});