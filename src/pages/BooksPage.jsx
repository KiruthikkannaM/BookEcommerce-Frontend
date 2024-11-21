import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { Card,Typography,Pagination } from "antd";
import CardComponent from "../components/CardComponent";
import "../pages/BooksPage.css";




function BooksPage(){
    const [booksdata,setbooksdata]=useState([]);
    const [loading,setloading]=useState(true);
    const [currentPage,setCurrentPage]=useState(1);
    const booksPerPage=20;

    const lastIndex=currentPage*booksPerPage;
    const firstIndex=lastIndex-booksPerPage;
    const records=booksdata.slice(firstIndex,lastIndex);
    const numberOfPages=Math.ceil(booksdata.length/booksPerPage);
    const numbers=[...Array(numberOfPages+1).keys()].slice(1);

    useEffect(()=>{
        const handleFetch=async ()=>{
            try{
                const response=await axios.get('https://booklust-backend.onrender.com/books', {
                    params: { limit: 116 }, 
                  });
                if(response.status===200){
                    console.log("book items:",response.data);
                    setbooksdata(response.data.books);
                    setloading(false);
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

    

    return(
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

export default BooksPage;