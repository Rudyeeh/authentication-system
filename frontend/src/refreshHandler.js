
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefreshHandler({ setIsLoggedIn }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        setIsLoggedIn(!!token);

        if (location.pathname === '/') {
            navigate(token ? '/home' : '/login', {
                replace: true
            });
        }
    }, [location.pathname, navigate, setIsLoggedIn]);

    return null;
}

export default RefreshHandler;
