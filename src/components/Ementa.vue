<template>
  <div id="ementa" class="wrapper">
    <!-- background -->
    <div class="section_bg" :style="bg_style"></div>
    <!-- back button -->
    <transition name="slide-fade-left">
      <button v-if="is_home" class="close" @click="go_back">
        <i class="fas fa-arrow-left"></i>
      </button>
    </transition>
    <!-- language switcher -->
    <transition name="slide-fade-right">
      <LanguageSwitcher
        v-if="loaded && !is_home"
        :languages="languages"
        @switch_language="set_language"
      />
    </transition>
    <!-- header image -->
    <transition name="slide-fade-up">
      <HeaderImage v-if="loaded" :styles="styles.header" />
    </transition>
    <!-- content -->
    <div class="section_content" :style="styles.content">
      <transition name="slide-fade-down">
        <div class="body" v-if="loaded" :style="styles.body">
          <div class="section_item">
            <!--start content view -->
            <router-view
              :restaurant="restaurant"
              :topics="topics"
              :catalog="catalog"
              :chef="chef"
              :notes="notes"
              :key="$route.fullPath"
              @update="filter_data"
              @resize="resize_image"
            />
            <!--end content view -->
          </div>
        </div>
      </transition>
      <!-- loader -->
      <div v-if="!loaded" class="loading">
        <i class="fas fa-spinner fa-pulse"></i>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderImage from "./HeaderImage.vue";
import LanguageSwitcher from "./LanguageSwitcher.vue";
import bg_image_url from "@/assets/bg.png";

