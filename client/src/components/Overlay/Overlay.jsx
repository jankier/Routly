import { useState } from "react";
import "./Overlay.css"
import UserPage from "../UserPage/UserPage";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Overlay({ coordinates }){

    console.log(coordinates);
    const [loginSlide, setLoginSlide] = useState(false);

    const handleToggleLogin = () => {
        setLoginSlide(!loginSlide);
    }

    return (
        <div className="container">
            <UserPage handleToggleLogin={handleToggleLogin} loginSlide={loginSlide}/>
            <Header handleToggleLogin={handleToggleLogin}/>
            <div className="routes flex bg-background items-center justify-center">
                routes go here
            </div>
            <Footer/>
        </div>
    );
}

export default Overlay