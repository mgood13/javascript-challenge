// from data.js
// Bring in the data and initialize the variables that we need.
var tableData = data;
radio = 'before';

// Check the length of the dataset so that we know when we're running into problems.
console.log(data.length)

// Obtain our table where the data will be stored.
var tbody = d3.select("tbody");
generateTable(data);

// This functions serves to populate the table with data whenever it is called.
function generateTable(generatedata) {

// Each instance of data will be called a sighting.
generatedata.forEach((sighting)=> {
    // For each data entry we will create a new row of data.
    var row = tbody.append('tr');
    Object.entries(sighting).forEach(([key,value]) => {
        // This if statement is all about cleaning the data.

        // The postal code for the state is used so we put it in all caps as appropriate.
        if (key == 'state' || key == 'country'){
            value = value.toUpperCase();
        }

        // Capitalize the first letter of the city. Some cities are multiple words, each will be capitalized.
        else if (key == 'city') {
            var stringParts = value.split(" ");
            stringParts.forEach(capitals);

            // This function takes the first letter using charAt, capitalizes it then uses slice to take the rest of the word.
            function capitals(word,index,sentence){
                word = word.charAt(0).toUpperCase() + word.slice(1)
                sentence[index] = word
            }
            value = stringParts.join(" ")
        }
        // Similar to city we want to capitalize the first letter, but these are all one word.
        else if (key == 'shape'){
            value = value.charAt(0).toUpperCase() + value.slice(1)
        }

        // The comments column contained a number of different Unicode characters. This replaces them with their characters.
        else if (key == 'comments') {
        console.log(typeof value)
            value = value.replaceAll("&#44",",")
            value = value.replaceAll("&#39", "'")
            value = value.replaceAll("&#33", "!")
        };

        // Add the corrected cell to the row
        var cell = row.append("td");
        cell.text(value);
    });
});
}

// Grab the value from the radio buttons
var radioselection = d3.selectAll('input[type = radio]');
    radioselection.on('change', function() {

        // Log to the console that the button changed (for debugging)
        console.log('Button changed to: ' + this.value)
        radio = this.value
});

// Grab the filter button
var button = d3.select("#filter-btn");
var form = d3.select("#filters");

// Object handlers for the button and the form
button.on("click", runEnter);
form.on("submit",runEnter);

// This is the main filter function
function userFilter(date,param){

    // The user is able to select if they want to filter before or after the given date, this code is basically duplicated with a sign change.
    if (param == 'before'){
        data.forEach(function(sightingrow){
            // Grab just the day since we're working with a dataset with the same month and year and only different days
            day = sightingrow.datetime.split('/')[1];
            var userDay = date.split('/')[1];
            console.log("HELLO")
            return day <= userDay
        })
    }

    else {
        data.forEach(function(sightingrow){
            day = sightingrow.datetime.split('/')[1];
            var userDay = date.split('/')[1];
            console.log("HERE")
            return day >= userDay
        })
    }

}

function filterData(asighting){
    console.log(asighting.city)
    return true

}

function runEnter() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#datetime");

  // Get the value property of the input element
  var inputDate = inputElement.property("value");

  // Print the value to the console
  console.log(inputDate);
  console.log(radio);


//var filteredData = data.filter(userFilter(inputDate, radio));
var filteredData = data.filter(mysighting => {

if (radio == 'before'){
            var day = parseInt(mysighting.datetime.split('/')[1]);

            var userDay = parseInt(inputDate.split('/')[1]);
            return day <= userDay
    }

    else {
            var day = parseInt(mysighting.datetime.split('/')[1]);
            var userDay = parseInt(inputDate.split('/')[1]);
            return day >= userDay
    }
    })

if (filteredData.length == 0){
    d3.select("#warning").text("No results found - Try the format '1/5/2010.' Remember: You don't need to include the year and the data only covers January 1-13 of 2010.")
    console.log("warning")
}


  // Set the span tag in the h1 element to the text
  // that was entered in the form
  d3.select("tbody").selectAll('tr').remove();
  generateTable(filteredData)

  };