import { useContext, useState } from "react";
import axios from 'axios';
import { UserContext } from "../../UserContext";
import "./UserPage.css"
const bcrypt = require('bcryptjs');

function UserPage ({handleToggleLogin, loginSlide}) {

    // var log_in = document.getElementsByClassName("log-in");
    // var register_in = document.getElementsByClassName("register-in");
    var email_in_use = document.getElementsByClassName("email-in-use");
    var log_in_failed = document.getElementsByClassName("log-in-failed");
    var field_must_be_filled = document.getElementsByClassName("field-must-be-filled");

    const [notAMember, setNotAMember] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [registeredEmail, setRegisteredEmail] = useState('');
    const [registeredPassword, setRegisteredPassword] = useState('');

    const bcryptSalt = bcrypt.genSaltSync(10);

    const {user, setUser} = useContext(UserContext);

    const handleSignUpMember = () => {
        setNotAMember(!notAMember);
    }

    async function registerUser(ev) {
        ev.preventDefault();
        try {
            await axios.post('/register', {
                email,
                name,
                password:bcrypt.hashSync(password, bcryptSalt),
            })
            setEmail('');
            setName('');
            setPassword('');
            handleSignUpMember();
        } catch (error) {
            console.log(error);
            if (error.response.status === 422){
                email_in_use[0].style.display = 'flex';
                field_must_be_filled[0].style.display = 'none';
            } else if (error.response.status === 406){
                field_must_be_filled[0].style.display = 'flex';
                email_in_use[0].style.display = 'none';  
            } else {
                email_in_use[0].style.display = 'none';
                field_must_be_filled[0].style.display = 'none';
            }
        }
    }

    async function loginUser(ev) {
        ev.preventDefault();
        try{
            const userInfo = await axios.post('/login', {
                registeredEmail,
                registeredPassword,
            });
            setUser(userInfo.data);
            setRegisteredEmail('');
            setRegisteredPassword('');
            log_in_failed[0].style.display = 'none';
            handleToggleLogin();
        } catch (error) {
            console.log(error);
            setRegisteredEmail('');
            setRegisteredPassword('');
            log_in_failed[0].style.display = 'flex';
        } 
    }

    async function logoutUser() {
        try {
            await axios.get('/logout');
            setUser(null);
            handleToggleLogin();
        } catch (error) {
            console.log(error);
        }
    }

    return (
    <div className={`log-in-slide ${loginSlide ? 'active' : 'inactive'} bg-secondary text-icons flex flex-col`}>
        <div onClick={handleToggleLogin} className="ml-4 mt-5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 duration-500 hover:text-white cursor-pointer">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
            </svg>
        </div>
        { user ? (
            <div className="flex flex-col items-center justify-center">
                <span className="text-3xl pt-60">
                    Log out
                </span>
                <button onClick={logoutUser} className="log-out-button border mt-2 p-2 rounded-2xl hover:bg-white duration-500 select-none">Log out</button>
            </div>
                ) : (
                    <div>
                        { !notAMember ? (
                                <div>
                                    <span className="flex items-center justify-center text-3xl pt-40">
                                        Log in
                                    </span>
                                    <form onSubmit={loginUser} className="flex flex-col items-center justify-center pt-5">
                                        <input className="log-in text-black p-2 border rounded-2xl outline-none select-none" 
                                                value={registeredEmail} 
                                                onChange={ev => setRegisteredEmail(ev.target.value)} 
                                                type="email" 
                                                placeholder="Email"/>
                                        <input className="log-in text-black p-2 border rounded-2xl outline-none select-none mt-2"
                                                value={registeredPassword} 
                                                onChange={ev => setRegisteredPassword(ev.target.value)}
                                                type="password"
                                                autoComplete="new password"
                                                placeholder="Password"/>
                                        <div className="log-in-failed text-orange-500 mt-1 flex duration-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                            </svg>
                                            <div className='ml-1'>Email or password is incorrect.</div>
                                        </div>
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
                                        <div className="email-in-use text-orange-500 mt-1 flex duration-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                            </svg>
                                            <div className='ml-1'>This email is already in use.</div>
                                        </div>
                                        <input className="register-in text-black p-2 border rounded-2xl outline-none select-none mt-2" 
                                                value={name} 
                                                onChange={ev => setName(ev.target.value)} 
                                                type="text"
                                                maxlength="10"
                                                placeholder="Username"/>
                                        <input className="register-in text-black p-2 border rounded-2xl outline-none select-none mt-2" 
                                                value={password} 
                                                onChange={ev => setPassword(ev.target.value)} 
                                                type="password" 
                                                autoComplete="new password"
                                                placeholder="Password"/>
                                        <div className="field-must-be-filled text-orange-500 mt-1 flex duration-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                            </svg>
                                            <div className='ml-1'>All fields must be filled.</div>
                                        </div>
                                        <button className="register-in-button border mt-2 p-2 rounded-2xl hover:bg-white duration-500 select-none">Sign up</button>
                                    </form>
                                    <div className="text-xs text-center mt-2 text-gray-500">
                                        <span>Already a member? Click </span>
                                        <span onClick={handleSignUpMember} className="text-blue-500 underline cursor-pointer">here</span>
                                        <span>.</span>
                                    </div>
                                </div>)
                            }
                    </div>)}
        </div>
    )
};

export default UserPage