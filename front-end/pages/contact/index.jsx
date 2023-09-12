import React from "react";
import Link from "next/link";
import Layout from "../../components/Layout";

export default function Contact() {
  return (
    <Layout title="Login">
      <div className="container mx-auto mb-72 relative xl:top-48 lg:top-48 md:top-48 sm:top-48 xs:top-40 flex flex-col justify-center items-center xl:w-4/12 lg:w-[100%] md:w-[100%] sm:w-10/12 xs:w-[100%]">
        <div className="xl:w-[52.2rem] lg:w-[52.2rem] md:w-[45rem] sm:w-[27rem] xs:w-[20rem]">
          <h1 className="text-white text-center uppercase pb-10 xl:text-[2.7rem] lg:text-4xl md:text-4xl sm:text-4xl xs:text-3xl">
            contact
          </h1>
          <div className="text-white text-left space-y-5">
            <p>
              Thanks for taking the time to reach out to us! Please refer to our
              &nbsp;
              <Link href="/faq" className="text-cyan hover:underline">
                FAQs page
              </Link>{" "}
              &nbsp; for immediate answers to commonly asked questions.
            </p>
            <p>
              We would love to hear from you, feel free to call us from Monday -
              Friday 9:00am to 5:00pm PST at&nbsp;
              <Link
                href="https://api.whatsapp.com/send?phone=+212642319683&text=Hello, more information!"
                className="text-cyan hover:underline"
              >
                0642319683
              </Link>
              &nbsp; or email us directly at &nbsp;
              <Link
                href="mailto:support@vizion.com"
                className="text-cyan hover:underline"
              >
                support@vizion.com
              </Link>
              .
            </p>
            <p>
              You can also fill out the form below. Please be sure to include
              your correct email address so we can get back to you in a timely
              manner.
            </p>
          </div>
        </div>
        <form
          action="mailto: support@vizion.com"
          method="POST"
          className="py-10 space-y-7 xl:w-[52.4rem] lg:w-[52.4rem] md:w-[45rem] sm:w-[27rem] xs:w-[20rem]"
        >
          <div className="flex xl:flex-row lg:flex-row md:flex-row sm:flex-col xs:flex-col xl:space-x-5 lg:space-x-5 md:space-x-5 sm:space-x-0 xs:space-x-0 xl:space-y-0 lg:space-y-0 md:space-y-0 sm:space-y-5 xs:space-y-5 justify-center items-center w-full">
            <input
              type="text"
              className="font-bold py-3 rounded-xl pl-4 outline-none transition-all ease-in duration-200 hover:outline-cyan focus:outline-cyan hover:outline-4 focus:outline-4 placeholder:text-sm placeholder:uppercase w-full"
              placeholder="Your name"
            />
            <input
              type="text"
              className="font-bold py-3 rounded-xl pl-4 outline-none transition-all ease-in duration-200 hover:outline-cyan focus:outline-cyan hover:outline-4 focus:outline-4 placeholder:text-sm placeholder:uppercase w-full"
              placeholder="Your email"
            />
          </div>
          <textarea
            placeholder="Your message"
            className="mt-5 w-full h-[15rem] placeholder:uppercase placeholder:text-gray-600 text-pitchBlack placeholder:font-semibold font-semibold placeholder:text-md bg-white px-5 py-2 outline-none transition-all ease-in duration-200 hover:outline-cyan focus:outline-cyan hover:outline-4 focus:outline-4  rounded-xl resize-none"
          ></textarea>
          <button className="bg-cyan text-black font-bold text-xl w-[100%] py-2 rounded-xl uppercase">
            send message
          </button>
        </form>
      </div>
    </Layout>
  );
}
