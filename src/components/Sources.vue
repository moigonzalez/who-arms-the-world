<template>
  <section id="sources" class="container">
    <div class="wrapper">
      <h1>Sources</h1>
      <p>Data comes from the Stockholm International Peace Research Institute (SIPRI)</p>
      <p>The gathered data shows the amount of arm exports for the year 2018</p>
      <p><a
        href="https://sipri.org/databases/armstransfers"
        target="_blank" rel="noopener noreferrer">
        SIPRI Arms Transfers Databse
      </a></p>
      <h1>I'm Open Source!</h1>
      <p>Check the code on
        <a href="https://github.com/moigonzalez/who-arms-the-world"
        target="_blank" rel="noopener noreferrer">
        GitHub
      </a></p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Sources',
}
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.wrapper {
  text-align: center;
}
</style>