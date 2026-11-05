import React, { useState } from "react";
import {
  Box,
  IconButton,
  VStack,
  Text,
  useColorModeValue,
  Checkbox,
  Divider,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [filters, setFilters] = useState({
    peinture: false,
    sculpture: false,
    dessin: false,
    photo: false,
  });

  const toggleFilter = (name: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const bg = useColorModeValue("whiteAlpha.900", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      h="100vh"
      w={isOpen ? "220px" : "60px"}
      bg={bg}
      borderRight="1px solid"
      borderColor={borderColor}
      transition="width 0.3s ease"
      zIndex={100}
      mt={12}
      p={2}
      boxShadow="md"
      overflowY="auto"
    >
      <Box display="flex" justifyContent="flex-end" mr={2}>
        <IconButton
          aria-label="Toggle Sidebar"
          icon={isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          onClick={() => setIsOpen(!isOpen)}
          size="sm"
          variant="ghost"
        />
      </Box>

      {isOpen && (
        <VStack align="start" spacing={4} mt={4}>
          

          

          {/* Filtres artistiques */}
          <Text fontWeight="bold">Catégories</Text>
          <Checkbox
            isChecked={filters.peinture}
            onChange={() => toggleFilter("peinture")}
          >
            Peinture
          </Checkbox>
          <Checkbox
            isChecked={filters.sculpture}
            onChange={() => toggleFilter("sculpture")}
          >
            Sculpture
          </Checkbox>
          <Checkbox
            isChecked={filters.dessin}
            onChange={() => toggleFilter("dessin")}
          >
            Dessin
          </Checkbox>
          <Checkbox
            isChecked={filters.photo}
            onChange={() => toggleFilter("photo")}
          >
            Photographie
          </Checkbox>

          <Divider />
        </VStack>
      )}
    </Box>
  );
};

export default Sidebar;
