import React from "react";
import axios from "axios";
import { Button } from "antd";


const AddToCart = ({ userId, itemId,price }) => {
  const addToCart = async () => {
    try {
      console.log("Sending data:", { userId, itemId });  
      const response = await axios.post("https://booklust-backend.onrender.com/add-to-cart", {
        userId: userId,  
        itemId: itemId, 
        price: price,
      });
      console.log(userId);

      if (response.status === 200) {
        console.log("Item added to cart successfully");
        alert("item added successfully");
      }
    } catch (error) {
      console.log("Error adding to cart:",  error.response?.data || error.message);
    }
  };

  return (
    <button type="primary" onClick={addToCart} className="add-to-cart">
      Add to Cart
    </button>
  );
};

export default AddToCart;
