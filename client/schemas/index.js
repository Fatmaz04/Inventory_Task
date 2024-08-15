import * as yup from "yup";

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter.

export const signupSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, {
      message: "Please create a stronger password, at least 1 upper case",
    })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  selectedRole: yup.string().required("Required"),
});

export const signinSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup.string().required("Required"),
});

export const addSchema = yup.object().shape({
  identifier: yup.string().required("Required"),
  quantity: yup.number("Please enter numeric value").required("Required"),
  name: yup.string().required("Required"),
  price: yup.number("Please enter numeric value").required("Required"),
  supplier: yup.string().required("Required"),
  category: yup.string().required("Required"),
  description: yup.string().required("Required"),
  location: yup.string().required("Required")
});
