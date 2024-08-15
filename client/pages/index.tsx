import React, { useState } from "react";
import Home from "./Home"
import Register from "./Register"
import { useAuth } from "@/contexts/AuthContext";

function index() {
  const {user} = useAuth();
  console.log(user);
  
  return (
    <div>
      {user? <Home/> : <Register/>}
    </div>
  );
}

export default index;
