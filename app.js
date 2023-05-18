
const url = "https://data.wa.gov/resource/f6w7-q2d2.json"

function init() {
    let dropdownMenu = d3.select("#selDataset");
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);
        let countyID = data.county;
        countyID.forEach(county) => {
            dropdownMenu.append("option").text(county);
        });
        let countyData = countyID[0];
        bar(countyData);
}

// Part 2) - Make the bar chart
//CODE HERE
        let barData = [barTrace];
        Plotly.newPlot('bar', barData);

// Toggle the page to the new plots when the option has been changed using the dropdown Menu for Test Subject ID.
function optionChanged(selectValue) {
    bar(selectValue);
}

init();
