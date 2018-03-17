var data;
var chart;

// Google Sheets Resume URL
// Follow the same structure, or adapt accordingly
var sheetUrl = "https://docs.google.com/spreadsheets/d/141KnwXpUUELuRZPF8lr70Yach92iWq3vmO4SIy2M5cs";

//https://docs.google.com/spreadsheets/d/141KnwXpUUELuRZPF8lr70Yach92iWq3vmO4SIy2M5cs/pubhtml

window.onload = function() {
    init()
};

var public_spreadsheet_url = sheetUrl + '/pubhtml';

function init() {
    Tabletop.init({
        key: public_spreadsheet_url,
        callback: showInfo,
        simpleSheet: false
    })
}

function showInfo(data, tabletop) {
    var retrieveInfo = function(sheetName, div, formatting, tabletop) {
        $.each(tabletop.sheets(sheetName).toArray(), function(i, fact) {
            console.log(i + ":" + fact);

            var html = "";
            switch (formatting) {
                case "langs":
                    /* foreign languages sheet columns:
                      0=language
                      1=skill level
                    */
                    html = $('<li>').append(fact[0] + ': ' + fact[1]);
                    break;
                case "edu":
                    /* education sheet columns:
                      0=degree
                      1=concentration
                      2=school
                    */
                    html = $('<p>').append(fact[0] + ' - ' + fact[1] + ' - ' + fact[2]);
                    break;
                case "projects":
                    /* experience sheet columns:
                      0=id
                      1=project
                      2=year
                      3=client
                      4=sector
                      5=keywords
                      6=working_at
                      7=role
                      8=technologies
                      9=description
                      10=comments
                    */
                    if (fact[0]!="")
                        html = $('<li>')
                            .append(
                                $('<h4>').append(fact[1])
                                    .append(
                                        $('<small>').append(' ('+fact[2]+')')))
                            .append(
                                $('<b>').append(fact[7] + '@'+ fact[6]))
                            .append(
                                $('<p>').append(fact[9])
                                    .append(
                                        $('<small>').append('<b>Keywords</b>: ' + fact[5]+ ' <b>&lt;Done with:</b> ' + fact[8]+'&gt;')));
                    break;
                default:
                    html = $('<p>').append(fact);
            }

            $(div).append(html);
        });
    }

    retrieveInfo("cover_page", "#cover_div", "p", tabletop);
    retrieveInfo("education", "#education_div", "edu", tabletop);
    retrieveInfo("experience","#projects_div ol","projects",tabletop);
    retrieveInfo("foreign languages", "#languages_div ul", "langs", tabletop);
}

// Load the Visualization API and the Treemap package.
google.charts.load('current', {
    'packages': ['treemap']
});
// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawSheetName);

//main callback function
function drawSheetName() {
    var queryString = encodeURIComponent('SELECT B, E, L, C, H, J, K');
    console.log(sheetUrl + '/gviz/tq?sheet=experience&headers=1&tq=' + queryString);
    var query = new google.visualization.Query(
        sheetUrl + '/gviz/tq?sheet=experience&headers=1&tq=' + queryString);
    query.send(handleSampleDataQueryResponse);
}

//rendering function
//this was done before adding jQuery, so consider making the tooltips using append objects
var handleSampleDataQueryResponse = function(response) {
    //anonymous function to display the mouse over tooltip if applicable (e.g. when the Year is not empty)
    var showFullTooltip = function(row, size, value) {
        var tooltip = ""
        if (data.getValue(row, 3) === null) {
            tooltip = '<div class="popup"><h4>' + data.getValue(row, 0) +
                ' <small>(' + size + ' projects)</small></h4>' +
                ' </div>';
        } else {
            tooltip = '<div class="popup"><h4>' + data.getValue(row, 0) +
                ' <small>(' + data.getValue(row, 3) + ')</small></h4>' +
                ((data.getValue(row, 4) === null) ? "" : "<b>" + data.getValue(row, 4)) + "</b><br/>" +
                ((data.getValue(row, 5) === null) ? "" : data.getValue(row, 5)) +
                ((data.getValue(row, 6) === null) ? "" : '<footer>' + data.getValue(row, 6) + '</footer>') +
                ' </div>';
        }
        return tooltip
    }

    if (response.isError()) {
        alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }

    var data = response.getDataTable();

    //bunch of treeview options. For a full list, check https://developers.google.com/chart/interactive/docs/gallery/treemap#configuration--options
    var options = {
        highlightOnMouseOver: true,
        maxDepth: 1,
        maxPostDepth: 2,
        minHighlightColor: '#8c6bb1',
        midHighlightColor: '#9ebcda',
        maxHighlightColor: '#edf8fb',
        minColor: '#009688',
        midColor: '#f7f7f7',
        maxColor: '#ee8100',
        headerHeight: 15,
        showScale: true,
        height: 500,
        useWeightedAverageForAggregation: true,
        generateTooltip: showFullTooltip
    };

    tree = new google.visualization.TreeMap(document.getElementById('chart_div'));
    tree.draw(data, options);
}