import styles from './NavBar.module.css'
import home from '../../assets/svg/home.svg'
import { Link } from 'react-router-dom'
const NavBar = ({FirstComponent}:{FirstComponent:JSX.Element}) => {
  return (
    <div className={styles.maincontainer}>
        <div className={styles.firstcomponent}>{FirstComponent}</div>
        <div className={styles.secondcomponent}><Link to={'/movielist'} ><img className={styles.home_icon} src={home} alt="home" /></Link></div>
        </div>
  )
}

export default NavBar