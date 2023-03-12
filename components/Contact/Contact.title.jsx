import React from 'react'
import Image from "next/image";
import IMG from "../../public/flex-ui-assets/logos/Logo_bestech.png";
import phone from "../../public/flex-ui-assets/icons/telephone.png";
import phone1 from "../../public/flex-ui-assets/icons/telephone (1).png";
import email from "../../public/flex-ui-assets/icons/email.png";
import email1 from "../../public/flex-ui-assets/icons/email (1).png";
import Social from "../../public/flex-ui-assets/icons/social-media.png";
import Social1 from "../../public/flex-ui-assets/icons/social-media (1).png";
import Tiktok from '../../public/flex-ui-assets/icons/tiktok.png'
import Tiktok1 from '../../public/flex-ui-assets/icons/tiktok (1).png'
import facebook from '../../public/flex-ui-assets/icons/facebook.png'
import IG from '../../public/flex-ui-assets/icons/instagram.png'

export default function Contack_title() {
    return (
        <div data-aos="fade-up" class="w-full lg:text-auto px-4 lg:w-1/2 xl:w-6/12">
            <div class="mb-12 max-w-[570px] lg:mb-0">
                <span class="text-primary mb-4 block text-base font-semibold">
                    Contact Us
                </span>
                <h2 class="text-dark flex items-center mb-6 text-[32px] font-bold uppercase sm:text-[40px] lg:text-[36px] xl:text-[40px] text-black dark:text-white">
                    <Image src={IMG} width={100} height={100} alt='Bestech'/><span>Bestech saas</span>
                </h2>
                <p class="text-body-color mb-9 text-base leading-relaxed">
                    ເລີມຕົ້ນການເດີນທາງຂອງທ່ານກັບການພັດທະນາຊອບແວຂອງພວກເຮົາ
                </p>
                <div class="mb-8 flex w-full max-w-[370px]">
                    <div class="bg-primary text-primary mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-opacity-5 sm:h-[70px] sm:max-w-[70px]">
                        <span className='dark:hidden'><Image src={phone} width={35} height={35} alt='phone' /></span>
                        <span className='dark:inline hidden'><Image src={phone1} width={35} height={35} alt='phone' /></span>
                    </div>
                    <div class="w-full text-black dark:text-white">
                        <h4 class="text-dark mb-1 text-xl font-bold">Phone Number</h4>
                        <p class="text-body-color text-base">(+856) 20-7859-3333</p>
                    </div>
                </div>
                <div class="mb-8 flex w-full max-w-[370px]">
                    <div class="bg-primary text-primary mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-opacity-5 sm:h-[70px] sm:max-w-[70px]">
                        <span className='dark:hidden'><Image src={email} width={35} height={35} alt='phone' /></span>
                        <span className='dark:inline hidden'><Image src={email1} width={35} height={35} alt='phone' /></span>
                    </div>
                    <div class="w-full text-black dark:text-white">
                        <h4 class="text-dark mb-1 text-xl font-bold">Email Address</h4>
                        <p class="text-body-color text-base">info@bestech.la</p>
                    </div>
                </div>
                <div class="mb-8 flex w-full max-w-[370px]">
                    <div class="bg-primary text-primary mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-opacity-5 sm:h-[70px] sm:max-w-[70px]">
                        <span className='dark:hidden'><Image src={Social} width={35} height={35} alt='phone' /></span>
                        <span className='dark:inline hidden'><Image src={Social1} width={35} height={35} alt='phone' /></span>
                    </div>
                    <div class="w-full text-black dark:text-white">
                        <h4 class="text-dark mb-1 text-xl font-bold">Social Online</h4>
                        <div class="flex items-center justify-start transition-opacity duration-300">
                            <a href="https://www.tiktok.com/@bestech.la?lang=th" target='_blank' class="dark:hidden rounded-full mr-2 opacity-50 hover:opacity-100 ">
                                <Image src={Tiktok} width={30} height={30} alt='WA' />
                            </a>
                            <a href="https://www.tiktok.com/@bestech.la?lang=th" target='_blank' class="dark:inline hidden rounded-full mr-2 opacity-50 hover:opacity-100 ">
                                <Image src={Tiktok1} width={30} height={30} alt='WA' />
                            </a>
                            <a href="https://www.facebook.com/BesTech.la" target='_blank' class="rounded-full mr-2 opacity-50 hover:opacity-100 ">
                                <Image src={facebook} width={30} height={30} alt='FB' />
                            </a>
                            <a href="https://www.instagram.com/bbestech/" target='_blank' class="rounded-full mr-2 opacity-50 hover:opacity-100 ">
                                <Image src={IG} width={30} height={30} alt='IG' />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
