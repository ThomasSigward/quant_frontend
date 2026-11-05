

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import './App.css'

import Header from './components/Header';
import { Box } from '@chakra-ui/react';
import LoginPage from './pages/LoginPage';
import UnderConstruction from './pages/UnderConstruction';
import PrivateRoute from './components/PrivateRoute';
import AccountPage from './pages/AccountPage';




function App() {
  return (
    
    <Box minH="100vh" display="flex" flexDirection="column">

      

      
      <Router>
      <Box position="fixed" pr="2px" justifyContent="flex-start" top={0} left={0} right={0} zIndex="10" w="100%" >
        <Header/>
      </Box>
      
        
        <Box flex="1">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<UnderConstruction pageName="GlobeNostra"/>} />
          <Route path="/account"
            element={
              <PrivateRoute>
                <AccountPage />
              </PrivateRoute>
            }
          />
        </Routes>
        </Box>

      </Router>
      
      

</Box>
    
  );
}

export default App
