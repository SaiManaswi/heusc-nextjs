import Head from 'next/head'
import { Button } from '@mantine/core'
import styles from '../styles/Home.module.css'
import mstyle from '../styles/List.module.css'
import { CNavBar } from './index.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faXmark,faPenToSquare } from '@fortawesome/free-solid-svg-icons'
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
    var time = new Date();
    const [inputList, setInputList] = useState([{title: "Hello",index: 0}]);

    function AddClick() {
        let new_point = {title: "hi",index: time.valueOf()}
        setInputList(inputList.concat(new_point))
        console.log(inputList)
    };
    function RemovePoint(point) {
        const new_list = inputList.filter((e)=>{
            return e.index !== parseInt(point.currentTarget.id);
        });
        setInputList(new_list);
    }
    return (
        <div className={mstyle.table}>
            <h2>{props.title}</h2>
            {
                inputList.map((points) => {
                    return (
                        <div className={mstyle.point} key={points.index}>
                            <h2 className={mstyle.ctitle} onClick={(e) => console.log(points)}>{points.title}</h2>
                            <Button className={mstyle.editb} onClick={(e) => console.log(e.currentTarget.value)} value={points.title + "Edit"}><FontAwesomeIcon icon={faPenToSquare} /></Button>
                            <Button className={mstyle.crm} onClick={RemovePoint} id={points.index}><FontAwesomeIcon icon={faXmark} /></Button>
                        </div>
                    )
                })
            }
            <Button onClick={AddClick}><FontAwesomeIcon icon={faPlus} size='2x' /></Button>
        </div>
    )

}
