import Link from "next/link";
import React, { useContext } from "react";
import Layout from "@/components/Layout";
import { Store } from "@/utils/Store";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import axios from "axios";
import { toast } from "react-toastify";
import { BsArrowLeft, BsFillTrash3Fill } from "react-icons/bs";
import CheckoutWizard from "@/components/CheckoutWizard";

function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
    toast.success("Product updated in the cart");
  };
  return (
    <Layout title="Shopping Cart" showFooter={false}>
      <div className="xl:mx-20 lg:mx-20 md:mx-20 sm:mx-5 xs:mx-5 pt-40 text-white">
        <div className="flex justify-between">
          <h1 className="mb-4 text-2xl uppercase text-white font-bold">
            Shopping Cart
          </h1>
          <p className="text-xl font-bold">
            Items: {cartItems.reduce((a, c) => a + c.quantity, 0)}
          </p>
        </div>
        {cartItems.length === 0 ? (
          <div>
            <Link href="/products" className="hover:text-cyan">
              <span className="flex space-x-2 pb-7 group">
                <BsArrowLeft className="pt-0.5 text-xl transition group-hover:-translate-x-3 transform-gpu duration-500" />
                <p>Go shopping</p>
              </span>
            </Link>
            <table className="overflow-x-auto min-w-full ">
              <thead className="border-b">
                <tr>
                  <th className="p-5 text-left">Image</th>
                  <th className="p-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
            </table>
            <p className="pt-10 text-center text-2xl uppercase font-semibold">
              Cart is empty
            </p>
          </div>
        ) : (
          <div className="flex flex-col md:gap-5">
            <div className="overflow-x-auto md:col-span-3">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="p-5 text-left">Image</th>
                    <th className="p-5 text-left">Item</th>
                    <th className="p-5 text-right">Quantity</th>
                    <th className="p-5 text-right">Price</th>
                    <th className="p-5">Action</th>
                  </tr>
                </thead>
                <tbody className="">
                  {cartItems.map((item) => (
                    <tr key={item.slug} className="bg-pitchBlack">
                      <td>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-[180px] h-[50px]"
                          style={{ maxWidth: "100%", height: "auto" }}
                        />
                      </td>
                      <td>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center text-lg hover:text-cyan font-semibold"
                        >
                          {item.name}
                        </Link>
                      </td>
                      <td className="p-5 text-lg text-right text-white">
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            updateCartHandler(item, e.target.value)
                          }
                          className="bg-darkBlack px-5 py-2 rounded-md"
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-5 text-xl font-medium text-right">
                        ${item.price}
                      </td>
                      <td className="p-5 text-center">
                        <button onClick={() => removeItemHandler(item)}>
                          <BsFillTrash3Fill className="w-8 h-8 text-red-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pb-3 text-xl font-semibold pt-10">
              Subtotal : $
              {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
            </div>
            <div className="flex xl:flex-row lg:flex-col md:flex-col sm:flex-col xs:flex-col justify-between relative top-80 pb-10">
              <div>
                <Link href="/products" className="hover:text-cyan">
                  <span className="flex space-x-2 pb-7 group">
                    <BsArrowLeft className="pt-0.5 text-xl transition group-hover:-translate-x-3 transform-gpu duration-500" />
                    <p>Go shopping</p>
                  </span>
                </Link>
              </div>
              <div>
                <CheckoutWizard activeStep={0} />
              </div>
              <div>
                <button
                  onClick={() => router.push("login?redirect=/shipping")}
                  className="bg-cyan text-black font-bold text-md px-10 py-2 rounded-xl uppercase"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
