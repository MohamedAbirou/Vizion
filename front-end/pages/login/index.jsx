import React, { useEffect } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Layout from "../../components/Layout";
import { getError } from "@/utils/error";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function LoginScreen() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ email, password }) => {
    try {
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
    <Layout showFooter={false} title="Login">
      <div className="container mx-auto relative xl:top-48 lg:top-48 md:top-48 sm:top-48 xs:top-40 flex flex-col justify-center items-center xl:w-4/12 lg:w-[100%] md:w-[100%] sm:w-10/12 xs:w-[100%]">
        <h1 className="text-white xl:text-5xl lg:text-4xl md:text-4xl sm:text-4xl xs:text-3xl font-akira">
          login
        </h1>
        <form
          action=""
          method="POST"
          className="py-10 space-y-7"
          onSubmit={handleSubmit(submitHandler)}
        >
          <input
            type="email"
            id="email"
            className="w-[100%] py-3 rounded-xl pl-4 font-bold outline-none transition-all ease-in duration-200 hover:outline-cyan focus:outline-cyan hover:outline-4 focus:outline-4 placeholder:text-sm placeholder:uppercase"
            {...register("email", {
              required: "Please enter email",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "Please enter valid email",
              },
            })}
            placeholder="email address"
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
          <input
            type="password"
            id="password"
            className="w-[100%] py-3 rounded-xl pl-4 font-bold outline-none transition-all ease-in duration-200 hover:outline-cyan focus:outline-cyan hover:outline-4 focus:outline-4 placeholder:text-sm placeholder:uppercase"
            {...register("password", {
              required: "Please enter password",
              minLength: {
                value: 6,
                message: "password is more than 5 chars",
              },
            })}
            placeholder="password"
            autoFocus
          />
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
          <button
            className="bg-cyan text-black font-bold text-xl w-[100%] py-2 rounded-xl uppercase"
            onClick={() => {}}
          >
            login
          </button>
          <p className="text-center text-white font-bold xl:text-lg lg:text-lg md:text-lg sm:text-lg xs:text-md">
            Don't have an account?&nbsp;&nbsp;
            <Link
              href={`/register?redirect=${redirect || "/"}`}
              className="text-cyan font-medium hover:underline capitalize xl:text-xl lg:text-xl md:text-xl sm:text-lg  xs:text-lg"
            >
              register
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}
