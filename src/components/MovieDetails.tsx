import React from 'react'
import { Text, View, FlatList } from 'react-native';
import currencyFormatter from "currency-formatter"

import Icon from 'react-native-vector-icons/Ionicons';
import { Cast } from '../interfaces/creditsInterface';
import { MovieFull } from '../interfaces/movieInterface';
import { CastItem } from './CastItem';

interface Props {
    movieFull: MovieFull,
    cast: Cast[]
}

export const MovieDetails = ( {movieFull, cast} : Props) => {
  return (
    <>
        <View style={{marginHorizontal:20}}>
            
            <View style={{flexDirection:'row'}}>
                <Icon
                name= "star"
                size= {16}
                color= "red"
                />

                <Text> {movieFull.release_date}</Text>

                <Text style={{marginLeft: 5}}>
                   - {movieFull.genres.map( g => g.name).join(", ")}
                </Text>
            </View>

                {/* Historia */}
                <Text style={{ fontSize: 23, marginTop: 10, fontWeight: "bold"}}>
                    Historia
                </Text>
                <Text style={{ fontSize: 16 }}>
                    {movieFull.overview}
                </Text>

                {/* Presupuesto */}
                <Text style={{ fontSize: 23, marginTop: 10, fontWeight: "bold"}}>
                    Presupuesto
                </Text>
                <Text style={{ fontSize: 18 }}>
                    {currencyFormatter.format(movieFull.budget, {code:"USD"}) }
                </Text>
                
        </View>

        {/* Casting */}
        <View style={{marginTop: 10, marginBottom: 30}}>
             <Text style={{ fontSize: 23, marginTop: 10, fontWeight: "bold", marginHorizontal: 20}}>
                Actores
            </Text>
            
            <FlatList
            data={cast}
            renderItem= { ({item}:any) => (<CastItem actor={item} />)}
            keyExtractor= { (item) => item.id.toString()}
            horizontal= {true}
            showsHorizontalScrollIndicator= {false}
            style={{ marginTop: 10, height: 70 }}
            />

        </View>
    
    </>
  )
}
