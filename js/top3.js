// Fetch data from the URL
fetch('https://data.wa.gov/resource/f6w7-q2d2.json?$limit=1000')
.then(response => response.json())
.then(data => {
  // Prepare data for the graph
  const makeCount = {};
  data.forEach(item => {
    const make = item.make;

    if (!makeCount[make]) {
      makeCount[make] = 0;
    }

    makeCount[make]++;
  });

  // Sort makes by occurrence in descending order
  const sortedMakes = Object.keys(makeCount).sort((a, b) => makeCount[b] - makeCount[a]);
  const topThreeMakes = sortedMakes.slice(0, 3);

  // Extract data for the top three makes
  const labels = topThreeMakes;
  const dataPoints = topThreeMakes.map(make => makeCount[make]);

  // Create the graph using Chart.js
  const ctx = document.getElementById('graph').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'No. Vehicles',
        data: dataPoints,
        backgroundColor: ['palegreen', 'grey', 'paleturquoise'],
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Vehicle Make'
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'No. Vehicle Sales'
          },
          beginAtZero: true
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Top Three Vehicle Makes by Sales'
        },
        legend: {
          display: false
        }
      }
    }
  });
});