
import NavBar from '../../components/NavBar/NavBar'
import styles from './MovieDetail.module.css'
import useMovieDetails from './useMovieDetails'
const MovieDetail = () => {
  const {movieDetails}=useMovieDetails()
  return (
    <div className={styles.maincontainer}>
      <NavBar FirstComponent={<div>Movie Detail</div>}/>
    <div className={styles.body}>
      <div className={styles.maincontainer}>
        <div className={styles.img}></div>
        <div className={styles.other_details}>
          <div className={styles.title}></div>
          <div className={styles.year_length_director}></div>
          <div className={styles.cast}></div>
          <div className={styles.desc}></div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default MovieDetail