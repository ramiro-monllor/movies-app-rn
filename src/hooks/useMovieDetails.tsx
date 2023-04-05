import React, {useEffect, useState} from 'react'
import movieDB from '../api/movieDB'
import { MovieFull } from '../interfaces/movieInterface';
import { Cast, CreditsResponse } from '../interfaces/creditsInterface'

interface MovieDetails {
    isLoading: boolean,
    movieFull?: MovieFull,
    cast: Cast[]
}

export const useMovieDetails = (movieId : number) => {

    const  [state, setState] = useState<MovieDetails>({
    isLoading: true,
    movieFull: undefined,
    cast: []
    })

    const getMovieDetails = async () => {
        const promiseDetalis = await movieDB.get<MovieFull>(`/${movieId}`)
        const promiseCast = await movieDB.get<CreditsResponse>(`/${movieId}/credits`)

        const [respDetails,respCast] = await Promise.all([promiseDetalis,promiseCast])

        
        setState({
          isLoading: false,
          movieFull: respDetails.data,
          cast: respCast.data.cast
        })

        // console.log(resp.data.overview)
    }

    useEffect(() => {
        getMovieDetails()
    }, [])
    
    

  return {
    ...state
  }
}
