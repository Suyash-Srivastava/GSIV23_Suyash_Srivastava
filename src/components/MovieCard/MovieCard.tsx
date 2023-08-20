import styles from './MovieCard.module.css'
import { IMovieCardInfo } from '../../api/apiInterface'
import { useNavigate } from "react-router-dom";
import placholder_poster from '../../../src/assets/png/poster_placeholder.png'

const MovieCard = ({ details }: { details: IMovieCardInfo }) => {

  const { id, title, vote_average, poster_path, overview } = details

  const navigate = useNavigate()

  return (
    <div className={styles.maincontainer} onClick={() => navigate('/moviedetail/' + id)}>
      <div className={styles.imagecontainer}>
        {
        poster_path ?
          <img className={styles.imagearea} src={'https://image.tmdb.org/t/p/original/' + poster_path} alt="poster" /> :
          <img className="placeholderimg" src={placholder_poster} alt="loading poster" />
        }
      </div>


      <div className={styles.movie_details}>
        <div className={styles.title_rating}>
          <div className={styles.title} title={title}>{title}</div>
          <div className={styles.rating}>(Rating: {vote_average})</div>
        </div>
        <div className={styles.desc} title={overview}>{overview}</div>
      </div>
    </div>
  )
}

export default MovieCard