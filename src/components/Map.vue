<template>
  <section id="map" class="container map"></section>
</template>

<script>
import * as d3 from 'd3';
import * as world from '../assets/world-110m2.json';
import { geoMercator, geoPath } from 'd3-geo';

const topojson = require("topojson-client");

export default {
  name: 'Map',
  mounted() {
    const armSales = this.$parent.$static.armSales.edges;;
    let centered;

    const el = this.$el;
    const width = Math.max(el.clientWidth || 0);
    const height = Math.max(el.clientHeight || 0);

    const projection = geoMercator()
        .scale(200)
        .translate([ width / 2, height / 1.4 ]);

    const zoom = d3
                  .zoom()
                  .on("zoom", zoomHandler);

    function zoomHandler() {
      g.attr("transform", d3.event.transform);
    }

    let path = geoPath().projection(projection);

    const svg = d3.select(this.$el)
                  .append("svg")
                  .attr("viewBox", "50 10 " + width + " " + height)
                  .attr("preserveAspectRatio", "xMinYMin")

    const features = topojson.feature(world.default, world.default.objects.countries).features;

    const g = svg.call(zoom).append("g");

    g.selectAll('path')
      .data(features)
      .enter()
      .append('path')
      .attr('class', 'country')
      .attr('id', d => `country_${d.id}`)
      .attr("d", path);

    armSales.forEach(x => {
      if (x.node.country === null || x.node.data === '') {
        return;
      }

      const id = x.node.supplier.toLowerCase().split(' ').join('-');

      g.append('circle')
        .attr("cx", projection([x.node.country.longitude, x.node.country.latitude])[0])
        .attr("cy", projection([x.node.country.longitude, x.node.country.latitude])[1])
        .attr('title', x.node.supplier)
        .attr("r", x.node.data / 180)
        .attr('id', d => `circle_${id}`)
        .attr('class', 'circle')
        .on('mouseenter', () => d3.select(`#circle_${id}`).classed('circle_hovered', true))
        .on('mouseout', () => d3.select(`#circle_${id}`).classed('circle_hovered', false))
        .on('click', () => {
          d3.select('.circle_active').classed('circle_active', false);
          d3.select(`#circle_${id}`).classed('circle_active', true);
          this.setCurrentCountry(x.node);
        })
    })
  },
  methods: {
    setCurrentCountry(val) {
      this.$emit('setCurrentCountry', val);
    }
  }
}
</script>

<style scoped>
.container {
  text-align: center;
  width: 80%;
  height: 100vh;
}
</style>

<style>
.circle {
  fill: red;
}
.circle_hovered {
  fill: green;
}
.circle:hover {
  cursor: pointer;
}
.circle_active {
  fill: blue;
}
</style>>
