import React, { useState, useEffect } from "react";
import { Button, Typography, Container, List, ListItem, ListItemText, Alert, Box } from "@mui/material";
import api from "../api/api"; // Para as requisições API
import  {jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const ProductCrud = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Decodificar JWT
    const token = localStorage.getItem("jwt");
    if (token) {
        console.log(token)
      const decoded = jwtDecode(token);
      setUser(decoded.sub); // Nome do usuário
      setRole(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
    }

    // Buscar produtos
    const fetchProducts = async () => {
      try {
        const response = await api.get("/Products"); // Endpoint para buscar produtos
        setProducts(response.data);
      } catch (err) {
        setError("Erro ao carregar produtos.");
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      await api.delete(`/products/${productId}`);
      setSuccess("Produto excluído com sucesso!");
      setProducts(products.filter((product) => product.id !== productId));
    } catch (err) {
      setError("Erro ao excluir produto.");
    }
  };

  const handleEditProduct = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  const handleAddProduct = () => {
    navigate("/add-product");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 2 }}>
      <Container maxWidth="md">
        {user && (
          <Box sx={{ marginBottom: 2, display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">Usuário: {user} | Cargo: ({role})</Typography>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                localStorage.removeItem("jwt");
                navigate("/login");
              }}
            >
              Logout
            </Button>
          </Box>
        )}

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <Typography variant="h4" gutterBottom>
          Gerenciamento de Produtos
        </Typography>

        {role === "Admin" && (
          <Box sx={{ marginBottom: 2 }}>
            <Button variant="contained" color="primary" onClick={handleAddProduct}>
              Novo Produto
            </Button>
          </Box>
        )}

        <List>
          {products.map((product) => (
            <ListItem key={product.id} sx={{ display: "flex", justifyContent: "space-between" }}>
              <ListItemText
                primary={product.name}
                secondary={`Preço: ${new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(product.price)}`}
              />
              {role === "Admin" && (
                <Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditProduct(product.id)}
                    sx={{ marginRight: 1 }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Excluir
                  </Button>
                </Box>
              )}
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
};

export default ProductCrud;
