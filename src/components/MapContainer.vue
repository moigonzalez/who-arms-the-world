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
    scrollToBottom() {

    }
  }
}
</script>

<style scoped>
.sectionContainer {
  display: flex;
}
</style>