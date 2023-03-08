import React from "react";
import Logo from "../elements/common/Logo"

export const Footer = () => {
  return (
    <section className="text-coolGray-900 dark:text-white">
      <div className="border-b border-coolGray-100" />
      <div className="grid lg:grid-cols-2 md:gird-cols-1 mt-3">
        <div className="w-full  lg:w-4/12 px-4 lg:mb-0 grid lg:grid-cols-2 md:grid-cols-1">
          <Logo className="md:items-center" />
        </div>
        <p className="m-5 md:pb-7 text-lg font-medium lg:text-start md:text-center sm:text-center">
          © 2022 BamBoo BI. All rights reserved.
        </p>
      </div>
    </section>
  );
};
