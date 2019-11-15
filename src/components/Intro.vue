<template>
  <section class="container">
    <h1 class="title" v-bind:class="{ show: show }">
      <span class="word d-0">Who </span>
      <span class="word d-1">arms </span>
      <span class="word d-2">the </span>
      <span class="word d-3">world?</span>
    </h1>
    <!-- <p>Visualization of countries profiting from war</p> -->
  </section>
</template>

<script>
export default {
  name: 'Intro',
  data() {
    return { show: false }
  },
  mounted() {
    this.show = true;
    setTimeout(() => {
      document.getElementById("map").scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 3000);
  }
}
</script>

<style scoped>
  .container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .title {
    font-size: 80px;
    text-transform: uppercase;
  }

  .word {
    opacity: 0;
    filter: blur(8px);
    transition: 2s all ease-in;
  }

  .d-1 {
    transition-delay: 200ms;
  }

  .d-3 {
    transition-delay: 400ms;
  }

  .d-2 {
    transition-delay: 600ms;
  }

  .show .word {
    opacity: 1;
    filter: blur(0);
  }
</style>

