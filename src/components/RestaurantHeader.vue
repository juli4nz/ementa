<template>
  <div class="section_title">
    <h1>{{ info.name }}</h1>
    <p>{{ info.description }}</p>
  </div>
</template>

<script>
export default {
  props: ["info"],
  data: () => {
    return {};
  }
};
</script>

<style scoped lang="scss">
.section_title {
  background: #fefefe;
  border-radius: 5px;
  margin-top: -25px;
  margin-bottom: 20px;
  padding: 15px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  p {
    font-family: "Rubik";
  }
}
</style>
