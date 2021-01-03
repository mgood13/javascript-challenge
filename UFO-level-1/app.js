// from data.js
var tableData = data;


var tbody = d3.select("tbody");
data.forEach((sighting)=> {
    var row = tbody.append('tr');
    Object.entries(sighting).forEach(([key,value]) => {

        if (key == 'state' || key == 'country'){
            value = value.toUpperCase();
        }
        else if (key == 'city') {
            var stringParts = value.split(" ");
            stringParts.forEach(capitals);

            function capitals(word,index,sentence){
                word = word.charAt(0).toUpperCase() + word.slice(1)
                sentence[index] = word
            }
            value = stringParts.join(" ")
        }
        
        else if (key == 'shape'){
            value = value.charAt(0).toUpperCase() + value.slice(1)
        };

        var cell = row.append("td");
        cell.text(value);
    });
});
