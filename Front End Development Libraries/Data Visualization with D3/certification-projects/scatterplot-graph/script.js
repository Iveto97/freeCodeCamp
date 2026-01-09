document.addEventListener("DOMContentLoaded", function () {
  const url =
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
  const margin = { top: 100, right: 20, bottom: 50, left: 60 };
  const width = 1000;
  const height = 600;

  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.send();
  request.onload = () => {
    const json = JSON.parse(request.responseText);
    const [minTime, maxTime] = d3.extent(
      json.map((data) => {
        const [min, sec] = data.Time.split(":").map(Number);
        return new Date(1970, 0, 1, 0, min, sec);
      })
    );
    const [minDate, maxDate] = d3.extent(
      json.map((data) => new Date(data.Year, 3))
    );

    // Append SVG Object to the Page
    const svg = d3
      .select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height + 60)
      .attr("class", "svg");

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // X Axis
    const xScale = d3
      .scaleTime()
      .domain([minDate, maxDate])
      .range([0, width - margin.left - margin.right])
      .nice(d3.timeYear);

    chart
      .append("g")
      .attr("id", "x-axis")
      .attr(
        "transform",
        "translate(0," + `${height - margin.top - margin.bottom}` + ")"
      )
      .call(
        d3.axisBottom(xScale).tickSizeOuter(0).tickFormat(d3.timeFormat("%Y"))
      );

    // Y Axis
    const yScale = d3
      .scaleTime()
      .domain([minTime, maxTime])
      .range([height - margin.top - margin.bottom, 0]);

    chart
      .append("g")
      .attr("id", "y-axis")
      .call(d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S")));

    // Create tooltip
    const tooltip = d3.select("body").append("div").attr("id", "tooltip");

    // Dots
    chart
      .append("g")
      .selectAll("dot")
      .data(json)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(new Date(d.Year, 3)))
      .attr("cy", (d) => {
        const [min, sec] = d.Time.split(":").map(Number);
        return yScale(new Date(1970, 0, 1, 0, min, sec));
      })
      .attr("r", 6)
      .attr("class", (d) => (d.Doping === "" ? "dot blue" : "dot tradewind"))
      .style("stroke", "black")
      .attr("data-xvalue", (d) => d.Year)
      .attr("data-yvalue", (d) => {
        const [min, sec] = d.Time.split(":").map(Number);
        return new Date(1990, 0, 1, 0, min, sec).toISOString();
      })
      .on("mouseover", function (d) {
        tooltip
          .style("opacity", 0.8)
          .attr("data-date", d.Time)
          .attr("data-year", d.Year)
          .style("left", d3.event.pageX + 5 + "px")
          .style("top", d3.event.pageY + 5 + "px")
          .html(
            "<p>Name: " +
              d.Name +
              "</br>" +
              "Nationality: " +
              d.Nationality +
              "</br>" +
              "Year: " +
              d.Year +
              "</br> Time: " +
              d.Time +
              "</p>" +
              "<p>" +
              d.Doping +
              "</p>"
          );
        d3.select(this).style("opacity", 0.6);
      })
      .on("mousemove", function () {
        tooltip
          .style("top", d3.event.pageY + 5 + "px")
          .style("left", d3.event.pageX + 5 + "px");
        d3.select(this).style("opacity", 0.8);
      })
      .on("mouseout", function () {
        tooltip.transition().style("opacity", 0);
        d3.select(this).style("opacity", 1);
      });

    // Add X axis label
    chart
      .append("text")
      .attr("x", width / 2)
      .attr("y", height / 2 + 200)
      .attr("text-anchor", "middle")
      .text("Year");

    // Y axis label:
    chart
      .append("text")
      .attr("x", height - 800)
      .attr("y", width / 4 - 295)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text("Time in minutes");

    //Add title
    chart
      .append("text")
      .attr("x", width / 2)
      .attr("y", -70)
      .attr("id", "title")
      .attr("text-anchor", "middle")
      .text("Doping in Professional Bicycle Racing");

    //Add subtitle
    chart
      .append("text")
      .attr("x", width / 2)
      .attr("y", -50)
      .attr("text-anchor", "middle")
      .attr("class", "subtitle")
      .text("35 Fastest times up Alpe d'Huez");

    //Add a legend

    const legend = svg.append("g").attr("id", "legend");
    legend
      .append("circle")
      .attr("cx", width - 120)
      .attr("cy", height / 2 + 190)
      .attr("r", 5)
      .style("fill", "#69b3a2");
    legend
      .append("circle")
      .attr("cx", width - 120)
      .attr("cy", height / 2 + 215)
      .attr("r", 5)
      .style("fill", "#404080");
    legend
      .append("text")
      .attr("x", width - 100)
      .attr("y", height / 2 + 190)
      .text("Riders with doping allegations")
      .style("font-size", "10px")
      .attr("alignment-baseline", "middle");
    legend
      .append("text")
      .attr("x", width - 100)
      .attr("y", height / 2 + 215)
      .text("No doping allegations")
      .style("font-size", "10px")
      .attr("alignment-baseline", "middle");
  };
});
