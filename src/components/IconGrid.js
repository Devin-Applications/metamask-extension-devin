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
    // Using static data for testing
    const staticData = {
      "data": [
        {
          "id": 1,
          "metamask_icon": "AddSquare",
          "fontawesome_icon": "square-plus"
        },
        {
          "id": 2,
          "metamask_icon": "Add",
          "fontawesome_icon": "plus"
        },
        {
          "id": 3,
          "metamask_icon": "Arrow2Down",
          "fontawesome_icon": "arrow-down"
        },
        {
          "id": 4,
          "metamask_icon": "Arrow2Left",
          "fontawesome_icon": "arrow-left"
        },
        {
          "id": 5,
          "metamask_icon": "Arrow2Right",
          "fontawesome_icon": "arrow-right"
        },
        {
          "id": 6,
          "metamask_icon": "Arrow2Up",
          "fontawesome_icon": "arrow-up"
        },
        {
          "id": 7,
          "metamask_icon": "Arrow2UpRight",
          "fontawesome_icon": "arrow-up-right"
        },
        {
          "id": 8,
          "metamask_icon": "ArrowDoubleLeft",
          "fontawesome_icon": "chevrons-left"
        },
        {
          "id": 9,
          "metamask_icon": "ArrowDoubleRight",
          "fontawesome_icon": "chevrons-right"
        },
        {
          "id": 10,
          "metamask_icon": "ArrowDown",
          "fontawesome_icon": "chevron-down"
        }
      ]
    };

    setIconMappings(staticData.data);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (iconMappings.length === 0) {
    return <div>No valid icon mappings available.</div>;
  }

  return (
    <ErrorBoundary>
      <Box p={4}>
        {iconMappings.map((icon, index) => (
          <Box key={index} display="flex" alignItems="center" mb={4}>
            <Box mr={4}>
              <Text>{icon.metamask_icon}</Text>
            </Box>
            <Box>
              <Text>{icon.fontawesome_icon}</Text>
            </Box>
          </Box>
        ))}
      </Box>
    </ErrorBoundary>
  );
};

export default IconGrid;
