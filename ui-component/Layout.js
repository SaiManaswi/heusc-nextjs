import CNavBar from '../ui-component/CNavBar'
import styles from '../styles/Home.module.css'

const Layout = ({ children }) => {
    return (
        <>
            <div className={styles.container}>
                <CNavBar />
                {children}
            </div>
        </>
    )
}
export default Layout;