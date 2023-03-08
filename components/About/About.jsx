import React from "react";
export const About = () => {
  return (
    <div id="about">
      <section className="py-24 md:pb-28 text-coolGray-900 dark:text-white">
        <div className="container px-4 mx-auto">
          <div data-aos="fade-up" className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-10 lg:mb-0">
              <div className="relative transition-all h-full overflow-hidden max-w-max mx-auto rounded-md">
                <img
                  src="/flex-ui-assets/logos/aboutus.webp"
                  alt="image"
                  className="cursor-pointer transition ease-in-out hover:scale-125 duration-700"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <span className="inline-block py-px px-2 sm:ml-6 md:mb-16 text-xs leading-5 text-coolGray-900 dark:text-white bg-yellow-500 font-medium uppercase rounded-9xl">
                About Us
              </span>
              <div className="relative pt-12 pb-6 sm:p-6 mb-8">
                {/* <img
                  className="absolute top-0 left-0"
                  src="flex-ui-assets/elements/testimonials/quote-top-yellow.svg"
                  alt="img"
                />
                <img
                  className="absolute bottom-0 right-0"
                  src="flex-ui-assets/elements/testimonials/quote-down-yellow.svg"
                  alt="img"
                /> */}
                <div className="relative">
                  <h2 className="text-2xl md:text-4xl font-semibold tracking-tighter">
                    ພວກເຮົາໃຫ້ບໍລິການ ເວັບ e-Commerce ທີ່ປະສົມປະສານລົງໂຕ ກັບ
                    ຮ້ານຄ້າທີ່ມີໜ້າຮ້ານແທ້, ຊຸກຍູ້ເຄື່ອງມືການຕະຫຼາດດິຈິຕອນ
                    ເພື່ອໃຫ້ ລຸກຄ້າ ເຫັນຮ້ານຂອງທ່ານ
                    ແລ້ວມີຄວາມປະທັບໃຈໃນຄັ້ງທໍາອິດ, ແລະ
                    ເຮັດໃຫ້ລູກຄ້າເຂົ້າເຖິງຮ້ານໄດ້ຫຼາຍໂດຍທີ່ທ່ານບໍ່ຈຳເປັນຕ້ອງບືນສູ້ເລີຍ.
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
