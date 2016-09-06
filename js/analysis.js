/*
* ANALYSIS.JS
*/

var states = [
	{
        "name": "Alabama",
        "count": 0
    },
    {
        "name": "Alaska",
        "count": 0
    },
    {
        "name": "American Samoa",
        "count": 0
    },
    {
        "name": "Arizona",
        "count": 0
    },
    {
        "name": "Arkansas",
        "count": 0
    },
    {
        "name": "California",
        "count": 0
    },
    {
        "name": "Colorado",
        "count": 0
    },
    {
        "name": "Connecticut",
        "count": 0
    },
    {
        "name": "Delaware",
        "count": 0
    },
    {
        "name": "District Of Columbia",
        "count": 0
    },
    {
        "name": "Federated States Of Micronesia",
        "count": 0
    },
    {
        "name": "Florida",
        "count": 0
    },
    {
        "name": "Georgia",
        "count": 0
    },
    {
        "name": "Guam",
        "count": 0
    },
    {
        "name": "Hawaii",
        "count": 0
    },
    {
        "name": "Idaho",
        "count": 0
    },
    {
        "name": "Illinois",
        "count": 0
    },
    {
        "name": "Indiana",
        "count": 0
    },
    {
        "name": "Iowa",
        "count": 0
    },
    {
        "name": "Kansas",
        "count": 0
    },
    {
        "name": "Kentucky",
        "count": 0
    },
    {
        "name": "Louisiana",
        "count": 0
    },
    {
        "name": "Maine",
        "count": 0
    },
    {
        "name": "Marshall Islands",
        "count": 0
    },
    {
        "name": "Maryland",
        "count": 0
    },
    {
        "name": "Massachusetts",
        "count": 0
    },
    {
        "name": "Michigan",
        "count": 0
    },
    {
        "name": "Minnesota",
        "count": 0
    },
    {
        "name": "Mississippi",
        "count": 0
    },
    {
        "name": "Missouri",
        "count": 0
    },
    {
        "name": "Montana",
        "count": 0
    },
    {
        "name": "Nebraska",
        "count": 0
    },
    {
        "name": "Nevada",
        "count": 0
    },
    {
        "name": "New Hampshire",
        "count": 0
    },
    {
        "name": "New Jersey",
        "count": 0
    },
    {
        "name": "New Mexico",
        "count": 0
    },
    {
        "name": "New York",
        "count": 0
    },
    {
        "name": "North Carolina",
        "count": 0
    },
    {
        "name": "North Dakota",
        "count": 0
    },
    {
        "name": "Northern Mariana Islands",
        "count": 0
    },
    {
        "name": "Ohio",
        "count": 0
    },
    {
        "name": "Oklahoma",
        "count": 0
    },
    {
        "name": "Oregon",
        "count": 0
    },
    {
        "name": "Palau",
        "count": 0
    },
    {
        "name": "Pennsylvania",
        "count": 0
    },
    {
        "name": "Puerto Rico",
        "count": 0
    },
    {
        "name": "Rhode Island",
        "count": 0
    },
    {
        "name": "South Carolina",
        "count": 0
    },
    {
        "name": "South Dakota",
        "count": 0
    },
    {
        "name": "Tennessee",
        "count": 0
    },
    {
        "name": "Texas",
        "count": 0
    },
    {
        "name": "Utah",
        "count": 0
    },
    {
        "name": "Vermont",
        "count": 0
    },
    {
        "name": "Virgin Islands",
        "count": 0
    },
    {
        "name": "Virginia",
        "count": 0
    },
    {
        "name": "Washington",
        "count": 0
    },
    {
        "name": "West Virginia",
        "count": 0
    },
    {
        "name": "Wisconsin",
        "count": 0
    },
    {
        "name": "Wyoming",
        "count": 0
    }
];

//Sort Data
var data = d3.csv("./data/farmersMarkets.csv", function(d) {
  return {
    'city' : d.city,
    'state' : d.State,
  };
}, function(data) {
	var dataByState = d3.nest()
						.key(function(d) { return d.state; })
						.entries(data);
  
	//console.log(dataByState);
  
	var stateCount = d3.nest()
					 .key(function(d) { return d.state; })
					 .sortKeys(d3.ascending)
					 .rollup(function(v) { return v.length; })
					 .entries(data);
					 
	console.log(JSON.stringify(stateCount));
	
	x.domain(stateCount.map(function(d) { return d.key; }));
    y.domain([0, d3.max(stateCount, function(d) { return d.values; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("# OF MARKETS");

  svg.selectAll("bar")
      .data(stateCount)
	  .enter()
	  .append("rect")
      .style("fill", "red")
      .attr("x", function(d) { return x(d.key); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.values); })
	  .attr("height", function(d) { return height - y(d.values); });
	
  
});

var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;
	
var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");
