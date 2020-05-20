<template>
  <div id="app">
    <div class="section_bg" :style="{ backgroundImage: `url(${bg_image_url})`}"></div>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import bg_image_url from "@/assets/bg.png";

export default {
  data: () => {
    return {
      bg_image_url: bg_image_url
    };
  },
  methods: {}
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

.section_bg {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  min-height: calc(100vh - 20px);
  z-index: -1;
}

.slide-fade-up-enter-active {
  transition: all 0.5s ease-out;
}
.slide-fade-up-enter {
  transform: translateY(-200px);
  opacity: 0;
}

.slide-fade-down-enter-active {
  transition: all 0.5s ease-out;
}
.slide-fade-down-enter {
  transform: translateY(300px);
  opacity: 0;
}

.slide-fade-left-enter-active {
  transition: all 0.5s ease-out;
}
.slide-fade-left-enter {
  transform: translateX(50px);
  opacity: 0;
}

.fade-leave-active {
  transition: all 0.5s ease-in;
}
.fade-leave-to {
  opacity: 0;
}
</style>
