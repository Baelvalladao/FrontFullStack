import React, { useState } from "react";
import { TextField, Button, Container, Typography, Alert } from "@mui/material";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await api.post("/products", { name, price });
      navigate("/");
    } catch (err) {
      setError("Erro ao adicionar produto.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>
        Adicionar Produto
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Nome do Produto"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Preço"
        variant="outlined"
        fullWidth
        margin="normal"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
     
      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
        Adicionar Produto
      </Button>
    </Container>
  );
};

export default AddProduct;
