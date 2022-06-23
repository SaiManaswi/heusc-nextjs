import Head from 'next/head'
import { Button } from '@mantine/core'
import styles from '../styles/Home.module.css'
import mstyle from '../styles/List.module.css'
import { CNavBar } from './index.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'

export default function list() {
    return (
        <div className={styles.container}>
            <Head>
                <title>To-Do List</title>
            </Head>
            <main className={mstyle.main}>
                <CNavBar />
                <h1 className={mstyle.title}>
                    To-do List
                </h1>
                <div className={mstyle.list_container}>
                    <New_colum title='Plan to do' />
                    <New_colum title='In Progress' />
                    <New_colum title='Completed' />
                </div>
            </main>

        </div>
    )
}
function New_colum(props) {
    const [inputList, setInputList] = useState([]);

    const AddClick = (event) => {
        setInputList(inputList.concat(<Points key={inputList.length}/>));
        console.log(inputList)
    };
    return (
        <div className={mstyle.table}>
            <h2>{props.title}</h2>
            <Points />
            {inputList}
            <Button onClick={AddClick}><FontAwesomeIcon icon={faPlus} size='2x' /></Button>
        </div>
    )
    function Points() {
        return (
            <div className={mstyle.point}>
                <h2 className={mstyle.ctitle}>Hello</h2>
                <Button className={mstyle.crm} onClick={AddClick}><FontAwesomeIcon icon={faXmark} /></Button>
            </div>
        )
    }
}