import React from 'react';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import { Icon, IconName } from '../icon';

console.log("Imported Icon:", Icon); // Add console log statement for debugging
console.log("Imported IconName:", IconName); // Add console log statement for debugging

const IconGrid = ({ icons }) => {
  console.log("Icons prop:", icons); // Add console log statement for debugging
  return (
    <SimpleGrid columns={[2, null, 4]} spacing="40px">
      {icons.map((icon, index) => {
        console.log("Icon object:", icon); // Add console log statement for debugging
        const iconName = IconName[icon['MetaMask Icon Name']];
        return (
          <Box key={index} textAlign="center">
            {iconName ? (
              <Icon name={iconName} size="50px" />
            ) : (
              <Text mt={2} color="red">Icon not found</Text>
            )}
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
