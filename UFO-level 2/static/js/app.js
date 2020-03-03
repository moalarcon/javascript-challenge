// reference the table body
var tbody = d3.select("tbody")

// reference UFO data from data.js
var sightingsData = data;
// console.log(sightingsData);

// YOUR CODE HERE!

//Display all data
autoTable(sightingsData)

//select filter and filter values
var filterType = d3.select("#filter-type");

var filterTypeValue = d3.select("#filter-type-value");

//User selection of an filter type from dropdown
filterType.on("change", function () {
    var filterValue = filterType.property("value");
    d3.select("#filtertype").node().value = '';
    // Setting placeholder values for input text
    switch (filterValue) {
        case 'datetime':
            placeHolder = '1/1/2010';
            break;
        case 'city':
            placeHolder = 'city';
            break;
        case 'state':
            placeHolder = 'state';
            break;
        case 'country':
            placeHolder = 'country';
            break;
        case 'shape':
            placeHolder = 'shape';
            break;
        default:
            placeHolder = '';
    }
    d3.select("input").attr("placeholder", placeHolder);
    d3.select("label")
        .attr("for", filterValue)
        .text(`Enter a value for  ${filterValue.toUpperCase()}`);
});


function autoTable(sightingsData) {
    //Loop through data and create table rows
    sightingsData.forEach((sightings) => {
        var row = tbody.append("tr");
        Object.entries(sightings).forEach(function ([key, value]) {
            // Append a cell to the row for each value in the UFO sightings object
            var cell = row.append("td");
            // Use d3 to update each cell's text with UFO sightings values 
            // keys = date, city, state, country, shape, duration, comments
            cell.text(value);
        });
    });
}

// Select the submit button
var button = d3.select("#filter-btn");

button.on("click", function () {
    // Prevent the page from refreshing and clear table
    d3.event.preventDefault();
    tbody.html("");


    // // Select the filter element and get the raw HTML node
    // var inputElement = d3.select(".form-control");
    var inputElement = d3.select("#filtertype");
    // Get the value property of the input element
    var inputValue = inputElement.property("value");
    // prompt filter value if none entered
    if (inputValue == '') {
        alert("Please enter a filter value!");
        document.getElementById("#filtertype").focus();
        autoPopulate(sightingsData);
    }
    //Filter the data based on the input value
    var filterType = d3.select("label").attr("for");

    var filteredData = sightingsData.filter(sightings => sightings[filterType] === inputValue.toLowerCase());
    if (filteredData.length == 0) {
        alert("No UFOs found. Try again.");
        d3.select("#filtertype").node().value = '';
        autoPopulate(sightingsData);
    }

    filteredData.forEach((sightings) => {
        var row = tbody.append("tr");
        Object.entries(sightings).forEach(function ([key, value]) {
            // Append a cell to the row for each value in the UFO sightings object
            var cell = row.append("td");
            // Use d3 to update each cell's text with UFO sightings values 
            // keys = date, city, state, country, shape, duration, comments
            cell.text(value);
        });
    });
})