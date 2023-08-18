
import { IMovieCardInfo, IMovieDetails } from '../../api/apiInterface'
import NavBar from '../../components/NavBar/NavBar'
import styles from './MovieDetail.module.css'
import useMovieDetails from './useMovieDetails'
const MovieDetail = () => {
  const { movieDetails } = useMovieDetails()
  return (
    <div className={styles.maincontainer}>
      <NavBar FirstComponent={<div className={styles.nav_heading}>Movie Details</div>} />
      <div className={styles.movie_detail_body}>
        <div className={styles.movie_detail_container}>
          <div className={styles.movie_poster}>
            <img className={styles.poster_img} src={"https://image.tmdb.org/t/p/original/" + movieDetails?.imgPath} alt="movie" />
          </div>
          <div className={styles.other_details}>
            <div className={styles.title_rating}>
              <div className={styles.title}>{movieDetails?.title}</div> 
              <div className={styles.rating}>{'('+movieDetails?.rating+')'}</div> 
              </div>
            <div className={styles.year_length_director}>
              <div>{movieDetails?.year}</div>|
              <div>{movieDetails?.movie_length}min</div>|
              <div className={styles.directors}>{movieDetails?.directors.join(', ')}</div>
            </div>
            <div className={styles.cast}>Cast: {movieDetails?.cast.join(', ')}</div>
            <div className={styles.desc}>Description: {movieDetails?.desc}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail