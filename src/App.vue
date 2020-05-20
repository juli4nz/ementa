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
@import url("https://fonts.googleapis.com/css?family=Prata:400");
@import url("https://fonts.googleapis.com/css?family=Rubik:300,500");
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
h1,
h2,
h3,
h4,
h4,
h6 {
  font-family: "Prata";
  font-weight: 400;
}
body,
p {
  font-family: "Rubik";
  font-weight: 300;
}
</style>
