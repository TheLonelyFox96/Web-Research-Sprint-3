// Load the Visualization API and the piechart package.
google.charts.load('current', {'packages': ['treemap']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);


function drawChart() {

    const fakeDatatest = makeData({d: 5, b: 1, u: 2})({d: 3, b: 4, u: 3})({d: 6, b: 4, u: 5});
    console.log(fakeDatatest);

    const data = new google.visualization.DataTable();


    //data.addColumn('string', 'ID');

    data.addColumn('string', 'Defence');

    data.addColumn('string', 'Division');
    data.addColumn('string', 'Brigade');
    data.addColumn('string', 'Unit');

    data.addColumn('number', 'Staff');
    data.addColumn('number', 'Health');
    data.addColumn('number', 'Attack');
    data.addColumn('number', 'Speed');
    data.addColumn('boolean', 'Root node');


    //data.addRow([fakeDatatest.title, null, 0, null, null, null, null]);

    //NodeList.prototype.forEach = Array.prototype.forEach;

    const children = fakeDatatest.childNodes;

    let i = 0;
    children.forEach(function (organizationalUnit) {
        //console.log("Organizational Unit"+organizationalUnit);
        toadd = new Array();
        //toadd.push(String(i));
        toadd.push(organizationalUnit.title);
        //data.addRow([organizationalUnit.title, organizationalUnit.parent.title, organizationalUnit.childNodes.length, null, null, null, null, null, null, null]);

        organizationalUnit.childNodes.forEach(function (division) {
            //console.log(division.title, division.parent.title, division.childNodes.length);
            //data.addRow([division.title, division.parent.title, division.childNodes.length, null, null, null, null]);
            if (toadd.length > 1) {
                toadd[1] = division.title;
            } else {
                toadd.push(division.title);
            }
            if (typeof division !== "undefined") {
                division.childNodes.forEach(function (brigade) {
                    //console.log("brigade" + brigade.title);
                    //data.addRow([brigade.title, brigade.parent.title, brigade.childNodes.length, null, null, null, null]);
                    if (toadd.length > 2) {
                        toadd[2] = brigade.title;
                    } else {
                        toadd.push(brigade.title);
                    }
                    if (typeof brigade !== "undefined") {
                        brigade.childNodes.forEach(function (unit) {
                            //toadd[0] = String(i);

                            if (toadd.length > 3) {
                                toadd[3] = unit.title;
                                toadd[4] = unit.staff;
                                toadd[5] = unit.health;
                                toadd[6] = unit.attack;
                                toadd[7] = unit.speed;
                                toadd[8] = false;

                            } else {

                                toadd.push(unit.title, unit.staff, unit.health, unit.attack, unit.speed, true);
                            }
                            //console.log(toadd);
                            //console.log("unit"+unit);
                            //data.addRow([unit.title, unit.parent.title, ]);
                            //data.addRow([unit.title, unit.parent.title, Object.keys(unit).length, unit.staff, unit.health, unit.attack, unit.speed]);
                            console.log(toadd);
                            data.addRow(toadd);
                            i = i + 1;

                        })

                    }
                });
            }
        });
        //console.log(item);
    });

    console.log(data);
    let groupDefence = google.visualization.data.group(data, [0, 8], []);
    let divisions = google.visualization.data.group(data, [2, 8], []);
    let brigades = google.visualization.data.group(data, [3, 8], []);


    const defenceRows = [['Defence', null, null, null, null, null]];

    for (let i = 0; i < groupDefence.getNumberOfRows(); i++) {

        if (groupDefence.getValue(i, 1)) {
            console.log(groupDefence.getValue(i, 0));
            defenceRows.push([groupDefence.getValue(i, 0), 'Defence', null, null, null, null]);
        }
    }
    const divisionRows = [['Divisions', null, null, null, null, null]];
    for (let i = 0; i < divisions.getNumberOfRows(); i++) {
        if (divisions.getValue(i, 1)) {
            divisionRows.push([divisions.getValue(i, 0), 'Divisions', null, null, null, null]);
        }
    }

    const brigadeRows = [['Brigades', null, null, null, null, null]];
    for (let i = 0; i < brigades.getNumberOfRows(); i++) {
        if (brigades.getValue(i, 1)) {
            brigadeRows.push([brigades.getValue(i, 0), 'Brigades', null, null, null, null]);
        }
    }

    groupDefence = null;
    divisions = null;
    brigades = null;

    let group = google.visualization.data.group(data, [0, 1], [{
        column: 4,
        type: 'number',
        label: data.getColumnLabel(4),
        aggregation: google.visualization.data.sum
    }, {
        column: 5,
        type: 'number',
        label: data.getColumnLabel(5),
        aggregation: google.visualization.data.sum
    }, {
        column: 6,
        type: 'number',
        label: data.getColumnLabel(6),
        aggregation: google.visualization.data.sum
    }, {
        column: 7,
        type: 'number',
        label: data.getColumnLabel(7),
        aggregation: google.visualization.data.sum
    }]);


    //console.log(defenceRows)
    group.addRows(defenceRows);
    const columns = [0, 1, 2, 3];

    console.log(group);
    console.log(defenceRows);
    const chart = new google.visualization.ChartWrapper({
        chartType: 'TreeMap',
        containerId: 'chart_div',
        dataTable: group,
        options: {
            height: 400,
            width: 600,
            generateTooltip: showFullTooltip,
            maxPostDepth: 3
        },
        view: {
            columns: columns,

        }
    });


    function showFullTooltip(row, size, value) {
        //console.log(data.getValue(row, 3))
        if (data.getValue(row, 3) != null) {
            return '<div style="background:#f9fbff; padding:10px; border-style:solid"><H4>' + data.getValue(row, 0) +
                ' <li>(' + data.getValue(row, 3) + ' Staff)</li>' +
                ' <li>(' + data.getValue(row, 4) + ' Health)</li>' +
                ' <li>(' + data.getValue(row, 5) + ' Attack)</li>' +
                ' <li>(' + data.getValue(row, 6) + ' Speed)</li></H4>' +
                ' </div>';
        } else {

            return '<div style="background:#f9fbff; padding:10px; border-style:solid"><H4>display somethign else here</H4>'
        }
        /* else {
                    tooltip = '<div class="popup"><h4>' + data.getValue(row, 0) +
                        ' <small>(' + data.getValue(row, 3) + ')</small></h4>' +
                        ((data.getValue(row, 4) === null) ? "" : "<b>" + data.getValue(row, 4)) + "</b><br/>" +
                        ((data.getValue(row, 5) === null) ? "" : data.getValue(row, 5)) +
                        ((data.getValue(row, 6) === null) ? "" : '<footer>' + data.getValue(row, 6) + '</footer>') +
                        ' </div>';
                }*/
    }

    //const chart = new google.visualization.TreeMap(document.getElementById('chart_div'));


    chart.draw();

    // set up event handlers for the dropdowns
    $('#groupSelect').change(function () {
        const column = parseInt($(this).find(':selected').prop('value'));
        let rows;
        if (column === 1) {
            rows = defenceRows;
        }
        else if (column === 2) {
            rows = divisionRows;
        } else if (column === 3) {
            rows = brigadeRows;
        }
        else {
            alert('something went wrong');
        }
        console.log(column)
        group = google.visualization.data.group(data, [0, column], [{
            column: 4,
            type: 'number',
            label: data.getColumnLabel(5),
            aggregation: google.visualization.data.sum
        }, {
            column: 5,
            type: 'number',
            label: data.getColumnLabel(6),
            aggregation: google.visualization.data.sum
        }, {
            column: 6,
            type: 'number',
            label: data.getColumnLabel(7),
            aggregation: google.visualization.data.sum
        }, {
            column: 7,
            type: 'number',
            label: data.getColumnLabel(8),
            aggregation: google.visualization.data.sum
        }]);
        group.addRows(rows);
        chart.setDataTable(group);
        chart.draw();
    });
    $('#groupSize').change(function () {
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
