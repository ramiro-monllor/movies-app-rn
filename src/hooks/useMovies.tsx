import React, { useEffect, useState } from 'react'
import movieDB from '../api/movieDB';
import { Movie, MovieDBMoviesResponse } from '../interfaces/movieInterface';

interface MoviesState {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}


export const UseMovies = () => {

    const [isLoading, setIsLoading] = useState(true)
    
    const [moviesState, setMoviesState] = useState<MoviesState>({
      nowPlaying: [],
      popular: [],
      topRated: [],
      upcoming: [],
    })
    
    const getMovies = async () => {
        const respPlaying   = await movieDB.get<MovieDBMoviesResponse>("/now_playing")
        const respPopular   = await movieDB.get<MovieDBMoviesResponse>("/popular")
        const respTopRated  = await movieDB.get<MovieDBMoviesResponse>("/top_rated")
        const respUncoming  = await movieDB.get<MovieDBMoviesResponse>("/upcoming")

        const resps = await Promise.all([
          respPlaying,
          respPopular,
          respTopRated,
          respUncoming,
        ])

        setMoviesState({
          nowPlaying: resps[0].data.results,
          popular: resps[1].data.results,
          topRated: resps[2].data.results,
          upcoming: resps[3].data.results,
        })

        setIsLoading(false)
    }
    
    useEffect(() => {
        getMovies()
    }, [])


  return {
    ...moviesState,
    isLoading
  }
}

