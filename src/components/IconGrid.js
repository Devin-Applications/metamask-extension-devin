import React from 'react';
import { SimpleGrid, Box, Image, Text } from '@chakra-ui/react';

const IconGrid = ({ icons }) => {
  return (
    <SimpleGrid columns={[2, null, 4]} spacing="40px">
      {icons.map((icon, index) => {
        const metamaskIconUrl = `https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/${icon.metamaskIcon}.svg`;
        const fontAwesomeIconUrl = `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/svgs/solid/${icon.fontAwesomeIcon}.svg`;

        console.log(`Icon ${index}:`, icon);
        console.log(`MetaMask Icon URL: ${metamaskIconUrl}`);
        console.log(`Font Awesome Icon URL: ${fontAwesomeIconUrl}`);

        return (
          <Box key={index} textAlign="center">
            {icon.metamaskIcon && (
              <>
                <Image src={metamaskIconUrl} alt={icon.metamaskIcon} boxSize="50px" />
                <Text mt={2}>{icon.metamaskIcon}</Text>
              </>
            )}
            {icon.fontAwesomeIcon && (
              <>
                <Image src={fontAwesomeIconUrl} alt={icon.fontAwesomeIcon} boxSize="50px" />
                <Text mt={2}>{icon.fontAwesomeIcon}</Text>
              </>
            )}
          </Box>
        );
      })}
    </SimpleGrid>
  );
};

export default IconGrid;
