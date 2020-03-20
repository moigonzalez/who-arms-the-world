<template>
  <section id="map" class="container map">
    <div class="select-wrapper">
      <label class="label" for="year-select">Current year</label>
      <select id="year-select" @change="setActiveYear($event)" class="select">
        <option v-for="y in armSalesYears" v-bind:key="y.id" v-bind:value="y.node.value">
          {{ y.node.value.replace('_', '') }}
        </option>
      </select>
    </div>
  </section>
</template>

<script>
import * as d3 from 'd3';
import * as world from '../assets/world-110m2.json';
import { geoMercator, geoPath } from 'd3-geo';
import transformNameToId from '../services/transformNameToId';

const topojson = require("topojson-client");

export default {
  name: 'Map',
  data() {
    return {
      armSales: this.$parent.$static.armSales.edges,
      armSalesYears: this.$parent.$static.armSalesYears.edges
    }
  },
  computed: {
    activeCountry () {
	    return this.$store.state.activeCountry
    },
    activeYear () {
      return this.$store.state.activeYear
    }
  },
  mounted() {
    this.initD3Map();
    this.addMapLayers();
    this.addMapCircles('data');
  },
  methods: {
    setActiveCountry(payload) {
      this.$store.commit('setActiveCountry', payload)
    },
    setActiveYear(event) {
      this.$store.commit('setActiveYear', event.target.value)
    },
    initD3Map() {
      const el = this.$el;
      const width = Math.max(el.clientWidth || 0);
      const height = Math.max(el.clientHeight || 0);

      function zoomHandler() {
        g.attr("transform", d3.event.transform);
      }

      this.projection = geoMercator()
          .scale(200)
          .translate([ width / 2, height / 1.4 ]);

      const zoom = d3
                    .zoom()
                    .on("zoom", zoomHandler);

      this.path = geoPath().projection(this.projection);

      this.svg = d3.select(this.$el)
                    .append("svg")
                    .attr("viewBox", "50 10 " + width + " " + height)
                    .attr("preserveAspectRatio", "xMinYMin");
      const g = this.svg.call(zoom).append("g");
      this.g = g;
    },
    addMapLayers() {
      const features = topojson.feature(world.default, world.default.objects.countries).features;

      this.g.selectAll('path')
        .data(features)
        .enter()
        .append('path')
        .attr('class', 'country')
        .attr('id', d => `country_${d.id}`)
        .attr("d", this.path);
    },
    addMapCircles(field) {
      const armSales = this.$parent.$static.armSales.edges;

      const armSalesValues = armSales.map(x => x.node.country === null || x.node[field] === '' ? null : x.node[field]);

      const min = Math.min(...armSalesValues);
      const max = Math.max(...armSalesValues);

      // Make circles grow linearly instead of quadratically
      // https://www.d3indepth.com/scales/
      const myScale = d3.scaleSqrt()
                          .domain([min, max])
                          .range([min, max]);

      armSales.forEach(x => {
        if (x.node.country === null || x.node[field] === '') {
          return;
        }

        const id = transformNameToId(x.node.supplier);

        this.g.append('circle')
          .attr("cx", this.projection([x.node.country.longitude, x.node.country.latitude])[0])
          .attr("cy", this.projection([x.node.country.longitude, x.node.country.latitude])[1])
          .attr('title', x.node.supplier)
          .attr("r", 0)
          .attr('id', d => `circle_${id}`)
          .attr('class', 'circle')
          .on('mouseenter', () => d3.select(`#circle_${id}`).classed('circle_hovered', true))
          .on('mouseout', () => d3.select(`#circle_${id}`).classed('circle_hovered', false))
          .on('click', () => {
            this.setActiveCountry({...x.node, id});
          })
          .transition()
          .duration(1000)
          .attr("r", myScale(x.node[field]) / 250)
      });
    }
  },
  watch: {
    activeCountry (country) {
      d3.select('.circle_active').classed('circle_active', false);
      d3.select(`#circle_${country.id}`).classed('circle_active', true);
    },
    activeYear (year) {
      d3.selectAll('.circle').remove();
      this.addMapCircles(year);
    }
  }
}
</script>

<style scoped>
.label {
  display: block;
  text-transform: uppercase;
}
.select-wrapper {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  z-index: 9;
}
.select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 15px 40px;
  background-color: #000;
  color: #fff;
  font-size: 30px;
  border-radius: 0;
  border: solid 1px white;
}
.select:hover {
  cursor: pointer;
}
.container {
  text-align: center;
  width: 75%;
  height: 100vh;
  overflow: hidden;
  cursor: move;
  position: relative;
}

@media (max-width: 760px) {
  .container {
    width: 100%;
    height: calc(100vh - 126px);
  }
}
</style>

<style>
.circle {
  fill: #cc2800;
  stroke: black;
  cursor: pointer;
  transition: 0.2s ease-in-out fill;
}
.circle_hovered {
  fill: #ff3200;
}
.circle:hover {
  cursor: pointer;
}
.circle_active {
  fill: #ff8906;
}
</style>
