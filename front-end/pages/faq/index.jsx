import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import Layout from "@/components/Layout";
import faqData from "@/utils/faqData";

const QandA = () => {
  const [activeCategory, setActiveCategory] = useState("Shipping");
  const [activeIndex, setActiveIndex] = useState(null);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setActiveIndex(null);
  };

  const handleToggle = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <Layout>
      <section className="container mx-auto pt-40 mb-20" id="FAQ">
        <div className="xl:ms-10 lg:ms-10 text-center text-white">
          <h1 className="text-3xl text-purple font-bold mb-4">
            Frequently Asked Questions
          </h1>
        </div>

        <div className="flex xl:flex-row lg:flex-row md:flex-col  sm:flex-col xs:flex-col">
          <div className="mt-20 xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full xl:text-left lg:text-left md:text-center xl:mx-10 lg:mx-10 md:mx-auto sm:text-center xs:text-center">
            <div className="mt-4 space-y-8 lg:mt-8 text-white">
              <a
                href="#!"
                className={`block text-2xl text-cyan hover:underline cursor-pointer ${
                  activeCategory === "Shipping"
                    ? "text-cyan underline"
                    : "text-white"
                }`}
                onClick={() => handleCategoryChange("Shipping")}
              >
                Shipping Questions
              </a>
              <a
                href="#!"
                className={`block text-2xl text-cyan hover:underline cursor-pointer ${
                  activeCategory === "Ordering"
                    ? "text-cyan underline"
                    : "text-white"
                }`}
                onClick={() => handleCategoryChange("Ordering")}
              >
                Ordering Questions
              </a>
              <a
                href="#!"
                className={`block text-2xl text-cyan hover:underline cursor-pointer ${
                  activeCategory === "ReturnExchange"
                    ? "text-cyan underline"
                    : "text-white"
                }`}
                onClick={() => handleCategoryChange("ReturnExchange")}
              >
                Return & Exchange Questions
              </a>
              <a
                href="#!"
                className={`block text-2xl text-cyan hover:underline cursor-pointer ${
                  activeCategory === "General"
                    ? "text-cyan underline"
                    : "text-white"
                }`}
                onClick={() => handleCategoryChange("General")}
              >
                General Questions
              </a>
              <a
                href="#!"
                className={`block text-2xl text-cyan hover:underline cursor-pointer ${
                  activeCategory === "Product"
                    ? "text-cyan underline"
                    : "text-white"
                }`}
                onClick={() => handleCategoryChange("Product")}
              >
                Product Questions
              </a>
            </div>
          </div>

          <div className="container px-6 py-12 mx-auto">
            <div className="mt-8 space-y-8 lg:mt-12">
              {faqData[activeCategory].map((faq, index) => (
                <div className="p-8 bg-pitchBlack rounded-lg">
                  <button
                    key={index}
                    className="flex items-center justify-between w-full"
                    onClick={() => handleToggle(index)}
                  >
                    <h1 className="font-semibold text-left text-gray-200 hover:text-cyan">
                      {faq.question}
                    </h1>

                    <span className="text-white hover:text-cyan">
                      {activeIndex === index ? <FaMinus /> : <FaPlus />}
                    </span>
                  </button>

                  <div
                    key={index}
                    className={`mt-5 bg-cyan rounded-2xl p-5 ${
                      activeIndex === index ? "block" : "hidden"
                    }`}
                  >
                    <p className="text-pitchBlack font-semibold xl:text-left lg:text-left md:text-left sm:text-center xs:text-center">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default QandA;
