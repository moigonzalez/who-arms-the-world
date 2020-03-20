<template>
  <div class="sectionContainer">
    <Map />
    <Sidebar />
  </div>
</template>

<static-query>
query {
  armSales: allArmSales {
    edges {
      node {
        id
        _2010
        _2011
        _2012
        _2013
        _2014
        _2015
        _2016
        _2017
        _2018
        _2019
        _2010_2019
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
  armSalesYears: allArmSalesYears {
    edges {
      node {
        value
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
}
</script>

<style scoped>
.sectionContainer {
  display: flex;
}
</style>