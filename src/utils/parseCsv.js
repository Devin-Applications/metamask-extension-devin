import Papa from 'papaparse';

const parseCsv = (csvFile, callback) => {
  Papa.parse(csvFile, {
    header: true,
    dynamicTyping: true,
    complete: function(results) {
      console.log("Parsed CSV Data:", results.data); // Add console log statement for debugging
      callback(results.data);
    }
  });
};

export default parseCsv;
