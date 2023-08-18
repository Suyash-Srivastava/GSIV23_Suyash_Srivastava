/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import styles from './SearchBar.module.css'
import search_icon from '../../assets/svg/search.svg'
import { getMovieList, searchInMovieList } from '../../api/apiCalls'
import { useDispatch } from 'react-redux'

import { setMovieList } from '../../utils/store/slices/movieSlice'
const SearchBar = () => {

  // const searchInput: string = useSelector((state: RootState) => state.searchinput.values)
  const [searchInput, setSearchInput] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    //Debouncing implemented in Search
    if (searchInput.length > 0) {
      const searchTimeout = setTimeout(getSearchResults, 500)
      return () => clearTimeout(searchTimeout)
      //TODO: Additnaly abort call for api should be written here
    }
    else{
      setAllMovieList()
    }
  }, [searchInput])

  async function getSearchResults() {
    const reslts = await searchInMovieList(searchInput, 1)
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