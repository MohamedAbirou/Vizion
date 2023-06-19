import React, { useState, useEffect, useRef } from "react";
import Layout from "../../components/Layout";
import ProductItem from "@/components/ProductItem";
import Product from "@/models/Product";
import db from "@/utils/db";
import data from "@/utils/data";
// import allProductsList from "./allProductsList";

const Products = () => {
  const [priceDropdownVisible, setPriceDropdownVisible] = useState(false);
  const [brandDropdownVisible, setBrandDropdownVisible] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceFilter, setPriceFilter] = useState(null);
  const [brandFilter, setBrandFilter] = useState("All");
  const [categorie, setCategorie] = useState("all");
  const [value, setValue] = React.useState(4);
  const priceRef = useRef(null);
  const filterRef = useRef(null);
  const containerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOutsideClick = (event) => {
    if (priceRef.current && !priceRef.current.contains(event.target)) {
      setPriceDropdownVisible(false);
    }
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      setBrandDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const togglePriceDropdown = () => {
    setPriceDropdownVisible(!priceDropdownVisible);
  };

  const toggleBrandDropdown = () => {
    setBrandDropdownVisible(!brandDropdownVisible);
  };

  const getCategoryBrands = (categorie) => {
    const brands = {
      all: [
        "All",
        "Sony",
        "Microsoft",
        "Nintendo",
        "MSI",
        "Asus",
        "Razer",
        "Corsair",
        "SteelSeries",
        "Logitech",
        "Dell",
        "CyberPowerPC",
        "Gigabyte",
        "Overclockers",
        "NZXT",
        "Lenovo",
      ],
    };

    return brands[categorie];
  };

  const handleBrandFilter = (brand) => {
    setBrandFilter(brand);
    setBrandDropdownVisible(false);
  };

  useEffect(() => {
    let productslist = [];

    switch (categorie) {
      case "all":
        productslist = data.products;
        break;
      default:
        break;
    }

    let filtered = productslist;

    if (brandFilter !== "All") {
      filtered = filtered.filter((product) => product.brand === brandFilter);
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [categorie, brandFilter, searchQuery]);

  return (
    <Layout>
      <div
        style={{
          height: "60rem",
          backgroundImage: `url("/images/gaming-bg.jpg")`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="font-akira relative top-[25rem]">
          <h1 className="xl:text-7xl lg:text-7xl md:text-6xl sm:text-5xl xs:text-4xl text-white tracking-widest uppercase scale-y-90 text-center leading-tight">
            all
          </h1>
          <h1
            className="xl:text-7xl lg:text-7xl md:text-6xl sm:text-5xl xs:text-4xl text-white tracking-widest uppercase scale-y-90 text-center leading-tight"
            style={{
              WebkitTextFillColor: "transparent",
              WebkitTextStrokeWidth: "2px",
              WebkitTextStrokeColor: "white",
            }}
          >
            all
          </h1>
        </div>
      </div>

      <div className="xl:px-16 lg:px-8 mt-8 mb-32">
        <div className="flex flex-wrap xl:justify-between lg:justify-around md:justify-center sm:justify-center xs:justify-around items-center mb-12">
          <div ref={priceRef}>
            <button
              data-dropdown-toggle="dropdown1"
              onClick={togglePriceDropdown}
              className={`text-white bg-[#303030] hover:bg-cyan transition duration-300 ease-in-out font-semibold text-sm px-[3.37rem] py-[13.7px] rounded-${
                priceDropdownVisible ? "t-3xl" : "3xl"
              } text-center inline-flex items-center uppercase`}
              type="button"
            >
              price
              <svg
                className="w-4 h-4 ml-2"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {priceDropdownVisible && <hr />}
            <div
              id="dropdown1"
              className={`absolute bg-[#303030] text-white divide-y divide-gray-100 rounded-b-lg shadow w-44 ${
                priceDropdownVisible ? "" : "hidden"
              }`}
            >
              <ul className="space-y-3 py-3 text-md">
                <li>
                  <input
                    type="radio"
                    value="lowToHigh"
                    id="LTH"
                    name="price"
                    unselectable=""
                    className="ml-5 cursor-pointer"
                    checked={priceFilter === "lowToHigh"}
                    onChange={() => setPriceFilter("lowToHigh")}
                  />
                  <label
                    htmlFor="LTH"
                    className="pl-2 hover:text-cyan cursor-pointer font-semibold"
                  >
                    Low to High
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    value="highToLow"
                    id="HTL"
                    name="price"
                    unselectable=""
                    className="ml-5 cursor-pointer"
                    checked={priceFilter === "highToLow"}
                    onChange={() => setPriceFilter("highToLow")}
                  />
                  <label
                    htmlFor="HTL"
                    className="pl-2 hover:text-cyan cursor-pointer font-semibold"
                  >
                    High to Low
                  </label>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products"
              className="bg-transparent border rounded-xl border-white border-opacity-25 text-white text-xl xl:w-[50rem] lg:w-[30rem] md:w-[20rem] py-2 px-4 placeholder-white placeholder-opacity-50 focus:outline-none"
              style={{ outline: "none" }}
            />
          </div>

          <div ref={filterRef}>
            <button
              data-dropdown-toggle="dropdown2"
              onClick={toggleBrandDropdown}
              className={`text-white bg-[#303030] hover:bg-cyan transition duration-300 ease-in-out font-semibold  text-sm px-[3.05rem] py-[13.7px] rounded-${
                brandDropdownVisible ? "t-3xl" : "3xl"
              } text-center inline-flex items-center uppercase`}
              type="button"
            >
              brand
              <svg
                className="w-4 h-4 ml-2"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {brandDropdownVisible && <hr />}
            <div
              id="dropdown2"
              className={`absolute bg-[#303030] text-white divide-y divide-gray-100 rounded-b-lg shadow w-44 ${
                brandDropdownVisible ? "" : "hidden"
              }`}
            >
              <ul className="space-y-3 py-3 text-md">
                {getCategoryBrands(categorie).map((brand) => (
                  <li key={brand}>
                    <input
                      type="checkbox"
                      id={`brand_${brand}`}
                      checked={brandFilter === brand}
                      onChange={() => handleBrandFilter(brand)}
                      className="ml-5 cursor-pointer"
                    />
                    <label
                      htmlFor={`brand_${brand}`}
                      className="pl-2 hover:text-cyan cursor-pointer font-semibold"
                    >
                      {brand}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div
          className="flex xl:justify-evenly lg:justify-evenly md:justify-evenly sm:justify-center xs:justify-center items-center flex-wrap gap-y-8"
          ref={containerRef}
        >
          {filteredProducts
            .slice()
            .sort((a, b) => {
              if (priceFilter === "lowToHigh") {
                return a.price - b.price;
              } else if (priceFilter === "highToLow") {
                return b.price - a.price;
              }
              return 0;
            })
            .map((product) => (
              <ProductItem product={product} key={product.slug}></ProductItem>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Products;

// export async function getServerSideProps() {
//   await db.connect();
//   const products = await Product.find().lean();
//   return {
//     props: {
//       products: products.map(db.convertDocToObj),
//     },
//   };
// }

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
