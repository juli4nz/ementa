<template>
  <div class="section_list">
    <router-link
      v-for="(topic, index) in topics"
      :key="'topic' + index"
      :style="{ backgroundImage: `url(${topic.image.url})` }"
      tag="article"
      :to="{ 
        name:`detail`, 
        params: {
          id,
          slug,
          topic_id : index  
        }
      }"
    >
      <h2>{{ topic.name }}</h2>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["topics"],
  data: () => {
    return {
      id: "",
      slug: ""
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.slug = this.$route.params.slug;
  }
};
</script>

<style lang="scss" scoped>
.section_list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
  width: 100%;
  article {
    position: relative;
    width: 100%;
    height: 150px;
    background-color: #fefefe;
    background-size: cover;
    text-align: left;
    border-radius: 5px;
    padding: 15px;
    cursor: pointer;
    border: 1px solid rgba($color: #fff, $alpha: 1);
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
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
