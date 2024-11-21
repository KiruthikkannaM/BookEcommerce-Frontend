import React from "react";
import "../pages/BooksPage.css"
import { useState,useEffect } from "react";
import axios from "axios";
import { Pagination } from "antd";
import CardComponent from "../components/CardComponent";


function Discount(){
    const [discountBooks,setdiscountBooks]=useState([]);
    const [loading,setloading]=useState(true);
    const [currentPage,setCurrentPage]=useState(1);
    const booksPerPage=10;
    const lastIndex=currentPage*booksPerPage;
    const firstIndex=lastIndex-booksPerPage;
    const records=discountBooks.slice(firstIndex,lastIndex);
    const numberOfPages=Math.ceil(discountBooks.length/booksPerPage);
    const numbers=[...Array(numberOfPages+1).keys()].slice(1);

    useEffect(()=>{
        const handleFetch= async ()=>{
            try{
                const response=await axios.get("https://booklust-backend.onrender.com/books",{
                    params:{category:"discount",limit:10},});
                if(response.status===200){
                    setdiscountBooks(response.data.books||[]);
                    setloading(false);
                }else{
                    setloading(true);

                }

                }catch(err){
                    if (err.response && err.response.status === 404) {
                        console.log("No books to show!!");
                      } else {
                        
                        console.log('Error fetching books', err.message);
                      }
                }

        }
        handleFetch();
    },[]);

    // const indexOfLastBook=currentPage*booksPerPage;
    // const indexOfFirstBook=indexOfLastBook-booksPerPage;
    // const currentBooks=discountBooks.slice(indexOfFirstBook,indexOfLastBook);

    // const handlePageChange=(page)=>{
    //     setCurrentPage(page);
    // }


    return (
        <div className="books-container">
            {loading?(
                <div className="loading-text">Loading...</div>
            ):(
                <>
                {records.map((book)=>(
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
                ))}
                <div className="pagination-container">
                <ul className="pagination">
                    <li className="page-item">
                        <a href=""  onClick={(e)=>{
                            e.preventDefault()
                            prePage()
                        }}>◄</a>
                    </li>
                    {
                        numbers.map((n,i)=>(
                            <li className={`page-item ${currentPage===n?"active":""}`} key={i}>
                                <a href=""  onClick={(e)=>{
                                    e.preventDefault()
                                    changePage(n)}}>{n}</a>
                            </li>
                        ))
                    }
                    <li className="page-item">
                        <a href=""  onClick={(e)=>{
                            e.preventDefault()
                            nextPage()
                        }}>►</a>
                    </li>
                   </ul>

                </div>
                
            </>
            )
            }
            
            

        </div>
    )

    function prePage(){
        if(currentPage!==1){
            setCurrentPage(currentPage-1);
        }
    }
    function nextPage(){
        if(currentPage!==numberOfPages){
            setCurrentPage(currentPage+1);
        }
    }
    function changePage(id){
        setCurrentPage(id);
    }
}

export default Discount;