<template>
  <section class="container">
    <!-- <article>
      <div v-for="edge in $static.armSales.edges" :key="edge.node.id">
        <div v-if="isArmSaleValid(edge.node.data)">
          <h2>{{ edge.node.supplier }}</h2>
          <div>Has sold over {{ edge.node.data }} millions of dollars worth of weapons in 2018</div>
          <div v-if="edge.node.country !== null">
            {{edge.node.country.latitude}}
            {{edge.node.country.longitude}}
          </div>
        </div>
      </div>
    </article> -->

  </section>
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
import { feature } from "topojson-client"
import { geoMercator, geoPath } from "d3-geo"
const topojson = require("topojson-client");
import getArmSsales from "../services/getArmSales";
import * as world from '../assets/world-110m2.json';

const isArmSaleValid = x => x !== "" && x !== "0";

export default {
  name: 'HelloWorld',
  data() {
    return {
      isArmSaleValid: isArmSaleValid,
    }
  },
  mounted() {
    console.log(this.$static);

    const projection = () =>
      geoMercator()
        .scale(100)
        .translate([ 800 / 2, 450 / 2 ]);
    const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    var path = geoPath().projection(projection());

    const svg = d3.select(this.$el)
                  .append("svg")
                  .style("cursor", "move")
                  .attr("viewBox", "50 10 " + width + " " + height)
                  .attr("preserveAspectRatio", "xMinYMin");

    var g = svg.append("g");

    var features = topojson.feature(world.default, world.default.objects.countries).features;

    console.log(features);

    svg.append("g")
        .selectAll("path")
        .data(features)
        .enter().append("path")
        .attr("d", path)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  text-align: center;
}
</style>
