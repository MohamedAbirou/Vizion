import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import CheckoutWizard from "@/components/CheckoutWizard";
import Layout from "@/components/Layout";
import { Store } from "@/utils/Store";
import { BsPaypal, BsStripe } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";

export default function PaymentScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error("Payment method is required");
    }
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );

    router.push("/placeorder");
  };
  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/shipping");
    }
    setSelectedPaymentMethod(paymentMethod || "");
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <Layout title="Payment Method" showFooter={false}>
      <div className="container mx-auto pt-32">
        <form
          className="mx-auto max-w-screen-md text-white"
          onSubmit={submitHandler}
        >
          <h1 className="mb-20 text-2xl uppercase font-semibold text-center">
            Payment Method
          </h1>
          {["PayPal", "Stripe", "CashOnDelivery"].map((payment) => (
            <div key={payment} className="mb-4 flex space-x-10 text-xl">
              <input
                name="paymentMethod"
                className="p-2 mb-14 outline-none w-5 h-5 focus:ring-0"
                id={payment}
                type="radio"
                checked={selectedPaymentMethod === payment}
                onChange={() => setSelectedPaymentMethod(payment)}
              />

              <label className="flex space-x-5" htmlFor={payment}>
                <div>
                  {payment === "PayPal" && (
                    <BsPaypal className="text-blue-400 w-8 h-8" />
                  )}
                  {payment === "Stripe" && (
                    <BsStripe className="text-indigo-600 w-8 h-8" />
                  )}
                  {payment === "CashOnDelivery" && (
                    <TbTruckDelivery className="text-gray-300 w-8 h-8" />
                  )}
                </div>
                <div>{payment}</div>
              </label>
            </div>
          ))}
          <div className="mb-4 flex justify-between">
            <button
              onClick={() => router.push("/shipping")}
              type="button"
              className="bg-red-500 text-black font-bold text-xl px-14 py-2 rounded-xl uppercase"
            >
              Back
            </button>
            <button className="bg-cyan text-black font-bold text-xl px-14 py-2 rounded-xl uppercase">
              Next
            </button>
          </div>
        </form>
        <div className="container mx-auto flex justify-center relative top-64">
          <CheckoutWizard activeStep={2} />
        </div>
      </div>
    </Layout>
  );
}

PaymentScreen.auth = true;
