import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import IconGrid from './components/IconGrid';
import './App.css';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <header className="App-header">
          <IconGrid />
        </header>
      </div>
    </ChakraProvider>
  );
}

export default App;
