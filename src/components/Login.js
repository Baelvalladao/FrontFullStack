import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Container, Alert, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se já existe um JWT no localStorage
    const token = localStorage.getItem("jwt");
    if (token) {
      // Se o token existir, redireciona para a página inicial
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await api.post("/Account/login", {
        username,
        password,
      });
      const token = response.data.token;
      setSuccess(true);
      localStorage.setItem("jwt", token);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      setError("Nome de usuário ou senha inválidos.");
      setSuccess(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="h4" gutterBottom align="center">
          Área de Acesso
        </Typography>

        <Typography variant="body1" paragraph align="center">
          Faça login para acessar o painel de gerenciamento de produtos
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">Login realizado com sucesso! Redirecionando para o painel de gerenciamento de produtos...</Alert>}

        <TextField
          label="Nome de usuário"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          label="Senha"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >
          Entrar no Painel
        </Button>
      </Container>
    </Box>
  );
};

export default Login;
