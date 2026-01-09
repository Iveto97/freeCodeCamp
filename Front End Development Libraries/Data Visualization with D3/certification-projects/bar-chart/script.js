document.addEventListener("DOMContentLoaded", function () {
  const margin = { top: 20, right: 20, bottom: 50, left: 60 };
  const width = 1000;
  const height = 600;

  const url =
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.send();
  request.onload = () => {
    const json = JSON.parse(request.responseText);
    document.getElementById("title").innerHTML = json.source_name;

    const gdpData = json.data.map((item) => {
      return item;
    });
    const [minData, maxData] = d3.extent(gdpData.map((data) => data[1]));

    const [minDate, maxDate] = d3.extent(
      gdpData.map((date) => new Date(date[0]))
    );

    const svg = d3
      .select(".bars")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3
      .scaleTime()
      .domain([minDate, maxDate])
      .range([0, width - margin.left - margin.right]);

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

    const yScale = d3
      .scaleLinear()
      .domain([0, maxData])
      .range([height - margin.top - margin.bottom, 0]);

    chart.append("g").attr("id", "y-axis").call(d3.axisLeft(yScale));

    const tooltip = d3.select("body").append("div").attr("id", "tooltip");

    chart
      .selectAll(".bar")
      .data(gdpData)
      .enter()
      .append("rect")
      .attr("width", 3)
      .attr("height", (d) => height - margin.top - margin.bottom - yScale(d[1]))
      .attr("x", (d) => xScale(new Date(d[0])))
      .attr("y", (d) => yScale(d[1]))
      .attr("data-date", (d) => d[0])
      .attr("data-gdp", (d) => d[1])
      .attr("class", "bar")
      .attr("fill", "#4f009e")
      .attr("transform", "translate(0, 0)")
      .on("mouseover", function (d) {
        tooltip.transition().style("opacity", 0.8);
        tooltip
          .style("opacity", 0.9)
          .attr("data-date", d[0])
          .style("left", d3.event.pageX + 10 + "px")
          .style("top", d3.event.pageY + 15 + "px")
          .html("<p> Date: " + d[0] + "</p>" + "<p>Billions: " + d[1] + "</p>");

        d3.select(this).style("opacity", 0.6);
      })
      .on("mousemove", function (d) {
        tooltip
          .style("top", d3.event.pageY - 10 + "px")
          .style("left", d3.event.pageX + 10 + "px");
        d3.select(this).style("opacity", 0.8);
      })
      .on("mouseout", function (d) {
        tooltip.transition().style("opacity", 0);
        d3.select(this).style("opacity", 1);
      });

    svg
      .append("g")
      .attr("class", "grid")
      .call(d3.axisLeft().scale(yScale).tickSize(-width, 0, 0).tickFormat(""))
      .attr("transform", "translate(60,0)");

    // Add X axis label:
    chart
      .append("text")
      .attr("x", width / 2)
      .attr("y", height / 2 + 270)
      .attr("class", "info")
      .attr("text-anchor", "middle")
      .text("Date");

    // Y axis label:
    chart
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", width / 4 - 295)
      .attr("x", height - 900)
      .attr("class", "info")
      .attr("text-anchor", "middle")
      .text("GDP");

    d3.select(".more")
      .append("text")
      .text("")
      .html(
        "<p>More Information:" +
          "<a href='http://research.stlouisfed.org/fred2/data/GDP.txt'>" +
          json.display_url +
          "</a>" +
          "</p>"
      );
  };
});
