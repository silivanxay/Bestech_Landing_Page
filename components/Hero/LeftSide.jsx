import React from "react";
import IMG from "../../public/flex-ui-assets/images/uxui/Best_uxui.jpg";
import Article from "../elements/common/Article";
import { heroContent } from "../../util/data";
import Image from "next/image";
export default function LeftSide() {
  return (
    <div className="z-2 container p-5 w-full px-10 mx-auto">
      <div className="relative z-10 flex flex-wrap justify-center items-center -mx-10">
        <div className="px-4 mb-12 md:w-1/2 md:mb-0">
          <Article content={heroContent} />
          <span class="relative flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
        </div>
      </div>
    </div>
  );
}
