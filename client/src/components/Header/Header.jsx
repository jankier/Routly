import { useContext } from "react";
import { UserContext } from "../../UserContext";
import "./Header.css"

function Header({handleToggleLogin}){

    const {user} = useContext(UserContext);

    return(
        <div className="header flex flex-col text-icons bg-secondary select-none">
            <div className="flex">
                <div className="logo flex flex-row text-primary items-center font-semibold">
                    <svg width="60px" height="60px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#00aaff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.144"></g><g id="SVGRepo_iconCarrier"> <path d="M6 21C7.5 19.4 9 17.9673 9 16.2C9 14.4327 7.65685 13 6 13C4.34315 13 3 14.4327 3 16.2C3 17.9673 4.5 19.4 6 21ZM6 21H17.5C18.8807 21 20 19.8807 20 18.5C20 17.1193 18.8807 16 17.5 16H15M18 11C19.5 9.4 21 7.96731 21 6.2C21 4.43269 19.6569 3 18 3C16.3431 3 15 4.43269 15 6.2C15 7.96731 16.5 9.4 18 11ZM18 11H14.5C13.1193 11 12 12.1193 12 13.5C12 14.8807 13.1193 16 14.5 16H15.6" stroke="#00aaff" strokeWidth="0.768" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    <span className="text-2xl">Routly</span>
                </div>
                <div onClick={handleToggleLogin}className="user-button flex flex-col items-center pt-5 duration-500 hover:text-white cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z" clipRule="evenodd" />
                    </svg>
                    {!!user && (
                        <div className="text-xs">
                            {user.name}
                        </div>
                    )}
                </div>
            </div>
            <div className="text-xs m-auto pt-12">
                <span>
                    Simply plan Your journey.
                </span>
            </div>
        </div>
    )
};

export default Header