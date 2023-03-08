import React, { useState, useEffect } from "react";
import CrossButton from "./elements/CrossButton";
// import Humbeger from "./elements/Humbuger";
import InvertedButton from "../elements/common/InvertedButton";
import Logo from "../elements/common/Logo";
import Button from "../elements/common/Button";
import Toggle from "../elements/Darkmode/ThemeToggle";
import Link from "next/link";
// import { GiHamburgerMenu } from "react-icons/gi";
import {BsLayoutTextSidebar} from "react-icons/bs"
// import {IoIosList} from "react-icons/io"


export default function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [openNav, setOpenNav] = useState(false);
  const [active, setActive] = useState(0);
  function showButton() {
    setScrollY(window.pageYOffset);
  }
  function watchScroll() {
    window.addEventListener("scroll", showButton);
  }
  useEffect(() => {
    watchScroll();
    return () => {
      window.removeEventListener("scroll", showButton);
    };
  });

  const [nav, setNav] = useState(false);
  return (
    <div
      className={`sticky top-0 z-50 transition-all ${
        scrollY > 10 ? "bg-blue-700" : "backdrop-blur-sm"
      } dark:bg-black`}
    >
      <nav id="navbar" className="flex justify-between p-2 px-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-3">
          <BsLayoutTextSidebar
            className="xl:hidden h-8 w-8 mt-2"
            // className="m-auto xl:hidden mr-5 dark:text-white white:text-dark bg-yellow:text-white h-8 w-8 text-yellow-500"
            aria-label="humburger"
            onClick={() => setOpenNav((val) => !val)}
          /> 
          <Logo onClick={() => setActive(0)} />
          </div>
          <ul className="hidden lg:flex lg:justify-center gap-6 w-full">
            <li onClick={() => setActive(0)}>
              <Link href="/">
                <a
                  className={`font-medium ${
                    active === 0 ? "bg-blue-500 text-white pl-4 pr-4 rounded" : ""
                  } dark:text-white px-1 py-1 hover:bg-blue-500 hover:text-white hover:rounded dark:hover:text-coolGray-500`}
                >
                  ຫນ້າຫລັກ
                </a>
              </Link>
            </li>
            <li onClick={() => setActive(1)}>
              <Link href="/#feature">
                <a
                  className={`font-medium ${
                    active === 1 ? "bg-blue-500 text-white pl-4 pr-4 rounded" : ""
                  } dark:text-white px-1 py-1 hover:bg-blue-500 hover:text-white hover:rounded dark:hover:text-coolGray-500`}
                >
                  ຄຸນ​​ລັກສະນະ
                </a>
              </Link>
            </li>
            <li onClick={() => setActive(2)}>
              <Link href="/#faq">
                <a
                  className={`font-medium ${
                    active === 2 ? "bg-blue-500 text-white pl-4 pr-4 rounded" : ""
                  } dark:text-white px-1 py-1 hover:bg-blue-500 hover:text-white hover:rounded dark:hover:text-coolGray-500`}
                >
                  ຄຳຖາມຍອດຮິດ
                </a>
              </Link>
            </li>
            <li onClick={() => setActive(3)}>
              <Link href="/#blog">
                <a
                  className={`font-medium ${
                    active === 3 ? "bg-blue-500 text-white pl-4 pr-4 rounded" : ""
                  } dark:text-white px-1 py-1 hover:bg-blue-500 hover:text-white hover:rounded dark:hover:text-coolGray-500`}
                >
                  ບົດຄວາມ
                </a>
              </Link>
            </li>
            <li onClick={() => setActive(4)}>
              <Link href="/#prices">
                <a
                  className={`font-medium ${
                    active === 4 ? "bg-blue-500 text-white pl-4 pr-4 rounded" : ""
                  } dark:text-white px-1 py-1 hover:bg-blue-500 hover:text-white hover:rounded dark:hover:text-coolGray-500`}
                >
                  ລາຄາ
                </a>
              </Link>
            </li>
            <li onClick={() => setActive(5)}>
              <Link href="/#about">
                <a
                  className={`font-medium ${
                    active === 5 ? "bg-blue-500 text-white pl-4 pr-4 rounded" : ""
                  } dark:text-white px-1 py-1 hover:bg-blue-500 hover:text-white hover:rounded dark:hover:text-coolGray-500`}
                >
                  ກ່ຽວກັບພວກເຮົາ
                </a>
              </Link>
            </li>
            <li onClick={() => setActive(6)}>
              <Link href="/#contact">
                <a
                  className={`font-medium ${
                    active === 6 ? "bg-blue-500 text-white pl-4 pr-4 rounded" : ""
                  } dark:text-white px-1 py-1 hover:bg-blue-500 hover:text-white hover:rounded dark:hover:text-coolGray-500`}
                >
                  ຕິດຕໍ່ພວກເຮົາ
                </a>
              </Link>
            </li>
          </ul>
          {/* <div className="gap-1 hidden w-48 xl:flex">
            <InvertedButton>ເຂົ້າສູ່ລະບົບ</InvertedButton>
            <Button>ລົງທະບຽນ</Button>
          </div> */}
        </div>

        
        <Toggle className="m-auto"/>
      </nav>
      <div
        className={`xl:hidden fixed top-0 left-0 z-40 ${
          !openNav ? "hidden" : "inline-block"
        }  w-full h-full bg-opacity-50 bg-coolGray-900`}
      >
        <div className="fixed top-0 bottom-0 left-0 w-2/3 max-w-xs bg-white dark:bg-black">
          <nav className="relative h-full p-6 overflow-y-auto">
            <div className="flex flex-col justify-between h-full">
              <Logo onClick={() => setActive(0)} />
              <ul className="py-6">
                <li className="mr-12" onClick={() => setActive(0)}>
                  <Link href="/">
                    <a
                      className={`block px-4 py-3 font-medium hover:bg-yellow-500 hover:rounded-lg
                    ${active === 0 ? "bg-yellow-500 rounded-lg" : ""}
                     dark:text-white dark:hover:text-coolGray-500`}
                    >
                      ຫນ້າຫລັກ
                    </a>
                  </Link>
                </li>
                <li className="mr-12" onClick={() => setActive(1)}>
                  <Link href="/#feature">
                    <a
                      className={`block px-4 py-3 font-medium hover:bg-yellow-500 hover:rounded-lg
                    ${active === 1 ? "bg-yellow-500 rounded-lg" : ""}
                     dark:text-white dark:hover:text-coolGray-500`}
                    >
                      ຄຸນ​​ລັກສະນະ
                    </a>
                  </Link>
                </li>
                <li className="mr-12" onClick={() => setActive(2)}>
                  <Link href="/#faq">
                    <a
                      className={`block px-4 py-3 font-medium hover:bg-yellow-500 hover:rounded-lg
                    ${active === 2 ? "bg-yellow-500 rounded-lg" : ""}
                     dark:text-white dark:hover:text-coolGray-500`}
                    >
                      ຄຳຖາມຍອດຮິດ
                    </a>
                  </Link>
                </li>
                <li className="mr-12" onClick={() => setActive(3)}>
                  <Link href="/#blog">
                    <a
                      className={`block px-4 py-3 font-medium hover:bg-yellow-500 hover:rounded-lg
                    ${active === 3 ? "bg-yellow-500 rounded-lg" : ""}
                     dark:text-white dark:hover:text-coolGray-500`}
                    >
                      ບົດຄວາມ
                    </a>
                  </Link>
                </li>
                <li className="mr-12" onClick={() => setActive(4)}>
                  <Link href="/#prices">
                    <a
                      className={`block px-4 py-3 font-medium hover:bg-yellow-500 hover:rounded-lg
                    ${active === 4 ? "bg-yellow-500 rounded-lg" : ""}
                     dark:text-white dark:hover:text-coolGray-500`}
                    >
                      ລາຄາ
                    </a>
                  </Link>{" "}
                </li>
                <li className="mr-12" onClick={() => setActive(5)}>
                  <Link href="/#about">
                    <a
                      className={`block px-4 py-3 font-medium hover:bg-yellow-500 hover:rounded-lg
                    ${active === 5 ? "bg-yellow-500 rounded-lg" : ""}
                     dark:text-white dark:hover:text-coolGray-500`}
                    >
                      ກ່ຽວກັບພວກເຮົາ
                    </a>
                  </Link>
                </li>
                <li className="mr-12" onClick={() => setActive(6)}>
                  <Link href="/#contact">
                    <a
                      className={`block px-4 py-3 font-medium hover:bg-yellow-500 hover:rounded-lg
                    ${active === 6 ? "bg-yellow-500 rounded-lg" : ""}
                     dark:text-white dark:hover:text-coolGray-500`}
                    >
                      ຕິດຕໍ່ພວກເຮົາ
                    </a>
                  </Link>
                </li>
              </ul>
              <div className="flex flex-wrap">
                <div className="w-full mb-2">
                  <InvertedButton className="w-full text-center">
                    Login
                  </InvertedButton>
                </div>
                <div className="w-full">
                  <Button className="w-full text-center">Sign Up</Button>
                </div>
              </div>
            </div>
          </nav>
          <CrossButton onClick={() => setOpenNav((val) => !val)} />
        </div>
      </div>
      <div
        className={`xl:hidden fixed top-0 left-0 z-40 ${
          !openNav ? "hidden" : "inline-block"
        }  w-full h-full bg-opacity-50 bg-coolGray-900`}
      >
        <div className="fixed top-0 bottom-0 left-0 w-2/3 max-w-xs bg-white dark:bg-black">
          <nav className="relative h-full p-6 overflow-y-auto">
            <div className="flex flex-col justify-start h-full">
              <Logo onClick={() => setActive(0)} />
              <ul className="py-6">
                <li className="mr-12" onClick={() => setActive(0)}>
                  <Link href="/">
                    <a
                      className={`block px-4 py-3 font-medium hover:bg-blue-200 hover:rounded-lg
                    ${active === 0 ? "bg-blue-500 rounded-lg text-white" : ""}
                     dark:text-gray-800 dark:hover:text-coolGray-500`}
                    >
                      ຫນ້າຫລັກ
                    </a>
                  </Link>
                </li>
                <li className="mr-12" onClick={() => setActive(1)}>
                  <Link href="/#feature">
                    <a
                      className={`block px-4 py-3 font-medium hover:bg-blue-200 hover:rounded-lg
                    ${active === 1 ? "bg-blue-500 rounded-lg text-white" : ""}
                     dark:text-gray-800 dark:hover:text-coolGray-500`}
                    >
                      ຄຸນ​​ລັກສະນະ
                    </a>
                  </Link>
                </li>
                <li className="mr-12" onClick={() => setActive(2)}>
                  <Link href="/#faq">
                    <a
                      className={`block px-4 py-3 font-medium hover:bg-blue-200 hover:rounded-lg
                    ${active === 2 ? "bg-blue-500 rounded-lg text-white" : ""}
                     dark:text-gray-800 dark:hover:text-coolGray-500`}
                    >
                      ຄຳຖາມຍອດຮິດ
                    </a>
                  </Link>
                </li>
                <li className="mr-12" onClick={() => setActive(3)}>
                  <Link href="/#blog">
                    <a
                      className={`block px-4 py-3 font-medium hover:bg-blue-200 hover:rounded-lg
                    ${active === 3 ? "bg-blue-500 rounded-lg text-white" : ""}
                     dark:text-gray-800 dark:hover:text-coolGray-500`}
                    >
                      ບົດຄວາມ
                    </a>
                  </Link>
                </li>
                <li className="mr-12" onClick={() => setActive(4)}>
                  <Link href="/#prices">
                    <a
                      className={`block px-4 py-3 font-medium hover:bg-blue-200 hover:rounded-lg
                    ${active === 4 ? "bg-blue-500 rounded-lg text-white" : ""}
                     dark:text-gray-800 dark:hover:text-coolGray-500`}
                    >
                      ລາຄາ
                    </a>
                  </Link>{" "}
                </li>
                <li className="mr-12" onClick={() => setActive(5)}>
                  <Link href="/#about">
                    <a
                      className={`block px-4 py-3 font-medium hover:bg-blue-200 hover:rounded-lg
                    ${active === 5 ? "bg-blue-500 rounded-lg text-white" : ""}
                     dark:text-gray-800 dark:hover:text-coolGray-500`}
                    >
                      ກ່ຽວກັບພວກເຮົາ
                    </a>
                  </Link>
                </li>
                <li className="mr-12" onClick={() => setActive(6)}>
                  <Link href="/#contact">
                    <a
                      className={`block px-4 py-3 font-medium hover:bg-blue-200 hover:rounded-lg
                    ${active === 6 ? "bg-blue-500 rounded-lg text-white" : ""}
                     dark:text-gray-800 dark:hover:text-coolGray-500`}
                    >
                      ຕິດຕໍ່ພວກເຮົາ
                    </a>
                  </Link>
                </li>
              </ul>
              {/* <div className="flex flex-wrap">
                <div className="w-full mb-2">
                  <InvertedButton className="w-full text-center">
                    Login
                  </InvertedButton>
                </div>
                <div className="w-full">
                  <Button className="w-full text-center">Sign Up</Button>
                </div>
              </div> */}
            </div>
          </nav>
          <CrossButton onClick={() => setOpenNav((val) => !val)} />
        </div>
      </div>
    </div>
  );
}
