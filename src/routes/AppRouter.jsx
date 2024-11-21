import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from "../pages/landing";
import AboutUs from "../pages/about";
import Cart from "../pages/cart";
import Account from "../pages/account";
import Orders from "../pages/orders";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import Trending from "../pages/Trending";
import Discount from "../pages/Discount";
import BooksPage from "../pages/BooksPage";
import CheckOutPage from "../pages/checkoutPage";



const AppRouter=()=>{
    return (
        <Routes>
            <Route path="/" exact element={<Landing/>}/>
            <Route path="/aboutus" element={<AboutUs/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/account" element={<Account/>}/>
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/trending" element={<Trending/>}/>
            <Route path="/discount" element={<Discount/>}/>
            <Route path="/books" element={<BooksPage/>}/>
            <Route path="/checkout" element={<CheckOutPage/>}/>
        </Routes>
    )
}

export default AppRouter;
