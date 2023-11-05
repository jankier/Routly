import "./Overlay.css"

function Overlay(){
    return (
        <div className="container">
            <div className="header flex flex-col text-icons bg-secondary">
                <div className="flex flex-row items-center justify-between">
                    <div></div>
                    <div href="/" className="flex text-primary items-center ml-5 font-semibold">
                        <svg width="60px" height="60px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#00aaff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.144"></g><g id="SVGRepo_iconCarrier"> <path d="M6 21C7.5 19.4 9 17.9673 9 16.2C9 14.4327 7.65685 13 6 13C4.34315 13 3 14.4327 3 16.2C3 17.9673 4.5 19.4 6 21ZM6 21H17.5C18.8807 21 20 19.8807 20 18.5C20 17.1193 18.8807 16 17.5 16H15M18 11C19.5 9.4 21 7.96731 21 6.2C21 4.43269 19.6569 3 18 3C16.3431 3 15 4.43269 15 6.2C15 7.96731 16.5 9.4 18 11ZM18 11H14.5C13.1193 11 12 12.1193 12 13.5C12 14.8807 13.1193 16 14.5 16H15.6" stroke="#00aaff" strokeWidth="0.768" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                        <span className="text-2xl">Routly</span>
                    </div>
                    <a href="/"className="mr-5 duration-500 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z" clipRule="evenodd" />
                        </svg>
                    </a>
                </div>
                <div className="text-xs m-auto pb-2">
                    <span >
                        Simply plan Your journey.
                    </span>
                </div>
            </div>
            <div className="routes flex bg-background">

            </div>
            <div className="footer flex text-icons bg-secondary justify-around items-center">
                <a href="/" className="hover:text-white duration-500 flex flex-col">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 ml-1">
                        <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs font-semibold">
                        Home
                    </span>
                </a>
                <a href="/" className="hover:text-stone-100 duration-500 items-center flex flex-col">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                        <path d="M4.75 3A1.75 1.75 0 003 4.75v2.752l.104-.002h13.792c.035 0 .07 0 .104.002V6.75A1.75 1.75 0 0015.25 5h-3.836a.25.25 0 01-.177-.073L9.823 3.513A1.75 1.75 0 008.586 3H4.75zM3.104 9a1.75 1.75 0 00-1.673 2.265l1.385 4.5A1.75 1.75 0 004.488 17h11.023a1.75 1.75 0 001.673-1.235l1.384-4.5A1.75 1.75 0 0016.896 9H3.104z" />
                    </svg>
                    <span className="text-xs font-semibold">
                        Routes
                    </span>
                </a>
                <a href="/" className="hover:text-white duration-500 items-center flex flex-col">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                        <path d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.475l6.733-3.366A2.52 2.52 0 0113 4.5z" />
                    </svg>
                    <span className="text-xs font-semibold">
                        Share
                    </span>
                </a>
            </div>
        </div>
    );
}

export default Overlay