export default {
  data: () => {
    return {
      //api_url: "http://app.ementa.web/wp-json/wp/v2/ementas",
      //lang_api_url: "http://app.ementa.web/wp-json/pll/v1/languages",
      api_url: "https://app.ementa.info/main/wp-json/wp/v2/ementas",
      lang_api_url: "https://app.ementa.info/main/wp-json/pll/v1/languages",
      post: {
        id: "",
        slug: ""
      },
      restaurant: {
        title: "",
        name: "",
        location: "",
        image: "",
        style: ""
      },
      topics: {
        all: [],
        list: [],
        slugs: [],
        single: {}
      },
      catalog: {
        all: [],
        list: [],
        slugs: [],
        single: {}
      },
      notes: "",
      chef: {
        name: "Sugestões do Chef",
        content: "",
        image: ""
      },
      languages: {
        current: "",
        translations: []
      },
      default_langs: {},
      styles: {
        header: {
          size: "",
          image: ""
        },
        content: {}
      },

      bg_image_url: bg_image_url,
      loaded: false
    };
  },
  components: {
    HeaderImage,
    LanguageSwitcher
  },
  methods: {
    reset() {
      this.topics.all = [];
      this.topics.list = [];
      this.topics.single = {};
      this.topics.slugs = [];

      this.catalog.all = [];
      this.catalog.list = [];
      this.catalog.single = {};
      this.catalog.slugs = [];

      this.languages.current = "";
      this.languages.translations = [];
    },
    fetch_data() {
      // Get List of Languages
      let lang_req = new Request(this.lang_api_url);
      fetch(lang_req)
        .then(resp => {
          if (resp.status === 200) return resp.json();
        })
        .then(langs => {
          langs.forEach(lang => {
            this.default_langs[lang.slug] = lang;
          });
        })
        .catch(error => {
          console.log(error);
        });

      // Get Data
      let req = new Request(this.api_url + "/" + this.$route.params.id);
      fetch(req)
        .then(resp => {
          if (resp.status === 200) return resp.json();
        })
        .then(data => {
          let acf = data.acf;

          // Restaurant Info
          this.restaurant.name = acf.restaurant.name;
          this.restaurant.location = acf.restaurant.location;
          this.restaurant.image = acf.restaurant.image;

          // Plates
          let topics = acf.topics;
          if (topics) {
            topics.forEach(topic => {
              this.topics.all.push(topic);
            });
          }

          // Drinks
          let drink_topics = acf.drink_topics;
          if (drink_topics) {
            drink_topics.forEach(topic => {
              this.topics.all.push(topic);
            });
          }

          // Catalog
          let catalog = acf.catalog;
          if (catalog) {
            catalog.forEach(topic => {
              this.catalog.all.push(topic);
            });
          }

          // Info
          if (acf.infos) this.notes = acf.infos;

          //Chef Suggestions
          if (acf.chef) {
            this.chef.image = acf.chef.image;
            this.chef.content = acf.chef.content;
          }

          //id
          this.post.id = data.id;

          //slug
          this.post.slug = data.slug;

          //current translation
          this.languages.current = {
            locale: this.default_langs[data.lang].locale,
            language_code: this.default_langs[data.lang].slug,
            native_name: this.default_langs[data.lang].name,
            country_flag_url: this.default_langs[data.lang].flag_url
          };

          //available translations
          Object.entries(data.translations).forEach(([key, val]) => {
            if (key !== this.languages.current.language_code) {
              this.languages.translations.push({
                locale: this.default_langs[key].locale,
                language_code: this.default_langs[key].slug,
                native_name: this.default_langs[key].name,
                country_flag_url: this.default_langs[key].flag_url,
                id: val
              });
            }
          });

          // All loaded
          this.filter_data();
          this.loaded = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    filter_data() {
      //const topics_list = this.topics.list;
      this.topics.list = [];
      this.topics.slugs = [];

      let catalog_list = this.catalog.list;
      this.catalog.list = [];
      this.catalog.slugs = [];

      switch (this.level) {
        case 0: // Level 0
          this.set_header_style(this.restaurant.image);
          this.restaurant.title = "Ementa";

          // Topics
          this.topics.all.forEach(topic => {
            this.topics.list.push(topic);
            this.topics.slugs.push(this.sanitize(topic.name));
          });

          // Catalog
          this.catalog.all.forEach(topic => {
            this.catalog.list.push(topic);
            this.catalog.slugs.push(this.sanitize(topic.name));
          });

          break;
        case 1: // Level 1
          this.topics.all.forEach(topic => {
            if (this.current_slug === this.sanitize(topic.name)) {
              this.set_header_style(topic.image);
              this.restaurant.title = topic.name;

              if (topic.has_sub_topics) {
                topic.sub_topics.forEach(sub_topic => {
                  this.topics.list.push(sub_topic);
                  this.topics.slugs.push(this.sanitize(sub_topic.name));
                });
              } else {
                this.topics.single = topic;
              }
            }
          });

          // Catalog
          this.catalog.all.forEach(topic => {
            if (this.current_slug === this.sanitize(topic.name)) {
              this.set_header_style(topic.image);
              this.restaurant.title = topic.name;

              topic.products.forEach(product => {
                this.catalog.list.push(product);
                this.catalog.slugs.push(this.sanitize(product.name));
              });
            }
          });

          break;
        case 2: // Level 2
          this.topics.all.forEach(topic => {
            if (
              topic.has_sub_topics &&
              this.$route.params.a_slug === this.sanitize(topic.name)
            ) {
              topic.sub_topics.forEach(sub_topic => {
                if (this.current_slug === this.sanitize(sub_topic.name)) {
                  this.set_header_style(sub_topic.image);
                  this.restaurant.title = sub_topic.name;
                  if (sub_topic.has_sub_topics) {
                    sub_topic.sub_topics.forEach(sub_sub_topic => {
                      this.topics.list.push(sub_sub_topic);
                      this.topics.slugs.push(this.sanitize(sub_sub_topic.name));
                    });
                  } else {
                    this.topics.single = sub_topic;
                  }
                }
              });
            }
          });

          // Catalog
          catalog_list.forEach(product => {
            if (this.current_slug === this.sanitize(product.name)) {
              this.set_header_style(product.image);
              this.restaurant.title = product.name;
              this.catalog.single = product;
            }
          });

          break;
        case 3: // Level 3
          this.topics.all.forEach(topic => {
            if (
              topic.has_sub_topics &&
              this.$route.params.a_slug === this.sanitize(topic.name)
            ) {
              topic.sub_topics.forEach(sub_topic => {
                if (
                  sub_topic.has_sub_topics &&
                  this.$route.params.b_slug === this.sanitize(sub_topic.name)
                ) {
                  sub_topic.sub_topics.forEach(sub_sub_topic => {
                    if (
                      this.current_slug === this.sanitize(sub_sub_topic.name)
                    ) {
                      this.set_header_style(sub_sub_topic.image);
                      this.topics.single = sub_sub_topic;
                    }
                  });
                }
              });
            }
          });
          break;
      }
    },
    resize_image(size) {
      this.styles.header.size = size;
      this.styles.content = { marginTop: `${size.height - 40}px` };
      this.styles.body = {
        minHeight: `calc(100vh - ${size.height - 40 + 20}px)`
      };
    },
    set_header_style(image) {
      this.styles.header.image = image;
    },
    set_language(id) {
      this.$router.push({
        name: "home",
        params: {
          id: id,
          slug: this.post.slug
        }
      });
    },
    go_back() {
      this.$router.go(-1);
    },
    sanitize(title) {
      let slug = "";
      let titleLower = title.toLowerCase();
      slug = titleLower.trim();
      slug = slug.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, "e");
      slug = slug.replace(/i|í|ì|ï|î|ı/gi, "i");
      slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, "a");
      slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, "o");
      slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, "u");
      slug = slug.replace(/đ/gi, "d");
      slug = slug.replace(/ç/gi, "c");
      slug = slug.replace(/ñ/gi, "n");
      slug = slug.replace(/\/+/g, " "); //forward slash convert to space
      slug = slug.replace(/-+/g, " "); //single or multiple dashes
      slug = slug.replace(/\.+/g, " "); //single or multiple dots
      slug = slug.replace(/\s+/g, "-"); //single or multiple white spaces, tabs, line breaks

      return slug;
    }
  },
  computed: {
    level() {
      if (this.$route.name === "chef") return 1;
      if (this.$route.params.c_slug) return 3;
      if (this.$route.params.b_slug) return 2;
      if (this.$route.params.a_slug) return 1;
      return 0;
    },
    current_slug() {
      if (this.$route.params.c_slug) return this.$route.params.c_slug;
      if (this.$route.params.b_slug) return this.$route.params.b_slug;
      if (this.$route.params.a_slug) return this.$route.params.a_slug;
      return "";
    },
    is_home() {
      return this.level == 0 ? false : true;
    },
    bg_style() {
      return { backgroundImage: "url(" + this.bg_image_url + ")" };
    }
  },
  watch: {
    $route(to, from) {
      if (to.name === "home" && from.name === "home") {
        this.loaded = false;
        this.reset();
        this.fetch_data();
      }
    }
  },
  created() {
    this.reset();
    this.fetch_data();
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
  }
  .section_content {
    margin-top: 160px;
    .loading {
      position: absolute;
      font-size: 4rem;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }
    .body {
      position: relative;
      background-color: #fff;
      width: 100%;
      min-height: calc(100vh - 185px);
      padding: 15px;
      border-radius: 5px;
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    }
  }
  .close {
    position: fixed;
    top: 15px;
    left: 15px;
    outline: none;
    border: none;
    border-radius: 50px;
    background: rgba($color: #000000, $alpha: 0.5);
    padding: 8px 15px;
    z-index: 1;
    cursor: pointer;
    i {
      font-size: 1rem;
      color: #efefef;
    }
  }
}
</style>
