import React from "react";
import revs from "./revs";

const Reviews = () => {
  return (
    <>
      <section className="container mx-auto mb-48">
        <div className="font-akira">
          <h1 className="xl:text-7xl lg:text-7xl md:text-6xl sm:text-5xl xs:text-4xl text-white tracking-widest uppercase scale-y-90 text-center pb-10 leading-tight">
            reviews
          </h1>
          <h1 className="xl:text-7xl lg:text-7xl md:text-6xl sm:text-5xl xs:text-4xl text-white tracking-widest uppercase scale-y-90 text-center blur-lg opacity-50 relative xl:-top-24 lg:-top-24 md:-top-20 sm:-top-16 xs:-top-16 leading-tight">
            reviews
          </h1>
        </div>

        <div className="container mx-auto flex xl:flex-row lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-8">
          {revs.map((rev) => (
            <div className="flex xl:flex-row lg:flex-col md:flex-col sm:flex-col xs:flex-col py-10 bg-pitchBlack text-white rounded-3xl shadow-[0_0_10px_5px_#00C2FF]">
              <div className="xl:mx-5 relative xl:top-0 lg:-top-5 md:-top-5 sm:-top-5 xs:-top-5 lg:mx-auto md:mx-auto sm:mx-auto xs:mx-auto">
                <img
                  src={rev.img}
                  className="rounded-full xl:w-96 lg:w-36 md:w-40 sm:w-40 xs:w-36"
                  alt=""
                />
              </div>
              <div className="px-2 xl:text-left lg:text-center md:text-center sm:text-center xs:text-center">
                <h1 className="text-2xl font-bold pb-3">{rev.name}</h1>
                <p className="font-medium">{rev.review}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Reviews;
