import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import "../pages/cart.css"
import CheckOutPage from "./checkoutPage";
import { useNavigate } from "react-router-dom";




function Cart(){
  const userId = localStorage.getItem("userId");
    const [cartItems,setCartItems]=useState([]);
    const [cartTotal,setCartTotal]=useState(0);
    const navigate=useNavigate();

    useEffect(()=>{
        const cartFetch=async ()=>{
            try{
                const response=await axios.get(`https://booklust-backend.onrender.com/cart/${userId}`);
                if(response.status===200){
                    console.log("cart items:",response.data);
                    setCartItems(response.data);
                }
            }catch(error){
                if (error.response && error.response.status === 404) {
                    console.log("No items in the cart!!");
                  } else {
                    
                    console.log('Error fetching cart:', error.message);
                  }
            }

        }
        cartFetch();
    },[userId]);

  

    const handleRemoveItem=async (isbn)=>{
      try{
        const response = await axios.delete("https://booklust-backend.onrender.com/delete-item",{
          data:{userId: userId,
          itemId:isbn,}
        });
        if(response.status===200){
          console.log("item deleted successfully");
          setCartItems(prevItems=>
            prevItems.filter((item)=>item.isbn!==isbn)
          );

        }
      }catch(err){
        console.log(err.message);
      }
    }


    const updateQuantity=async (isbn,newQuantity)=>{
      try{
        const response=await axios.patch("https://booklust-backend.onrender.com/cart/update-quantity",{
          userId:userId,
          itemId: isbn,
          quantity:newQuantity
        });
        if(response.status===200){
          const newPrice = response.data.newPrice;
          setCartItems(prevItems=>
            prevItems.map(item=>
              item.isbn===isbn?{...item,quantity:newQuantity,price:newPrice}:item
            )
          );
        }
      }catch(err){
        console.log("error updating quantity",err.message);
      }
    }

    const calculateTotal=()=>{
      // cartItems.map((cart)=>{
      //   setCartTotal(cartTotal+cart.price);
      // });
      const total = cartItems.reduce((acc, cart) => acc + cart.price * cart.quantity, 0);
      setCartTotal(total);
    }
    useEffect(() => {
      
      calculateTotal(cartItems);
    }, [cartItems]);

    return (
        <div className="cartItems-container">
          <h1 className="cart-title">Your Cart</h1>
          {cartItems.length === 0 ? (
            <p className="empty-cart">No items in the cart!</p>
          ) : (
            <div className="cart-items">
              {cartItems.map((cart) => (
                <div key={cart.isbn} className="cart-item">
                  <img src={cart.image_link} alt={cart.title} className="cart-item-image" />
                  <div className="cart-item-title">{cart.title}</div>
                  <div className="item-controls">
                  <div className="cart-item-quantity">
                      <label className="quantity-label">
                        Quantity:
                       </label>
                      <select
                        value={cart.quantity}
                        onChange={(e) => updateQuantity(cart.isbn, parseInt(e.target.value))}
                        className="quantity-select"
                      >
                          {[...Array(cart.quantity).keys()].map((num) => (
                          <option key={num + 1} value={num + 1}>
                             {num + 1}
                          </option>
                          ))}
                      </select>
                  </div>
                  <div className="cart-item-price">
                      ${cart.price}
                  </div>
                  <button className="delete-button" onClick={()=>handleRemoveItem(cart.isbn)}>
                      🗑️
                  </button>
              </div>
                  
                </div>
              ))}
            </div>
          )}
          <div className="cart-total">
            <h3 className="total-title">Cart Total:</h3>
            <div className="total-amount">
                <span className="total-label">Total:</span>
                <span className="total-value">${cartTotal}</span>
            </div>
          </div>
          <div className="cart-checkout-button"><button onClick={() => navigate("/checkout",{ state: { totalPrice: cartTotal }})}>CheckOut</button></div>
        </div>
  
    );

}
export default Cart;