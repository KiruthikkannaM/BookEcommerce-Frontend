import React from "react";
import Account from "./account";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../pages/checkoutPage.css"

function CheckOutPage(){
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const userId=localStorage.getItem("userId");
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const navigate = useNavigate();
    const totalPrice = location.state?.totalPrice || 0;
    

    const handlePaymentMethod = (method) => {
        setSelectedPaymentMethod(method);
        setMessage(`Payment method selected: ${method}`);
    };

    const handlePayment=async ()=>{
        if(!userId){
            setMessage("Please log in to proceed with payment.");
            return;
        }
        if (!selectedPaymentMethod) {
            setMessage("Please select a payment method.");
            return;
        }
        setLoading(true);
        setMessage("Processing your order...");
        try{
            const response=await axios.post("https://booklust-backend.onrender.com/pay",{userId,paymentMethod: selectedPaymentMethod});
            if(response.status===200){
                setMessage(response.data);
                setTimeout(()=>navigate("/orders"),2000);
            }
        }catch(err){
            if(err.response && err.response.status===400){
                setMessage(err.response.data);
            }else{
                setMessage("An error occured during payment. Please try again.");
            }

        }finally{
            setLoading(false);
        }
    };


    return(
        <div className="checkout-container">
            <div className="total-summary">
                <h2 className="order-summary">Order Summary</h2>
                <p className="total-price">Total Price: <strong>${totalPrice.toFixed(2)}</strong></p>
            </div>
            <div className="payment-methods">
                <h3 className="payment-method-title">Select Payment Method</h3>
                <div className="payment-buttons">
                    <button className="payment-button-stripe" onClick={() => handlePaymentMethod("Stripe")}>
                        
                    </button>
                    <button className="payment-button-razorpay" onClick={() =>handlePaymentMethod("Razorpay")}>
                        
                    </button>
                    <button className="payment-button-cod" onClick={() => handlePaymentMethod("Cash on Delivery")}>
                        Cash on Delivery
                    </button>
                 </div>
                 <button className="place-order-button" onClick={handlePayment}>
                    Place Order
                 </button>
            </div>
            {loading && <p className="loading-message"  style={{
                marginTop: '40px',
                textAlign: 'center',
                fontFamily: '"Average Sans", serif',
                fontSize: '20px',
                fontWeight: '600'

            }}>Processing payment...</p>}
            {message && <p className="payment-message" style={{
                marginTop: '40px',
                textAlign: 'center',
                fontFamily: '"Average Sans", serif',
                fontSize: '20px',
                fontWeight: '600'

            }}>{message}</p>}
            
            <div className="account-changes"><p>Changes? press<Link to="/account" className="account-button"> Account</Link></p></div>
            
        </div>
    );
}

export default CheckOutPage;