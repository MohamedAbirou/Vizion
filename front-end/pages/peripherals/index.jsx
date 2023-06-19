import React, { useState, useEffect, useRef } from "react";
import peripheralsList from "@/utils/peripheralsList";
import Link from "next/link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Layout from "../../components/Layout";
import { Typography } from "@mui/material";

const Peripherals = () => {
  const [priceDropdownVisible, setPriceDropdownVisible] = useState(false);
  const [brandDropdownVisible, setBrandDropdownVisible] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceFilter, setPriceFilter] = useState(null);
  const [brandFilter, setBrandFilter] = useState("All");
  const [value, setValue] = React.useState(4);
  const priceRef = useRef(null);
  const filterRef = useRef(null);
  const containerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const theme = createTheme({
    components: {
      MuiRating: {
        styleOverrides: {
          root: {
            "& .MuiRating-iconEmpty": {
              color: "white",
            },
          },
        },
      },
    },
  });

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

  const category = "peripherals";

  const getCategoryBrands = (category) => {
    const brands = {
      peripherals: [
        "All",
        "logitech",
        "razer",
        "corsair",
        "steelseries",
        "msi",
        "sony",
        "microsoft",
      ],
    };

    return brands[category];
  };

  const handleBrandFilter = (brand) => {
    setBrandFilter(brand);
    setBrandDropdownVisible(false);
  };

  useEffect(() => {
    let products = [];

    switch (category) {
      case "peripherals":
        products = peripheralsList;
        break;
      default:
        break;
    }

    let filtered = products;

    if (brandFilter !== "All") {
      filtered = filtered.filter((product) => product.brand === brandFilter);
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [category, brandFilter, searchQuery]);

  return (
    <Layout>
      <div
        style={{
          height: "60rem",
          backgroundImage: "url(/images/peripherals-bg.png)",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="font-akira relative top-[25rem] xl:text-7xl lg:text-7xl md:text-6xl sm:text-4xl xs:text-[2.05rem] text-white tracking-widest uppercase scale-y-90 text-center space-y-5 leading-tight">
          <h1>{category}</h1>
          <h1
            style={{
              WebkitTextFillColor: "transparent",
              WebkitTextStrokeWidth: "2px",
              WebkitTextStrokeColor: "white",
            }}
          >
            {category}
          </h1>
        </div>
      </div>

      <div className="px-16 mt-16 mb-32">
        <div className="flex xl:justify-between lg:justify-between md:justify-between sm:justify-center xs:justify-center xl:space-x-0 lg:space-x-0 md:space-x-0 sm:space-x-20 xs:space-x-4 items-center mb-20 px-8">
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
                {getCategoryBrands(category).map((brand) => (
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
              <div
                key={product.slug}
                className="item__card mix consoles flex flex-col w-fit rounded-t-3xl"
              >
                <Link href={`/product/${product.slug}`}>
                  <div className="xl:w-[450px] xl:h-[350px] lg:w-[430px] lg:h-[330px] md:w-[400px] md:h-[300px] sm:w-[380px] sm:h-[280px] xs:w-[330px] xs:h-[230px] rounded-3xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="rounded-3xl mb-3"
                    />
                  </div>
                </Link>
                <div className="flex flex-col text-white justify-center items-center xl:mt-5 lg:mt-8 md:mt-9 sm:mt-10 xs:mt-12 space-y-1">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="text-lg font-medium">${product.price}</p>

                  <ThemeProvider theme={theme}>
                    <Box className="flex flex-row space-x-2 ms-[2.5rem] ">
                      <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                        className="custom-rating-outline"
                      />
                      <Typography component="legend" className="text-gray-200">
                        ({product.personRated})
                      </Typography>
                    </Box>
                  </ThemeProvider>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Peripherals;
