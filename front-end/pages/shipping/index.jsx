import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import CheckoutWizard from "@/components/CheckoutWizard";
import Layout from "@/components/Layout";
import { Store } from "@/utils/Store";
import { useRouter } from "next/router";

export default function ShippingScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  useEffect(() => {
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country,
        },
      })
    );

    router.push("/payment");
  };

  return (
    <Layout title="Shipping Address" showFooter={false}>
      <div className="pt-32">
        <form
          className="mx-auto max-w-screen-md text-white"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className="mb-10 text-2xl uppercase font-semibold text-center">
            Shipping Address
          </h1>
          <div className="flex flex-col xl:items-start lg:items-start md:items-start sm:items-center xs:items-center mb-4 space-y-3">
            <label htmlFor="fullName" className="text-lg font-medium">
              Full Name
            </label>
            <input
              className="xl:w-full lg:w-full md:w-full sm:w-[27rem] xs:w-[25rem] py-3 rounded-xl pl-4 font-bold outline-none transition-all ease-in duration-200 hover:outline-cyan focus:outline-cyan hover:outline-4 focus:outline-4 placeholder:text-sm text-pitchBlack placeholder:text-gray-400 placeholder:uppercase"
              placeholder="full name"
              id="fullName"
              autoFocus
              {...register("fullName", {
                required: "Please enter full name",
              })}
            />
            {errors.fullName && (
              <div className="text-red-500">{errors.fullName.message}</div>
            )}
          </div>
          <div className="mb-4 flex flex-col xl:items-start lg:items-start md:items-start sm:items-center xs:items-center space-y-3">
            <label htmlFor="address" className="text-lg font-medium">
              Address
            </label>
            <input
              className="xl:w-full lg:w-full md:w-full sm:w-[27rem] xs:w-[25rem] py-3 rounded-xl pl-4 font-bold outline-none transition-all ease-in duration-200 hover:outline-cyan focus:outline-cyan hover:outline-4 focus:outline-4 placeholder:text-sm text-pitchBlack placeholder:text-gray-400 placeholder:uppercase"
              id="address"
              {...register("address", {
                required: "Please enter address",
                minLength: {
                  value: 3,
                  message: "Address is more than 2 chars",
                },
              })}
            />
            {errors.address && (
              <div className="text-red-500">{errors.address.message}</div>
            )}
          </div>
          <div className="mb-4 flex flex-col xl:items-start lg:items-start md:items-start sm:items-center xs:items-center space-y-3">
            <label htmlFor="city" className="text-lg font-medium">
              City
            </label>
            <input
              className="xl:w-full lg:w-full md:w-full sm:w-[27rem] xs:w-[25rem] py-3 rounded-xl pl-4 font-bold outline-none transition-all ease-in duration-200 hover:outline-cyan focus:outline-cyan hover:outline-4 focus:outline-4 placeholder:text-sm text-pitchBlack placeholder:text-gray-400 placeholder:uppercase"
              id="city"
              {...register("city", {
                required: "Please enter city",
              })}
            />
            {errors.city && (
              <div className="text-red-500 ">{errors.city.message}</div>
            )}
          </div>
          <div className="mb-4 flex flex-col xl:items-start lg:items-start md:items-start sm:items-center xs:items-center space-y-3">
            <label htmlFor="postalCode" className="text-lg font-medium">
              Postal Code
            </label>
            <input
              className="xl:w-full lg:w-full md:w-full sm:w-[27rem] xs:w-[25rem] py-3 rounded-xl pl-4 font-bold outline-none transition-all ease-in duration-200 hover:outline-cyan focus:outline-cyan hover:outline-4 focus:outline-4 placeholder:text-sm text-pitchBlack placeholder:text-gray-400 placeholder:uppercase"
              id="postalCode"
              {...register("postalCode", {
                required: "Please enter postal code",
              })}
            />
            {errors.postalCode && (
              <div className="text-red-500 ">{errors.postalCode.message}</div>
            )}
          </div>
          <div className="mb-4 flex flex-col xl:items-start lg:items-start md:items-start sm:items-center xs:items-center space-y-3">
            <label htmlFor="country" className="text-lg font-medium">
              Country
            </label>
            <input
              className="xl:w-full lg:w-full md:w-full sm:w-[27rem] xs:w-[25rem] py-3 rounded-xl pl-4 font-bold outline-none transition-all ease-in duration-200 hover:outline-cyan focus:outline-cyan hover:outline-4 focus:outline-4 placeholder:text-sm text-pitchBlack placeholder:text-gray-400 placeholder:uppercase"
              id="country"
              {...register("country", {
                required: "Please enter country",
              })}
            />
            {errors.country && (
              <div className="text-red-500 ">{errors.country.message}</div>
            )}
          </div>
          <div className="mb-4 mt-10 flex justify-center">
            <button className="bg-cyan text-black font-bold text-xl xl:w-full lg:w-full md:w-full sm:w-[27rem] xs:w-[25rem] py-2 rounded-xl uppercase">
              Next
            </button>
          </div>
        </form>
        <div className="container mx-auto flex justify-center relative top-20">
          <CheckoutWizard activeStep={1} />
        </div>
      </div>
    </Layout>
  );
}

ShippingScreen.auth = true;
