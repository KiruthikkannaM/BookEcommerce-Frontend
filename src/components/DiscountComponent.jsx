import { useState ,useEffect} from "react";
import axios from "axios";
import { Typography,Card } from "antd";
import "../components/DiscountComponent.css"
import CardComponent from "./CardComponent";

const API_URL="https://booklust-backend.onrender.com";
const {Text}=Typography;
const DiscountComponent=()=>{
    const [discountBooks,setdiscountBooks]=useState([]);
    const [loading,setloading]=useState(true);


    useEffect(()=>{
        const fetchbooks=async ()=>{
            try{
                const result=await axios.get(API_URL,
                    {params: {category:"discount",limit:5},}
                )
                setdiscountBooks(result.data.books||[]);
                console.log(result.data.books);

            }catch(err){
                console.log("the error found is:",err);
            }finally{
                setloading(false);
            }
        }
        fetchbooks();
    },[]);
    return (
        <div className="discountBooks-container">
            <div className="header-container">
                <div>
                    <Text className="discountBooks-title">
                        DISCOUNT BOOKS
                    </Text>
                </div>
                <a href="/discount" className="view-more-link">
                    View More <span>›</span>
                </a>
            </div>
            <div className="discountBooks-scroller">
                {loading ? (
                    <Text>Loading....</Text>
                ) : (
                    discountBooks.map((book) => (
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

export default DiscountComponent;