import React from 'react'
import Image from "next/image";
import whatsapp from '../../public/flex-ui-assets/icons/whatsapp.png'
import facebook from '../../public/flex-ui-assets/icons/facebook.png'
import IG from '../../public/flex-ui-assets/icons/instagram.png'
import GO from '../../public/flex-ui-assets/icons/photo-1634193295627-1cdddf751ebf.jpeg'
import { db_out_team } from '../../util/data'
import Out_team_dev from './Out_team_dev';

export default function Out_team() {
    return (
        <>
            <div className="w-full h-full flex justify-center items-center" id='outteam'>
                <div class="flex items-center justify-center min-h-screen">
                    <div class="flex flex-col">
                        <div class="flex flex-col mt-8">
                            <div class="container max-w-7xl px-4 pb-20">
                                <div data-aos="fade-up" class="flex flex-wrap justify-center text-center mb-24">
                                    <div class="w-full lg:w-screen px-4">
                                        <h1 class="dark:text-white text-gray-900 text-4xl font-bold mb-8">
                                            Meet the Team
                                        </h1>
                                        <p class="text-gray-700 dark:text-gray-300 text-lg font-light">
                                            {db_out_team.headline}
                                        </p>
                                    </div>
                                </div>

                                <div class="flex flex-wrap justify-center">
                                    {db_out_team.context.filter((o) => o.status === 'Chairman' || o.status === 'Advisor').map((item) => (
                                        <div data-aos="fade-up" class="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
                                            <div class="flex flex-col">
                                                <a href="#_" class="mx-auto">
                                                    <div class="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100 relative h-[303.3px] w-[250px] overflow-hidden">
                                                        <img src={db_out_team.wallpaper} alt='Out_team' className='h-[60%] w-full rounded-lg absolute z-0 bottom-0' />
                                                        <img src={item.img} alt='Out_team' className='h-full w-full rounded-lg absolute z-10 object-cover' />
                                                    </div>
                                                </a>

                                                <div class="text-center mt-6">
                                                    <h1 class="dark:text-white text-gray-900 text-xl font-bold mb-1">
                                                        {item.name}
                                                    </h1>

                                                    <div class="dark:text-white text-gray-700 font-light mb-2">
                                                        {item.title}
                                                    </div>

                                                    <div class="flex items-center justify-center transition-opacity duration-300">
                                                        <a href={`https://api.whatsapp.com/send/?phone=856${item.WA}`} target='_blank' class="flex rounded-full mr-2 opacity-50 hover:opacity-100 ">
                                                            <Image src={whatsapp} width={30} height={30} alt='WA' />
                                                        </a>
                                                        <a href={item.FB} target='_blank' class="flex rounded-full mr-2 opacity-50 hover:opacity-100 ">
                                                            <Image src={facebook} width={30} height={30} alt='FB' />
                                                        </a>
                                                        <a href={item.IG} target='_blank' class="flex rounded-full mr-2 opacity-50 hover:opacity-100 ">
                                                            <Image src={IG} width={30} height={30} alt='IG' />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <Out_team_dev />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
