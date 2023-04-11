import React, { useEffect } from 'react'
import Image from "next/image";
import { useState } from 'react';
import { Footer } from "../Footer/Footer";
import iconclos2 from '../../public/flex-ui-assets/icons/cancel (4).png'
import iconclos1 from '../../public/flex-ui-assets/icons/cancel (5).png'
import { Message_data } from './Index';
import { useContext } from 'react';
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import Introductory_news from './Introductory_news';
import { BiCaretRight } from "react-icons/bi";

export default function Blog() {

    const { message, setMessage } = useContext(Message_data);
    const { Items, setItems } = useContext(Message_data)
    const { Status, setStatus } = useContext(Message_data)
    const { Display, setDisplay } = useContext(Message_data)

    // console.log('Items', Items)

    function Send(e) {
        setMessage('OK')
    }

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



    function modalItems() {
        if (Status == false) {
            setStatus(true)
            setDisplay(true)
        } else {
            setStatus(false)
        }
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const NotifySuccess = () => {
        toast.success("ທ່ານສົ່ງອີເມວສຳເລັດ", {
            position: toast.POSITION.TOP_RIGHT,
        });
    };
    const NotifyError = () => {
        toast.error("ທ່ານສົ່ງອີເມວບໍ່ສຳເລັດ !", {
            position: toast.POSITION.TOP_RIGHT,
        });
    };
    const onSubmit = (data) => {
        emailjs
            .send("service_ai5qxbp", "template_f8bzxjg", data, "TE716NuscD9-posuK")
            .then(
                (result) => {
                    NotifySuccess();
                },
                (error) => {
                    NotifyError();
                }
            );
        reset();
    };

    return (
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
                                    {Items == '' ? '' :
                                        <div className={`${Status == false ? '' : 'hidden'} grid gap-1`}>
                                            <p className='text-[44px] py-[5%] text-black dark:text-white'>{Items.Header}</p>
                                            <div className="lg:flex mt-4 items-center space-x-6 sm:mt-0">
                                                <p className='text-[14px] w-full text-black dark:text-white'>{Items.Currendate}</p>
                                                {/* <div className='flex justify-start lg:justify-end w-full space-x-2'>
                                                    <FacebookShareButton url={Items.Shares}><FacebookIcon className='w-[30px]' /></FacebookShareButton>
                                                    <TwitterShareButton url={Items.Shares}><TwitterIcon className='w-[30px]' /> </TwitterShareButton>
                                                    <WhatsappShareButton url={Items.Shares}><WhatsappIcon className='w-[30px]' /> </WhatsappShareButton>
                                                </div> */}
                                            </div>

                                            {/* <ul class="fixed -ml-[8%] lg:inline hidden w-[100px] text-sm font-medium overflow-hidden text-center text-white border border-gray-200 rounded-lg bg-gray-700 dark:border-gray-600">
                                                <li class="w-full py-3 ">Share</li>
                                                <li class="w-full py-3 bg-blue-800"><FacebookShareButton url={Items.Shares}>Facebook</FacebookShareButton></li>
                                                <li class="w-full py-3 bg-blue-400"><TwitterShareButton url={Items.Shares}>Twitter</TwitterShareButton></li>
                                                <li class="w-full py-3 bg-green-800"><WhatsappShareButton url={Items.Shares}>WhatApp</WhatsappShareButton></li>
                                            </ul> */}


                                            <div className={`grid grid-cols-${Items.img.length - 1} gap-4`}>
                                                {(Items.img).map((item, index) => (
                                                    <img src={item.post} className={`rounded-lg mb-5 ${index == 0 ? ('col-span-' + Items.img.length) : ''}`} alt="" />
                                                ))}
                                            </div>

                                            {(Items.Content).map((content, index) => (
                                                <p className='text-[20px] text-black dark:text-white mt-2'>{index === 0 ? <strong>ເນື້ອໃນ: </strong> : <BiCaretRight />} <label>{content.text}</label> </p>
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
                                    }

                                    <Introductory_news />

                                    <hr />
                                    <p className='text-black dark:text-white text-[22px]'>Comment</p>
                                    <form onSubmit={handleSubmit(onSubmit)}>

                                        <div class="mb-6">
                                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                            <input type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                                                dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                {...register("Name")}
                                                placeholder="Name:" required />
                                        </div>
                                        <div class="mb-6">
                                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                            <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                                                dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                {...register("Email")}
                                                placeholder="name@gmail.com"
                                                required />
                                        </div>
                                        <div class="mb-6">
                                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Comment</label>
                                            <textarea type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                                                 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                {...register("Content")}
                                                required />
                                        </div>
                                        <input
                                            type='hidden'
                                            value={Items.Shares}
                                            {...register('post')}
                                        />
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
