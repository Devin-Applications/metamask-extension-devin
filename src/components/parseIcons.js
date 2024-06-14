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
      metamaskIcon: row.MetaMaskIcon ? row.MetaMaskIcon.trim() : '',
      fontAwesomeIcon: row.FontAwesomeIcon ? row.FontAwesomeIcon.trim() : '',
    };
  });

  return icons;
};

export default parseIcons;
