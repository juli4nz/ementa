<template>
  <div class="section_header">
    <div class="section section_info">
      <p class="title">
        <i class="fas fa-utensils"></i>
        {{ title }}
        <i class="fas fa-utensils"></i>
      </p>
      <h1>{{ info.name }}</h1>
      <p class="location">{{ info.location }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["info"],
  data: () => {
    return {
      title: "Ementa"
    };
  }
};
</script>

<style scoped lang="scss">
.section {
  background: #fefefe;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 15px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  h1 {
    font-size: 1.6rem;
    margin-bottom: 5px;
  }
  .location {
    font-size: 1rem;
    margin-top: 0;
    margin-bottom: 10px;
  }
  .title {
    font-size: 1rem;
    font-weight: 500;
    text-transform: uppercase;
    margin: 0;
    margin-top: 5px;
    color: #636444;
    i {
      margin: 0 5px;
    }
  }
}
</style>
