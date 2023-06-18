import { useState, useEffect, useRef, useContext } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { BsFillPersonFill, BsFillBagFill } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "../utils/Store";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navbarRef = useRef(null);
  const router = useRouter();
  const { status, data: session } = useSession();
  const { state } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const isActive1 = router.pathname === "/";
  const isActive2 = router.pathname === "/products";
  const isActive3 = router.pathname === "/about";
  const isActive4 = router.pathname === "/contact";

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleOutsideClick = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setIsSearchOpen(false);
    }
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  return (
    <>
      <ToastContainer position="bottom-center" limit={1} />
      <nav
        className="bg-darkBlack bg-opacity-50 backdrop-filter backdrop-blur-sm fixed w-full z-10"
        style={{ fontFamily: "Montserrat" }}
        ref={navbarRef}
      >
        {/*pc Mode */}
        <nav className="xl:px-16 lg:px-8 py-5 xl:flex lg:flex md:hidden sm:hidden xs:hidden justify-between items-center">
          <Link href="/">
            <img src="/images/vizion.png" className="w-36" alt="" />
          </Link>
          <div className="flex uppercase xl:space-x-28 lg:space-x-16">
            <Link
              className={`text-lg text-${
                isActive1 ? "cyan" : "white"
              } hover:text-cyan font-${
                isActive1 ? "extrabold" : "medium"
              } transition-colors ease-in transform cursor-pointer`}
              href="/"
            >
              <h1>Home</h1>
            </Link>
            <Link
              className={`text-lg text-${
                isActive2 ? "cyan" : "white"
              } hover:text-cyan font-${
                isActive2 ? "extrabold" : "medium"
              } transition-colors ease-in transform cursor-pointer`}
              href="/products"
            >
              <h1>products</h1>
            </Link>
            <Link
              className={`text-lg text-${
                isActive3 ? "cyan" : "white"
              } hover:text-cyan font-${
                isActive3 ? "extrabold" : "medium"
              } transition-colors ease-in transform cursor-pointer`}
              href="/about"
            >
              <h1>about us</h1>
            </Link>
            <Link
              className={`text-lg text-${
                isActive4 ? "cyan" : "white"
              } hover:text-cyan font-${
                isActive4 ? "extrabold" : "medium"
              } transition-colors ease-in transform cursor-pointer`}
              href="/contact"
            >
              <h1>contact us</h1>
            </Link>
          </div>
          <div className="flex space-x-5 text-white text-2xl">
            <button className="hover:text-cyan" onClick={toggleSearch}>
              <FaSearch />
            </button>
            {status === "loading" ? (
              "Loading"
            ) : session?.user ? (
              <Link href="profile" className="hover:text-cyan">
                <BsFillPersonFill />
              </Link>
            ) : (
              <Link href="login" className="hover:text-cyan">
                <BsFillPersonFill />
              </Link>
            )}
            <Link href="cart" className="flex hover:text-cyan">
              <BsFillBagFill className="absolute" />
              {cartItemsCount > 0 && (
                <span className="ml-1 rounded-full relative bottom-2 left-[14px] bg-cyan px-[10px] py-[4px] text-xs font-bold text-pitchBlack">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </nav>
        <nav className="m-auto py-4 md:px-6 sm:px-5 xs:px-4 bg-lowOpacityBlack xl:hidden lg:hidden md:flex sm:flex xs:flex justify-between items-center">
          <Link href="/">
            <img src="/images/vizion.png" className="w-[8.5rem]" alt="" />
          </Link>
          <button
            id="menu-btn"
            open={menuOpen}
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
            className="ml-auto sm:me-1 xs:me-4 text-white text-3xl lg:hidden md:block focus:outline-none"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
          <div className="xl:hidden lg:hidden md:flex sm:flex xs:flex">
            <div
              id="menu"
              className={`${
                menuOpen
                  ? "translate-x-0 opacity-100"
                  : "opacity-0 -translate-x-full"
              } absolute inset-x-0 flex-col transition-all duration-300 ease-in-out items-center flex self-end py-8 top-20 space-y-4 bg-darkBlack bg-opacity-50 backdrop-filter backdrop-blur-xl w-full z-10 lg:relative lg:w-auto lg:opacity-100 lg:translate-x-0 md:flex md:items-center sm:w-auto sm:self-center md:left-6 md:right-6 sm:left-6 sm:right-6 xs:w-11/12 xs:left-4 drop-shadow-md md:text-2xl sm:text-2xl xs:text-xl`}
            >
              <Link
                className={`text-lg text-${
                  isActive1 ? "cyan" : "white"
                } hover:text-cyan font-${
                  isActive1 ? "bold" : "medium"
                } transition-colors ease-in transform cursor-pointer`}
                href="/"
              >
                <h1>Home</h1>
              </Link>
              <Link
                className={`text-lg text-${
                  isActive2 ? "cyan" : "white"
                } hover:text-cyan font-${
                  isActive2 ? "bold" : "medium"
                } transition-colors ease-in transform cursor-pointer`}
                href="products"
              >
                <h1>products</h1>
              </Link>
              <Link
                className={`text-lg text-${
                  isActive3 ? "cyan" : "white"
                } hover:text-cyan font-${
                  isActive3 ? "extrabold" : "medium"
                } transition-colors ease-in transform cursor-pointer`}
                href="/about"
              >
                <h1>about us</h1>
              </Link>
              <Link
                className={`text-lg text-${
                  isActive4 ? "cyan" : "white"
                } hover:text-cyan font-${
                  isActive4 ? "extrabold" : "medium"
                } transition-colors ease-in transform cursor-pointer`}
                href="/contact"
              >
                <h1>contact us</h1>
              </Link>
              <div className="flex space-x-5 text-white text-2xl">
                <button className="hover:text-cyan" onClick={toggleSearch}>
                  <FaSearch />
                </button>
                {status === "loading" ? (
                  "Loading"
                ) : session?.user ? (
                  <Link href="profile" className="hover:text-cyan">
                    <BsFillPersonFill />
                  </Link>
                ) : (
                  <Link href="login" className="hover:text-cyan">
                    <BsFillPersonFill />
                  </Link>
                )}
                <Link href="cart" className="flex hover:text-cyan">
                  <BsFillBagFill className="absolute" />
                  {cartItemsCount > 0 && (
                    <span className="ml-1 rounded-full relative bottom-2 left-[14px] bg-cyan px-[10px] py-[4px] text-xs font-bold text-pitchBlack">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {/* Search Bar */}
        <div
          className={`absolute top-0 left-0 right-0 z-20 ${
            isSearchOpen ? "h-full opacity-100" : "h-0 opacity-0"
          } transition-all duration-100 ease-in`}
        >
          <div className="bg-darkBlack bg-opacity-95 backdrop-filter backdrop-blur-sm flex justify-center items-center h-full">
            <form>
              <input
                type="text"
                className="bg-transparent border rounded-xl border-white border-opacity-25 text-white text-xl xl:w-[50rem] lg:w-[30rem] md:w-[20rem] py-2 px-4 placeholder-white placeholder-opacity-50 focus:outline-none"
                placeholder="Search..."
              />
              <button
                className="text-white text-2xl relative top-[.05rem] left-2 focus:outline-none"
                onClick={toggleSearch}
              >
                <FiX />
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
