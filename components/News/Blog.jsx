import React from 'react'
import { Footer } from "../Footer/Footer";
import iconclos2 from '../../public/flex-ui-assets/icons/cancel (4).png'
import iconclos1 from '../../public/flex-ui-assets/icons/cancel (5).png'
import Image from "next/image";
import { useState } from 'react';

export default function Blog(props) {

    let API = props.API
    let Items = props.Items
    let Display = props.Status
    let IMG = props.img

    const [page, setpage] = useState(1)
    const [countIndex, setcountIndex] = useState(0)
    const [count, setcount] = useState(8)
    function next() {
        if (page < (API.slice((0), (API.length) / 8).length + 1)) {
            setpage(page + 1)
        }
        if (count < API.length) {
            setcount(count * 2)
            setcountIndex(countIndex + 8)
        }
    }
    function back() {
        if (page > 1) {
            setpage(page - 1)
        }
        if (count > 8) {
            setcount(count - 8)
            setcountIndex(countIndex - 8)
        }
    }

    const [Status, setStatus] = useState(false)
    function pushItems(e) {
        setIMG(e.img)
        setItems(e.title)
        setStatus(false)
        document.getElementById('scrollItems').scrollTop -= 20000
    }
    
    function modal(e) {
        
    }

    return (
        <>
            {/* <div onClick={modal} className={`fixed z-50 w-screen h-[10%] top-0 left-0 ${Display == true ? 'hidden' : ''}`}></div> */}
            <div id='scrollItems' className={`fixed z-40 w-screen h-screen scroll-smooth overflow-x-auto dark:bg-black bg-white top-0 left-0 flex justify-center ${Display == false ? 'hidden' : ''}`}>
                <div className="w-full">
                    <div className="w-[95%]">
                        <div className="fixed sm:right-0 right-10 sm:p-[10%] xl:pt-[8%] pt-[20%]">
                            <span className='hidden dark:inline'>
                                <Image src={iconclos1} alt='' onClick={modal} />
                            </span>
                            <span className='dark:hidden'>
                                <Image src={iconclos2} alt='' onClick={modal} />
                            </span>
                        </div>
                        <div className="w-full text-center pt-[20%] sm:pt-[7%] pb-[5%] text-[32px] dark:text-white text-black">
                            <span>ປະກາດ</span>
                        </div>
                        <div className="flex justify-center">
                            <div className="w-[70%] pb-[10%] grid gap-5">
                                <div className={`${Status == false ? '' : 'hidden'} grid gap-1`}>
                                    <div className="grid grid-cols-2 gap-4">
                                        {IMG.map((item, index) => (
                                            <img src={item.post} className={`rounded-lg mb-5 ${index == 0 ? 'col-span-2' : ''}`} alt="" />
                                        ))}
                                    </div>
                                    {Items.map((item) => (
                                        <>
                                            <p className='text-[24px] text-black dark:text-white mt-2'>{item.text}</p>
                                            <p className='text-[24px] text-black dark:text-white'>
                                                <a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a>
                                            </p>
                                            <p className='text-[24px] text-black dark:text-white'>
                                                <a href={`mailto:${item.email}`}>{item.email}</a>
                                            </p>
                                            <p className='text-[24px] text-black dark:text-white'>{item.phone}</p>
                                        </>
                                    ))}
                                </div>
                                <hr />
                                <div className="grid xl:grid-cols-4 lg:grid-cols-2 gap-4 mt-2">
                                    {API.filter((e) => e.status == true).slice(countIndex, count).map((item, index) => (
                                        <div data-aos="fade-up" className="rounded-lg p-1 dark:bg-gray-800 bg-gray-200">
                                            {(item.img).slice(0, 1).map((img) => (
                                                <img data-aos="zoom-out" onClick={() => pushItems(item)} src={img.post} className='w-full rounded-lg max-h-[20vh] object-cover' alt="" />
                                            ))}
                                            <div class="z-20 top-[60%] right-[15%] mt-3 text-start max-h-[400px] overflow-auto p-5 text-black dark:text-white">
                                                {(item.title).slice(0, 1).map((item) => (
                                                    <p className='pb-2'>{item.text}</p>
                                                ))}
                                            </div>
                                        </div>
                                    ))}

                                </div>
                                <nav className='w-full flex justify-center mt-5'>
                                    <ul class="inline-flex items-center -space-x-px">
                                        <li>
                                            <a href="#nav" onClick={back} class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                <span class="sr-only">Previous</span>
                                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#nav" aria-current="page" class="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                                                {page} In {(API.slice((0), (API.length) / 8).length + 1)}
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#nav" onClick={next} class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                <span class="sr-only">Next</span>
                                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}
