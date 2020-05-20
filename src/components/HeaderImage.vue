<template>
  <div class="section_image">
    <div class="header_image" :style="{ backgroundImage: `url(${url})`, opacity: opacity}">
      <div class="fx"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["url"],
  data: () => {
    return {
      opacity: 1
    };
  },
  methods: {
    handleScroll() {
      let scroll_pos = window.pageYOffset || document.documentElement.scrollTop;
      let offset = 160;
      let scroll_rel = scroll_pos / offset;
      let opacity = 1 - scroll_rel;

      if (scroll_pos < 0) {
        return;
      }

      this.opacity = opacity;
    }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style lang="scss" scoped>
.section_image {
  position: fixed;
  height: 200px;
  top: 0;
  left: 0;
  width: 100%;
  .header_image {
    width: 100%;
    height: 100%;
    background-size: cover;
    .fx {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 35px;
      width: 100%;
      background: rgb(255, 255, 255);
      background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0) 100%
      );
    }
  }
}
</style>