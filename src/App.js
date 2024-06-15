import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <header className="App-header">
          Hello World
        </header>
      </div>
    </ChakraProvider>
  );
}

export default App;
