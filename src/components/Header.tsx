import {
  Flex,
  Button,
  Box,
  useColorModeValue,
  Text,
  Link as ChakraLink,
  useColorMode,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Show,
  Hide,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, User, Menu as MenuIcon } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Header() {
  const bg = useColorModeValue("teal.500", "white");
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isAuthenticated = !!user;
  const userRole = user?.role;

  return (
    <Box
      bg={useColorModeValue("teal.50", "gray.700")}
      bgGradient={useColorModeValue("linear(to-r, teal.50, gray.100)", "linear(to-r, gray.700, gray.800)")}
      shadow="lg"
      height="50px" // par exemple
      top={0}
      left={0}
      w="100%"
      zIndex={10}
    >
      <Flex w="100%" px={6} py={2} justify="space-between" align="center" color="teal.500">
        {/* Gauche */}
        <Flex align="center" gap={3}>
          <ChakraLink as={Link} to="/" fontWeight="medium">
          <Text fontWeight="bold" fontSize="lg" color="teal.500">
            NOSTRARTAMUS
          </Text>
          </ChakraLink>
        </Flex>

        {/* Desktop links */}
        <Hide below="md">
          <Flex align="center" gap={6}>
            <ChakraLink as={Link} to="/construction" fontWeight="medium">
              A propos
            </ChakraLink>
            {isAuthenticated && userRole && (
              <>
              <ChakraLink as={Link} to="/account" fontWeight="medium">
                Mon compte
              </ChakraLink>
              <ChakraLink as={Link} to="/dashboard" fontWeight="medium">
                Dashboard
              </ChakraLink>
              </>
            )}
            {isAuthenticated ? (
              <Button variant="outline" leftIcon={<User size={16} />} color={bg} onClick={() => {
                logout();
                navigate("/");
              }}>
                Logout
              </Button>
            ) : (
              <Button variant="solid" leftIcon={<User size={16} />} color={bg} textColor="teal.50" size="sm" onClick={() => navigate("/login")}>
                Login
              </Button>
            )}
            <IconButton onClick={toggleColorMode} size="sm" variant="outline" aria-label="Toggle theme" icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />} />
          </Flex>
        </Hide>

        {/* Mobile menu */}
        <Show below="md">
          <Menu>
            <MenuButton as={IconButton} icon={<MenuIcon />} variant="outline" aria-label="Menu" />
            <MenuList>
              <MenuItem as={Link} to="/globenostra">À propos</MenuItem>
              {isAuthenticated && userRole && (
                <MenuItem as={Link} to="/dashboard">Dashboard</MenuItem>
              )}
              {isAuthenticated ? (
                <MenuItem onClick={() => { logout(); navigate("/"); }}>Logout</MenuItem>
              ) : (
                <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
              )}
              <MenuItem onClick={toggleColorMode}>
                {colorMode === "light" ? "Mode sombre" : "Mode clair"}
              </MenuItem>
            </MenuList>
          </Menu>
        </Show>
      </Flex>
    </Box>
  );
}
