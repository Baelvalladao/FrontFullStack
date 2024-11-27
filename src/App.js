import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import { Container, Typography } from "@mui/material";
import ProductCrud from "./components/ProductCrud";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

const App = () => {
  const token = localStorage.getItem("jwt");

  return (
    <Router>
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={token ? <ProductCrud /> : <Navigate to="/login" />} />
          <Route path="/add-product" element={token ? <AddProduct /> : <Navigate to="/login" />} />
          <Route path="/edit-product/:id" element={token ? <EditProduct /> : <Navigate to="/login" />} />
          {/* Página de login */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
