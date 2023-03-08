import Image from "next/image";
import React from "react";
import icon1 from "../../public/flex-ui-assets/icons/woman.png";
import IMG2 from "../../public/flex-ui-assets/images/uxui/planet.png";
import GIF from "../../public/flex-ui-assets/gif/113616-world.gif";

export default function RightSide() {
  return (
    <div className="relative">
      <Image src={GIF} className=' md:-translate-y-40 md:-translate-x-20 inline-flex rounded-full border-8' width={950} height={950} />
      {/* <span class="absolute top-0 w-4/5 h-full flex justify-center items-center">

        <span className="bg-blue-500 p-5 rounded-full"></span>
        <span className="bg-blue-500 p-5 rounded-full"></span>
        <span className="animate-bounce bg-blue-500 p-3 rounded-full"></span>
        <span className="animate-bounce rounded-full w-full">
          <Image src={icon1} className='inline-flex rounded-full  border-8' width={50} height={50} />
          <span className="bg-gray-800 text-white rounded-xl p-2 -ml-10">laos laos laos laos laos laos</span>
        </span>
        <span className="animate-bounce rounded-full w-full">
          <Image src={icon1} className='inline-flex rounded-full border-8' width={30} height={30} />
          <Image src={icon1} className='inline-flex rounded-full border-8' width={50} height={50} />
          <Image src={icon1} className='inline-flex rounded-full border-8' width={40} height={40} />
          <span className="bg-gray-800 text-white rounded-xl p-2 -ml-20">laos laos laos laos laos laos</span>
        </span>

        <span class=" flex h-3 w-3">
          <span class="animate-ping inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
        </span>
      </span> */}
    </div>
  );
}
///////zxAZSXewdsedfsdxcsdc
