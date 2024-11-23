import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Products from "./Products";

const App = () => {
    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/products" element={<Products />} />
                <Route path="*" element={ <h1>404 Not Found</h1> }></Route>
            </Routes>
        </div>
    );
};

export default App;