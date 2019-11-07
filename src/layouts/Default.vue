<template>
  <div class="layout">
    <header class="header">
    </header>
    <slot/>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style>
body {
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  margin:0;
  padding:0;
  line-height: 1.5;
}

.layout {
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

.header {
  text-align: center;
}

.nav__link {
  margin-left: 20px;
}
</style>
