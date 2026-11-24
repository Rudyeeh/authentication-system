
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess, handleError } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
    const [loggedInUser, setLoggedIn] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            return;
        }

        setLoggedIn(localStorage.getItem('loggedInUser') || 'User');

        fetchProducts();
    }, [navigate]);

    // LOGOUT
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');

        handleSuccess('Logout successful');

        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    // FETCH PRODUCTS
    const fetchProducts = async () => {
        try {
            const response = await fetch(
                'http://localhost:8080/products',
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            const result = await response.json();

            if (!response.ok) {
                handleError(result.message || 'Failed to fetch products');
                return;
            }

            setProducts(result.products || []);

        } catch (error) {
            console.error('Error:', error);
            handleError('Unable to fetch products');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">

            <h1>Welcome {loggedInUser}</h1>

            <button onClick={handleLogout}>
                Logout
            </button>

            <hr />

            <h2>Our Products</h2>

            {loading ? (
                <p>Loading products...</p>
            ) : products.length > 0 ? (

                <div className="products-container">
                    {products.map((product) => (
                        <div className="product-card" key={product._id}>

                            <h3>{product.name}</h3>

                            <p>Price: ₹{product.price}</p>

                        </div>
                    ))}
                </div>

            ) : (
                <p>No products available.</p>
            )}

            <ToastContainer />

        </div>
    );
}

export default Home;
