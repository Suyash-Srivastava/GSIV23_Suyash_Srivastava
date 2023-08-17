import styles from './NavBar.module.css'
import home from '../../assets/svg/home.svg'
const NavBar = ({FirstComponent}:{FirstComponent:JSX.Element}) => {
  return (
    <div className={styles.maincontainer}>
        <div className={styles.firstcomponent}>{FirstComponent}</div>
        <div className={styles.secondcomponent}><img className={styles.home_icon} src={home} alt="home" /></div>
        </div>
  )
}

export default NavBar