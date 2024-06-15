import React from 'react';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import { Icon, IconName } from '../icon';

const IconGrid = ({ icons }) => {
  console.log("Icons prop:", icons); // Add console log statement for debugging
  return (
    <SimpleGrid columns={[2, null, 4]} spacing="40px">
      {icons.map((icon, index) => {
        console.log("Icon object:", icon); // Add console log statement for debugging
        return (
          <Box key={index} textAlign="center">
            <Icon name={IconName[icon['MetaMask Icon Name']]} size="50px" />
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
