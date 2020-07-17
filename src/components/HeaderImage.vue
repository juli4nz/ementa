<template>
  <div class="section_image" :style="section_styles">
    <div class="header_image" :style="header_styles">
      <div class="fx"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["styles"],
  data: () => {
    return {
      opacity: 1
    };
  },
  methods: {
    handle_scroll() {
      let scroll_pos = window.pageYOffset || document.documentElement.scrollTop;
      let offset = this.styles.size.height - 40;
      let scroll_rel = scroll_pos / offset;
      let opacity = 1 - scroll_rel;

      if (scroll_pos < 0) return;

      this.opacity = opacity;
    }
  },
  computed: {
    header_styles() {
      return {
        ...{ backgroundImage: "url(" + this.styles.image + ")" },
        ...{ opacity: this.opacity }
      };
    },
    section_styles() {
      return {
        ...{ height: this.styles.size.height + "px" }
      };
    }
  },
  created() {
    window.addEventListener("scroll", this.handle_scroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handle_scroll);
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
  z-index: 0;
  .header_image {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
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