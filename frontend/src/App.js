
import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import RefreshHandler from './refreshHandler';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
        setCheckingAuth(false);
    }, []);

    const PrivateRoute = ({ children }) => {
        if (checkingAuth) {
            return <p>Checking authentication...</p>;
        }

        return isLoggedIn
            ? children
            : <Navigate to="/login" replace />;
    };

    const PublicRoute = ({ children }) => {
        if (checkingAuth) {
            return <p>Checking authentication...</p>;
        }

        return isLoggedIn
            ? <Navigate to="/home" replace />
            : children;
    };

    if (checkingAuth) {
        return <p>Checking authentication...</p>;
    }

    return (
        <div className="App">
            <RefreshHandler setIsLoggedIn={setIsLoggedIn} />

            <Routes>
                <Route
                    path="/"
                    element={
                        <Navigate
                            to={isLoggedIn ? '/home' : '/login'}
                            replace
                        />
                    }
                />

                <Route
                    path="/login"
                    element={
                    <PublicRoute>
                        <Login setIsLoggedIn={setIsLoggedIn} />
                    </PublicRoute>
    }
/>

                <Route
                    path="/signup"
                    element={
                        <PublicRoute>
                            <Signup />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
