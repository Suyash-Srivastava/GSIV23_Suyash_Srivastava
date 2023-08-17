import {useState} from 'react'
import styles from './SearchBar.module.css'
import search_icon from '../../assets/svg/search.svg'
const SearchBar = () => {
  const [searchInput, setsearchInput] = useState('')
  return (
    <div className={styles.maincontainer}>
      <img className={styles.search_icon} src={search_icon} alt="search"/>
      <input className={styles.search_input} placeholder='Search' type="text"  value={searchInput} onChange={(e)=>setsearchInput(e.target.value)} />
    </div>
  )
}

export default SearchBar