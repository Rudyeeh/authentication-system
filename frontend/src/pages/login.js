
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login({ setIsLoggedIn }) {
  const [loginInfo, setLoginInfo] = useState({
    identifier: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginInfo({
      ...loginInfo,
      [name]: value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { identifier, password } = loginInfo;

    if (!identifier || !password) {
      return handleError('Please fill all fields');
    }

    try {
      const response = await fetch(
        'https://authentication-system-gamma-one.vercel.app/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginInfo)
        }
      );

      const result = await response.json();

      const { success, message, jwtToken, name, error } = result;

      if (success && jwtToken) {
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);

        setIsLoggedIn(true);

        handleSuccess(message || 'Login successful');

        setTimeout(() => {
          navigate('/home', { replace: true });
        }, 1000);

      } else {
        const details = error?.details?.[0]?.message;

        handleError(details || message || 'Login failed');
      }

    } catch (error) {
      handleError('Login failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>Login Page</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="identifier">
            Username or Email
          </label>

          <input
            onChange={handleChange}
            type="text"
            id="identifier"
            name="identifier"
            placeholder="Enter username or email"
            value={loginInfo.identifier}
          />

          <br />

          <label htmlFor="password">
            Password
          </label>

          <input
            onChange={handleChange}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={loginInfo.password}
          />

          <br />

          <button type="submit">Login</button>

          <br />

          <span>
            Don't have an account?
            <Link to="/signup">Signup</Link>
          </span>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
}

export default Login;
