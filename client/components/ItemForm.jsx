import React from "react";
import { useFormik } from "formik";
import { addSchema } from "../schemas";
import InputField from "./InputField";

const fields = [
  { label: "Name", id: "name", type: "text", placeholder: "Enter Item Name" },
  {
    label: "Description",
    id: "description",
    type: "text",
    placeholder: "Enter Description",
  },
  {
    label: "Identifier",
    id: "identifier",
    type: "text",
    placeholder: "Enter Identifier",
  },
  {
    label: "Supplier",
    id: "supplier",
    type: "text",
    placeholder: "Enter Supplier Name",
  },
  {
    label: "Location",
    id: "location",
    type: "text",
    placeholder: "Enter Location",
  },
  {
    label: "Quantity",
    id: "quantity",
    type: "number",
    placeholder: "Enter Quantity",
  },
  { label: "Price", id: "price", type: "number", placeholder: "Enter Price" },
  {
    label: "Category",
    id: "category",
    type: "text",
    placeholder: "Enter Category",
  },
];

function ItemForm() {
  const onSubmit = async (values, actions) => {
    const tempitem = {
      identifier: values.identifier,
      name: values.name,
      supplier: values.supplier,
      location: values.location,
      quantity: values.quantity,
      description: values.description,
      price: values.price,
      category: values.category,
    };

    fetch("http://localhost:3001/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tempitem),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Item added:", data);
        })
        .catch((error) => {
          console.error("Error adding item:", error);
        });
    actions.resetForm();
    alert('New item wad added!');
  };

  const formik = useFormik({
    initialValues: {
      identifier:  "",
      quantity:  "",
      name: "",
      price: "",
      supplier: "",
      category: "Spare Part",
      description: "",
      location:  "",
    },
    validationSchema: addSchema,
    onSubmit,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      autoComplete="off"
      className="flex flex-col justify-center align-center"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          {fields.map(
            (field,index) =>
              field.label !== "Category" && (
                index<4 && <InputField
                  key={field.id}
                  label={field.label}
                  id={field.id}
                  type={field.type}
                  value={formik.values[field.id]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={field.placeholder}
                  error={formik.errors[field.id]}
                  touched={formik.touched[field.id]}
                />
              )
          )}
          </div>
          <div>
          {fields.map(
            (field,index) =>
              field.label !== "Category" && (
                index>=4 && <InputField
                  key={field.id}
                  label={field.label}
                  id={field.id}
                  type={field.type}
                  value={formik.values[field.id]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={field.placeholder}
                  error={formik.errors[field.id]}
                  touched={formik.touched[field.id]}
                />
              )
          )}
          <div className="my-3">
            <label htmlFor="category">Choose a category:</label>
            <select
              name="category"
              id="category"
              className={`border p-2 rounded-lg w-full focus:outline-none focus:border-orgblue hover:border-orgblue shadow-sm transition duration-300 border-[#bfbfbf]`}
              onChange={formik.handleChange}
              value={formik.values.category}
            >
              <option value="Electrical Parts">Electrical Parts</option>
              <option value="Vehicle">Vehicle</option>
              <option value="Fluid">Fluid</option>
              <option value="Mechanical Parts">Mechanical Parts</option>
              <option value="Raw Material">Raw Material</option>
            </select>
            {formik.errors.category && formik.touched.category && (
              <p className="text-xs text-[#ff4545]">{formik.errors.category}</p>
            )}
          </div>
        </div>
      </div>
      <button
          disabled={formik.isSubmitting}
          type="submit"
          className="text-[#fff] border border-orgblue bg-orgblue p-2 mt-5 rounded-md hover:bg-[#fff] hover:text-orgblue transition duration-300"
        >
          Submit
        </button>
    </form>
  );
}

export default ItemForm;
