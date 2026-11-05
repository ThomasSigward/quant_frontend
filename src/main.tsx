import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { AuthProvider } from './components/AuthContext.tsx';



const theme = extendTheme({
  styles: {
    global: {
      body: {
        margin: 0,
        padding: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        bg: 'gray.900'
      }
    }
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "xl", // Coins arrondis pour un look plus moderne
      },
      variants: {
        solid: {
          bg: "teal.500",
          color: "white",
          _hover: { bg: "teal.600" },
        },
        outline: {
          border: "2px solid",
          borderColor: "indigo.500",
          color: "indigo.500",
          _hover: { bg: "indigo.600", color: "white" },
        },
      },
    },
  },
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ChakraProvider>
  </StrictMode>,
)