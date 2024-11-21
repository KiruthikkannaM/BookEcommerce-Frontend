import React from "react";
import { Link,Route } from "react-router-dom";
import "../components/footer.css"
import { useState,useEffect } from "react";

function Footer(){

    const[isVisible,setisVisible]=useState(false);
    useEffect(()=>{
        const handleScroll=()=>{
            const scrollPosition=window.scrollY+window.innerHeight;
            const pageHeight=document.documentElement.scrollHeight;

            if(scrollPosition>=pageHeight-50){
                setisVisible(true);
            }else{
                setisVisible(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    },[]);
    return (
        <div className={`footer ${isVisible ? "show" : "hide"}`}>
        <footer className="footer-container">
            <div className="footer-explore">
                <h3 className="footer-label">Explore</h3>
                <Link to="/books" className="footer-component">Books</Link>
                <Link to="/trending" className="footer-component">Trending</Link>
                <Link to="/discount" className="footer-component">Discount</Link>
            </div>
            <div className="footer-account">
                <h3 className="footer-label">Account</h3>
                <Link to="/account" className="footer-component">Account</Link>
                <Link to="/cart" className="footer-component">Cart</Link>
                <Link to="/orders" className="footer-component">Your Orders</Link>
            </div>
            <div className="footer-aboutus">
                <h3 className="footer-label">Know Us</h3>
                <Link to="/aboutus" className="footer-component">About Us</Link>
            </div>
            <div className="footer-contactus">
                <h3 className="footer-label">Contact us</h3>
                <div className="footer-number">Phno: <p className="footer-component1">123456789</p></div>
                <div className="footer-mail">Email: <p className="footer-component1">booklust@gmail.com</p></div>
            </div>

        </footer>
        </div>
    )
}

export default Footer;