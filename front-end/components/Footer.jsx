import { useState } from "react";
import { FaAngleDoubleUp } from "react-icons/fa";
import { BsInstagram, BsFacebook, BsTwitter } from "react-icons/bs";
import Link from "next/link";
import Modal from "react-modal";

Modal.setAppElement("#__next");

const Footer = () => {
  const [deliveryModalIsOpen, setDeliveryModalIsOpen] = useState(false);
  const [privacyModalIsOpen, setPrivacyModalIsOpen] = useState(false);
  const [termsModalIsOpen, setTermsModalIsOpen] = useState(false);

  const openDeliveryModal = () => {
    setDeliveryModalIsOpen(true);
  };

  const closeDeliveryModal = () => {
    setDeliveryModalIsOpen(false);
  };

  const openPrivacyModal = () => {
    setPrivacyModalIsOpen(true);
  };

  const closePrivacyModal = () => {
    setPrivacyModalIsOpen(false);
  };

  const openTermsModal = () => {
    setTermsModalIsOpen(true);
  };

  const closeTermsModal = () => {
    setTermsModalIsOpen(false);
  };
  const [isExpanded, setIsExpanded] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="xl:px-16 lg:px-8 md:px-6 sm:px-5 xs:px-4">
      <div className="bg-pitchBlack ms-auto me-5 mb-6 w-fit px-3 py-2 rounded-full text-cyan">
        <button className="transition duration-500" onClick={scrollToTop}>
          <FaAngleDoubleUp className="text-4xl" />
        </button>
      </div>
      <div className="flex xl:flex-row lg:flex-col md:flex-col sm:flex-col xs:flex-col xl:justify-between xl:text-left lg:items-start lg:text-left md:items-start md:text-left sm:items-center sm:text-center xs:items-center xs:text-center mb-28">
        <div className="text-white text-lg">
          <h1 className="font-bold pb-3">Sign Up For Newsletters</h1>
          <p className="font-medium">
            Get e-mail updates about our latest shop and
            <span className="text-cyan"> special offers.</span>
          </p>
        </div>
        <div className="xl:mt-4 lg:mt-10 md:mt-10 sm:mt-10 xs:mt-8">
          <form action="" method="POST">
            <input
              type="email"
              name="subsEmail"
              placeholder="enter your email"
              className="rounded-s-lg placeholder:font-bold placeholder:text-gray-500 placeholder:uppercase  placeholder:text-sm py-3 xl:w-[450px] lg:w-[450px] md:w-[450px] sm:w-[250px] xs:w-[185.1px] px-5"
            />
            <input
              type="submit"
              className="text-black bg-cyan hover:bg-sky-500 px-8 pt-[0.56rem] xl:pb-[0.66rem] lg:pb-[0.7rem] md:pb-[0.7rem] sm:pb-[0.7rem] xs:pb-[0.7rem] rounded-r-lg text-lg font-bold tracking-widest uppercase cursor-pointer"
              value="submit"
            />
          </form>
        </div>
      </div>
      <div className="grid xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2 mb-4">
        <div className="text-white">
          <Link href="/">
            <img src="/images/vizion.png" className="w-36 mb-7" alt="" />
          </Link>
          <div className="text-lg space-y-[.6rem]">
            <p className="font-bold uppercase">contact</p>
            <p className="font-bold">
              Address: &nbsp;&nbsp;
              <span className="font-medium">Tangier, Av. Mly ismail</span>
            </p>
            <p className="font-bold">
              Phone: &nbsp;&nbsp;<span className="font-medium">0539473728</span>
            </p>
            <p className="font-bold pb-4">
              Hours: &nbsp;&nbsp;
              <span className="font-medium">10:00 - 18:00, Mon - Fri</span>
            </p>
            <p className="font-bold uppercase">follow us</p>
            <div className="flex text-3xl space-x-5 text-cyan">
              <Link href="https://twitter.com/ApparentlyPyro" target="_blank">
                <BsTwitter />
              </Link>
              <Link
                href="https://www.facebook.com/apparentlypyro"
                target="_blank"
              >
                <BsFacebook />
              </Link>
              <Link
                href="https://www.instagram.com/apparently.pyro/"
                target="_blank"
              >
                <BsInstagram />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-white lg:ms-20 md:ms-20 sm:ms-20 xs:ms-10">
          <h1 className="uppercase text-xl font-semibold mb-5">help</h1>
          <div className="flex flex-col space-y-5 font-medium">
            <Link href="/faq" className="hover:text-cyan">
              FAQs
            </Link>
            <Link href="/about" className="hover:text-cyan">
              About Us
            </Link>

            <Link
              href="#!"
              className="hover:text-cyan"
              onClick={openDeliveryModal}
            >
              Delivery Information
            </Link>
            <Modal
              isOpen={deliveryModalIsOpen}
              onRequestClose={closeDeliveryModal}
              className="container mx-auto w-[50rem] fixed inset-0 flex items-center justify-center z-50"
              overlayClassName="fixed inset-0 bg-black bg-opacity-75"
            >
              <div className="bg-pitchBlack text-white p-6 rounded-3xl text-center max-h-96 overflow-y-scroll">
                <h1 className="text-xl font-medium uppercase text-red-500 my-4">
                  delivery information
                </h1>
                <p className="text-white pb-4">
                  Vizion's Delivery Information is aimed at providing a seamless
                  and efficient shipping experience for our customers. We offer
                  reliable and timely delivery services for all orders of
                  consoles, laptops, desktops, and accessories. The estimated
                  delivery time may vary based on your location and the
                  availability of the product. Once your order is confirmed, we
                  will notify you about the shipping details, including the
                  carrier used and any tracking information available. We strive
                  to ensure that your package is carefully packed and protected
                  during transit to minimize any potential damage. If you have
                  any specific delivery requirements or concerns, please feel
                  free to contact our customer support team, and we will do our
                  best to accommodate your needs.
                </p>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={closeDeliveryModal}
                >
                  Close
                </button>
              </div>
            </Modal>

            <Link
              href="#!"
              className="hover:text-cyan"
              onClick={openPrivacyModal}
            >
              Privacy & Policy
            </Link>
            <Modal
              isOpen={privacyModalIsOpen}
              onRequestClose={closePrivacyModal}
              className="container mx-auto w-[50rem] fixed inset-0 flex items-center justify-center z-50"
              overlayClassName="fixed inset-0 bg-black bg-opacity-75"
            >
              <div className="bg-pitchBlack p-6 rounded-3xl text-center max-h-96 overflow-y-scroll">
                <h1 className="text-xl font-medium uppercase text-red-500 my-4">
                  Privacy Policy
                </h1>
                <p className="text-white pb-4">
                  Vizion's Privacy Policy is designed to ensure the protection
                  and confidentiality of our users' personal information. We
                  collect essential details during the order process, including
                  your name, email address, shipping address, and payment
                  information, solely for the purpose of order fulfillment and
                  customer support. Rest assured, we do not share or sell your
                  information to third parties, and we utilize industry-standard
                  security measures to safeguard your data. Your privacy is of
                  utmost importance to us, and we strive to provide a secure and
                  transparent shopping experience.
                </p>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={closePrivacyModal}
                >
                  Close
                </button>
              </div>
            </Modal>

            <Link
              href="#!"
              className="hover:text-cyan"
              onClick={openTermsModal}
            >
              Terms & Conditions
            </Link>
            <Modal
              isOpen={termsModalIsOpen}
              onRequestClose={closeTermsModal}
              className="container mx-auto w-[50rem] fixed inset-0 flex items-center justify-center z-50"
              overlayClassName="fixed inset-0 bg-black bg-opacity-75"
            >
              <div className="bg-pitchBlack text-white p-6 rounded-3xl text-center max-h-96 overflow-y-scroll">
                <h1 className="text-xl font-medium uppercase text-red-500 my-4">
                  terms & conditions
                </h1>
                <p className="text-white pb-4">
                  By accessing and using the Vizion E-commerce Website, you
                  agree to our terms and conditions. Vizion is an online
                  platform that sells consoles, laptops, desktops, and
                  accessories. While we strive for accuracy, product
                  information, including descriptions, specifications, and
                  pricing, may be subject to change. To place an order, you must
                  provide accurate information and agree to our payment terms.
                  Shipping and delivery will be arranged, and our return and
                  refund policy applies to eligible cases. We hold intellectual
                  property rights over our website content, and we disclaim
                  liability for any damages arising from its use. These terms
                  and conditions are governed by the laws of our operating
                  jurisdiction. We reserve the right to modify these terms and
                  conditions as needed.
                </p>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={closeTermsModal}
                >
                  Close
                </button>
              </div>
            </Modal>
          </div>
        </div>
        <div className="flex flex-col text-white md:ms-20 md:mt-0 md:mb-0 sm:mt-10 xs:mt-10 sm:mb-16">
          <h1 className="uppercase text-xl font-semibold mb-5">products</h1>
          <div className="flex flex-col space-y-5 font-medium">
            <Link href="/desktops" className="hover:text-cyan">
              Desktops
            </Link>

            <Link href="/laptops" className="hover:text-cyan">
              Laptops
            </Link>

            <Link href="/consoles" className="hover:text-cyan">
              Consoles
            </Link>

            <Link href="/peripherals" className="hover:text-cyan">
              Peripherals
            </Link>
          </div>
        </div>
        <div className="flex flex-col text-white xl:mt-0 lg:mt-0 lg:ms-16 md:mt-10 lg:mb-0 md:mb-16 md:ms-48 sm:mt-10 sm:mb-16 sm:ms-20 xs:mt-10">
          <h1 className="uppercase text-xl font-semibold mb-5">services</h1>
          <div className="flex flex-col space-y-5 font-medium">
            <Link href="#!" className="hover:text-cyan">
              Installation
            </Link>

            <Link href="#!" className="hover:text-cyan">
              Cleaning
            </Link>

            <Link href="#!" className="hover:text-cyan">
              Upgrades
            </Link>

            <Link href="#!" className="hover:text-cyan">
              Building
            </Link>
          </div>
        </div>
        <div className="flex flex-col text-white xl:mt-0 lg:mt-0 lg:ms-0 md:mt-[2.30rem] md:ms-36 sm:mt-1 xs:mt-10">
          <h1 className="uppercase text-xl font-semibold mb-5">INSTALL APP</h1>
          <div className="flex flex-col xl:items-start lg:items-start md:items-start sm:items-start xs:items-center space-y-5">
            <p className="font-medium">From App Store or Google Play</p>
            <div className="flex xl:flex-row lg:flex-col md:flex-col sm:flex-col xs:flex-col space-x-5 xl:space-y-0 lg:space-y-2 md:space-y-2 sm:space-y-2 xs:space-y-2">
              <Link href="#!">
                <img
                  src="/images/play-store.png"
                  className="cursor-pointer w-44"
                  alt=""
                />
              </Link>
              <Link href="#!">
                <img
                  src="/images/app-store.png"
                  className="relative xl:right-0 lg:right-5 md:right-5 sm:right-5 xs:right-5 cursor-pointer w-44"
                  alt=""
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center text-white text-lg py-5">
        <h1>© 2023 Vizion | All Rights Reserved.</h1>
      </div>
    </div>
  );
};

export default Footer;
