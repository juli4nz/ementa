<template>
  <div id="ementa" class="wrapper">
    <div class="fixed_bg" :style="{ backgroundImage: `url(${this.bg_image_url})`}">
      <div class="section_image" :style="{ backgroundImage: `url(${cur_image_url})` }"></div>
    </div>

    <TopicDetail v-if="show_detail" :topic="topic" @closeDetail="closeDetail" />
    <div v-else class="content">
      <RestaurantHeader :info="info" />
      <TopicList :topics="topics" @setTopicIndex="setTopicIndex" />
    </div>
  </div>
</template>

<script>
import RestaurantHeader from "./RestaurantHeader.vue";
import TopicList from "./TopicList.vue";
import TopicDetail from "./TopicDetail.vue";
import bg_image_url from "@/assets/bg.png";

export default {
  data: () => {
    return {
      api_url: "http://demo.agencydima.com/ementa/wp-json/ementas/v1/ementa",
      info: {
        name: "",
        description: "",
        image_url: ""
      },
      cur_image_url: "",
      bg_image_url: bg_image_url,
      topics: [],
      show_detail: false
    };
  },
  components: {
    RestaurantHeader,
    TopicList,
    TopicDetail
  },
  methods: {
    fetchData() {
      let req = new Request(this.api_url);
      fetch(req)
        .then(resp => {
          if (resp.status === 200) return resp.json();
        })
        .then(data => {
          data.forEach(ementa => {
            this.info.name = ementa.post_title;
            this.info.description = ementa.post_content;
            this.info.image_url = ementa.featured_image_url;
            this.cur_image_url = this.info.image_url;
            let topics = ementa.acf.topics;
            topics.forEach(topic => {
              this.topics.push(topic);
            });
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    setTopicIndex(index) {
      this.topic = this.topics[index];
      this.cur_image_url = this.topic.image.url;
      this.show_detail = true;
    },
    closeDetail() {
      this.topic = "";
      this.cur_image_url = this.info.image_url;
      this.show_detail = false;
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Prata");
@import url("https://fonts.googleapis.com/css?family=Rubik");
.wrapper {
  padding: 10px;
  font-size: 1rem;
  font-weight: 400;
  .fixed_bg {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    min-height: calc(100vh - 20px);
    z-index: -1;
    .section_image {
      width: calc(100% + 20px);
      margin-left: -10px;
      margin-top: -10px;
      height: 200px;
      background: rgba($color: #000000, $alpha: 0.5);
      background-size: cover;
    }
  }
  .content {
    margin-top: 175px;
  }
}
h1 {
  color: #292929;
}
</style>
