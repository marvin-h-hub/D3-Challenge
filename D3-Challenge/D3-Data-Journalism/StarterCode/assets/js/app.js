var svgWidth = 1000;
var svgHeight = 500;

var margin = {
  top: 25,
  right: 30,
  bottom: 75,
  left: 90
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
  .select("#scatter")        
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("data.csv").then(function(data){
  
  data.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
  });

  var xLinearScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.poverty))
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.healthcare)])
    .range([height, 0]);

  var xAxis = d3.axisBottom(xLinearScale).ticks(5);
  var yAxis = d3.axisLeft(yLinearScale).ticks(10);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

  chartGroup.append("g")
    .call(yAxis);

  chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", 10)
    .attr("fill", "blue")
    .attr("opacity", ".7");
  

  chartGroup.append("text")
    .attr("transform",
    "translate(" + (width/2) + " ," + 
                   (height + margin.top + 30) + ")")
    .style("text-anchor", "middle")
    .text("In Poverty (%)");
  

  chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x",0 - (height / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("Lacks Healthcare (%)"); 

  chartGroup.selectAll("text")
  .data(data)
  .enter()
  .append("text")
  .text(d => d.abbr)
  .attr("x", (d, i) => xLinearScale(d.poverty))
  .attr("y", (d, i) => yLinearScale(d.healthcare-0.3))
  .style("text-anchor", "middle")
  .style("font", "11px times")
  .style("fill", "white")
  .style("font-weight", "bold")


}).catch(function(error) {
    console.log(error);
});























