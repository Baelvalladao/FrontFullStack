import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography, Alert } from "@mui/material";
import api from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    price: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError("Erro ao carregar os dados do produto.");
      }
    };

    fetchProduct();
  }, [id]);


  const handleSubmit = async () => {
    try {
      await api.put(`/products/${id}`, product);
      navigate("/");
    } catch (err) {
      setError("Erro ao atualizar o produto.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>
        Editar Produto
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Nome do Produto"
        variant="outlined"
        fullWidth
        margin="normal"
        name="name"
        value={product.name}
        onChange={handleChange}
      />

      <TextField
        label="Preço"
        variant="outlined"
        fullWidth
        margin="normal"
        name="price"
        value={product.price}
        onChange={handleChange}
      />

      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
        Atualizar Produto
      </Button>
    </Container>
  );
};

export default EditProduct;
