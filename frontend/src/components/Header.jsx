import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons"

const Header = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("toke");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };

    return (
        <header className="bg-gray-800 text-white py-4">
            <nav className="container mx-auto flex justify-between items-center">
                <h1 className="text-lg font-bold">My Ecommerce</h1>
                <div className="flex space-x-4">
                {location.pathname === "/products" && user ? (
                    <>
                    <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faUser} className="text-gray-300"/>
                    <span className="text-gray-300">{user.name}</span>
                    </div>
                    <button
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-300 ml-4"
                    >
                    Logout
                    </button>
                    </>
                ) : (
                    <Link to="/login" className="hover:text-gray-300">
                    Login
                    </Link>
                )}
                </div>
            </nav>
        </header>
    );
};

export default Header;