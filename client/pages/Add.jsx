import React, { useEffect } from "react";
import Layout from "../components/layout";
import ItemForm from "../components/ItemForm";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";

function Add() {
    const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
    if(user && user.role !== "Admin")
    {
      router.push('/Home');
      alert("only admins can add items");
    }
  }, [user]);

  return (
    <Layout>
      <div className="m-10">
        <ItemForm />
      </div>{" "}
    </Layout>
  );
}

export default Add;
// export default withAuth(Add, ['Admin']);
