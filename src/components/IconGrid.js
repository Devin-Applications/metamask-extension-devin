import React from 'react';
import { SimpleGrid, Box, Text } from '@chakra-ui/react';
import * as FaIcons from 'react-icons/fa'; // Import all Font Awesome icons
import './IconGrid.css';

const IconGrid = ({ icons }) => {
  return (
    <SimpleGrid columns={[2, null, 4]} spacing="40px">
      {icons.map((icon, index) => {
        console.log(`Icon ${index}:`, icon);
        console.log(`MetaMask Icon Name: ${icon.metamaskIcon}`);
        console.log(`Font Awesome Icon Name: ${icon.fontAwesomeIcon}`);

        if (!icon.fontAwesomeIcon) {
          console.error(`Font Awesome Icon is missing for MetaMask Icon: ${icon.metamaskIcon}`);
        }

        // Dynamically get the Font Awesome icon component
        const FontAwesomeIconComponent = FaIcons[icon.fontAwesomeIcon] || FaIcons.FaQuestionCircle;

        // Dynamically import the MetaMask icon component
        let MetaMaskIconComponent;
        try {
          MetaMaskIconComponent = require(`./icons/${icon.metamaskIcon}`).default;
        } catch (error) {
          console.error(`MetaMask Icon not found: ${icon.metamaskIcon}`);
          MetaMaskIconComponent = require('./icons/ArrowRight').default; // Default to ArrowRight if not found
        }

        return (
          <Box key={index} className="icon-box">
            {icon.metamaskIcon && (
              <>
                <MetaMaskIconComponent className="icon-image" />
                <Text mt={2} className="icon-text">{icon.metamaskIcon}</Text>
              </>
            )}
            {icon.fontAwesomeIcon && (
              <>
                <FontAwesomeIconComponent className="icon-image" />
                <Text mt={2} className="icon-text">{icon.fontAwesomeIcon}</Text>
              </>
            )}
          </Box>
        );
      })}
    </SimpleGrid>
  );
};

export default IconGrid;
