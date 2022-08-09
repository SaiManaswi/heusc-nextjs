import Head from 'next/head'
import { Button } from '@mantine/core'
import mstyle from '../styles/List.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'

export default function list(props) {
    return (
        <>
            <Head>
                <title>To-Do List</title>
            </Head>
            <main className={mstyle.main}>
                <h1 className={mstyle.title}>
                    To-do List
                </h1>
                <div className={mstyle.list_container}>
                    <New_colum title='Plan to do' />
                    <New_colum title='In Progress' />
                    <New_colum title='Completed' />
                </div>
            </main>
        </>
    )
}
function New_colum(props) {
    var time = new Date();
    const [inputList, setInputList] = useState([{ title: "First Point", index: 0, editable: false }]);

    function AddClick() {
        let new_point = { title: "New Point", index: time.valueOf(), editable: false }
        setInputList(inputList.concat(new_point))
        console.log(inputList)
    };
    return (
        <div className={mstyle.table}>
            <h2>{props.title}</h2>
            {
                inputList.map((points) => {
                    return (
                        <div className={mstyle.point} draggable key={points.index}>
                            {
                                points.editable ? (
                                    <input className={mstyle.edititle} defaultValue={points.title} onBlur={(new_content) => {
                                        setInputList(inputList.filter(e => {
                                            if (e.index === points.index) {
                                                e.title = new_content.currentTarget.value
                                                e.editable = false
                                            }
                                            return e
                                        }))
                                    }} autoFocus></input>) :
                                    (
                                        <>
                                            <h2 className={mstyle.ctitle}>{points.title}</h2>
                                            <Button className={mstyle.editb} onClick={() => {
                                                setInputList(inputList.filter(e => {
                                                    if (e.index === points.index) {
                                                        e.editable = true
                                                    }
                                                    return e
                                                }))
                                            }}><FontAwesomeIcon icon={faPenToSquare} /></Button>
                                        </>
                                    )
                            }
                            <Button className={mstyle.crm} onClick={() => {
                                setInputList(inputList.filter((e) => {
                                    return e.index !== parseInt(points.index);
                                }));
                            }}><FontAwesomeIcon icon={faXmark} /></Button>
                        </div>
                    )
                })
            }
            <Button onClick={AddClick}><FontAwesomeIcon icon={faPlus} size='2x' /></Button>
        </div>
    )

}
