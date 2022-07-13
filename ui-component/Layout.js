import CNavBar from '../ui-component/CNavBar'
import styles from '../styles/Home.module.css'

const Layout = ({ children }) => {
    return (
        <>
            <div className={styles.container}>
                <main className={styles.main}>
                    <CNavBar />
                    {children}
                    <h2>Hello</h2>
                </main>
            </div>
        </>
    )
}
export default Layout;