import React from 'react'
import Contact_svg from './Contact.svg'
import Contact_title from './Contact.title'
import { NumericFormat } from 'react-number-format';

export default function Contact() {
    return (
        <>
            <section class="relative z-10 overflow-hidden lg:px-0 px-10 dark:bg-black bg-white py-20 lg:py-[120px]" id='contact'>
                <div class="container mx-auto">
                    <div class="-mx-4 flex flex-wrap lg:justify-between">
                        <Contact_title />
                        <div data-aos="fade-up" class="w-full px-4 lg:w-1/2 xl:w-5/12">
                            <div class="relative rounded-lg dark:bg-gray-800 bg-white p-8 shadow-lg sm:p-12">
                                <form>
                                    <div class="mb-6 dark:text-white text-black text-[32px] font-bold text-center">
                                        ຕິດຕໍ່ຫາເຮົາ
                                    </div>
                                    <div class="mb-6">
                                        <input
                                            type="text"
                                            placeholder="ຊື່:......"
                                            class="text-body-color border-[f0f0f0] dark:text-black dark:bg-gray-200 focus:border-primary w-full rounded border py-3 px-[14px] text-base outline-none focus-visible:shadow-none" required
                                        />
                                    </div>
                                    <div class="mb-6">
                                        <input
                                            type="text"
                                            placeholder="ນາມສະກຸນ:......"
                                            class="text-body-color border-[f0f0f0] dark:text-black dark:bg-gray-200 focus:border-primary w-full rounded border py-3 px-[14px] text-base outline-none focus-visible:shadow-none" required
                                        />
                                    </div>
                                    <div class="mb-6">
                                        <input
                                            type="text"
                                            placeholder="ອົງກອນ:......"
                                            class="text-body-color border-[f0f0f0] dark:text-black dark:bg-gray-200 focus:border-primary w-full rounded border py-3 px-[14px] text-base outline-none focus-visible:shadow-none" required
                                        />
                                    </div>
                                    <div class="mb-6">
                                        <input
                                            type="number"
                                            placeholder="ເບີໂທ:......"
                                            class="text-body-color border-[f0f0f0] dark:text-black dark:bg-gray-200 focus:border-primary w-full rounded border py-3 px-[14px] text-base outline-none focus-visible:shadow-none" required
                                        />
                                    </div>
                                    <div class="mb-6">
                                        <input
                                            type="email"
                                            placeholder="ອີເມລ:......"
                                            class="text-body-color border-[f0f0f0] dark:text-black dark:bg-gray-200 focus:border-primary w-full rounded border py-3 px-[14px] text-base outline-none focus-visible:shadow-none" required
                                        />
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            class="bg-primary border-primary w-full rounded border p-3 text-white transition hover:bg-opacity-90" required
                                        >
                                            Send Message
                                        </button>
                                    </div>
                                </form>
                                <Contact_svg />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
