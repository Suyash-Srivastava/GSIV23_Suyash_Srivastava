import {useState,useEffect} from 'react'
import { useParams } from 'react-router';
import { getMovieDetail } from '../../api/apiCalls';

const useMovieDetails = () => {
    const params=useParams()

    const [movieDetails, setmovieDetails] = useState({})

    useEffect(() => {
        setMovieDetails((params.movieId))
    }, [params])
    async function setMovieDetails(id:string){
    if(id){
    const data=await getMovieDetail(id)
    console.log(data);
    }
    else{
        return {}
    }
    
    }
  return (
    movieDetails
  )
}

export default useMovieDetails