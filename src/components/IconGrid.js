import React from 'react';
import { Box, SimpleGrid, Image, Text } from '@chakra-ui/react';

const IconGrid = ({ icons }) => {
  console.log("Icons prop:", icons); // Add console log statement for debugging
  return (
    <SimpleGrid columns={[2, null, 4]} spacing="40px">
      {icons.map((icon, index) => (
        <Box key={index} textAlign="center">
          <Image src={icon.metamaskIcon} alt={icon.name} boxSize="50px" />
          <Text mt={2}>{icon.name}</Text>
          <Text fontSize="sm" color="gray.500">
            {icon.fontAwesomeIcon}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default IconGrid;
