import { useState } from "react";
import "./Overlay.css"
import axios from 'axios';

function Overlay(){

    // var log_in = document.getElementsByClassName("log-in");
    var register_in = document.getElementsByClassName("register-in");

    const [loginSlide, setLoginSlide] = useState(false);
    const [notAMember, setNotAMember] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [registeredName, setRegisteredName] = useState('');
    const [registeredPassword, setRegisteredPassword] = useState('');

    const handleToggleLogin = () => {
        setLoginSlide(!loginSlide);
    }

    const handleSignUpMember = () => {
        setNotAMember(!notAMember);
    }

    function registerUser(ev) {
        ev.preventDefault();
        axios.post('/register', {
            email,
            name,
            password,
        });
        console.log(register_in);
        // register_in[0].value = "";
        handleSignUpMember();
    }

    // onChange={event => setSearchInput(event.target.value)}
    // onKeyDown={enterPressed} 
    return (
        <div className="container">
            <div className={`log-in-slide ${loginSlide ? 'active' : 'inactive'} bg-secondary text-icons flex flex-col`}>
                <div onClick={handleToggleLogin} href="/" className="ml-4 mt-5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 duration-500 hover:text-white cursor-pointer">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                    </svg>
                </div>{
                    notAMember ? (
                        <div>
                            <span className="flex items-center justify-center text-3xl pt-40">
                                Log in
                            </span>
                            <form className="flex flex-col items-center justify-center pt-5">
                                <input className="log-in text-black p-2 border rounded-2xl outline-none select-none" 
                                        value={registeredName} 
                                        onChange={ev => setRegisteredName(ev.target.value)} 
                                        type="text" 
                                        placeholder="Username"/>
                                <input className="log-in text-black p-2 border rounded-2xl outline-none select-none mt-2"
                                        value={registeredPassword} 
                                        onChange={ev => setRegisteredPassword(ev.target.value)}
                                        type="password"
                                        placeholder="Password"/>
                                <button className="log-in-button border mt-2 p-2 rounded-2xl hover:bg-white duration-500 select-none">Log in</button>
                            </form>
                            <div className="text-xs text-center mt-2 text-gray-500">
                                <span>Still not a member? Sign up </span> 
                                <span onClick={handleSignUpMember} className="text-blue-500 underline cursor-pointer">here</span>
                                <span>.</span>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <span className="flex items-center justify-center text-3xl pt-40">
                                Sign up
                            </span>
                            <form onSubmit={registerUser} className="flex flex-col items-center justify-center pt-5">
                                <input className="register-in text-black p-2 border rounded-2xl outline-none select-none" 
                                        value={email} 
                                        onChange={ev => setEmail(ev.target.value)} 
                                        type="email" 
                                        placeholder="Email"/>
                                <input className="register-in text-black p-2 border rounded-2xl outline-none select-none mt-2" 
                                        value={name} 
                                        onChange={ev => setName(ev.target.value)} 
                                        type="text" 
                                        placeholder="Username"/>
                                <input className="register-in text-black p-2 border rounded-2xl outline-none select-none mt-2" 
                                        value={password} 
                                        onChange={ev => setPassword(ev.target.value)} 
                                        type="password" 
                                        autoComplete="new password"
                                        placeholder="Password"/>
                                <button className="register-in-button border mt-2 p-2 rounded-2xl hover:bg-white duration-500 select-none">Sign up</button>
                            </form>
                            <div className="text-xs text-center mt-2 text-gray-500">
                                <span>Already a member? Click </span>
                                <span onClick={handleSignUpMember} className="text-blue-500 underline cursor-pointer">here</span>
                                <span>.</span>
                            </div>
                        </div>)
                    }
            </div>
            <div className="header flex flex-col text-icons bg-secondary">
                <div className="flex flex-row items-center justify-between">
                    <div></div>
                    <div href="/" className="flex text-primary items-center ml-5 font-semibold">
                        <svg width="60px" height="60px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#00aaff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.144"></g><g id="SVGRepo_iconCarrier"> <path d="M6 21C7.5 19.4 9 17.9673 9 16.2C9 14.4327 7.65685 13 6 13C4.34315 13 3 14.4327 3 16.2C3 17.9673 4.5 19.4 6 21ZM6 21H17.5C18.8807 21 20 19.8807 20 18.5C20 17.1193 18.8807 16 17.5 16H15M18 11C19.5 9.4 21 7.96731 21 6.2C21 4.43269 19.6569 3 18 3C16.3431 3 15 4.43269 15 6.2C15 7.96731 16.5 9.4 18 11ZM18 11H14.5C13.1193 11 12 12.1193 12 13.5C12 14.8807 13.1193 16 14.5 16H15.6" stroke="#00aaff" strokeWidth="0.768" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                        <span className="text-2xl">Routly</span>
                    </div>
                    <div onClick={handleToggleLogin} href="/" className="mr-5 duration-500 hover:text-white cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div className="text-xs m-auto pb-2">
                    <span >
                        Simply plan Your journey.
                    </span>
                </div>
            </div>
            <div className="routes flex bg-background items-center justify-center">
                routes go here
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