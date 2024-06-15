import React from 'react';
import { Box, SimpleGrid, Image, Text } from '@chakra-ui/react';

const IconGrid = ({ icons }) => {
  console.log("Icons prop:", icons); // Add console log statement for debugging
  return (
    <SimpleGrid columns={[2, null, 4]} spacing="40px">
      {icons.map((icon, index) => {
        const imagePath = `images/icons/${icon['FontAwesome Icon Name']}`;
        console.log("Image path:", imagePath); // Add console log statement for debugging
        console.log("Icon object:", icon); // Add console log statement for debugging
        return (
          <Box key={index} textAlign="center">
            <Image src={imagePath} alt={icon['MetaMask Icon Name']} boxSize="50px" />
            <Text mt={2}>{icon['MetaMask Icon Name']}</Text>
            <Text fontSize="sm" color="gray.500">
              {icon['FontAwesome Icon Name']}
            </Text>
          </Box>
        );
      })}
    </SimpleGrid>
  );
};

export default IconGrid;
