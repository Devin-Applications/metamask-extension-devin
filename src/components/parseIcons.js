import Papa from 'papaparse';

const parseIcons = (csvData) => {
  const parsedData = Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
  });

  console.log('Parsed CSV Data:', parsedData.data);

  const icons = parsedData.data.map((row, index) => {
    console.log(`Row ${index}:`, row);
    const metamaskIcon = row['MetaMask Icon Name'] ? row['MetaMask Icon Name'].trim() : '';
    const fontAwesomeIcon = row['FontAwesome Icon Name'] ? row['FontAwesome Icon Name'].trim() : '';
    console.log(`Parsed Icon ${index}: MetaMask Icon - ${metamaskIcon}, FontAwesome Icon - ${fontAwesomeIcon}`);
    if (!fontAwesomeIcon) {
      console.error(`FontAwesome Icon Name is missing for MetaMask Icon: ${metamaskIcon}`);
    }
    return {
      metamaskIcon,
      fontAwesomeIcon,
    };
  });

  return icons;
};

export default parseIcons;
