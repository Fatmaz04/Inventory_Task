import React from "react";
import { useFormik, FormikHelpers } from "formik";
import { signinSchema } from "../schemas";
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';


function SigninForm() {
  const router = useRouter();
  const { login } = useAuth();

  const onSubmit = async (values, actions) => {  
    axios.post("http://localhost:3001/login", {
        email: values.email,
        password: values.password,
        role: values.selectedRole,
      })
      .then((result) => {
        console.log(result);
        if (result.data.message === "Success") {
          //navigate
          localStorage.setItem("authToken", result.data.token);
          login({ email: values.email ,role: result.data.role});
          // router.push('/Home');
        }
      })
      .catch((err) => {
        alert("Can't Sign In, Make sure user info are right!")
      });
    actions.resetForm();
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } =
    useFormik ({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: signinSchema,
      onSubmit,
    });
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="flex flex-col justify-center align-center"
      >
        <div className="my-3">
          <label htmlFor="email" className="pr-2">
            Email:{" "}
          </label>
          <input
            value={values.email}
            onChange={handleChange}
            id="email"
            type="email"
            placeholder="Enter your email"
            onBlur={handleBlur}
            className={`border p-2 rounded-lg w-full focus:outline-none focus:border-orgblue hover:border-orgblue shadow-sm transition duration-300 ${
              errors.email && touched.email ? "" : "border-[#bfbfbf]"
            }`}
          />
          {errors.email && touched.email && (
            <p className="text-xs text-[#ff4545]">{errors.email}</p>
          )}
        </div>
        <div className="my-3">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`border p-2 rounded-lg w-full focus:outline-none focus:border-orgblue hover:border-orgblue shadow-sm transition duration-300 ${
              errors.password && touched.password ? "" : "border-[#bfbfbf]"
            }`}
          />
          {errors.password && touched.password && (
            <p className="text-xs text-[#ff4545]">{errors.password}</p>
          )}
        </div>{" "}
        <button
          disabled={isSubmitting}
          type="submit"
          className="text-[#fff] border border-orgblue bg-orgblue p-2 mt-5 rounded-md hover:bg-[#fff] hover:text-orgblue transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default SigninForm;
