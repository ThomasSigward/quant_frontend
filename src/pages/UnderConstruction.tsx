import React from "react";
import { Box, Container, Heading, Text, Button, Icon } from "@chakra-ui/react";
import { Construction } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { keyframes } from "@emotion/react";

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(5deg); }
  50% { transform: translateY(0px) rotate(0deg); }
  75% { transform: translateY(10px) rotate(-5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const UnderConstruction: React.FC<{ pageName: string }> = ({ pageName }) => {
  const navigate = useNavigate();

  return (
    <Box position="fixed" top={0} left={0} w="100vw" h="100vh" m={0} p={0}  pt={20} overflowY="auto" alignItems="center" justifyContent="center" bg="gray.900" bgGradient="linear(to-br, gray.900, gray.800)">   
      <Container centerContent textAlign="center" p={8} rounded="lg" px={0} maxW="100vw" m="0">
        <Box
          animation={`${float} 3s ease-in-out infinite`}
          position="relative"
          mb={6}
          _before={{
            content: '""',
            position: "absolute",
            bottom: "-20px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "40px",
            height: "10px",
            borderRadius: "50%",
            background: "rgba(255, 214, 0, 0.2)",
            filter: "blur(8px)",
            animation: `${keyframes`
              0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.2; }
              50% { transform: translateX(-50%) scale(1.2); opacity: 0.1; }
            `} 3s ease-in-out infinite`
          }}
        >
          <Icon 
            as={Construction} 
            boxSize={24} 
            color="yellow.400"
          />
        </Box>
        <Heading size="2xl" color="white" mb={4}>{pageName}</Heading>
        <Text fontSize="xl" color="gray.300" mb={4}>This section is under construction</Text>
        <Text color="gray.400">We're working hard to bring you something amazing!</Text>
        <Button 
          mt={6} 
          px={6} 
          py={3} 
          bg="whiteAlpha.200"
          color="white"
          _hover={{ bg: "whiteAlpha.300" }}
          onClick={() => navigate("/")}
        >
          Return Home
        </Button>
      </Container>
    </Box>
  );
};

export default UnderConstruction;