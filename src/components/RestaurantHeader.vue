<template>
  <div class="section_info">
    <p class="title">{{ info.title }}</p>
    <h1>{{ info.name }}</h1>
    <p class="location">{{ info.location }}</p>
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
.section_info {
  margin-bottom: 25px;
  text-align: center;
  h1 {
    font-size: 1.6rem;
    margin-bottom: 5px;
    color: #292929;
  }
  .location {
    font-size: 1rem;
    margin-top: 0;
    margin-bottom: 30px;
  }
  .title {
    font-size: 1rem;
    font-weight: 500;
    text-transform: uppercase;
    margin: 0;
    margin-top: 15px;
    color: #636444;
    i {
      margin: 0 5px;
    }
  }
}
</style>
