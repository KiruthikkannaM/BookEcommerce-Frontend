import { Typography } from "antd";
import axios from "axios";
import { useState , useEffect} from "react";
import {Card} from "antd";
import AddToCart from "./AddToCart";
const {Text}=Typography;
import "../components/TrendingComponent.css"

import CardComponent from "./CardComponent";
import { useNavigate } from "react-router-dom";


const TrendingComponent=()=>{
    const [trendingBooks,setTrendingBooks]=useState([]);
    const [loading, setLoading] = useState(true);
    const navigate=useNavigate();

    useEffect(()=>{
        const fetchBooks=async ()=>{
            try{
                const response =await axios.get("https://booklust-backend.onrender.com/books",{
                    params: {category:"trending",limit:5},
                });
                setTrendingBooks(response.data.books||[]);
                console.log(response.data.books);
            }catch(err){
                console.log("error fetching data:",err);
            }finally {
                setLoading(false);
            }

        };
        fetchBooks();
        console.log(trendingBooks);


    },[]);
    return (
        <div className="trendingComponent-container">
            <div className="header-container">
                <div>
                    <Text className="section-title">
                        LATEST COLLECTIONS
                    </Text>
                </div>
                <a onClick={()=>navigate('/trending')} className="view-more-link">
                    View More <span>›</span>
                </a>
            </div>
            <div className="trendingComponent-scroller">
                {loading ? (
                    <Text>Loading...</Text>
                ) : (
                    trendingBooks.map((book) => (
                        <CardComponent
                        key={book.isbn}
                        isbn={book.isbn}
                        title={book.title}
                        authors={book.authors}
                        genre={book.genre}
                        description={book.description}
                        image_link={book.image_link}
                        page={book.page}
                        price={book.price}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default TrendingComponent;

