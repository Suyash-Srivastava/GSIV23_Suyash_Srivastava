/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react'
import { getMovieList } from '../../api/apiCalls';
import NavBar from '../../components/NavBar/NavBar';
import styles from './MovieList.module.css'
import SearchBar from '../../components/SearchBar/SearchBar';
import { IMovieCardInfo, IMovieDetails } from '../../api/apiInterface';
import MovieCard from '../../components/MovieCard/MovieCard';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../utils/store/store';
import { setMovieList } from '../../utils/store/slices/movieSlice';
import { searchInMovieList } from '../../api/apiCalls'
import MovieCardLoader from '../../components/shared/MovieCardLoader/MovieCardLoader';

const MovieList = () => {

    const movieList: IMovieCardInfo[] = useSelector((state: RootState) => state.movies.values)
    const searchInput: string = useSelector((state: RootState) => state.searchinput.values)
    const nodeRef = useRef<HTMLInputElement>(null)

    const [loading, setloading] = useState(false)
    const [pageNo, setPageNo] = useState(1)
    const dispatch = useDispatch()

    useEffect((): any => {
        dispatch(setMovieList([]))
        setAllMovieList()
        return () => dispatch(setMovieList([]))
    }, [])

    useEffect(() => {
        if (nodeRef?.current)
            nodeRef.current.scrollTo(0, 0)
    }, [searchInput])


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

    async function setSeachResults() {
        const searchRes: IMovieDetails[] = await searchInMovieList(searchInput, pageNo)
        const newmovielist = [...movieList, ...searchRes]
        dispatch(setMovieList(newmovielist))
        setPageNo((old) => old + 1)
    }


    const handleScroll = async (event: any) => {
        const scrollHeight = event.target.scrollHeight;
        const scrollTop = event.target.scrollTop;
        const clientHeight = event.target.clientHeight;
        if (clientHeight + scrollTop + 1 >= scrollHeight) {
            if (searchInput.length > 0) {
                 await setSeachResults()
            }
            else {
             await setAllMovieList();
            }
        
        }
    };


    return (
        <div className={styles.maincontainer}>
            <NavBar FirstComponent={<SearchBar />} />

            <div className={styles.movielistcontainer} ref={nodeRef} onScroll={handleScroll}>

                {
                    loading === true ? (
                        <>
                         <MovieCardLoader /> 
                         <MovieCardLoader /> 
                         <MovieCardLoader /> 
                         <MovieCardLoader /> 
                         <MovieCardLoader /> 
                         <MovieCardLoader />
                         </>
                    ) :
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