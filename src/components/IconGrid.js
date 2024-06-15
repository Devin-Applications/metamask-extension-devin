import React, { useState, useEffect } from 'react';
import { Box, SimpleGrid, Text, Select, Button } from '@chakra-ui/react';
import * as FaIcons from 'react-icons/fa';

const IconGrid = () => {
  const [iconMappings, setIconMappings] = useState([]);
  const [selectedIcons, setSelectedIcons] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state

  // Fetch data from the backend and filter out null values
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
        // Filter out mappings with null fontawesome_icon or metamask_icon before setting state
        const filteredData = data.data.filter(icon => icon.fontawesome_icon && icon.metamask_icon);
        console.log('Filtered data:', filteredData); // Log filtered data for debugging
        // Only set state if fetched data is different from current state
        if (JSON.stringify(filteredData) !== JSON.stringify(iconMappings)) {
          setIconMappings(filteredData); // Set state with filtered data
          console.log('iconMappings state immediately after setState:', filteredData); // Log state immediately after setState
        }
        setLoading(false); // Set loading to false after data is set
        console.log('iconMappings state after fetch:', filteredData); // Log state after fetch
        setTimeout(() => {
          console.log('iconMappings state in next render cycle:', iconMappings); // Log state in next render cycle
        }, 0);
      })
      .catch(error => {
        console.error('Error fetching icon mappings:', error);
        setLoading(false); // Set loading to false in case of error
      });
  }, [iconMappings]);

  const getIconComponent = (iconName) => {
    console.log('Requested icon name:', iconName); // Log requested icon name for debugging
    if (!iconName) {
      console.error('Null iconName encountered'); // Log error for null iconName
      return null; // Return null if iconName is null
    }
    const iconComponent = FaIcons[iconName] || FaIcons.FaQuestion;
    console.log('Returned icon component:', iconComponent); // Log returned icon component for debugging
    return iconComponent;
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
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading message while data is being fetched
  }

  // Render the icon grid with safeguards for null values
  console.log('iconMappings state before final filter:', iconMappings); // Log state before final filter
  const finalIconMappings = iconMappings.filter(icon => icon.fontawesome_icon && icon.metamask_icon);
  console.log('Final icon mappings before rendering:', finalIconMappings); // Log before rendering

  return (
    <Box p={4}>
      <SimpleGrid columns={[2, null, 4]} spacing="40px">
        {finalIconMappings.map((icon, index) => {
          console.log('Processing icon:', icon); // Log each icon being processed
          console.log('icon.fontawesome_icon:', icon.fontawesome_icon); // Log fontawesome_icon property
          console.log('icon.metamask_icon:', icon.metamask_icon); // Log metamask_icon property
          return (
            icon.fontawesome_icon && icon.metamask_icon ? (
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
            ) : null
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default IconGrid;
