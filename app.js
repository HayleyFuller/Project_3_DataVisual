
const url = "https://data.wa.gov/resource/f6w7-q2d2.json";

function init() {
  let dropdownMenu = d3.select("#selDataset");
  d3.json(url).then((data) => {
    console.log(`Data: ${data}`);
    let countyID = data.county;
    countyID.forEach((county) => {
      dropdownMenu.append("option").text(county);
    });
    let countyData = countyID[0];
    bar(countyData);
  });
}

function bar(countyData) {
  // Fetch the data for the selected countyData
  // CODE HERE

  // Prepare the data for the bar chart
  // CODE HERE
  let barTrace = {
    x: /* array of x-axis values */,
    y: /* array of y-axis values */,
    type: "bar"
  };

  let barData = [barTrace];

  // Create the bar chart
  Plotly.newPlot("bar", barData);
}

// Toggle the page to the new plots when the option has been changed using the dropdown menu for Test Subject ID.
function optionChanged(selectValue) {
  bar(selectValue);
}

init();
