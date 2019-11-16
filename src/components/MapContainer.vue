<template>
  <div>
    <Map :armSales="this.armSales" v-on:setCurrentCountry="onCountryClick" />
    <Sidebar :armSales="this.armSales" />
  </div>
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
import Map from './Map';
import Sidebar from './Sidebar';

export default {
  name: 'MapContainer',
  data() {
    return {
      isLoading: true,
      activeCountry: {},
      armSales: [],
    }
  },
  components: {
    Sidebar,
    Map
  },
  mounted() {
    this.armSales = this.$static.armSales.edges;
    this.isLoading = false;
  },
  methods: {
    onCountryClick (value) {
      console.log(value);
      this.activeCountry = value;
    }
  }
}
</script>

<style>

</style>