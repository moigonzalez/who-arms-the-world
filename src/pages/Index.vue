<template>
  <Layout>
    <MapContainer />
    <Sources />
  </Layout>
</template>

<script>
import MapContainer from "../components/MapContainer";
import Sources from '../components/Sources';

export default {
  metaInfo: {
    title: 'WHO ARMS THE WORLD?',
    description: 'Visualization of countries profiting from war',
    meta: [
      { key: 'theme-color', content: '#000000' }
    ]
  },
  components: {
    MapContainer,
    Sources
  },
}

</script>

<style>

</style>
