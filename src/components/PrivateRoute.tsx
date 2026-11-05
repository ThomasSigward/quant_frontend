import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { Flex, Spinner } from "@chakra-ui/react";

function PrivateRoute({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      console.log("Token dans localStorage :", token);

      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch("https://globenostra.com/api/auth/me/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
            if (res.status === 200) {
                const data = await res.json();
            console.log("Données utilisateur récupérées :", data);
            localStorage.setItem("userRole", data.role);
            setIsAuthenticated(true);
            } else {
                console.warn("Réponse non-JSON attendue :", res.status);
            setIsAuthenticated(false);
            } 

        } else {
            console.warn("Réponse non-JSON attendue :", res.status);
        setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur :", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <Flex height="100vh" align="center" justify="center">
        <Spinner size="xl" color="teal.500" thickness="4px" speed="0.65s" />
      </Flex>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
