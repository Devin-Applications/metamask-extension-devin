import Papa from 'papaparse';

const parseIcons = (csvData) => {
  const parsedData = Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
  });

  console.log('Parsed CSV Data:', parsedData.data);

  const icons = parsedData.data.map((row, index) => {
    console.log(`Row ${index}:`, row);
    return {
      metamaskIcon: row['MataMask Icon Name'] ? row['MataMask Icon Name'].trim() : '',
      fontAwesomeIcon: row['FontAwesome Icon Name'] ? row['FontAwesome Icon Name'].trim() : '',
    };
  });

  return icons;
};

export default parseIcons;
