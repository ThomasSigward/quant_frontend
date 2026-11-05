import { Box, Button, Input, VStack, Heading, useToast, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://globenostra.com/api/auth/login/", {
        username: email, // Django utilise "username" au lieu de "email"
        password: password,
      });

      localStorage.setItem("token", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      toast({ title: "Connexion réussie", status: "success", duration: 2000 });
      await login();
      navigate("/");
    } catch (error) {
      toast({ title: "Erreur de connexion", status: "error", duration: 2000 });
    }
  };

  return (
    <Box position="fixed" top={0} left={0} w="100vw" h="100vh" m={0} p={0} pt={20} bg={useColorModeValue('gray.100','gray.800')} overflowY="auto" color="black" display="flex" alignItems="center" justifyContent="center">
      <VStack spacing={4} p={8} borderWidth={1} borderRadius="lg" boxShadow="lg">
        <Heading color={useColorModeValue('gray.800', 'gray.100')}>Connexion</Heading>
        <Input
          placeholder="Nom d'utilisateur"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          bg="gray.100" // Fond des inputs plus contrasté
          color="black"
          _placeholder={{ color: "gray.400" }} // Placeholder en gris clair
        />
        <Input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          bg="gray.100" // Fond des inputs plus contrasté
          color="black"
          _placeholder={{ color: "gray.400" }} // Placeholder en gris clair
        />
        <Button colorScheme="blue" onClick={handleLogin}  w="full"
          size="md" bg="blue.500" // Fond des inputs plus contrasté
          color="white">
          Se connecter
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginPage;
