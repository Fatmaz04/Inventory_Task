import React, { useRef } from 'react'
import Image from "next/image";
import { useIsVisible } from "../components/useIsInvisible";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';


function HomeComponent({filter,loc,items,b,setItems}) {
    const {user} = useAuth();
    const { scrollYProgress } = useScroll();
    const xMovement = useTransform(scrollYProgress, [0, 1], (b) ? [0, 900] : [700,0]);
    const ref1 = useRef();
    const isVisible1 = useIsVisible(ref1);
    const router = useRouter();

    function handlClick(identifier)
    {
      router.push(`/Item/${identifier}`); 
    }

    const onDeleteSuccess = (identifier) => {
      setItems(items.filter(item => item.identifier !== identifier));
    };

    const handleDelete = async (identifier) => {
      if(user.role !== "Admin")
      {
        alert("Only admin can deleter");
        return;
      }
      const confirmDelete = window.confirm("Are you sure you want to delete this item?");
      if (!confirmDelete) return;
  
      try {
        const response = await fetch(`http://localhost:3001/items/${identifier}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          console.log("here");
          onDeleteSuccess(identifier); // Call the success callback
          alert("Item deleted successfully");
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("An error occurred while deleting the item");
      }
    };
  
  return (
    <div className='overflow-hidden'>
        <div
          className={`m-10 transition-opacity ease-in duration-700 ${
            isVisible1 ? "opacity-100" : "opacity-0"
          }`}
          ref={ref1}
        >
          <div className="flex flex-row justify-between font-mono italic">
            <motion.div
              style={{
                x: xMovement,
              }}
            >
              <Image src={loc} width={400} height={300} alt="Location" />
            </motion.div>
            <h1 className="text-5xl text-orgblue font-bold">{filter}</h1>
          </div>
          <div className="grid grid-cols-3">
            {items.map(
              (item, index) =>
                item.category ===filter && (
                  <div className="p-8 m-8 text-orgblue shadow-md shadow-[#f59e0b80] flex justify-center flex-col" key={index}>
                    <h2 className="text-center text-2xl font-semibold my-2 rounded-sm p-1">
                      {item.name}
                    </h2>
                    <p className="text-orgblue mt-2 font-semibold">
                      Price: {item.price}$
                    </p>
                    <p className=" mb-2 font-semibold">
                      Quantity: {item.quantity}
                    </p>
                    <div className='grid grid-cols-2 gap-4'>
                    <button 
                    onClick={() => handlClick(item.identifier)}
                    className="bg-lightblue p-2 my-2 rounded-sm hover:bg-orgblue hover:text-lightblue transition duration-200">
                      Read More
                    </button>
                    <button 
                    onClick={() => handleDelete(item.identifier)}
                    className="text-white bg-[#de0a26] p-2 my-2 rounded-sm hover:bg-white hover:text-[#de0a26] transition duration-200">
                      Delete
                    </button>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
  )
}

export default HomeComponent
