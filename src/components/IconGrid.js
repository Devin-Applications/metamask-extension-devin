import React, { useState, useEffect } from 'react';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import * as FaIcons from 'react-icons/fa';

const IconGrid = () => {
  const [iconMappings, setIconMappings] = useState([]);

  useEffect(() => {
    const stagingUrl = 'http://localhost:3001/api/mappings'; // Placeholder for staging URL
    fetch(stagingUrl)
      .then(response => response.json())
      .then(data => setIconMappings(data.data))
      .catch(error => console.error('Error fetching icon mappings:', error));
  }, []);

  const getIconComponent = (iconName) => {
    return FaIcons[iconName] || FaIcons.FaQuestion; // Default to FaQuestion if icon not found
  };

  return (
    <Box p={4}>
      <SimpleGrid columns={[2, null, 4]} spacing="40px">
        {iconMappings.map((icon, index) => (
          <Box key={index} textAlign="center">
            {React.createElement(getIconComponent(icon.fontawesome_icon))}
            <Text mt={2}>{icon.metamask_icon}</Text>
            <Text fontSize="sm" color="gray.500">{icon.fontawesome_icon}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default IconGrid;
