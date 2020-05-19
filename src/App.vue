<template>
  <div id="app">
    <Ementa />
  </div>
</template>

<script>
import Ementa from "@/components/Ementa.vue";

export default {
  components: {
    Ementa
  }
};
</script>

<style lang="scss">
@import url("https://use.fontawesome.com/releases/v5.8.2/css/all.css");
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
}
ul li {
  list-style: none;
  padding: 0;
}
</style>
