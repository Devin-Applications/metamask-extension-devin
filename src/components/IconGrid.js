import React, { useState, useEffect } from 'react';
import { Box, SimpleGrid, Text, Select, Button } from '@chakra-ui/react';
import * as FaIcons from 'react-icons/fa';

const IconGrid = () => {
  const [iconMappings, setIconMappings] = useState([]);
  const [selectedIcons, setSelectedIcons] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const stagingUrl = 'https://metamask-icons-app-i5s69gci.staging.devinapps.com/api/mappings'; // Updated staging URL
    console.log('Fetching data from:', stagingUrl); // Log the URL being fetched
    fetch(stagingUrl)
      .then(response => {
        console.log('Received response:', response); // Log the response object
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data); // Log fetched data for debugging
        if (data.data && data.data.length > 0) {
          console.log('First item in fetched data:', data.data[0]); // Log structure of first item
        }
        // Log data before filtering
        console.log('Data before filtering:', data.data);
        // Enhanced filtering logic to ensure no null values are included
        const filteredData = data.data.filter(icon => {
          return icon.fontawesome_icon && icon.metamask_icon && icon.fontawesome_icon.trim() !== '' && icon.metamask_icon.trim() !== '';
        });
        console.log('Filtered data:', filteredData); // Log filtered data for debugging
        setIconMappings(filteredData);
        setLoading(false);
        console.log('iconMappings state after fetch:', filteredData);
      })
      .catch(error => {
        console.error('Error fetching icon mappings:', error);
        setLoading(false); // Set loading to false in case of error
      });
  }, []); // Empty dependency array to run only once on mount

  const getIconComponent = (iconName) => {
    console.log('Requested icon name:', iconName); // Log requested icon name for debugging
    if (!iconName) {
      console.warn('Null or undefined iconName encountered:', iconName); // Log warning for null or undefined iconName
      return null; // Return null if iconName is null or undefined
    }
    const iconComponent = FaIcons[iconName];
    console.log('Returned icon component:', iconComponent); // Log returned icon component for debugging
    return iconComponent || null; // Return null if iconComponent is not found
  };

  const handleSelectChange = (id, value) => {
    setSelectedIcons(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSave = (id) => {
    const selectedIcon = selectedIcons[id];
    if (selectedIcon) {
      console.log('Selected icon for save:', selectedIcon); // Log selected icon for debugging
      console.log('iconMappings state before save:', iconMappings); // Log state before save
      fetch(`https://metamask-icons-app-i5s69gci.staging.devinapps.com/api/mappings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fontawesome_icon: selectedIcon })
      })
        .then(response => response.json())
        .then(data => {
          console.log('Update response:', data);
          setIconMappings(prevState => {
            const updatedState = prevState.map(icon =>
              icon.id === id ? { ...icon, fontawesome_icon: selectedIcon } : icon
            );
            console.log('Updated state:', updatedState); // Log updated state for debugging
            return updatedState;
          });
          console.log('iconMappings state after save:', iconMappings); // Log state after save
        })
        .catch(error => console.error('Error updating icon mapping:', error));
    } else {
      console.error('Selected icon is null, cannot save'); // Log error for null selectedIcon
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading message while data is being fetched
  }

  // Render the icon grid with safeguards for null values
  console.log('iconMappings state before rendering:', iconMappings); // Log state before rendering
  const finalIconMappings = iconMappings.filter(icon => icon.fontawesome_icon && icon.metamask_icon && icon.fontawesome_icon.trim() !== '' && icon.metamask_icon.trim() !== ''); // Apply filtering before rendering
  console.log('Final icon mappings before rendering:', finalIconMappings); // Log before rendering

  return (
    <Box p={4}>
      <SimpleGrid columns={[2, null, 4]} spacing="40px">
        { /* Add a check before rendering each icon to skip rendering if the iconName is null */ }
        {finalIconMappings.map((icon, index) => {
          console.log('Processing icon:', icon); // Log each icon being processed
          console.log('icon.fontawesome_icon:', icon.fontawesome_icon); // Log fontawesome_icon property
          console.log('icon.metamask_icon:', icon.metamask_icon); // Log metamask_icon property
          if (!icon.fontawesome_icon || !icon.metamask_icon) {
            console.warn('Skipping icon with null values:', icon); // Log warning for null values
            return null; // Skip rendering if iconName is null
          }
          return (
            <Box key={index} textAlign="center">
              {icon.fontawesome_icon && React.createElement(getIconComponent(icon.fontawesome_icon))}
              <Text mt={2}>{icon.metamask_icon}</Text>
              <Text fontSize="sm" color="gray.500">{icon.fontawesome_icon}</Text>
              <Select
                placeholder="Select icon"
                onChange={(e) => handleSelectChange(icon.id, e.target.value)}
                value={selectedIcons[icon.id] || icon.fontawesome_icon}
              >
                {Object.keys(FaIcons).map((iconName, idx) => (
                  <option key={idx} value={iconName}>
                    {iconName}
                  </option>
                ))}
              </Select>
              <Button mt={2} onClick={() => handleSave(icon.id)}>
                Save
              </Button>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default IconGrid;
