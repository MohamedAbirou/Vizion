import React from "react";
import Link from "next/link";

const ProductsSection = () => {
  return (
    <div className="container mx-auto mt-32">
      <div className="font-akira">
        <h1 className="xl:text-7xl lg:text-7xl md:text-6xl sm:text-5xl xs:text-4xl text-white tracking-widest uppercase scale-y-90 text-center pb-10 leading-tight">
          products
        </h1>
        <h1 className="xl:text-7xl lg:text-7xl md:text-6xl sm:text-5xl xs:text-4xl text-white tracking-widest uppercase scale-y-90 text-center blur-lg opacity-50 relative xl:-top-24 lg:-top-24 md:-top-20 sm:-top-16 xs:-top-16 leading-tight">
          products
        </h1>
      </div>
      <div
        className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 xl:gap-y-32 lg:gap-y-20 md:gap-y-20 sm:gap-y-20 xs:gap-y-20 tracking-widest uppercase font-bold gap-x-24 xl:mx-0 lg:mx-0 md:mx-0 sm:mx-5 xs:mx-0"
        style={{ fontFamily: "Montserrat" }}
      >
        <Link href="/consoles">
          <div className="bg-pitchBlack flex flex-col rounded-xl group">
            <img
              src="/images/Consoles.png"
              className="xl:w-[20rem] lg:w-[15rem] md:w-[14rem] sm:w-[15rem] xs:w-[12rem] mx-auto transition duration-700 transform-gpu group-hover:-translate-y-10 group-hover:z-10"
              alt=""
            />
            <img
              src="/images/shadow.png"
              className="mx-auto relative -top-8"
              alt=""
            />
            <h1 className="xl:text-2xl lg:text-2xl md:text-xl sm:text-xl xs:text-xl text-white text-center relative -mt-5 mb-5">
              Consoles
            </h1>
          </div>
        </Link>

        <Link href="/desktops">
          <div className="bg-pitchBlack flex flex-col rounded-xl group">
            <img
              src="/images/Desktops.png"
              className="xl:w-[19rem] lg:w-[14.1rem] md:w-[13.1rem] sm:w-[14rem] xs:w-[10rem] mb-4 relative mx-auto transition duration-700 transform-gpu group-hover:-translate-y-10 group-hover:z-10"
              alt=""
            />
            <img
              src="/images/shadow.png"
              className="mx-auto relative -top-8"
              alt=""
            />
            <h1 className="xl:text-2xl lg:text-2xl md:text-xl sm:text-xl xs:text-xl text-white text-center relative -mt-5 mb-[1.28rem]">
              Desktops
            </h1>
          </div>
        </Link>

        <Link href="/laptops">
          <div className="bg-pitchBlack flex flex-col rounded-xl group">
            <img
              src="/images/Laptops.png"
              className="xl:w-8/12 lg:w-[21rem] md:w-[20rem] sm:w-[21rem] xs:w-[16rem] relative mx-auto transition duration-700 transform-gpu group-hover:-translate-y-10 group-hover:z-10"
              alt=""
            />
            <img
              src="/images/shadow.png"
              className="mx-auto relative -top-8"
              alt=""
            />
            <h1 className="xl:text-2xl lg:text-2xl md:text-xl sm:text-xl xs:text-xl text-white text-center relative -mt-5 mb-5">
              Laptops
            </h1>
          </div>
        </Link>

        <Link href="/peripherals">
          <div className="bg-pitchBlack flex flex-col rounded-xl group">
            <img
              src="/images/Accessories.png"
              className="xl:w-4/12 lg:w-[10.75rem] md:w-[9.99rem] sm:w-[12rem] xs:w-[9rem] relative mx-auto transition duration-700 transform-gpu group-hover:-translate-y-10 group-hover:z-10 mt-3 xl:mb-2 lg:mb-2 md:mb-[0.5rem] sm:-mb-2 xs:mb-1"
              alt=""
            />
            <img
              src="/images/shadow.png"
              className="mx-auto relative -top-6"
              alt=""
            />
            <h1 className="xl:text-2xl lg:text-2xl md:text-xl sm:text-xl xs:text-xl text-white text-center relative mt-[.18rem] mb-5">
              Peripherals
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductsSection;
