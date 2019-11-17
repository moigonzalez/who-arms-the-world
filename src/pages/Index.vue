<template>
  <Layout>
    <Intro />
    <MapContainer />
    <Sources />
  </Layout>
</template>

<script>
import Intro from '../components/Intro';
import MapContainer from "../components/MapContainer";
import Sources from '../components/Sources';

export default {
  metaInfo: {
    title: 'WHO ARMS THE WORLD?',
  },
  components: {
    Intro,
    MapContainer,
    Sources
  },
}

</script>

<style>

</style>
