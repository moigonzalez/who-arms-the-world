<template>
  <section id="sources" class="container">
    <h1 class="title">"War is Peace, Freedom is Slavery, Ignorance is Strength"</h1>
    <div class="wrapper">
      <h1>Sources</h1>
      <p>Data comes from the Stockholm International Peace Research Institute (SIPRI)</p>
      <p>The gathered data shows the amount of arm exports for the period 2010 - 2019</p>
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
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.title {
  text-align: center;
}
.wrapper {
  text-align: center;
  padding: 20px;
}
</style>