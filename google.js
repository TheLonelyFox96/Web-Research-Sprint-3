// Load the Visualization API and the piechart package.
google.charts.load('current', {'packages': ['treemap']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    $.getJSON("randomData.json", function () {
    })
        .done(function (json) {


            const data = new google.visualization.DataTable();


            data.addColumn('string', 'ID');
            data.addColumn('string', 'Parent');
            data.addColumn('number', 'Number Of Lines');

            data.addRow(['Entities', null, 0]);

            /*   data.addRow(["caca", "Entities", null]);
               data.addRow(["da", "Entities", null]);
               data.addRow(["oa", "Entities", null]);

               data.addRow(["dsds", "caca", 55]);
               data.addRow(["owa", "da", null]);
   */

            for (let [key, value] of Object.entries(json)) {

                data.addRow([key, "Entities", null]);

                for(let [k2, v2] of Object.entries(value)){
                    data.addRow([k2, key, parseInt(v2)]);
                }
            }

            const options = {
                highlightOnMouseOver: true,
                maxDepth: 1,
                maxPostDepth: 2,
                minHighlightColor: '#8c6bb1',
                midHighlightColor: '#9ebcda',
               maxHighlightColor: '#edf8fb',
                minColor: '#60BD68',
                midColor: '#5DA5DA',
                maxColor: '#F15854',
                headerHeight: 15,
                showScale: false,
                height: 500,
                useWeightedAverageForAggregation: true
            };


            const chart = new google.visualization.TreeMap(document.getElementById('chart_div'));

            chart.draw(data, options);

        })
        .fail(function () {
            console.log("error");
        })
        .always(function () {
            console.log("complete");
        });

}
