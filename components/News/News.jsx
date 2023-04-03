import React, { useEffect } from 'react'
import { db_news } from '../../util/data'
import { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { Message_data } from './Index';

export default function Index_Blog(props) {
    const API = props.API

    const { message, setMessage } = useContext(Message_data);

    function sendData() {
        setMessage('messages');
    }

    const { Items, setItems } = useContext(Message_data)
    const { Display, setDisplay } = useContext(Message_data)
    const { Status, setStatus } = useContext(Message_data)

    function modal(e) {
        setItems(e)
        if (Display == false) {
            setDisplay(true)
        } else {
            setDisplay(false)
        }
    }

    function modalItems() {
        if (Status == false) {
            setStatus(true)
            setDisplay(true)
        } else {
            setStatus(false)
        }
    }

    return (
        API.filter((e) => e.status == true).length !== 0 ?
            <>
                <section id='News' data-aos="fade-up" className="relative py-[10%] z-10 gap-2 w-full overflow-hidden xl:px-10 flex flex-wrap justify-center dark:bg-black bg-white">
                    <>
                        <div onClick={sendData} className="w-[80%] xl:translate-x-[13%] text-black dark:text-white xl:w-full z-20 text-[32px] pb-[2%] underline underline-offset-8">
                            ປະກາດ
                        </div>
                        <div className="w-[80%] xl:h-[80vh] xl:flex">
                            <div className="xl:w-[50%] w-[100%] xl:mr-4">
                                <div class="relative z-10 max-h-[550px] h-auto bg-white border border-gray-200 rounded-lg shadow overflow-hidden object-cover dark:bg-gray-800 dark:border-gray-700">
                                    {API.filter((e) => e.status == true).slice(0, 1).map((item, index) => (
                                        (item.img).slice(0, 1).map((img) => (
                                            <img data-aos="zoom-out" onClick={() => modal(item)} src={img.post} className='w-full' alt="" />
                                        ))
                                    ))}

                                </div>
                                {API.filter((e) => e.status == true).slice(0, 1).map((item, index) => (
                                    <div class="z-20 top-[60%] right-[15%] mt-3 text-start max-h-[400px] overflow-auto p-5 border text-black dark:text-white border-gray-200 dark:backdrop-blur-[90px] backdrop-blur-[200px] rounded-lg shadow">
                                        <p className='pb-2'>{item.Header}</p>
                                        <p className='pb-2'>{item.Currendate}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="xl:w-[50%] w-[100%] xl:mt-0 mt-4 h-[70vh] xl:h-full grid grid-rows-4 grid-flow-col gap-4">
                                {API.filter((e) => e.status == true).slice(0, 3).map((item, index) => (
                                    (item.img).slice(0, 1).map((img) => (
                                        <div className="relative object-cover row-span-1 overflow-hidden rounded-lg opacity-hover">
                                            <img data-aos="zoom-out" src={img.post} className='w-full hover:scale-150 object-cover' alt="" />
                                            <div className='absolute z-10 px-10 top-0 left-0 w-full opacity-background h-full bg-gray-200 flex justify-center items-center'></div>
                                            <div onClick={() => modal(item)} className='absolute z-20 px-10 top-0 left-0 w-full opacity-text h-full text-black flex justify-center items-center gap-2'>
                                                <p>{item.Header}</p>
                                                <p>{item.Currendate}</p>
                                            </div>
                                        </div>
                                    ))
                                ))}
                                <button onClick={modalItems} className='dark:bg-darkCoolGray-200 bg-darkCoolGray-500 text-white dark:text-black p-2 h-[30%] rounded-lg'>ຂ່າວແນະນຳ {API.filter((e) => e.status === true).length}</button>
                            </div>
                        </div>
                    </>
                </section>
            </>
            : ''

    )
}