import React from 'react'

export default function Skeleton_navbar() {
    return (
        <nav class='select-none px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-gray-200 dark:border-gray-600'>
            <div class="container flex flex-wrap items-center justify-between mx-auto">
                <a href="#" class="flex items-center">
                    <div class="h-[50px] w-[50px] bg-gray-200 mr-2 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div class="h-[30px] w-[100px] bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                </a>

                <div class="flex md:order-2">
                    <div class="h-[30px] w-[50px] bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                </div>
                <div class='items-center space-y-8 animate-pulse md:space-y-0 md:space-x-8 justify-between w-full md:flex md:w-auto md:order-1 hidden'>
                    <ul class='flex flex-col p-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
                        <li>
                            <div class="h-[30px] w-[50px] bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        </li>
                        <li>
                            <div class="h-[30px] w-[50px] bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        </li>
                        <li>
                            <div class="h-[30px] w-[50px] bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        </li>
                        <li>
                            <div class="h-[30px] w-[50px] bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        </li>
                        <li>
                            <div class="h-[30px] w-[50px] bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        </li>
                        <li>
                            <div class="h-[30px] w-[50px] bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
