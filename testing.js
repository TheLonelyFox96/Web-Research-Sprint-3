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

    let i=0;
    children.forEach(function (organizationalUnit) {
        //console.log("Organizational Unit"+organizationalUnit);
        data.addRow([organizationalUnit.title, organizationalUnit.parent.title, organizationalUnit.childNodes.length]);

        organizationalUnit.childNodes.forEach(function (division) {
            //console.log(division.title, division.parent.title, division.childNodes.length);
            data.addRow([division.title, division.parent.title, division.childNodes.length]);

            if (typeof division !== "undefined") {
                division.childNodes.forEach(function (brigade) {
                    //console.log("brigade" + brigade.title);
                    data.addRow([brigade.title, brigade.parent.title, brigade.childNodes.length]);

                    if (typeof brigade !== "undefined") {
                        brigade.childNodes.forEach(function (unit) {
                            //console.log("unit"+unit);
                            //data.addRow([unit.title, unit.parent.title, ]);
                            data.addRow([unit.title, unit.parent.title, Object.keys(unit).length]);

                            data.addRow([{v: "staff"+i, f: 'Staff: '+unit.staff}, unit.title, unit.staff]);
                            data.addRow([{v: "health"+i, f: 'Health: '+unit.health}, unit.title, parseInt(unit.health)]);
                            data.addRow([{v: "attack"+i, f: 'Attack: '+unit.attack}, unit.title, parseInt(unit.attack)]);
                            data.addRow([{v: "speed"+i, f: 'Speed: '+unit.speed}, unit.title, parseInt(unit.speed)]);

                            //data.addRow([unit.title, unit.parent.title, unit.staff]);
                            //data.addRow([unit.title, unit.parent.title, unit.health]);
                            //data.addRow([unit.title, unit.parent.title, unit.attack]);
                            //data.addRow([unit.title, unit.parent.title, unit.speed]);
                            i = i +1;
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
        maxPostDepth: 3,
        minHighlightColor: '#8c6bb1',
        midHighlightColor: '#9ebcda',
        maxHighlightColor: '#edf8fb',
        minColor: '#60BD68',
        midColor: '#5DA5DA',
        maxColor: '#F15854',
        headerHeight: 15,
        showScale: true,
        height: 500,
        useWeightedAverageForAggregation: true,
        generateTooltip: showFullTooltip

    };


    function showFullTooltip(row, size, value) {
        console.log(data)
        if (String(data.getValue(row, 1)).startsWith("Brigade")) {
            return'<div style="background:#f9fbff; padding:10px; border-style:solid"><H4>' + data.getValue(row, 0) +
                ' <li>(' + size + ' Staff)</li>' +
                ' <li>(' + size + ' Health)</li>' +
                ' <li>(' + size + ' Attack)</li>' +
                ' <li>(' + size + ' Speed)</li></H4>' +
                ' </div>';
        }/* else {
            tooltip = '<div class="popup"><h4>' + data.getValue(row, 0) +
                ' <small>(' + data.getValue(row, 3) + ')</small></h4>' +
                ((data.getValue(row, 4) === null) ? "" : "<b>" + data.getValue(row, 4)) + "</b><br/>" +
                ((data.getValue(row, 5) === null) ? "" : data.getValue(row, 5)) +
                ((data.getValue(row, 6) === null) ? "" : '<footer>' + data.getValue(row, 6) + '</footer>') +
                ' </div>';
        }*/
    }

    function showStaticTooltip(row, size, value) {
        //console.log(data)
        console.log(data.getValue(row, 0), data.getValue(row, 1), data.getValue(row, 2))

        return '<div style="background:#f9fbff; padding:10px; border-style:solid">' +
           'The data is:'+data.getValue(row, 0)+data.getValue(row, 1)+ data.getValue(row, 2)+'.</div>';
    }


    const chart = new google.visualization.TreeMap(document.getElementById('chart_div'));

    chart.draw(data, options);


}
