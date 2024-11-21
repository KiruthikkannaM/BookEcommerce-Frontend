import React from "react"
import axios from "axios";
import { useState,useEffect } from "react";
import "../pages/orders.css"


function Orders(){
    const [orderedItems,setOrderedItems]=useState([]);
    const [loading,setLoading]=useState(false);
    const [message,setMessage]=useState("");
    const userId=localStorage.getItem("userId");

    try{
        useEffect(()=>{
            setLoading(true);
            const handleFetch=async ()=>{
                try{
                    const result=await axios.get(`https://booklust-backend.onrender.com/orders/${userId}`);
                    if(result.status===200){
                        setOrderedItems(result.data);
                        setMessage("");
    
                    }else{
                        setLoading(true);
                        setMessage(result.message);
                        
                    }
                }catch(err){
                    if(err.response && err.response.status===400){
                        setMessage(err.response.data);

                    }else{
                        setMessage("An error occured during fetching data!!");
                    }
                }finally{
                    setLoading(false);
                }
            }

            handleFetch();
        },[userId]);
        
    }catch(err){
        console.log(err);
    }
    if (loading) return <div>Loading...</div>;
    return(
        <div className="orders-container">
            <h1>Your Orders</h1>
        {message && <p>{message}</p>}
        <div className="order-items">
        {orderedItems.map((order)=>(
                <div key={order.order_id} className="order-card">
                    <div className="order-heading">
                    <h2 className="order-title">{order.title}</h2>
                    <p className="order-delivery-status">{order.delivery_status} </p>
                    </div>
                    <div className="ordered-items">
                        <div className="order-image">
                            <img src={order.image_link} alt={order.title} className="image"/>
                        </div>
                        <p className="order-quantity"><p className="label">Quantity:</p> {order.quantity}</p>
                        <div className="order-details">
                            <div className="order-date"><p className="label">Date_of_order:</p> {order.order_date}</div>
                            <div className="order-price"><p className="label">Price:</p> {order.price}</div>
                            <div className="order-payment"><p className="label">Payment mode:</p> {order.payment_method}</div>
                        </div>
                    </div>
                </div>


        ))}
        </div>
        </div>
        
    )
}

export default Orders;