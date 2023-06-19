import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import CheckoutWizard from "@/components/CheckoutWizard";
import Layout from "@/components/Layout";
import { getError } from "@/utils/error";
import { Store } from "@/utils/Store";
import { BsArrowLeft } from "react-icons/bs";

export default function PlaceOrderScreen() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  const router = useRouter();
  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
  }, [paymentMethod, router]);

  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/orders", {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      setLoading(false);
      dispatch({ type: "CART_CLEAR_ITEMS" });
      Cookies.set(
        "cart",
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Place Order" showFooter={false}>
      <div className="flex xl:flex-row lg:flex-row md:flex-col items-center sm:flex-col xs:flex-col justify-between relative top-52 xl:space-x-5 lg:space-x-5 space-x-0 space-y-0 md:space-y-5 sm:space-y-5 xs:space-y-5 xl:mx-32 lg:mx-32">
        <div className="bg-pitchBlack xl:w-[45rem] lg:w-[40rem] md:w-[35rem] sm:w-[28rem] xs:w-[22rem] h-[25rem] px-8 rounded-2xl">
          <h1 className="text-white text-3xl font-akira pt-5 pb-10 text-center">
            confirmation
          </h1>
          <div>
            <h1 className="text-white text-xl pb-5 font-semibold">
              shipping address:
            </h1>
            <p className="text-white text-lg font-medium">
              {shippingAddress.fullName}, {shippingAddress.address},{"  "}
              {shippingAddress.city}, {shippingAddress.postalCode},{"  "}
              {shippingAddress.country}
            </p>
            <div className="mt-3">
              <Link
                href="/shipping"
                className="text-yellow-500 font-medium hover:underline"
              >
                Edit
              </Link>
            </div>
            <h1 className="text-white text-xl pt-10 pb-5 font-semibold">
              Payment Method:
            </h1>
            <p className="text-cyan text-lg font-semibold">{paymentMethod}</p>
            <div className="mt-3">
              <Link
                href="/payment"
                className="text-yellow-500 font-medium hover:underline"
              >
                Edit
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-pitchBlack xl:w-[45rem] lg:w-[40rem] md:w-[35rem] sm:w-[28rem] xs:w-[22rem] h-[31rem] px-8 rounded-2xl">
          <h1 className="text-white text-3xl font-akira pt-5 pb-10 text-center">
            order details
          </h1>
          <div>
            <h1 className="text-white text-xl pb-5 font-semibold">
              items:&nbsp; {cartItems.reduce((a, c) => a + c.quantity, 0)}
            </h1>
          </div>
          {cartItems.map((item) => (
            <div className="bg-darkBlack flex justify-between items-center rounded-xl mb-5">
              <div>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[150px] h-[50px] rounded-s-xl"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
              <div>
                <Link
                  href={`/product/${item.slug}`}
                  className="text-lg text-white hover:text-cyan font-semibold"
                >
                  {item.name}
                </Link>
              </div>
              <div className="text-white font-semibold">${item.price}</div>
              <div className="text-white font-semibold pe-10">
                X {item.quantity}
              </div>
            </div>
          ))}
          <div className="flex justify-between pt-3">
            <div className="text-white capitalize text-lg font-semibold space-y-3">
              <h1>subtotal: </h1>
              <h1>taxes & fees: </h1>
              <h1 className="pb-4">shipping: </h1>
            </div>
            <div className="text-white capitalize text-lg font-semibold space-y-3">
              <h1>${itemsPrice}</h1>
              <h1>${taxPrice}</h1>
              <h1>${shippingPrice}</h1>
            </div>
          </div>
          <hr className="pb-4" />
          <div className="flex justify-between text-white capitalize text-lg font-semibold space-y-3">
            <div>
              <h1>total: </h1>
            </div>
            <div>
              <h1>${totalPrice}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="flex xl:flex-row lg:flex-col md:flex-col sm:flex-col xs:flex-col justify-between items-center relative top-80 pb-10 xl:mx-32">
        <div className="text-white">
          <Link href="/products" className="hover:text-cyan">
            <span className="flex space-x-2 pb-7 group">
              <BsArrowLeft className="pt-0.5 text-xl transition group-hover:-translate-x-3 transform-gpu duration-500" />
              <p>Go shopping</p>
            </span>
          </Link>
        </div>
        <div>
          <CheckoutWizard activeStep={4} />
        </div>
        <div>
          <button
            disabled={loading}
            onClick={placeOrderHandler}
            className="bg-cyan text-black font-bold text-md px-10 py-2 rounded-xl uppercase"
          >
            {loading ? "Loading..." : "Place Order"}
          </button>
        </div>
      </div>
    </Layout>
  );
}

PlaceOrderScreen.auth = true;
