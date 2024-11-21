import React from "react";
import { useEffect,useState } from "react";
import axios from "axios";
import CardSlider from "../components/CardSlider";
import TrendingComponent from "../components/TrendingComponent";
import DiscountComponent from "../components/DiscountComponent";
import { Link } from "react-router-dom";
import "../pages/landing.css"


function Landing(){
    return (
        <div className="landing-container">
            <CardSlider/>
            <TrendingComponent/>
            <DiscountComponent/>
            <div><Link to="/books" className="viewall-button">View All<span>›</span></Link></div>
            
        </div>
    )
}
export default Landing;