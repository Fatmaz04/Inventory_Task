import React from "react";
import { useFormik, FormikHelpers } from "formik";
import { signupSchema } from "../schemas";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";

function SignupForm() {
  const router = useRouter();
  const { login } = useAuth();
  const onSubmit = async (values, actions) => {
    console.log(values);
    console.log(actions);
    axios
      .post("http://localhost:3001/register", {
        email: values.email,
        password: values.password,
        role: values.selectedRole,
      })
      .then((result) => {
        console.log(result);
        if (result.statusText === "OK") {
          //navigate
          localStorage.setItem("authToken", result.data.token);
          login({ email: values.email, role: values.selectedRole });
          // router.push('/Home');
        }
      })
      .catch((err) => {
        alert("Can't Sign Up, email already used.");
      });
    // router.push('/Home');
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
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      selectedRole: "",
    },
    validationSchema: signupSchema,
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
          <label htmlFor="password">Password:</label>
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
        <div className="my-3">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`border p-2 rounded-lg w-full focus:outline-none focus:border-orgblue hover:border-orgblue shadow-sm transition duration-300 ${
              errors.confirmPassword && touched.confirmPassword
                ? ""
                : "border-[#bfbfbf]"
            }`}
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="text-xs text-[#ff4545]">{errors.confirmPassword}</p>
          )}{" "}
        </div>
        <div className="my-3">
          <label htmlFor="role">Role:</label>
          <div className="flex flex-row my-2">
            <input
              type="radio"
              id="admin"
              onChange={handleChange}
              checked={values.selectedRole === "Admin"}
              name="selectedRole"
              value="Admin"
              className="relative color-black accent-orgblue h-5 w-5"
            />
            <label htmlFor="admin" className="pl-2 mt-[-3px]">
              Admin
            </label>
          </div>
          <div className="flex flex-row my-2">
            <input
              type="radio"
              id="user"
              onChange={handleChange}
              checked={values.selectedRole === "User"}
              name="selectedRole"
              value="User"
              className="relative color-black accent-orgblue h-5 w-5"
            />
            <label htmlFor="user" className="pl-2 mt-[-3px]">
              User
            </label>
          </div>
          {errors.selectedRole && touched.selectedRole && (
            <p className="text-xs text-[#ff4545]">{errors.selectedRole}</p>
          )}{" "}
        </div>
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

export default SignupForm;
