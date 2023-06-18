import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaCheck } from "react-icons/fa";
import Layout from "../../components/Layout";

export default function Success() {
  const [showPage, setShowPage] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);
  return (
    <Layout showFooter={false}>
      {showPage && (
        <div className="flex flex-col justify-center items-center xl:pt-80 lg:pt-80 md:pt-80 sm:pt-80 xs:pt-52">
          <div className="mb-7">
            <h1 className="text-green-400 xl:text-5xl lg:text-4xl md:text-4xl sm:text-4xl xs:text-2xl text-center font-akira">
              account created <br />
              successfully
            </h1>
          </div>
          <div>
            <FaCheck className="text-green-400 xl:text-7xl lg:text-7xl md:text-6xl sm:text-5xl xs:text-5xl" />
          </div>
        </div>
      )}
    </Layout>
  );
}
