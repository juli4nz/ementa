<template>
  <div class="section_list">
    <article
      v-for="(topic, index) in topics"
      :key="'topic' + index"
      @click="setTopicIndex(index)"
      :style="{ backgroundImage: `url(${topic.image.url})` }"
    >
      <h2>{{ topic.name }}</h2>
    </article>
  </div>
</template>

<script>
export default {
  props: ["topics"],
  data: () => {
    return {};
  },
  methods: {
    setTopicIndex(index) {
      this.$emit("setTopicIndex", index);
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
  article {
    position: relative;
    width: 100%;
    height: 150px;
    background-color: #fefefe;
    background-size: cover;
    text-align: center;
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
      background: rgba($color: #000000, $alpha: 0.5);
      border-radius: 20px;
      padding: 8px;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }
    img {
      float: right;
    }
  }
}
</style>
