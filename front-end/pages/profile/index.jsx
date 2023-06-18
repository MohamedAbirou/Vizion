import React, { useEffect, useState, useContext } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getError } from "@/utils/error";
import axios from "axios";
import Layout from "@/components/Layout";
import Link from "next/link";
import Cookies from "js-cookie";
import { Store } from "@/utils/Store";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, users: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true };
    case "DELETE_SUCCESS":
      return { ...state, loadingDelete: false, successDelete: true };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
}

export default function ProfileScreen() {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (session?.user) {
      setValue("firstName", session.user.firstName);
      setValue("lastName", session.user.lastName);
      setValue("email", session.user.email);
    }
  }, [session?.user, setValue]);

  const logoutClickHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/" });
  };

  const submitHandler = async ({ firstName, lastName, email, password }) => {
    try {
      await axios.put("/api/auth/update", {
        firstName,
        lastName,
        email,
        password,
      });
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      toast.success("Profile updated successfully");
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Layout showFooter={false}>
      <div className="mx-20 pt-36">
        <div className="flex xl:flex-row lg:flex-row md:flex-col sm:flex-col xs:flex-col xl:justify-between lg:justify-between md:justify-center sm:justify-center xs:justify-center">
          <div className="flex flex-col xl:items-start lg:items-start md:items-start sm:items-center xs:items-center text-white">
            <h1 className="text-4xl font-medium uppercase tracking-wider pb-5">
              my account
            </h1>
            {status === "loading"
              ? "Loading"
              : session?.user && (
                  <p className="text-2xl">
                    Welcome{" "}
                    <span className="text-cyan">
                      {session.user.email.substring(0, 5)}
                    </span>
                  </p>
                )}
          </div>
          <div>
            {status === "loading"
              ? "Loading"
              : session?.user && (
                  <div className="flex xl:flex-row lg:flex-row md:flex-row sm:flex-col xs:flex-col xl:space-x-5 lg:space-x-5 md:space-x-5 sm:space-x-0 xs:space-x-0 xl:space-y-0 lg:space-y-0 md:space-y-0 sm:space-y-3 xs:space-y-3 mt-5">
                    {session.user.isAdmin && (
                      <Link href="/admin/dashboard">
                        <button className="hover:shadow-cyan active:shadow-none active:bg-sky-600 font-bold uppercase rounded-xl px-4 py-2 sm:w-full xs:w-full bg-cyan">
                          Dashboard
                        </button>
                      </Link>
                    )}
                    <Link href="order-history">
                      <button className="hover:shadow-cyan active:shadow-none active:bg-sky-600 font-bold uppercase rounded-xl px-4 py-2 sm:w-full xs:w-full bg-cyan">
                        check orders
                      </button>
                    </Link>
                    <Link href="#!">
                      <button
                        className="hover:shadow-red-400 active:shadow-none active:bg-red-600 font-bold uppercase rounded-xl px-4 py-2 sm:w-full xs:w-full bg-red-400"
                        onClick={logoutClickHandler}
                      >
                        logout
                      </button>
                    </Link>
                  </div>
                )}
          </div>
        </div>
        <div className="mt-20 text-white">
          <div className="mb-24">
            <h1 className="text-2xl uppercase font-semibold pb-8">
              personal details
            </h1>
            <hr className="pb-10" />
            <div className="flex xl:flex-row lg:flex-row md:flex-col sm:flex-col xs:flex-col xl:space-x-80 lg:space-x-72 md:space-x-0 sm:space-x-0 xs:space-x-0 xl:space-y-0 lg:space-y-0 md:space-y-5 sm:space-y-5 xs:space-y-5">
              <div>
                <h1 className="text-gray-200 text-lg font-medium">
                  Change your first & last name
                </h1>
              </div>
              <div className="flex xl:flex-row lg:flex-row md:flex-col sm:flex-col xs:flex-col xl:space-x-10 lg:space-x-10 md:space-x-0 sm:space-x-0 xs:space-x-0 xl:space-y-0 lg:space-y-0 md:space-y-5 sm:space-y-5 xs:space-y-5">
                <input
                  type="text"
                  placeholder="first name"
                  className="w-[100%] py-3 rounded-xl pl-4 font-bold outline-none transition-all ease-in duration-200 hover:outline-cyan focus:outline-cyan text-pitchBlack hover:outline-4 focus:outline-4 placeholder:text-sm placeholder:uppercase"
                  id="firstName"
                  autoFocus
                  {...register("firstName", {
                    required: "Please enter first name",
                  })}
                />
                {errors.firstName && (
                  <div className="text-red-500">{errors.firstName.message}</div>
                )}
                <input
                  type="text"
                  placeholder="last name"
                  className="w-[100%] py-3 rounded-xl pl-4 font-bold outline-none transition-all ease-in duration-200 hover:outline-cyan focus:outline-cyan hover:outline-4 focus:outline-4 placeholder:text-sm placeholder:uppercase text-pitchBlack"
                  id="lastName"
                  autoFocus
                  {...register("lastName", {
                    required: "Please enter last name",
                  })}
                />
                {errors.lastName && (
                  <div className="text-red-500">{errors.lastName.message}</div>
                )}
              </div>
            </div>
          </div>
          <div className="mb-24">
            <h1 className="text-2xl uppercase font-semibold pb-8">
              email address
            </h1>
            <hr className="pb-10" />
            <div className="flex xl:flex-row lg:flex-row md:flex-col sm:flex-col xs:flex-col xl:space-x-[21.3rem] lg:space-x-[19.3rem] md:space-x-0 sm:space-x-0 xs:space-x-0 xl:space-y-0 lg:space-y-0 md:space-y-5 sm:space-y-5 xs:space-y-5">
              <div>
                <h1 className="text-gray-200 text-lg font-medium">
                  Change your email address
                </h1>
              </div>
              <div className="flex xl:flex-col lg:flex-col md:flex-col sm:flex-col xs:flex-col xl:space-y-5 lg:space-y-5 md:space-y-5 sm:space-y-5 xs:space-y-5 xl:w-[32.5rem] lg:w-[32.5rem] md:w-[32.5rem] sm:w-[21rem] xs:w-[21rem]">
                <input
                  type="email"
                  placeholder="email address"
                  className="w-[100%] py-3 rounded-xl pl-4 font-bold outline-none transition-all ease-in duration-200 hover:outline-cyan focus:outline-cyan hover:outline-4 focus:outline-4 placeholder:text-sm placeholder:uppercase text-pitchBlack"
                  id="email"
                  {...register("email", {
                    required: "Please enter email",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                      message: "Please enter valid email",
                    },
                  })}
                />
                {errors.email && (
                  <div className="text-red-500">{errors.email.message}</div>
                )}
              </div>
            </div>
          </div>
          <div className="mb-24 ">
            <h1 className="text-2xl uppercase font-semibold pb-8">password</h1>
            <hr className="pb-10" />
            <div className="flex xl:flex-row lg:flex-row md:flex-col sm:flex-col xs:flex-col xl:space-x-[24rem] lg:space-x-[22rem] md:space-x-0 sm:space-x-0 xs:space-x-0 xl:space-y-0 lg:space-y-0 md:space-y-5 sm:space-y-5 xs:space-y-5">
              <div>
                <h1 className="text-gray-200 text-lg font-medium">
                  Change your password
                </h1>
              </div>
              <div className="flex xl:flex-col lg:flex-col md:flex-col sm:flex-col xs:flex-col xl:space-y-5 lg:space-y-5 md:space-y-5 sm:space-y-5 xs:space-y-5 xl:w-[32.5rem] lg:w-[32.5rem] md:w-[32.5rem] sm:w-[21rem] xs:w-[21rem]">
                <div className="relative">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    placeholder="old password"
                    className="w-[100%] py-3 rounded-xl pl-4 font-bold outline-none transition-all ease-in duration-200 hover:outline-cyan focus:outline-cyan hover:outline-4 focus:outline-4 placeholder:text-sm placeholder:uppercase text-pitchBlack"
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                    onClick={toggleOldPasswordVisibility}
                  >
                    {showOldPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM4 10a6 6 0 1112 0A6 6 0 014 10z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M4.775 5.262A15.9 15.9 0 018.063 4.5a16.07 16.07 0 012.868-.356l-.635-.637C8.883 3.383 7.995 3 6.75 3 4.897 3 3.226 3.71 2.041 4.925l2.734 2.734zm9.45 9.45l-1.734-1.734c-.566.34-1.22.551-1.932.551-1.104 0-2-.896-2-2 0-.712.211-1.366.551-1.932L3.515 3.515l1.414-1.414L16.414 14.1l-1.414 1.414zM10 16a6 6 0 100-12 6 6 0 000 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="new password"
                    className="w-[100%] py-3 rounded-xl pl-4 font-bold outline-none transition-all ease-in duration-200 hover:outline-cyan focus:outline-cyan hover:outline-4 focus:outline-4 placeholder:text-sm placeholder:uppercase text-pitchBlack"
                    id="password"
                    {...register("password", {
                      required: "Please enter new password",
                      minLength: {
                        value: 6,
                        message: "password is more than 5 chars",
                      },
                    })}
                  />
                  {errors.password && (
                    <div className="text-red-500 ">
                      {errors.password.message}
                    </div>
                  )}
                  <button
                    type="button"
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                    onClick={toggleNewPasswordVisibility}
                  >
                    {showNewPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM4 10a6 6 0 1112 0A6 6 0 014 10z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M4.775 5.262A15.9 15.9 0 018.063 4.5a16.07 16.07 0 012.868-.356l-.635-.637C8.883 3.383 7.995 3 6.75 3 4.897 3 3.226 3.71 2.041 4.925l2.734 2.734zm9.45 9.45l-1.734-1.734c-.566.34-1.22.551-1.932.551-1.104 0-2-.896-2-2 0-.712.211-1.366.551-1.932L3.515 3.515l1.414-1.414L16.414 14.1l-1.414 1.414zM10 16a6 6 0 100-12 6 6 0 000 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="confirm password"
                    className="w-[100%] py-3 rounded-xl pl-4 font-bold outline-none transition-all ease-in duration-200 hover:outline-cyan focus:outline-cyan hover:outline-4 focus:outline-4 placeholder:text-sm placeholder:uppercase text-pitchBlack"
                    id="confirmPassword"
                    {...register("confirmPassword", {
                      required: "Please confirm new password",
                      validate: (value) => value === getValues("password"),
                      minLength: {
                        value: 6,
                        message: "confirm password is more than 5 chars",
                      },
                    })}
                  />
                  {errors.confirmPassword && (
                    <div className="text-red-500 ">
                      {errors.confirmPassword.message}
                    </div>
                  )}
                  {errors.confirmPassword &&
                    errors.confirmPassword.type === "validate" && (
                      <div className="text-red-500 ">Password do not match</div>
                    )}
                  <button
                    type="button"
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM4 10a6 6 0 1112 0A6 6 0 014 10z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M4.775 5.262A15.9 15.9 0 018.063 4.5a16.07 16.07 0 012.868-.356l-.635-.637C8.883 3.383 7.995 3 6.75 3 4.897 3 3.226 3.71 2.041 4.925l2.734 2.734zm9.45 9.45l-1.734-1.734c-.566.34-1.22.551-1.932.551-1.104 0-2-.896-2-2 0-.712.211-1.366.551-1.932L3.515 3.515l1.414-1.414L16.414 14.1l-1.414 1.414zM10 16a6 6 0 100-12 6 6 0 000 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-32">
          <button
            className="px-8 py-3 bg-cyan text-pitchBlack font-bold text-xl rounded-xl w-full"
            type="submit"
            onClick={handleSubmit(submitHandler)}
          >
            save
          </button>
        </div>
      </div>
    </Layout>
  );
}
