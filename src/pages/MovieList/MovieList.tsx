/* eslint-disable @typescript-eslint/no-explicit-any */
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
    const [pageNo, setPageNo] = useState(1)
    const dispatch = useDispatch()

    useEffect(():any => {
        dispatch(setMovieList([]))
        setAllMovieList()
        return ()=>dispatch(setMovieList([]))
    }, [])

    async function setAllMovieList() {

        if (pageNo === 1)
            setloading(true)

        const movielistdata = await getMovieList(pageNo)
        const newmovielist = [...movieList, ...movielistdata]
        dispatch(setMovieList(newmovielist))
        setPageNo((old) => old + 1)

        if (pageNo === 1)
            setloading(false)

        return movielistdata
    }


    const handleScroll = async (event: any) => {
        const scrollHeight = event.target.scrollHeight;
        const scrollTop = event.target.scrollTop;
        const clientHeight = event.target.clientHeight;

        if (clientHeight + scrollTop + 1 >= scrollHeight) {
            const data = await setAllMovieList();
            if (data.length === 0) {
                setPageNo(0)
            }

        }
    };


    return (
        <div className={styles.maincontainer}>
            <NavBar FirstComponent={<SearchBar />} />

            <div className={styles.movielistcontainer} onScroll={handleScroll}>

                {
                    loading === true ? <h1>Movies are loading...</h1> :
                        movieList.length === 0 ?
                            <h1>No Movies Available !!!</h1>
                            :
                            movieList.map((movieCard: IMovieCardInfo) => {
                                return <MovieCard key={movieCard.id} details={movieCard} />
                            })

                }


            </div>
        </div>
        // </div>


    )
}

export default MovieList