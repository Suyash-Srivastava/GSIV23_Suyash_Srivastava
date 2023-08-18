import { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { getMovieDetail } from '../../api/apiCalls';
import { IMovieDetails } from '../../api/apiInterface';

const useMovieDetails = () => {
    const params = useParams()

    const [movieDetails, setmovieDetails] = useState<IMovieDetails>()

    useEffect(() => {
        if (params.movieId)
            setMovieDetails((params.movieId))
    }, [params])

    async function setMovieDetails(id: string) {
        const data: IMovieDetails = await getMovieDetail(id)
        setmovieDetails(data)
    }
    return {
        movieDetails
    }
}




export default useMovieDetails