import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';

const IconGrid = () => {
  const [iconMappings, setIconMappings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localUrl = 'http://localhost:3001/api/mappings';
    fetch(localUrl)
      .then(response => response.json())
      .then(data => {
        const filteredData = data.data.filter(icon => icon.fontawesome_icon && icon.metamask_icon);
        setIconMappings(filteredData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching icon mappings:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box p={4}>
      <Text>Icon mappings loaded successfully.</Text>
      {iconMappings.map((icon, index) => {
        if (!icon.metamask_icon || !icon.fontawesome_icon) {
          return null;
        }
        return (
          <Box key={index}>
            <Text>{icon.metamask_icon}</Text>
            <Text>{icon.fontawesome_icon}</Text>
          </Box>
        );
      })}
    </Box>
  );
};

export default IconGrid;
