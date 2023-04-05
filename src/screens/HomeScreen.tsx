import React, { useContext, useEffect } from 'react'
import { View, Text, ActivityIndicator, Dimensions, FlatList, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Carousel from 'react-native-snap-carousel';
import ImageColors from 'react-native-image-colors'

import { UseMovies } from '../hooks/useMovies'
import { MoviePoster } from '../components/MoviePoster'
import { HorizontalSlider } from '../components/HorizontalSlider';
import { GradientBackground } from '../components/GradientBackground';
import  GetColors  from '../helpers/GetColors';
import { GradientContext } from '../context/GradientContext';

export const HomeScreen = () => {

 const { nowPlaying, popular, topRated, upcoming, isLoading} = UseMovies()

 const {setMainColors} = useContext(GradientContext)

 const getPosterColors = async (index:number) => {
  const movie = nowPlaying[index];
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

  const [primary = "green", secondary = "orange"] = await GetColors(uri)

  setMainColors({primary,secondary})
  
  console.log(primary, secondary)
 }

 useEffect(() => {
   if( nowPlaying.length > 0){
    getPosterColors(0)
   }
 }, [nowPlaying])
 
 
 const { top } = useSafeAreaInsets()
 const { width: windowWidth } = Dimensions.get('window')

  if(isLoading){
    return(
      <View style={{flex:1, justifyContent:'center', alignContent:'center'}}>
        <ActivityIndicator color="red" size={70} />
      </View>
    )
  }


  return (
  <GradientBackground>

    <ScrollView>
      <View style={{marginTop: top + 20}}>

          {/* {Carousel principal} */}
          <View style={{height:460}}>
            <Carousel
                data={nowPlaying}
                renderItem={ ({item}:any) => <MoviePoster movie={item} />}
                sliderWidth={windowWidth}
                itemWidth={300}
                inactiveSlideOpacity= {0.9}
                onSnapToItem={index => getPosterColors(index)}
                keyExtractor= { (item) => item.id.toString()}
                />  
          </View>

          {/* {Carousel en cine} */}
          {/* <View style={{height:260}}>
            <Text style={{fontWeight:'bold', fontSize:30}}>En Cine</Text>
              <FlatList
              data={peliculasEnCine}
              renderItem= { ({item}:any) => (<MoviePoster movie={item} width={160} height={230} />)}
              keyExtractor= { (item) => item.id.toString()}
              horizontal= {true}
              showsHorizontalScrollIndicator= {false}
              />
          </View> */}

          <HorizontalSlider title="Popular" movies={popular} />
          <HorizontalSlider title="Top Rated" movies={topRated} />
          <HorizontalSlider title="Upcoming" movies={upcoming} />


      </View>
    </ScrollView>
    
  </GradientBackground>

  )
}
