import React, { useEffect, useRef, useState } from "react";
import loc from "../Images/rm.png";
import loc2 from "../Images/tire.png";
import loc3 from "../Images/fluid.png";
import loc4 from "../Images/acc.png";
import loc5 from "../Images/spare.png";
import Layout from "../components/layout";
import { useAuth } from "../contexts/AuthContext";
import HomeComponent from "../components/HomeComponent";
import { useRouter } from "next/router";

function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user]);

  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("All");
  const categories = [
    {
      name: "Electrical Parts",
      loc: loc5,
      b: true,
    },
    {
      name: "Fluid",
      loc: loc3,
      b: false,
    },
    {
      name: "Vehicle",
      loc: loc,
      b: true,
    },
    {
      name: "Mechanical Parts",
      loc: loc4,
      b: false,
    },

    {
      name: "Raw Material",
      loc: loc2,
      b: true,
    },
  ];

  useEffect(() => {
    fetch("http://localhost:3001/items")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      });
  }, []);
  

  return (
    <Layout>
      <div className="p-12">
        <div className="flex flex-row justify-center align-center text-lg text-orgblue">
          <label htmlFor="categories">Choose a category:</label>
          <select
            name="categories"
            id="categories"
            className="w-[20%] focus:outline-none mx-8"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Electrical Parts">Electrical Parts</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Fluid">Fluid</option>
            <option value="Mechanical Parts">Mechanical Parts</option>
            <option value="Raw Material">Raw Material</option>
          </select>
        </div>

        {categories.map(
          (category, index) =>
            (category.name === filter || filter === "All") && (
              <HomeComponent
                filter={category.name}
                loc={category.loc}
                items={items}
                b={category.b}
                key={index}
                setItems={setItems}
              />
            )
        )}
      </div>{" "}
    </Layout>
  );
}

export default Home;
