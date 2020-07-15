<template>
  <div class="section_list">
    <!-- Start Chef -->
    <article
      @click="goto_chef()"
      :style="get_style(chef)"
      v-if="!is_home && chef.content !== ''"
      class="list_item_chef"
    >
      <h2>{{ chef.title }}</h2>
    </article>
    <!-- End Chef -->

    <!-- Start Ementa -->
    <article
      v-for="(topic, index) in topics"
      :key="index"
      :style="get_style(topic)"
      @click="goto(topic, index)"
    >
      <h2>{{ topic.name }}</h2>
    </article>
    <!-- End Ementa -->

    <!-- Start Catalog -->
    <article
      v-for="(cat, index) in catalog"
      :key="index"
      :style="get_style(cat)"
      @click="gotoCatalog(cat, index)"
    >
      <h2>{{ cat.name }}</h2>
    </article>
    <!-- End Catalog -->
  </div>
</template>

<script>
export default {
  props: ["topics", "slugs", "chef", "catalog", "catslugs"],
  methods: {
    get_style(topic) {
      return topic.image
        ? { backgroundImage: "url(" + topic.image + ")" }
        : { backgroundColor: topic.color };
    },
    goto_chef() {
      this.$router.push({ name: "chef" });
    },
    goto(topic, index) {
      if (topic.has_sub_topics) {
        switch (this.level) {
          case 0:
            this.$router.push({
              name: "home_a",
              params: {
                a_slug: this.slugs[index]
              }
            });
            break;
          case 1:
            this.$router.push({
              name: "home_b",
              params: {
                a_slug: this.$route.params.a_slug,
                b_slug: this.slugs[index]
              }
            });
            break;
          case 2:
            this.$router.push({
              name: "home_c",
              params: {
                a_slug: this.$route.params.a_slug,
                b_slug: this.$route.params.b_slug,
                c_slug: this.slugs[index]
              }
            });
            break;
        }
      } else {
        switch (this.level) {
          case 0:
            this.$router.push({
              name: "home_a_detail",
              params: {
                a_slug: this.slugs[index],
                detail: "detail"
              }
            });
            break;
          case 1:
            this.$router.push({
              name: "home_b_detail",
              params: {
                a_slug: this.$route.params.a_slug,
                b_slug: this.slugs[index],
                detail: "detail"
              }
            });
            break;
          case 2:
            this.$router.push({
              name: "home_c_detail",
              params: {
                a_slug: this.$route.params.a_slug,
                b_slug: this.$route.params.b_slug,
                c_slug: this.slugs[index],
                detail: "detail"
              }
            });
            break;
        }
      }
    },
    gotoCatalog(topic, index) {
      switch (this.level) {
        case 0:
          this.$router.push({
            name: "home_a",
            params: {
              a_slug: this.catslugs[index]
            }
          });
          break;
        case 1:
          this.$router.push({
            name: "home_b_catalog",
            params: {
              a_slug: this.$route.params.a_slug,
              b_slug: this.catslugs[index],
              catalog: "catalog"
            }
          });
          break;
      }
    }
  },
  computed: {
    level() {
      if (this.$route.params.c_slug) return 3;
      if (this.$route.params.b_slug) return 2;
      if (this.$route.params.a_slug) return 1;
      return 0;
    },
    is_home() {
      return this.level == 0 ? false : true;
    }
  }
};
</script>

<style lang="scss" scoped>
.section_list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
  width: 100%;
  margin-bottom: 25px;
  article {
    position: relative;
    width: 100%;
    height: calc(100vw * 0.35);
    //height: 150px;
    background-color: #fefefe;
    background-size: cover;
    text-align: left;
    border-radius: 5px;
    padding: 15px;
    cursor: pointer;
    border: 1px solid rgba($color: #fff, $alpha: 1);
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    h2 {
      position: absolute;
      margin: 0;
      font-family: "Rubik";
      font-weight: 300;
      font-size: 1rem;
      color: #fff;
      padding: 8px;
      bottom: 0;
      left: 0;
      width: 100%;
      background: rgb(0, 0, 0);
      background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.8) 0%,
        rgba(0, 0, 0, 0) 100%
      );
    }
    img {
      float: right;
    }
  }
}
</style>
