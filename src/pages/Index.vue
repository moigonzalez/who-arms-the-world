<template>
  <Layout>
    <Intro />
    <HelloWorld />
  </Layout>
</template>

<script>
import Intro from '../components/Intro';
import HelloWorld from "../components/HelloWorld";

export default {
  metaInfo: {
    title: 'Hello, world!'
  },
  components: {
    Intro,
    HelloWorld
  },
}

</script>

<style>

</style>
