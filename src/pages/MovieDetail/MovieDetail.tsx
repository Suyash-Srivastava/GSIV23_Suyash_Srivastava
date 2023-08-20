
import NavBar from '../../components/NavBar/NavBar'
import styles from './MovieDetail.module.css'
import useMovieDetails from './useMovieDetails'
import placholder_poster from '../../../src/assets/png/poster_placeholder.png'
const MovieDetail = () => {
  const { movieDetails } = useMovieDetails()

  return (
    <div className={styles.maincontainer}>
      <NavBar FirstComponent={<div className={styles.nav_heading}>Movie Details</div>} />
      <div className={styles.movie_detail_body}>
        <div className={styles.movie_detail_container}>
          <div className={styles.movie_poster}>
            {movieDetails?.imgPath ?
              <img className={styles.poster_img} src={"https://image.tmdb.org/t/p/original/" + movieDetails?.imgPath} alt="poster" />
              :
              <img className="placeholderimg" src={placholder_poster} alt="loading poster" />
            }
          </div>
          <div className={styles.other_details}>
            <div className={styles.title_rating}>
              <div className={styles.title}>{movieDetails?.title ?? 'Title Of Movie'}</div>
              <div className={styles.rating}>{'(' + (movieDetails?.rating ?? '10.0') + ')'}</div>
            </div>
            <div className={styles.year_length_director}>
              <div>{movieDetails?.year ?? 'Year of Release'}</div>|
              <div>{movieDetails?.movie_length ?? '99'}min</div>|
              <div className={styles.directors}>{movieDetails?.directors.join(', ') ?? 'Director list ...'}</div>
            </div>
            <div className={styles.cast}>Cast: {movieDetails?.cast.join(', ') ?? 'Cast list ...'}</div>
            <div className={styles.desc}>Description: {movieDetails?.desc ?? 'Movie Description is loading'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail