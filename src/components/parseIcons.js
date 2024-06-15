import Papa from 'papaparse';

const parseIcons = (csvData) => {
  const parsedData = Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
  });

  console.log('Raw CSV Data:', csvData); // Log the raw CSV data
  console.log('Parsed CSV Data:', parsedData.data);

  const icons = parsedData.data.map((row, index) => {
    console.log(`Row ${index}:`, row);
    console.log('Row keys:', Object.keys(row)); // Log the keys of the row object
    const metamaskIcon = row['MetaMask Icon Name'] ? row['MetaMask Icon Name'].trim() : '';
    const fontAwesomeIcon = row[' FontAwesome Icon Name'] ? row[' FontAwesome Icon Name'].replace(/[\u200B-\u200D\uFEFF]/g, '').trim() : '';
    console.log(`Parsed Icon ${index}: MetaMask Icon - ${metamaskIcon}, FontAwesome Icon - ${fontAwesomeIcon}`);
    if (!fontAwesomeIcon) {
      console.error(`FontAwesome Icon Name is missing for MetaMask Icon: ${metamaskIcon}`);
    }
    return {
      metamaskIcon,
      fontAwesomeIcon,
    };
  });

  console.log('Final Parsed Icons:', icons); // Add detailed logging for final parsed icons

  return icons;
};

export default parseIcons;
