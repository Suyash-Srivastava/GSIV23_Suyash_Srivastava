/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react'
import styles from './SearchBar.module.css'
import search_icon from '../../assets/svg/search.svg'
import { getMovieList, searchInMovieList } from '../../api/apiCalls'
import { useDispatch } from 'react-redux'

import { setMovieList } from '../../utils/store/slices/movieSlice'
const SearchBar = () => {

  // const searchInput: string = useSelector((state: RootState) => state.searchinput.values)
  const [searchInput, setSearchInput] = useState('')
  const dispatch = useDispatch()
  const searchTimeoutRef = useRef(null);
  const controller = new AbortController()
  let searchTimeout:any;

  useEffect(() => {
    //Debouncing implemented in Search
    if (searchTimeout) {
      clearTimeout(searchTimeout)
      controller.abort()
    }
    if (searchInput.length > 0) {
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
  }, [searchInput])

  async function getSearchResults() {
    const reslts = await searchInMovieList(searchInput, 1, controller)
    dispatch(setMovieList(reslts))
  }
  async function setAllMovieList() {
    const movielist = await getMovieList(1)
    dispatch(setMovieList(movielist))
  }

  return (
    <div className={styles.maincontainer}>
      <img className={styles.search_icon} src={search_icon} alt="search" />
      <input className={styles.search_input} placeholder='Search' type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
    </div>
  )
}

export default SearchBar