import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useAuth } from "../../contexts/AuthContext";
function Item() {
  const { user } = useAuth();
  const [item, setItem] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const { identifier } = router.query;

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    if (identifier) {
      fetch(`http://localhost:3001/items/${identifier}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch the item");
          }
          return response.json();
        })
        .then((data) => {
          setItem(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [identifier]);

  const handleEditClick = () => {
    if (user.role === "Admin") {
      setIsEditing(true);
    } else {
      alert("Only admins can access editing.");
    }
  };

  const handleSaveClick = () => {
    const itemId = item.identifier;

    if (!itemId) {
      console.error("Item ID is undefined. Cannot update item.");
      alert("Item ID is missing. Please select a valid item to update.");
    } else {
      fetch(`http://localhost:3001/items/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Item updated:", data);
        })
        .catch((error) => {
          console.error("Error updating item:", error);
        });
    }
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout>
      <div className="m-10 text-orgblue min-h-96">
        <h1 className="text-4xl font-bold">
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={item.name || ""}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
            />
          ) : (
            item.name
          )}
        </h1>
        <div className="grid grid-cols-2 text-xl leading-[60px] my-8">
          <div className="flex flex-col">
            <p>
              <b>Item Code:</b>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="identifier"
                  value={item.identifier || ""}
                  onChange={handleChange}
                  className="border p-2 rounded-lg w-full"
                  disabled
                />
              ) : (
                item.identifier
              )}
            </p>
            <p>
              <b>Supplier:</b>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="supplier"
                  value={item.supplier || ""}
                  onChange={handleChange}
                  className="border p-2 rounded-lg w-full"
                />
              ) : (
                item.supplier
              )}
            </p>
            <p>
              <b>Location:</b>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={item.location || ""}
                  onChange={handleChange}
                  className="border p-2 rounded-lg w-full"
                />
              ) : (
                item.location
              )}
            </p>
            <p>
              <b>Quantity:</b>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="quantity"
                  value={item.quantity || ""}
                  onChange={handleChange}
                  className="border p-2 rounded-lg w-full"
                />
              ) : (
                item.quantity
              )}
            </p>
          </div>
          <div className="flex flex-col">
            <p>
              <b>Description:</b>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="description"
                  value={item.description || ""}
                  onChange={handleChange}
                  className="border p-2 rounded-lg w-full"
                />
              ) : (
                item.description
              )}
            </p>
            <p>
              <b>Price:</b>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="price"
                  value={item.price || ""}
                  onChange={handleChange}
                  className="border p-2 rounded-lg w-full"
                />
              ) : (
                item.price
              )}
            </p>
            <p>
              <b>Category:</b>{" "}
              {isEditing ? (
                <div>
                  <select
                    name="category"
                    id="category"
                    className={`border p-2 rounded-lg w-full focus:outline-none focus:border-orgblue hover:border-orgblue shadow-sm transition duration-300 border-[#bfbfbf]`}
                    onChange={handleChange}
                    value={item.category || ""}
                  >
                    <option value="Electrical Parts">Electrical Parts</option>
                    <option value="Vehicle">Vehicle</option>
                    <option value="Fluid">Fluid</option>
                    <option value="Mechanical Parts">Mechanical Parts</option>
                    <option value="Raw Material">Raw Material</option>
                  </select>
                </div>
              ) : (
                item.category
              )}
            </p>
          </div>
        </div>
        <div className="flex justify-center align-center">
          {isEditing ? (
            <button
              onClick={handleSaveClick}
              className="bg-lightblue p-2 my-2 px-8 rounded-sm hover:bg-orgblue hover:text-lightblue transition duration-200"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEditClick}
              className="bg-lightblue p-2 my-2 px-8 rounded-sm hover:bg-orgblue hover:text-lightblue transition duration-200"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Item;
// export default withAuth(Item, ['Admin','User']);
