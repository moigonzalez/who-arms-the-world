<template>
  <section id="map" class="container"></section>
</template>

<static-query>
query {
  armSales: allArmSales {
    edges {
      node {
        data
        supplier
        country {
          latitude
          longitude
          name
        }
      }
    }
  }
}
</static-query>

<script>
import * as d3 from 'd3';
import * as world from '../assets/world-110m2.json';
import { geoMercator, geoPath } from "d3-geo"

const topojson = require("topojson-client");

const isArmSaleValid = x => x !== "" && x !== "0";

export default {
  name: 'Map',
  data() {
    return {
      isArmSaleValid: isArmSaleValid,
    }
  },
  mounted() {
    const armSales = this.$static.armSales.edges;
    let centered;

    const width = Math.max(this.$el.clientWidth || 0);
    const height = Math.max(this.$el.clientHeight || 0);

    const clicked = (d) => {
      var x, y, k;

      if (d && centered !== d) {
        var centroid = path.centroid(d);
        x = centroid[0];
        y = centroid[1];
        k = 4;
        centered = d;
      } else {
        x = width / 2;
        y = height / 2;
        k = 1;
        centered = null;
      }

      g.selectAll("path")
          .classed("active", centered && function(d) { return d === centered; });

      g.transition()
          .duration(750)
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
          .style("stroke-width", 1.5 / k + "px");
    }

    const projection = geoMercator()
        .scale(200)
        .translate([ width / 2, height / 1.4 ]);

    let path = geoPath().projection(projection);

    const svg = d3.select(this.$el)
                  .append("svg")
                  .attr("viewBox", "50 10 " + width + " " + height)
                  .attr("preserveAspectRatio", "xMinYMin")

    const features = topojson.feature(world.default, world.default.objects.countries).features;

    const g = svg.append("g");

    g.selectAll('path')
      .data(features)
      .enter()
      .append('path')
      .attr('class', 'country')
      .attr('id', d => `country_${d.id}`)
      .on('mouseenter', d => {
        d3.select(`#country_${d.id}`).classed('country_hovered', true);
      })
      .on('mouseout', d => {
        d3.select(`#country_${d.id}`).classed('country_hovered', false);
      })
      .on("click", clicked)
      .attr("d", path);

    armSales.forEach(x => {
      if (x.node.country === null || x.node.data === '') {
        return;
      }

      g.append('circle')
        .attr("cx", projection([x.node.country.longitude, x.node.country.latitude])[0])
        .attr("cy", projection([x.node.country.longitude, x.node.country.latitude])[1])
        .attr('title', x.node.supplier)
        .attr("r", x.node.data / 200)
        .style('stroke', 'yellow')
        .style('pointer-events', 'none')
        .style('fill', 'red');

      // g.append('text')
      //   .attr("dx", projection([x.node.country.longitude, x.node.country.latitude])[0])
      //   .attr("dy", projection([x.node.country.longitude, x.node.country.latitude])[1])
      //   .text(`${x.node.supplier}${x.node.data}`)
      //   .style('color', 'white');
    })
  }
}
</script>

<style scoped>
.container {
  text-align: center;
  width: 100%;
  height: 100vh;
}
</style>

<style>
.country_hovered {
  fill: green;
}
.country:hover {
  cursor: pointer;
}
</style>>
