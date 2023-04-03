import React, { useEffect } from 'react'
import { db_news } from '../../util/data'
import Image from "next/image";
import { useState } from 'react';
import axios from 'axios';
import { Footer } from "../Footer/Footer";
import iconclos2 from '../../public/flex-ui-assets/icons/cancel (4).png'
import iconclos1 from '../../public/flex-ui-assets/icons/cancel (5).png'
import { Message_data } from './Index';
import { useContext } from 'react';
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';

export default function Blog() {

    const { message, setMessage } = useContext(Message_data);
    const { Items, setItems } = useContext(Message_data)
    const { Status, setStatus } = useContext(Message_data)
    const { Display, setDisplay } = useContext(Message_data)

    console.log('Items', Items)

    function Send(e) {
        setMessage('OK')
    }

    const [API, setAPI] = useState([])
    useEffect(() => {
        axios.get(db_news).then((res) => {
            setAPI(res.data.reverse())
        })
    }, [])

    const [IMG, setIMG] = useState([])
    function modal(e) {
        if (Display === false) {
            setIMG(e.img)
            setDisplay(true)
        } else {
            setDisplay(false)
            setStatus(false)
        }
    }

    function pushItems(e) {
        setItems(e)
        setStatus(false)
        document.getElementById('scrollItems').scrollTop -= 20000
    }

    function modalItems() {
        if (Status == false) {
            setStatus(true)
            setDisplay(true)
        } else {
            setStatus(false)
        }
    }

    const [page, setpage] = useState(1)
    const [countIndex, setcountIndex] = useState(0)
    const [count, setcount] = useState(8)
    function next() {
        if (page < (API.slice((0), (API.filter((e) => e.status === true).length) / 8).length + 1)) {
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

    return (
        Items == '' ? '' :
            <>
                <div onClick={modal} className={`fixed z-50 w-[80%] h-[10%] top-0 left-0 ${Display == false ? 'hidden' : ''}`}></div>
                <div id='scrollItems' className={`fixed z-40 w-screen h-screen scroll-smooth overflow-x-auto dark:bg-black bg-white top-0 left-0 flex justify-center ${Display == false ? 'hidden' : ''}`}>
                    <div className="w-full">
                        <div className="flex justify-center">
                            <div className="w-[75%]">
                                <div className="fixed sm:right-0 right-10 sm:p-[10%] xl:pt-[8%] pt-[20%]">
                                    <span className='hidden dark:inline'>
                                        <Image src={iconclos1} alt='' onClick={modal} />
                                    </span>
                                    <span className='dark:hidden'>
                                        <Image src={iconclos2} alt='' onClick={modal} />
                                    </span>
                                </div>
                                <div className="w-full text-center pt-[20%] sm:pt-[5%] pb-[5%] text-[32px] dark:text-white text-black">
                                    {/* <span>ປະກາດ </span> */}
                                </div>
                                <div className="flex justify-center">
                                    <div className="w-[70%] pb-[10%] grid gap-5">

                                        <div className={`${Status == false ? '' : 'hidden'} grid gap-1`}>
                                            <p className='text-[44px] py-[5%] text-black dark:text-white'>{Items.Header}</p>
                                            <div className="lg:flex mt-4 items-center space-x-6 sm:mt-0">
                                                <p className='text-[14px] w-full text-black dark:text-white'>{Items.Currendate}</p>
                                                <div className='flex justify-start lg:justify-end w-full space-x-2'>
                                                    <FacebookShareButton url={Items.Shares}><FacebookIcon className='w-[30px]' /></FacebookShareButton>
                                                    <TwitterShareButton url={Items.Shares}><TwitterIcon className='w-[30px]' /> </TwitterShareButton>
                                                    <WhatsappShareButton url={Items.Shares}><WhatsappIcon className='w-[30px]' /> </WhatsappShareButton>
                                                </div>
                                            </div>

                                            <ul class="fixed -ml-[8%] lg:inline hidden w-[100px] text-sm font-medium overflow-hidden text-center text-white border border-gray-200 rounded-lg bg-gray-700 dark:border-gray-600">
                                                <li class="w-full py-3 ">Share</li>
                                                <li class="w-full py-3 bg-blue-800"><FacebookShareButton url={Items.Shares}>Facebook</FacebookShareButton></li>
                                                <li class="w-full py-3 bg-blue-400"><TwitterShareButton url={Items.Shares}>Twitter</TwitterShareButton></li>
                                                <li class="w-full py-3 bg-green-800"><WhatsappShareButton url={Items.Shares}>WhatApp</WhatsappShareButton></li>
                                            </ul>


                                            <div className={`grid grid-cols-${Items.img.length - 1} gap-4`}>
                                                {(Items.img).map((item, index) => (
                                                    <img src={item.post} className={`rounded-lg mb-5 ${index == 0 ? ('col-span-' + Items.img.length) : ''}`} alt="" />
                                                ))}
                                            </div>

                                            {(Items.Content).map((content, index) => (
                                                <p className='text-[20px] text-black dark:text-white mt-2'>{index === 0 ? <strong>ເນື້ອໃນ: </strong> : '> '} {content.text}</p>
                                            ))}

                                            {(Items.title).map((item) => (
                                                <>
                                                    {item.text == '' ? '' :
                                                        <p className='text-[24px] text-black dark:text-white mt-2'>{item.text}</p>
                                                    }
                                                    {item.url == '' ? '' :
                                                        <p className='text-[24px] text-black dark:text-white'>
                                                            <a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a>
                                                        </p>
                                                    }
                                                    {item.email == '' ? '' :
                                                        <p className='text-[24px] text-black dark:text-white'>
                                                            <a href={`mailto:${item.email}`}>{item.email}</a>
                                                        </p>
                                                    }
                                                    {item.phone == '' ? '' :
                                                        <p className='text-[24px] text-black dark:text-white'>{item.phone}</p>
                                                    }
                                                </>
                                            ))}
                                        </div>
                                        {API.filter((e) => e.status == true).length < 0 ? '' :
                                            <div className='py-[2%] text-black dark:text-white'>
                                                <p className={`${Status == true ? 'text-[44px]' : 'text-[22px]'} py-2`}>ຂ່າວແນະນຳ</p>
                                                <hr />
                                                <div className={`${Status == true ? 'hidden' : ''} grid xl:grid-cols-4 lg:grid-cols-2 gap-4 mt-[2%]`}>
                                                    {API.filter((e) => e.status == true).slice(countIndex, count).map((item, index) => (
                                                        <div className="rounded-lg p-1 dark:bg-gray-800 bg-gray-200">
                                                            {(item.img).slice(0, 1).map((img) => (
                                                                <img onClick={() => pushItems(item)} src={img.post} className='w-full rounded-lg max-h-[20vh] object-cover' alt="" />
                                                            ))}
                                                            <div class="z-20 top-[60%] right-[15%] mt-3 text-start max-h-[400px] overflow-auto p-5 text-black dark:text-white">
                                                                <p className='pb-2 text-[18px]'>{Items.Header}</p>
                                                                <p className='py-2 text-[12px]'>{Items.Currendate}</p>
                                                            </div>
                                                        </div>
                                                    ))}

                                                </div>

                                                <div className={`${Status == false ? 'hidden' : ''} grid grid-flow-row-3 gap-4 mt-[2%]`}>
                                                    {API.filter((e) => e.status == true).slice(countIndex, count).map((item, index) => (
                                                        <div className="rounded-lg p-1 flex dark:bg-gray-800 bg-gray-200">
                                                            {(item.img).slice(0, 1).map((img) => (
                                                                <img onClick={() => pushItems(item)} src={img.post} className='w-[30%] rounded max-h-[20vh] object-cover' alt="" />
                                                            ))}
                                                            <div class="z-20 top-[60%] w-[80%] right-[15%] mt-3 text-start max-h-[400px] overflow-auto p-5 text-black dark:text-white">
                                                                <p className='pb-2 text-[22px]'>{Items.Header}</p>
                                                                <p className='pb-2'>{Items.Currendate}</p>
                                                            </div>
                                                        </div>
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
                                                </nav>
                                            </div>
                                        }

                                        <hr />
                                        <p className='text-black dark:text-white text-[22px]'>Comment</p>
                                        <form>
                                            <div class="mb-6">
                                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                                <input type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name:" required />
                                            </div>
                                            <div class="mb-6">
                                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                                <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required />
                                            </div>
                                            <div class="mb-6">
                                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Comment</label>
                                                <textarea type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                            </div>
                                            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send Message</button>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </>

    )
}
