import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <div
      className="relative bg-black"
      style={{
        height: "54rem",
        backgroundImage: "url(/images/hero.png)",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container w-full h-full flex flex-col mx-auto relative xl:top-72 lg:top-72 md:top-72 sm:top-72 xs:top-52 text-white text-center items-center">
        <h1 className="font-akira xl:text-7xl lg:text-7xl md:text-6xl sm:text-4xl xs:text-4xl tracking-widest uppercase scale-y-90 pb-10 xl:mx-0 lg:mx-0 md:mx-0 sm:space-x-5 xs:mx-0 leading-tight">
          the <span className="text-cyan">power</span> of technology
        </h1>
        <p className="xl:text-2xl lg:text-2xl md:text-xl font-medium pb-12 tracking-normal opacity-80">
          Welcome to Vizion, your one-stop-shop for all things tech! We offer
          high-quality products at affordable prices. Browse our collection
          today and experience the future of technology with Vizion!
        </p>
        <Link href="/products">
          <button className="text-black bg-cyan hover:bg-sky-500 px-8 py-3 rounded-lg xl:text-xl lg:text-lg font-bold tracking-widest uppercase cursor-pointer">
            browse
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
