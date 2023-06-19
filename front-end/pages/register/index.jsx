import React, { useEffect } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { getError } from "@/utils/error";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";

export default function RegisterScreen() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push("/account-success");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ firstName, lastName, email, password }) => {
    try {
      await axios.post("/api/auth/signup", {
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
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <Layout showFooter={false} title="create account">
      <div className="container mx-auto relative xl:top-48 lg:top-48 md:top-48 sm:top-48 xs:top-28 flex flex-col justify-center items-center xl:w-4/12 lg:w-[100%] md:w-[100%] sm:w-10/12 xs:w-[100%]">
        <h1 className="text-white xl:text-5xl lg:text-4xl md:text-4xl sm:text-4xl xs:text-3xl font-akira">
          register
        </h1>
        <form
          action=""
          method="POST"
          className="flex flex-col py-10 space-y-7"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="flex xl:flex-row lg:flex-row md:flex-row sm:flex-row xs:flex-col xl:space-x-5 lg:space-x-5 md:space-x-5 sm:space-x-5 xs:space-x-0 xl:space-y-0 lg:space-y-0 md:space-y-0 sm:space-y-0 xs:space-y-5">
            <input
              type="text"
              className="font-bold py-3 rounded-xl pl-4 outline-none transition-all ease-in duration-200 hover:outline-cyan focus:outline-cyan hover:outline-4 focus:outline-4 placeholder:text-sm placeholder:uppercase"
              placeholder="first name"
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
              className="font-bold py-3 rounded-xl pl-4 outline-none transition-all ease-in duration-200 hover:outline-cyan focus:outline-cyan hover:outline-4 focus:outline-4 placeholder:text-sm placeholder:uppercase"
              placeholder="last name"
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
          <input
            type="email"
            className="font-bold py-3 rounded-xl pl-4 outline-none transition-all ease-in duration-200 hover:outline-cyan focus:outline-cyan hover:outline-4 focus:outline-4 placeholder:text-sm placeholder:uppercase"
            id="email"
            autoFocus
            placeholder="email address"
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
          <input
            type="password"
            className="font-bold py-3 rounded-xl pl-4 outline-none transition-all ease-in duration-200 hover:outline-cyan focus:outline-cyan hover:outline-4 focus:outline-4 placeholder:text-sm placeholder:uppercase"
            id="password"
            placeholder="password"
            {...register("password", {
              required: "Please enter password",
              minLength: {
                value: 6,
                message: "password is more than 5 chars",
              },
            })}
            autoFocus
          />
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
          <input
            className="font-bold py-3 rounded-xl pl-4 outline-none transition-all ease-in duration-200 hover:outline-cyan focus:outline-cyan hover:outline-4 focus:outline-4 placeholder:text-sm placeholder:uppercase"
            placeholder="confirm password"
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Please enter confirm password",
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
          <button className="bg-cyan text-black font-bold uppercase text-xl w-[100%] py-2 rounded-xl">
            register
          </button>
        </form>
        <p className="text-center text-white font-bold xl:text-lg lg:text-lg md:text-lg sm:text-lg xs:text-lg xs:pb-10">
          Already have an account?&nbsp;&nbsp;
          <Link
            href={`/login?redirect=${redirect || "/"}`}
            className="text-cyan font-medium hover:underline capitalize xl:text-xl lg:text-xl md:text-xl sm:text-lg xs:text-lg"
          >
            login
          </Link>
        </p>
      </div>
    </Layout>
  );
}
