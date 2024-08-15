import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../Images/logo.png";
import SignupForm from "@/components/SignupForm";
import SigninForm from "@/components/SigninForm";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";

function Register() {
  const [type,setType] = useState("up");
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user]);
  
  return (
    <div className="flex min-h-screen justify-center items-center bg-gradient-to-b from-light">
        <div className="flex flex-col justify-center align-center p-12 bg-[#ffffff] rounded-md shadow-lg shadow-[#f59e0b80] my-10">
        <Image id="lightimg" src={logo} width={400} alt="Logo" />
        <div className="grid grid-cols-2">
          <button onClick={()=>setType("up")}
            className={`p-2 ${
              type==='up' ? 'bg-[#eeeeee] text-org' : 'text-orgblue'
            }`}
            >Sign Up</button>
          <button onClick={()=>setType("in")} className={`p-2 ${
              type==='in' ? 'bg-[#eeeeee] text-org' : 'text-orgblue'
            }`}>Sign In</button>
        </div>
        {type==="up" && <SignupForm/>}
        {type==="in" && <SigninForm/>}
      </div>
    </div>
  );
}

export default Register;
