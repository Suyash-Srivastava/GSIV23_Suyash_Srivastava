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

  const controller = new AbortController()

  useEffect(() => {
    //Debouncing implemented in Search
    let searchTimeout;

    if (searchTimeout) {
      controller.abort()
      clearTimeout(searchTimeout)
    }
    if (searchInput.length > 0) {
      searchTimeout = setTimeout(() => getSearchResults(controller), 500)
    }
    else {
      setTimeout(() => setAllMovieList(), 500)
    }
  }, [searchInput])

  async function getSearchResults(controller: AbortController) {
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