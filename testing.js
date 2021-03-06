// Load the Visualization API and the piechart package.
google.charts.load('current', {'packages': ['treemap']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);


function drawChart() {

    const fakeDatatest = makeData({d: 5, b: 1, u: 2})({d: 3, b: 4, u: 3})({d: 6, b: 4, u: 5});

    console.log(fakeDatatest);

    const data = new google.visualization.DataTable();


    data.addColumn('string', 'ID');
    data.addColumn('string', 'Parent');
    data.addColumn('number', 'Number Of Lines');

    data.addRow([fakeDatatest.title, null, 0]);

    /*   data.addRow(["caca", "Entities", null]);
       data.addRow(["da", "Entities", null]);
       data.addRow(["oa", "Entities", null]);

       data.addRow(["dsds", "caca", 55]);
       data.addRow(["owa", "da", null]);
*/


    NodeList.prototype.forEach = Array.prototype.forEach;

    const children = fakeDatatest.childNodes;

    children.forEach(function (organizationalUnit) {
        console.log("Organizational Unit"+organizationalUnit);
        data.addRow([organizationalUnit.title, organizationalUnit.parent.title, organizationalUnit.childNodes.length]);

        organizationalUnit.childNodes.forEach(function (division) {
            //console.log(division.title, division.parent.title, division.childNodes.length);
            data.addRow([division.title, division.parent.title, division.childNodes.length]);

            if (typeof division !== "undefined") {
                division.childNodes.forEach(function (brigade) {
                    //console.log("brigade" + brigade);
                    data.addRow([brigade.title, brigade.parent.title, brigade.childNodes.length]);

                    if (typeof brigade !== "undefined") {
                        brigade.childNodes.forEach(function (unit) {
                            //console.log("unit"+unit);
                            data.addRow([unit.title, unit.parent.title, unit.cost]);
                            if (typeof unit !== "undefined") {
                            }
                        })

                    }
                });
            }
        });
        //console.log(item);
    });
    /*    for (let i = 0; i < fakeDatatest.childNodes.length; i++) {

            data.addRow([fakeDatatest.childNodes[i], "Entities", null]);
            console.log(fakeDatatest.childNodes[i].childNodes.length);

            for (let i2 = 0; i2 < fakeDatatest.childNodes[i].childNodes.length; i2++){
                console.log(fakeDatatest.childNodes[i].childNodes[i2].title);
                data.addRow([fakeDatatest.childNodes[i].childNodes[i2].title, i, parseInt(i2)]);
            }
        }*/

    //data.addRow([null, "Division 1", "Navy", 1]);
    //data.addRow([null, "Division 2", "RAF", 6]);
    //data.addRow(["divixion 1", "Navy", 44]);
    //data.addRow(["divixion 2", "Navy", 44]);
    //data.addRow(["dsfaads", "divixion 1", 434]);



    const options = {
        highlightOnMouseOver: true,
        maxDepth: 1,
        maxPostDepth: 6,
        minHighlightColor: '#8c6bb1',
        midHighlightColor: '#9ebcda',
        maxHighlightColor: '#edf8fb',
        minColor: '#60BD68',
        midColor: '#5DA5DA',
        maxColor: '#F15854',
        headerHeight: 15,
        showScale: true,
        height: 500,
        useWeightedAverageForAggregation: true
    };


    const chart = new google.visualization.TreeMap(document.getElementById('chart_div'));

    chart.draw(data, options);


    // set up event handlers for the dropdowns
    $('#groupSelect').change(function () {
        var column = parseInt($(this).find(':selected').prop('value'));
        var rows;
        if (column == 1) {
            rows = produceRows;
        }
        else if (column == 2) {
            rows = countryRows;
        }
        else {
            alert('something went wrong');
        }
        group = google.visualization.data.group(data, [0, column], [{
            column: 3,
            type: 'number',
            label: data.getColumnLabel(3),
            aggregation: google.visualization.data.sum
        }, {
            column: 4,
            type: 'number',
            label: data.getColumnLabel(4),
            aggregation: google.visualization.data.sum
        }, {
            column: 5,
            type: 'number',
            label: data.getColumnLabel(5),
            aggregation: google.visualization.data.sum
        }]);
        group.addRows(rows);
        chart.setDataTable(group);
        chart.draw();
    });
    $('#sizeSelect').change(function () {
        columns[2] = parseInt($(this).find(':selected').prop('value')) - 1;
        chart.setView({columns: columns});
        chart.draw();
    });
    $('#colorSelect').change(function () {
        columns[3] = parseInt($(this).find(':selected').prop('value')) - 1;
        chart.setView({columns: columns});
        chart.draw();
    });

}
