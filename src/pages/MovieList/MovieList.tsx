import { useEffect, useState } from 'react'
import { getMovieList } from '../../api/apiCalls';
import NavBar from '../../components/NavBar/NavBar';
import styles from './MovieList.module.css'
import SearchBar from '../../components/SearchBar/SearchBar';
import { IMovieCardInfo } from '../../api/apiInterface';
import MovieCard from '../../components/MovieCard/MovieCard';

const MovieList = () => {
    const [movieList, setMovieList] = useState<IMovieCardInfo[]>([])
    useEffect(() => {
        setMovieList([])
        setAllMovieList()
    }, [])

    async function setAllMovieList(){
        const movielist=await getMovieList(1)
        console.log(movielist);
        setMovieList(movielist)
    } 

    return (
        <div className={styles.maincontainer}>
            <NavBar FirstComponent={<SearchBar />} />
            <div className={styles.movielistcontainer}>{
                movieList.map((movieCard: IMovieCardInfo) => {
                    return <MovieCard key={movieCard.id} details={movieCard} />
                })
            }</div>
        </div>
    )
}

export default MovieList