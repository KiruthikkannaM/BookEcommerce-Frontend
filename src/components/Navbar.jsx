import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../components/Navbar.css";
import titleImage from '../assets/titlePhoto.png';
import { Button, Dropdown } from "antd";
import profileIcon from '../assets/profile-icon.png';

export default function Navbar(){
    const [loginStatus, setLoginStatus] = useState(false);
    const [isVisible,setisVisible]=useState(true);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        console.log('userId from localStorage:', userId); 
        setLoginStatus(!!userId);  
        const handleScroll=()=>{
            
            if(window.scrollY>50) setisVisible(false);
            else setisVisible(true);

        }
        window.addEventListener("scroll",handleScroll);
        return ()=>window.removeEventListener("scroll",handleScroll);
    }, []);  

    const handleLogout = () => {
        localStorage.removeItem("userId");
        setLoginStatus(false);
        window.location.href = "/";
    };

    const items = [
        {
            key: '0',
            label: <Link className="list-element" to="/account">Account</Link>,
        },
        {
            key: '1',
            label: (<Link className="list-element" to="/orders">Orders</Link>),
        },
        {
            key: '2',
            label: (<div onClick={handleLogout} className="dropdown-logout-button">LOGOUT</div>),
        }
    ];

    return (
        <div className={`navbar ${isVisible ? "show" : "hide"}`}>
            <nav>
                <Link to="/" className="title"><img alt="Title" src={titleImage} className="title" /></Link>
                <ul className="list">
                    <li><Link to="/cart" className="list-element">Cart</Link></li>
                    
                    <li><Link to="/aboutus" className="list-element">About Us</Link></li>
                    {loginStatus ? (
                        <Dropdown menu={{ items }} placement="bottom" className="profile-dropdown">
                            <Button icon={<img src={profileIcon} alt="Profile Icon" className="profile-icon" />} />
                        </Dropdown>
                    ) : (
                        <Link to="/login" className="list-element">Login</Link>
                    )}
                </ul>
            </nav>
        </div>
    )
}

