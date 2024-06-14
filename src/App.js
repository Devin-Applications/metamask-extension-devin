import React, { useEffect, useState } from 'react';
import { ChakraProvider, Box, Heading } from '@chakra-ui/react';
import IconGrid from './components/IconGrid';
import parseIcons from './components/parseIcons';

function App() {
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    fetch('/mapping.csv')
      .then(response => response.text())
      .then(csvData => {
        console.log('Raw CSV Data:', csvData); // Add console log to verify raw CSV data
        const parsedIcons = parseIcons(csvData);
        setIcons(parsedIcons);
        console.log('Parsed Icons:', parsedIcons); // Add console log to verify parsed icons
        console.log('Icons state after setting:', parsedIcons); // Add console log to verify state after setting
      })
      .catch(error => console.error('Error fetching CSV:', error));
  }, []);

  console.log('Icons state before passing to IconGrid:', icons); // Add console log to verify icons state

  return (
    <ChakraProvider>
      <Box textAlign="center" py={10}>
        <Heading as="h1" size="xl" mb={6}>
          MetaMask Icons Grid
        </Heading>
        <IconGrid icons={icons} />
      </Box>
    </ChakraProvider>
  );
}

export default App;
