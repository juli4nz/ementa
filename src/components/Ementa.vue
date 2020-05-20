<template>
  <div id="ementa" class="wrapper">
    <div
      class="section_bg"
      :style="{ backgroundImage: `url(${this.bg_image_url})`, opacity: cur_image_opacity}"
    >
      <div class="header_image" :style="{ backgroundImage: `url(${cur_image_url})`}"></div>
    </div>

    <TopicDetail v-if="show_detail" :topic="topic" @closeDetail="closeDetail" />
    <div v-else class="section_content">
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
      api_url: "http://em.agencydima.com/main/wp-json/acf/v3/ementa",
      id: "",
      info: {
        name: "",
        location: "",
        image_url: ""
      },
      cur_image_url: "",
      cur_image_opacity: 1,
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
            this.id = ementa.id;
            let acf = ementa.acf;
            this.info.name = acf.restaurant_name;
            this.info.location = acf.restaurant_location;
            this.info.image_url = this.cur_image_url = acf.restaurant_image.url;
            let topics = acf.topics;
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
    },
    handleScroll() {
      let a =
        window.pageYOffset + 165 || document.documentElement.scrollTop + 165;
      let b =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      let c = a / b;

      if (a < 0) {
        return;
      }
      //this.cur_image_opacity = c;
      console.log(a + " : " + b + " : " + c);
    }
  },
  created() {
    this.fetchData();
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  padding: 10px;
  font-size: 1rem;
  .section_bg {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    min-height: calc(100vh - 20px);
    z-index: -1;
    .header_image {
      width: calc(100% + 20px);
      margin-left: -10px;
      margin-top: -10px;
      height: 200px;
      background: rgba($color: #000000, $alpha: 0.5);
      background-size: cover;
    }
  }
  .section_content {
    margin-top: 160px;
    h1 {
      color: #292929;
    }
  }
}
</style>
