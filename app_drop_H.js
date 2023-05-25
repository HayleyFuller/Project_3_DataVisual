function showURL() {
    var d1 = $("#county").find(":selected").attr("class");
    var d2 = $("#make").find(":selected").attr("class");
    var d3 = $("#year").find(":selected").attr("class");
    var url = "https://data.wa.gov/api/views/f6w7-q2d2/rows.json?";

    // Retrieve data from the API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Extract the necessary data for the chart
            const labels = data.map(item => item.label);
            const values = data.map(item => item.value);

            // Create the bar chart
            var ctx = document.getElementById('barChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Data',
                        data: values,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

    return true;
}
$(document).ready(function() {
    var $county = $('#county'),
        $make = $('#make'),
        $options = $county.find('option');

    $county.on('change', function() {
        $make.html($options.filter('[value="' + this.value + '"]'));
    }).trigger('change');

    var $make = $('#model'),
        $year = $('#year'),
        $options = $year.find('option');

    $make.on('change', function() {
        $year.html($options.filter('[value="' + this.value + '"]'));
    }).trigger('change');

    showURL(); // Call the showURL function to create the bar chart
});