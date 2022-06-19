import Head from 'next/head'
import styles from '../styles/Home.module.css'
import mstyle from '../styles/List.module.css'

export default function list() {
    return (
        <div className={styles.container}>
            <Head>
                <title>To-Do List</title>
            </Head>
            <main className={mstyle.main}>
                <h1 className={mstyle.title}>
                    To-do List
                </h1>
                <div className={mstyle.list_container}>
                    <New_colum title='Plan to do'/>
                    <New_colum title='In Progress'/>
                    <New_colum title='Completed'/>
                </div>
            </main>

        </div>
    )
}
function New_colum(props) {
    return (
        <div className={mstyle.table}>
            <h2 className={mstyle.ltitle}>{props.title}</h2>
        </div>
    )
}