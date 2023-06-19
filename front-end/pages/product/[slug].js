import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import { BsArrowLeft } from "react-icons/bs";
import Layout from "@/components/Layout";
import "swiper/swiper-bundle.css";
import Box from "@mui/material/Box";
import { useState, useContext } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Product from "../../models/Product";
import db from "../../utils/db";
import { Store } from "../../utils/Store";
import { getSession } from "next-auth/react";

const ProductScreen = (props) => {
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
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

  if (!product) {
    return <Layout title="Product Not Found">Product Not Found</Layout>;
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
    toast.success("Product added to the cart");
  };

  return (
    <Layout title={product.name}>
      <div className="pt-32 ps-16 text-white hover:text-cyan">
        <Link href="/products">
          <span className="flex space-x-2 group">
            <BsArrowLeft className="pt-0.5 text-xl transition group-hover:-translate-x-3 transform-gpu duration-500" />
            <p>back to products</p>
          </span>
        </Link>
      </div>
      <div className="xl:mx-16 lg:mx-20 md:mx-20 sm:mx-8 xs:mx-8 pt-14">
        <div className="flex xl:flex-row lg:flex-row md:flex-col sm:flex-col xs:flex-col  mb-10 xl:space-x-20 lg:space-x-16 text-white">
          <div className="bg-white rounded-2xl flex justify-center xl:w-[55rem] xl:h-[35rem] lg:w-[50rem] lg:h-[30rem] md:w-[45rem] md:h-[32rem]">
            <img
              src={product.image}
              alt={product.name}
              className="w-[80rem] text-black rounded-3xl"
            ></img>
          </div>
          <div className="pt-8 xl:text-left lg:text-left md:text-left sm:text-left xs:text-left">
            <h1 className="text-3xl font-semibold tracking-wider pb-5">
              {product.name}
            </h1>
            <h1 className="text-lg font-medium uppercase pb-5">
              {product.brand}
            </h1>
            <h1 className="text-lg font-medium uppercase pb-5">
              {product.category}
            </h1>
            <div className="pb-5">
              <ThemeProvider theme={theme}>
                <Box className="flex flex-row space-x-2">
                  <Rating
                    name="simple-controlled"
                    value={product.rating}
                    className="custom-rating-outline"
                  />
                  <Typography
                    component="legend"
                    className="text-gray-200 pt-[1px]"
                  >
                    ({product.numReviews})
                  </Typography>
                </Box>
              </ThemeProvider>
            </div>
            <div className="mb-2">
              <div>Status</div>
              <div>
                {product.countInStock > 0 ? (
                  <span className="text-green-600 font-semibold">In stock</span>
                ) : (
                  <span className="text-red-700 font-semibold">
                    Unavailable
                  </span>
                )}
              </div>
            </div>
            <h1 className="text-xl font-semibold pb-5">${product.price}</h1>
            <div>
              <button
                className="border-cyan border-4 xl:w-auto lg:w-auto md:w-full sm:w-full xs:w-full hover:bg-cyan hover:text-black transition duration-300 ease-in-out text-cyan rounded-2xl text-xl font-semibold uppercase px-12 py-3"
                onClick={addToCartHandler}
              >
                add to cart
              </button>
            </div>
          </div>
        </div>
        <div className="text-white container xl:pe-[35rem] mt-10 text-justify pe-0 mb-10">
          <h1 className="text-xl font-bold uppercase pb-5">desription</h1>
          <span className="leading-6 text-md font-medium">
            {product.description}
          </span>
        </div>
      </div>
      {/* <div className="xl:mx-16 lg:mx-20 md:mx-20 sm:mx-8 xs:mx-8 mt-10">
        <hr className="mb-8" />
        <h1 className="text-xl text-white font-semibold uppercase">
          you may also like
        </h1>
      </div> */}
    </Layout>
  );
};

export default ProductScreen;

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}

