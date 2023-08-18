/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { getMovieList } from '../../api/apiCalls';
import NavBar from '../../components/NavBar/NavBar';
import styles from './MovieList.module.css'
import SearchBar from '../../components/SearchBar/SearchBar';
import { IMovieCardInfo } from '../../api/apiInterface';
import MovieCard from '../../components/MovieCard/MovieCard';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../utils/store/store';
import { setMovieList } from '../../utils/store/slices/movieSlice';
const MovieList = () => {

    const movieList: IMovieCardInfo[] = useSelector((state: RootState) => state.movies.values)
    const [loading, setloading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setMovieList([]))
        setAllMovieList()
    }, [])

    async function setAllMovieList() {
        setloading(true)
        const movielist = await getMovieList(1)
        dispatch(setMovieList(movielist))
        setloading(false)
    }

    return (
        <div className={styles.maincontainer}>
            <NavBar FirstComponent={<SearchBar />} />
            <div className={styles.movielistcontainer}>
                {loading ? <h1>Movies are loading...</h1> :
                    movieList.length > 0 ?
                        movieList.map((movieCard: IMovieCardInfo) => {
                            return <MovieCard key={movieCard.id} details={movieCard} />
                        })
                        :
                        <h1>No Movies Available !!!</h1>
                }
            </div>
        </div >
    )
}

export default MovieList