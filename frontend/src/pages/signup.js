import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
      username: '',
      email: '',
      password: ''
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const {name, value} = e.target;
    console.log(name, value);
    const newSignupInfo = {...signupInfo}
    newSignupInfo[name] = value;
    setSignupInfo(newSignupInfo);
  }
  const handleSignup = async (e) => {
    e.preventDefault();
    const {username, email, password} = signupInfo;
    if(!username || !email || !password) {
      return handleError("Please fill all fields");
    }
    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(signupInfo)
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/home');
        }, 3000);

      } else {
        const details = error?.details?.[0]?.message;
        handleError(details || message || "Signup failed");
      }
      console.log(result);
    } catch (error) {
      handleError("Signup failed. Please try again.");
    }
  }
  return (
    <div className="container">
      <h1>Signup Page</h1>
      <form onSubmit={handleSignup}>
        <div>
            <label htmlFor="username">Username</label>
            <input 
                onChange={handleChange}
                type="text" 
                id="username" 
                name="username" 
                autoFocus
                placeholder="johndoe"
                value={signupInfo.username}
                
            />
            <br></br>
            <label htmlFor="email">Email</label>
            <input
                onChange={handleChange}
                type="email" 
                id="email" 
                name="email" 
                placeholder="johndoe@example.com"
                value={signupInfo.email}
            />
            <br></br>
            <label htmlFor="password">Password</label>
            <input 
                onChange={handleChange}
                type="password" 
                id="password" 
                name="password" 
                placeholder="johndoe!123"
                value={signupInfo.password}
            />
            <br></br>
            <button type="submit">Sign Up</button>
            <br></br>
            <span>Already have an account?<Link to="/login">Login</Link>
            </span>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;