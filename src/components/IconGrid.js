import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import * as FaIcons from 'react-icons/fa';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

const IconGrid = () => {
  const [iconMappings, setIconMappings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localUrl = 'http://localhost:3001/api/mappings';
    fetch(localUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('Raw response:', response); // Added logging to inspect raw response
        return response.json();
      })
      .then(data => {
        console.log('Fetched raw data:', data); // Added logging to inspect raw fetched data
        if (data && data.data) {
          console.log('Entire fetched data array:', data.data); // Added logging to inspect entire fetched data array
          const filteredData = data.data.filter(icon => icon.fontawesome_icon && icon.metamask_icon);
          console.log('Filtered data:', filteredData); // Added logging to inspect filtered data
          setIconMappings(filteredData);
        } else {
          console.error('Fetched data is not in expected format:', data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching icon mappings:', error);
        setIconMappings([]); // Set a fallback state in case of error
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const getIconComponent = (iconName, library) => {
    if (!iconName) return null;
    const IconComponent = library[iconName];
    return IconComponent ? <IconComponent /> : <FaIcons.FaQuestion />;
  };

  const getMetaMaskIcon = (iconName) => {
    if (!iconName) return null;
    const iconPath = `http://localhost:3001/images/${iconName}.svg`; // Updated URL path to the correct location of the SVG files
    return <img src={iconPath} alt={iconName} />;
  };

  return (
    <ErrorBoundary>
      <Box p={4}>
        <Text>Icon mappings loaded successfully.</Text>
        {console.log('Icon mappings state before rendering:', iconMappings)}
        {iconMappings.map((icon, index) => {
          console.log('Rendering icon:', icon);
          if (!icon.metamask_icon || !icon.fontawesome_icon) {
            console.log('Skipping icon due to null values:', icon);
            return null;
          }
          return (
            <Box key={index} display="flex" alignItems="center" mb={4}>
              <Box mr={4}>
                {getMetaMaskIcon(icon.metamask_icon)}
              </Box>
              <Box>
                {getIconComponent(icon.fontawesome_icon, FaIcons)}
              </Box>
            </Box>
          );
        })}
      </Box>
    </ErrorBoundary>
  );
};

export default IconGrid;
