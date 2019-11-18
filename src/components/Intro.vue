<template>
  <section class="container">
    <div class="wrapper" v-bind:class="{ show: show }">
      <g-image alt="Image of a bomb crossed by a red" class="logo" src="~/assets/no-bomb.svg" />
      <h1 class="title">
        <span class="word d-0">Who </span>
        <span class="word d-1">arms </span>
        <span class="word d-2">the </span>
        <span class="word d-3">world?</span>
      </h1>
    </div>
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
    document.body.classList.add('no-overflow');
    setTimeout(() => {
      document.getElementById("map").scrollIntoView({ behavior: 'smooth', block: 'center' });
      document.body.classList.remove('no-overflow');
    }, 4000);
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

  .logo {
    max-width: 200px;
    opacity: 0;
    filter: blur(8px);
    transition: 3s all ease-in;
  }

  .show .logo {
    opacity: 1;
    filter: blur(0);
  }

  .wrapper {
    text-align: center;
  }

  .title {
    font-size: 80px;
    text-transform: uppercase;
    text-align: center;
  }

  .word {
    opacity: 0;
    filter: blur(8px);
    transition: 3s all ease-in;
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

<style>
body.no-overflow {
  overflow: hidden;
}
</style>