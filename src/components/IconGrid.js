import React, { useState, useEffect } from 'react';
import { Box, SimpleGrid, Text, Select, Button } from '@chakra-ui/react';
import * as FaIcons from 'react-icons/fa';

const IconGrid = () => {
  const [iconMappings, setIconMappings] = useState([]);
  const [selectedIcons, setSelectedIcons] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const stagingUrl = 'https://metamask-icons-app-i5s69gci.staging.devinapps.com/api/mappings'; // Updated staging URL
    fetch(stagingUrl)
      .then(response => response.json())
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
        if (filteredData.length > 0) {
          console.log('Setting iconMappings state with filtered data'); // Log before setting state
          setIconMappings(filteredData);
          console.log('iconMappings state set:', filteredData); // Log after setting state
        } else {
          console.warn('No valid icon mappings found'); // Log warning if no valid data
          setIconMappings([]); // Ensure state is set to an empty array if no valid data
        }
        setLoading(false); // Set loading to false after data is set
        console.log('iconMappings state after fetch:', filteredData); // Log state after fetch
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
      return FaIcons.FaQuestion; // Return default question mark icon if iconName is null
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

  // Final safeguard to ensure no null values are processed
  const finalIconMappings = iconMappings.filter(icon => icon.fontawesome_icon && icon.metamask_icon);
  console.log('Final icon mappings before rendering:', finalIconMappings); // Log before rendering

  return (
    <Box p={4}>
      <SimpleGrid columns={[2, null, 4]} spacing="40px">
        {finalIconMappings.map((icon, index) => (
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
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default IconGrid;
