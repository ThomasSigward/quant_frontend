import { Box, Flex, Text, VStack, HStack, Link, Icon, useColorModeValue } from '@chakra-ui/react';
import { FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const bg = useColorModeValue('gray.100', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');

  return (
    <Box>
     <Box as="footer" bg={bg} color={textColor} height="200px" px={10} py={6}>
      <Flex height="100%" align="flex-start">
        <HStack spacing={16} align="flex-start">
          {/* Bloc GlobeNostra + LinkedIn */}
          <VStack align="flex-start" spacing={3}>
            <Text fontSize="xl" fontWeight="bold">
              GlobeNostra
            </Text>
            <Link href="https://www.linkedin.com" isExternal>
              <Icon as={FaLinkedin} boxSize={5} />
            </Link>
          </VStack>

          {/* Bloc Catégories + Thèmes */}
          <HStack spacing={10} align="flex-start">
            <VStack align="flex-start" spacing={1}>
              <Text fontWeight="semibold">Catégories</Text>
              <Text>Art</Text>
              <Text>Société</Text>
              <Text>Science</Text>
              <Text>Philosophie</Text>
            </VStack>

            <VStack align="flex-start" spacing={1}>
              <Text fontWeight="semibold">Thèmes</Text>
              <Text>Construire demain</Text>
              <Text>Agir localement</Text>
              <Text>Imaginer autrement</Text>
            </VStack>
          </HStack>
        </HStack>
      </Flex>
    </Box>
    <Box

      bg={useColorModeValue('gray.100', 'gray.900')}
      w="100vw"
      color={useColorModeValue('gray.700', 'gray.200')}

      py={4}
    
      px={6}
        textAlign="center"
      position="relative" // 👈 pour que le logo soit positionné par rapport au footer

    >

      <Flex justify="center" align="center">

        <Text fontSize="sm" textAlign="center">

          © 2025 GLOBENOSTRA. Tous droits réservés.

        </Text>

      </Flex>

    </Box>
    </Box>




    
    

  );

}

