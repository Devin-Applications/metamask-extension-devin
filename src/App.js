import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Heading } from '@chakra-ui/react';
import IconGrid from './components/IconGrid';
import parseCsv from './utils/parseCsv';
import './App.css';

function App() {
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    fetch('/mapping.csv')
      .then(response => {
        console.log("Fetch response:", response); // Add console log statement for debugging
        return response.text();
      })
      .then(data => {
        console.log("CSV Data:", data); // Add console log statement for debugging
        parseCsv(data, (parsedData) => {
          console.log("Parsed CSV Data:", parsedData); // Add console log statement for debugging
          setIcons(parsedData);
        });
      });
  }, []);

  useEffect(() => {
    console.log("Icons State:", icons); // Add console log statement for debugging
  }, [icons]);

  return (
    <ChakraProvider>
      <Box p={4}>
        <Heading as="h1" mb={4}>
          MetaMask Icon Grid
        </Heading>
        <IconGrid icons={icons} />
      </Box>
    </ChakraProvider>
  );
}

export default App;
