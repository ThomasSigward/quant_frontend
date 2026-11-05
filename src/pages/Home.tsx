// pages/Home.tsx
import {
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import ParticleGlobe from "../components/ParticlesGlobe";
import Footer from "../components/Footer";
import Sidebar from "../components/SideBar";

const Home: React.FC = () => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      w="100vw"
      h="100vh"
      m={0}
      p={0}
      overflow="hidden"
      bg={useColorModeValue("gray.100", "gray.800")}
    >
      {/* Sidebar superposé */}
      <Sidebar />

      {/* Fond 3D */}
      <Box
        position="relative"
        w="100%"
        h="100%"
        zIndex={1}
        bgGradient={useColorModeValue(
          "linear(to-r, teal.400, blue.500)",
          "linear(to-r, gray.900, blue.300)"
        )}
      >
        <ParticleGlobe />
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Home;
