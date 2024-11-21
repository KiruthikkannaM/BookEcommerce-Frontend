import React from "react";
import axios from "axios";
import { useState,useEffect } from "react";
import "../pages/account.css"


function Account(){
    const userId=localStorage.getItem("userId");
    const [accountDetails,setAccountDetails]=useState({
        first_name: "",
        last_name: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
        age: "",
        gender: ""
    });

    const [notFound,setNotFound]=useState(false);

    useEffect(()=>{
        const fetchDetails=async ()=>{
            try{
                const response=await axios.get(`https://booklust-backend.onrender.com/account/${userId}`);
                if(response.status===200){ 
                    setAccountDetails(response.data);
                    console.log(response.data);

                }
                
            }catch(err){
                if(err.response && err.response.status===404){
                    setNotFound(true);
                }else{
                    console.log("error fetching details:",err.message);
                }
            }

        };
        fetchDetails();
    },[userId]);

    const handleChange=(e)=>{
        setAccountDetails({...accountDetails,[e.target.name]:e.target.value})

    };

    const handleSubmit=async (e)=>{
        e.preventDefault();

        try{
            let response;
            if(notFound){
                response = await axios.post(`https://booklust-backend.onrender.com/account/${userId}`, accountDetails);
                alert("Account created successfully");
            }else{
                const response=await axios.put(`https://booklust-backend.onrender.com/account/${userId}`,accountDetails);
                alert("Account details updated successfully");


            }
            setNotFound(false); 
            
        }catch(err){
            console.log("error updating account details:",err.message);
        }

    };

    return(
        <div className="accounts-form-container">
            <h1 className="accounts-title">Welcome!!</h1>           
            <form className="accounts-form" onSubmit={handleSubmit}>
                <div className="form-columns">
                <div className="user-details">
                <h3 className="user-details-title">User details:</h3>
                <input type="text" name="first_name" value={accountDetails.first_name} onChange={handleChange} placeholder={notFound?"First_Name":""} className="input-firstname"/>
                <input type="text" name="last_name" value={accountDetails.last_name} onChange={handleChange} placeholder={notFound?"Last_Name":""} className="input-lastname"/>
                <input type="email" name="email" value={accountDetails.email} onChange={handleChange} placeholder={notFound?"Mail":""} className="input-email"/>
                <input type="number" name="phone" value={accountDetails.phone} onChange={handleChange} placeholder={notFound?"Phone":""} className="input-phone"/>
                <input type="number" name="age" value={accountDetails.age} onChange={handleChange} placeholder={notFound?"Age":""} className="input-age"/>
                <input type="text" name="gender" value={accountDetails.gender} onChange={handleChange} placeholder={notFound?"Gender":""} className="input-gender"/>
                </div>
                <div className="user-address-details">
                <h3 className="user-details-title">User Address:</h3>
                <input type="text" name="street" value={accountDetails.street} onChange={handleChange} placeholder={notFound?"Street":""} className="input-street"/>
                <input type="text" name="city" value={accountDetails.city} onChange={handleChange} placeholder={notFound?"City":""} className="input-city"/>
                <input type="text" name="state" value={accountDetails.state} onChange={handleChange} placeholder={notFound?"State":""} className="input-state"/>
                <input type="text" name="zipcode" value={accountDetails.zipcode} onChange={handleChange} placeholder={notFound?"Zipcode":""} className="input-zipcode"/>
                <input type="text" name="country" value={accountDetails.country} onChange={handleChange} placeholder={notFound?"Country":""} className="input-country"/>
                </div>
                </div>
                <button className="accounts-form-submit">Change</button>
            </form>
        </div>
    )
}

export default Account;