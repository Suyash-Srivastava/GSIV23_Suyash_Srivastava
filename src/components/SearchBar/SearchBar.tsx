/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect,useRef} from 'react'
import { useDispatch } from 'react-redux'
import styles from './SearchBar.module.css'
import search_icon from '../../assets/svg/search.svg'
import { getMovieList, searchInMovieList } from '../../api/apiCalls'

import { setMovieList } from '../../utils/store/slices/movieSlice'
import { setSearchInput } from '../../utils/store/slices/searchSlice'

const SearchBar = () => {

  // const searchInput: string = useSelector((state: RootState) => state.searchinput.values)
  const [searchInp, setSearchInp] = useState('')
  const dispatch = useDispatch()
  const abortControllerRef = useRef(new AbortController());
  let searchTimeout:any;

  useEffect(() => {
    dispatch(setSearchInput(searchInp))
    //Debouncing implemented in Search
    if (searchTimeout) {
      clearTimeout(searchTimeout)
      abortControllerRef.current.abort()
    }
    if (searchInp.length > 0) {
      searchTimeout = setTimeout(getSearchResults, 500)
    }
    else {
      setAllMovieList()
    }
    return ()=>{
      if(searchTimeout){
        clearTimeout(searchTimeout)
      }
    }
  }, [searchInp])

  async function getSearchResults() {
    const reslts = await searchInMovieList(searchInp, 1, abortControllerRef.current)
    dispatch(setMovieList(reslts))
  }
  async function setAllMovieList() {
    const movielist = await getMovieList(1)
    dispatch(setMovieList(movielist))
  }

  return (
    <div className={styles.maincontainer}>
      <img className={styles.search_icon} src={search_icon} alt="search" />
      <input className={styles.search_input} placeholder='Search' type="text" value={searchInp} onChange={(e) => setSearchInp(e.target.value)} />
    </div>
  )
}

export default SearchBar