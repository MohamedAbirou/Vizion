import { useRouter } from "next/router";
import React from "react";
import Layout from "@/components/Layout";

export default function Unauthorized() {
  const router = useRouter();
  const { message } = router.query;

  return (
    <Layout title="Unauthorized Page">
      <div className="text-center text-2xl">
        <h1 className="text-3xl text-white">Access Denied</h1>
        {message && <div className="mb-4 text-red-500">{message}</div>}
      </div>
    </Layout>
  );
}
