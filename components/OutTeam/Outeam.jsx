import React from 'react'
import Image from "next/image";
import whatsapp from '../../public/flex-ui-assets/icons/whatsapp.png'
import facebook from '../../public/flex-ui-assets/icons/facebook.png'
import IG from '../../public/flex-ui-assets/icons/instagram.png'
import GO from '../../public/flex-ui-assets/icons/photo-1634193295627-1cdddf751ebf.jpeg'
import { dboutteam } from '../../util/data'

export default function Outeam() {
    return (
        <>
            <div className="w-full h-full flex justify-center items-center" id='outteam'>
                <div class="flex items-center justify-center min-h-screen">
                    <div class="flex flex-col">
                        <div class="flex flex-col mt-8">
                            <div class="container max-w-7xl px-4">
                                <div data-aos="fade-up" class="flex flex-wrap justify-center text-center mb-24">
                                    <div class="w-full lg:w-screen px-4">
                                        <h1 class="dark:text-white text-gray-900 text-4xl font-bold mb-8">
                                            Meet the Team
                                        </h1>
                                        <p class="text-gray-700 dark:text-gray-300 text-lg font-light">
                                            {dboutteam.headline}
                                        </p>
                                    </div>
                                </div>

                                <div class="flex flex-wrap justify-center">
                                    {dboutteam.context.map((item) => (
                                        <div data-aos="fade-up" class="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
                                            <div class="flex flex-col">
                                                <a href="#_" class="mx-auto">
                                                    <span class="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100">
                                                        <img src={item.img} alt='Outteam'/>
                                                    </span>
                                                </a>

                                                <div class="text-center mt-6">
                                                    <h1 class="dark:text-white text-gray-900 text-xl font-bold mb-1">
                                                        {item.name}
                                                    </h1>

                                                    <div class="dark:text-white text-gray-700 font-light mb-2">
                                                        {item.title}
                                                    </div>

                                                    <div class="flex items-center justify-center transition-opacity duration-300">
                                                        <a href="#whatApp" target='_blank' class="flex rounded-full mr-2 opacity-50 hover:opacity-100 ">
                                                            <Image src={whatsapp} width={30} height={30} alt='WA' />
                                                        </a>
                                                        <a href="#facebook" target='_blank' class="flex rounded-full mr-2 opacity-50 hover:opacity-100 ">
                                                            <Image src={facebook} width={30} height={30} alt='FB' />
                                                        </a>
                                                        <a href="#Instagram" target='_blank' class="flex rounded-full mr-2 opacity-50 hover:opacity-100 ">
                                                            <Image src={IG} width={30} height={30} alt='IG' />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
