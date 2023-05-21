// Fetch the JSON data from the API endpoint
fetch('https://data.wa.gov/resource/f6w7-q2d2.json?$limit=1000')
  .then(function(response) {
    return response.json();
  })
  .then(function(rows) {
    
    var filteredData = rows.map(function(row) {
      delete row.vin_1_10;
      delete row[':@computed_region_8ddd_yn5v'];
      delete row[':@computed_region_fny7_vc3j'];
      delete row[':@computed_region_x4ys_rtnd'];
      delete row['geocoded_column'];
      delete row['_2020_census_tract'];
      delete row['dol_vehicle_id'];
      delete row['electric_utility'];
      delete row['base_msrp'];
      delete row['legislative_district'];
      delete row['cafv_type'];
      delete row['zip_code'];
      delete row['electric_range'];
      return row;
    });
    // Filter the data for rows where model_year is 2023
    var filteredData = rows.filter(function(row) {
      return row.model_year === '2023';
    });
    // Create the table element
    var table = document.createElement('table');

    // Create the table header row
    var headerRow = document.createElement('tr');
    Object.keys(filteredData[0]).forEach(function(column) {
      var headerCell = document.createElement('th');
      headerCell.textContent = column;
      headerRow.appendChild(headerCell);
    });
    table.appendChild(headerRow);

    // Create the table rows
    filteredData.forEach(function(rowData) {
      var row = document.createElement('tr');
      Object.values(rowData).forEach(function(cellData) {
        var cell = document.createElement('td');
        cell.textContent = cellData;
        row.appendChild(cell);
      });
      table.appendChild(row);
    });

    // Append the table to the document
    var container = document.getElementById('tableContainer');
    container.appendChild(table);
  })
  .catch(function(error) {
    console.log('Error:', error);
  });
