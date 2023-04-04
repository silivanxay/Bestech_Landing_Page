import React, { useEffect } from 'react'
import { useState } from 'react';
import { Message_data } from './Index';
import { useContext } from 'react';
import { dataColor } from '../../util/Color'
import axios from 'axios';

export default function Introductory_news() {

    const { Items, setItems } = useContext(Message_data)
    const { Status, setStatus } = useContext(Message_data)
    const { API } = useContext(Message_data)

    function pushItems(e) {
        setItems(e)
        setStatus(false)
        document.getElementById('scrollItems').scrollTop -= 20000
    }

    const [page, setpage] = useState(1)
    const [countIndex, setcountIndex] = useState(0)
    const [count, setcount] = useState(4)
    const [index_page, setIndex_Page] = useState(0)

    function next({ item, index }) {
        setIndex_Page(index)
        if (page < (API.slice((0), ((item.Category).length) / 4).length + 1)) {
            setpage(page + 1)
        }
        if (count < (item.Category).length) {
            setcount(count + 4)
            setcountIndex(countIndex + 4)
        }
    }
    function back({ item, index }) {
        setIndex_Page(index)
        if (page > 1) {
            setpage(page - 1)
        }
        if (count > 4) {
            setcount(count - 4)
            setcountIndex(countIndex - 4)
        }
    }

    const totalColor = [];

    // function getrandomcolor(length) {
    //     let letters = '0123456789ABCDEF';
    //     let color = '#';
    //     for (let i = 0; i < length; i++) {
    //         for (let j = 0; j < 6; j++) {
    //             color += letters[Math.floor(Math.random() * 16)];
    //         }
    //         totalColor.push(color);
    //         color = '#';
    //     }
    //     return totalColor;
    // }

    // let color = (getrandomcolor(API.length));

    let x = 2

    return (
        <>
            {API.length < 0 ? '' :
                <div className='py-[2%] text-black dark:text-white'>
                    {/* <p className={`${Status == true ? 'text-[44px]' : 'text-[22px]'} py-2`}>ຂ່າວແນະນຳ</p> */}

                    <div className={`${Status == false ? '' : ''} grid gap-4 my-[2%]`}>
                        {API.map((item, index) => (
                            index == index_page ?
                                <>
                                    <p className='text-[22px] pt-[8%]'>{item.News_category}</p>
                                    <hr />
                                    <div className="rounded-lg p-1 grid gap-4">
                                        {(item.Category).slice(countIndex, count).map((item_category) => (
                                            (item_category.img).map((img, index) => (
                                                index === 0 ?
                                                    <div className='lg:flex lg:border-b-0 border-b-[0.2px] pb-2'>
                                                        <img onClick={() => pushItems(item_category)} src={img.post} className='lg:w-[30%] rounded max-h-[20vh] object-cover' alt="" />
                                                        <div class="z-20 top-[60%] lg:w-[80%] right-[15%] mt-3 text-start max-h-[400px] overflow-auto p-5 text-black dark:text-white">
                                                            <p className='pb-2 text-[22px]'>{item_category.Header}</p>
                                                            <p className='pb-2'>{item_category.Currendate}</p>
                                                        </div>
                                                    </div>
                                                    : ''
                                            ))
                                        ))}
                                        <nav className='w-full flex justify-center mt-5'>
                                            <ul class="inline-flex items-center -space-x-px">
                                                <li>
                                                    <a href="#News" onClick={() => back({ item, index })} class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                        <span class="sr-only">Previous</span>
                                                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#News" aria-current="page" class="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                                                        {page} In {(API.slice((0), ((item.Category).length) / 4).length + 1)}
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#News" onClick={() => next({ item, index })} class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                        <span class="sr-only">Next</span>
                                                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </>
                                :
                                <>
                                    <p className='text-[22px] pt-[8%]'>{item.News_category}</p>
                                    <hr />
                                    <div className="rounded-lg p-1 grid gap-4">
                                        {(item.Category).slice(0, 4).map((item_category) => (
                                            (item_category.img).map((img, index) => (
                                                index === 0 ?
                                                    <div className='lg:flex lg:border-b-0 border-b-[0.2px] pb-2'>
                                                        <img onClick={() => pushItems(item_category)} src={img.post} className='lg:w-[30%] rounded max-h-[20vh] object-cover' alt="" />
                                                        <div class="z-20 top-[60%] lg:w-[80%] right-[15%] mt-3 text-start max-h-[400px] overflow-auto p-5 text-black dark:text-white">
                                                            <p className='pb-2 text-[22px]'>{item_category.Header}</p>
                                                            <p className='pb-2'>{item_category.Currendate}</p>
                                                        </div>
                                                    </div>
                                                    : ''
                                            ))
                                        ))}
                                        <nav className='w-full flex justify-center mt-5'>
                                            <ul class="inline-flex items-center -space-x-px">
                                                <li>
                                                    <a href="#News" onClick={() => back({ item, index })} class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                        <span class="sr-only">Previous</span>
                                                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#News" aria-current="page" class="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                                                        1 In {(API.slice((0), ((item.Category).length) / 4).length + 1)}
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#News" onClick={() => next({ item, index })} class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                        <span class="sr-only">Next</span>
                                                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </>

                        ))}
                    </div>

                    {/* <p className={`${Status == true ? '' : 'hidden'} text-[22px] py-2`}>ຂ່າວແນະນຳ</p>
                    <hr />
                    <div className='grid xl:grid-cols-4 lg:grid-cols-2 gap-4 mt-[2%]'>
                        {API.slice(countIndex, count).map((item, index) => (
                            (item.Category).map((item_category) => (
                                <div className="rounded-lg p-1 dark:bg-gray-800 bg-gray-200">
                                    {(item_category.img).slice(0, 1).map((img) => (
                                        <>
                                            <img onClick={() => pushItems(item_category)} src={img.post} className='w-full rounded-lg max-h-[20vh] object-cover' alt="" />
                                            <div class="z-20 top-[60%] right-[15%] mt-3 text-start max-h-[400px] overflow-auto p-5 text-black dark:text-white">
                                                <p className='pb-2 text-[16px]'>{item_category.Header}</p>
                                                <p className='py-2 text-[12px]'>{item_category.Currendate}</p>
                                            </div>
                                        </>
                                    ))}
                                </div>
                            ))

                        ))}

                    </div>

                    <nav className='w-full flex justify-center mt-5'>
                        <ul class="inline-flex items-center -space-x-px">
                            <li>
                                <a href="#News" onClick={back} class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span class="sr-only">Previous</span>
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                </a>
                            </li>
                            <li>
                                <a href="#News" aria-current="page" class="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                                    {page} In {(API.slice((0), (API.length) / 8).length + 1)}
                                </a>
                            </li>
                            <li>
                                <a href="#News" onClick={next} class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span class="sr-only">Next</span>
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                </a>
                            </li>
                        </ul>
                    </nav> */}
                </div>
            }
        </>
    )
}
