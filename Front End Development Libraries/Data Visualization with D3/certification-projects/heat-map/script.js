document.addEventListener("DOMContentLoaded", function () {
  const url =
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";
  const margin = { top: 20, right: 100, bottom: 50, left: 60 };
  const width = 1200;
  const height = 600;
  const padding = 60;

  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.send();
  request.onload = () => {
    const data = JSON.parse(request.responseText);
    const baseTemp = data["baseTemperature"];
    const values = data["monthlyVariance"];
    const minYear = d3.min(values, (item) => {
      return item["year"];
    });
    const maxYear = d3.max(values, (item) => {
      return item["year"];
    });
    // Append SVG Object to the Page
    const svg = d3
      .select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height + 20)
      .attr("class", "svg");

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // X Axis
    const xScale = d3
      .scaleTime()
      .domain([minYear, maxYear])
      .range([padding, width - padding]);
    // .nice(d3.timeYear);

    chart
      .append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0, ${height - padding - 40})`)
      .call(d3.axisBottom(xScale).tickSizeOuter(0).tickFormat(d3.format("d")));

    // Y Axis
    const yScale = d3
      .scaleTime()
      .domain([new Date(0, 0), new Date(0, 11)])
      .range([padding, height - padding - 39]);

    chart
      .append("g")
      .attr("id", "y-axis")
      .attr("transform", `translate(${padding} , 0)`)
      .call(d3.axisLeft(yScale).tickFormat(d3.timeFormat("%B")));

    // Create tooltip
    const tooltip = d3.select("body").append("div").attr("id", "tooltip");

    // Cells
    chart
      .append("g")
      .selectAll("rect")
      .data(values)
      .enter()
      .append("rect")
      .attr("class", "cell")
      .attr("fill", (item) => {
        const variance = Number(item["variance"]);
        if (variance <= -3 && variance >= -7) {
          return "#d6604d";
        } else if (variance > -3 && variance <= -1) {
          return "#f4a582";
        } else if (variance > -1 && variance <= 0) {
          return "#fddbc7";
        } else if (variance > 0 && variance <= 2) {
          return "#d1e5f0";
        } else if (variance > 2 && variance <= 4) {
          return "#92c5de";
        } else if (variance > 4 && variance <= 6) {
          return "#2166ac";
        } else {
          return "#4393c3";
        }
      })
      .attr("data-year", (item) => item["year"])
      .attr("data-month", (item) => item["month"] - 1)
      .attr("data-temp", (item) => baseTemp + item["variance"])
      .attr("height", (height - 2 * padding) / 12)
      .attr("y", (item) => {
        return yScale(new Date(0, item.month - 1, 0));
      })
      .attr("x", (item) => {
        return xScale(new Date(item.year, 0, 0, 0, 0, 0, 0).getFullYear());
      })
      .attr("width", (item) => {
        let numberOfYears = maxYear - minYear;
        return (width - 2 * padding) / numberOfYears;
      })
      .attr("transform", `translate(5, 0)`)
      .on("mouseenter", function (d) {
        tooltip
          .style("opacity", 0.8)
          .attr("data-year", d.year)
          .style("left", d3.event.pageX + 5 + "px")
          .style("top", d3.event.pageY + 5 + "px")
          .html(
            "<p>Year: " +
              d.year +
              "</br>" +
              "Month: " +
              d["month"] +
              "</br>" +
              "Variance: " +
              d["variance"] +
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
      .on("mouseleave", function () {
        tooltip.style("opacity", 0);
        d3.select(this).style("opacity", 1);
      });
    // Add X axis label
    // Add Y axis label
    //Add a legend
    const thresholds = [-6.976, -3, -1, 0, 2, 4, 6, 9.5];
    const colorScale = d3
      .scaleThreshold()
      .domain(thresholds)
      .range([
        "#b2182b",
        "#d6604d",
        "#f4a582",
        "#fddbc7",
        "#d1e5f0",
        "#92c5de",
        "#4393c3",
        "#2166ac",
        "#053061",
      ]);

    const legendData = [-Infinity, ...thresholds]
      .map((d, i, arr) => ({
        from: arr[i],
        to: arr[i + 1],
        color: colorScale(arr[i] + 0.0001),
      }))
      .slice(0, -1);

    const legend = svg.append("g").attr("id", "legend");

    const barWidth = 400;
    const barHeight = 12;
    const xStart = 60;

    const xScaleline = d3
      .scaleLinear()
      .domain([thresholds[0], thresholds[thresholds.length - 1]])
      .range([0, barWidth]);

    // Цветни сегменти
    legend
      .selectAll("rect")
      .data(legendData)
      .enter()
      .append("rect")
      .attr(
        "x",
        (d) =>
          xStart + xScaleline(d.from === -Infinity ? thresholds[0] : d.from)
      )
      .attr("y", 25)
      .attr(
        "width",
        (d) =>
          xScaleline(d.to ?? thresholds.at(-1)) -
          xScaleline(d.from === -Infinity ? thresholds[0] : d.from)
      )
      .attr("height", barHeight)
      .attr("fill", (d) => d.color);

    // Ос с tick-ове
    const axis = d3
      .axisBottom(xScaleline)
      .tickValues(thresholds)
      .tickFormat(d3.format(".1f"));

    legend
      .append("g")
      .attr("transform", `translate(${xStart}, ${25 + barHeight})`)
      .call(axis);

    // Заглавие
    legend
      .append("text")
      .attr("x", xStart)
      .attr("y", 15)
      .attr("font-size", "13px")
      .attr("font-weight", "bold")
      .text("Variance values");
 
  };
});
