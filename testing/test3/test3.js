google.charts.load('current', {'packages': ['treemap']});

google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string','Name');
    data.addColumn('string','Produce Type');
    data.addColumn('string','Country of Origen');
    data.addColumn('number','Quantity Produced');
    data.addColumn('number','Quantity Exported');
    data.addColumn('number','Quantity Imported');
    data.addColumn('boolean','Root node');
    // set root node to true if this has no parent node in the data set, false otherwise
    data.addRows([
        ['Oranges', 'Fruit', 'United States', 260000, 50000, 380000, true],
        ['Onions', 'Vegetable', 'United States', 800000, 400000, 120000, true],
        ['Apples', 'Fruit', 'Chile', null, null, null, true],
        ['Braeburn', 'Apples', 'Apples', 250000, 19000, 190000, false],
        ['Cortland', 'Apples', 'Apples', 250000, 19000, 190000, false],
        ['Peppers', 'Vegetable', 'Chile', 450000, 230000, 100000, true]
    ]);

    console.log(data)

    // get all produce types and countries
    var produceTypes = google.visualization.data.group(data, [1, 6], []);
    var countries = google.visualization.data.group(data, [2, 6], []);

    // build data rows for produce type and country views
    var produceRows = [['Produce Type', null, null, null, null]];
    for (var i = 0; i < produceTypes.getNumberOfRows(); i++) {
        if (produceTypes.getValue(i, 1)) {
            console.log(produceTypes.getValue(i, 0));

            produceRows.push([produceTypes.getValue(i, 0), 'Produce Type', null, null, null]);
        }
    }
    var countryRows = [['Country of Origen', null, null, null, null]];
    for (var i = 0; i < countries.getNumberOfRows(); i++) {
        if (countries.getValue(i, 1)) {
            countryRows.push([countries.getValue(i, 0), 'Country of Origen', null, null, null]);
        }
    }
    produceTypes = null;
    countries = null;

    // initialize the treemap with produce type view w/ qty produce as size and qty exported as color
    var group = google.visualization.data.group(data, [0, 1], [{
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

    group.addRows(produceRows);

    console.log(group);
    console.log(produceRows);
    var columns = [0, 1, 2, 3];

    var chart = new google.visualization.ChartWrapper({
        chartType: 'TreeMap',
        containerId: 'chart_div',
        dataTable: group,
        options: {
            height: 400,
            width: 600,
            maxPostDepth: 2
        },
        view: {
            columns: columns
        }
    });
    chart.draw();

    // set up event handlers for the dropdowns
    $('#groupSelect').change(function () {
        var column = parseInt($(this).find(':selected').prop('value'));
        var rows;
        if (column === 1) {
            rows = produceRows;
        }
        else if (column === 2) {
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