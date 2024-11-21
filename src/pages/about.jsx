import bookimage1 from "../assets/aboutus 1.jpg"
import bookimage2 from "../assets/aboutus 2.jpg";
import bookimage3 from "../assets/aboutus 3.jpg";
import "../pages/about.css"

export default function AboutUs(){
    return (
        <div className="aboutus-container">
            <div className="aboutus-header">
                <img src={bookimage1} alt="book image" className="aboutus-bookimage1"/>
               
            </div>
            <h1 className="aboutus-slogan">“Book your personality!!”</h1>
            <h2 className="aboutus-heading">About Us</h2>
            <div className="aboutus">
                <img src={bookimage2} alt="book image" className="aboutus-bookimage2"/>
                <div className="aboutus-content1">
                    <p>We strongly believe that books shape the personality of who you are, and what you're going to be. We connect readers through books and it helps in broadening our interest, passion and aspirations.</p>
                    </div>
            </div>
            <h2 className="aboutus-whoarewe-heading">Who Are We??</h2>
            <div className="aboutus-whoarewe">
                <div className="aboutus-content2"><p>Book Lust is an emerging e commerce which sells books that is truly matter to our buyers. We provide access to a diverse and curated collection of books. We aim to create a space where people from various regions and with unique interests can connect through the shared love of reading.</p></div>
                <img src={bookimage3} alt="books in a shelf image" className="aboutus-bookimage3"/>
            </div>
            
        </div>
    )

}