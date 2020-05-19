<template>
  <div class="detail_bg">
    <div class="detail_view" v-if="show">
      <div v-if="item" class="data">
        <div class="header">
          <h2>{{ item.name }}</h2>
        </div>
        <div class="content">
          <div class="measures_container" v-if="hasMeasures">
            <div class="measures_dummy"></div>
            <ul class="measures">
              <li
                v-for="(measure, index) in item.measures"
                :key="'scales' + index"
                class="measure"
              >
                <span>{{ measure.name }}</span>
              </li>
            </ul>
          </div>
          <div class="plate_list">
            <div
              v-for="(plate, index) in item.plates"
              :key="'plate' + index"
              class="plate_container"
            >
              <div class="plate_title">
                <h3>{{ plate.name }}</h3>
                <p>{{ plate.description }}</p>
              </div>
              <ul class="plate_prices">
                <li
                  v-for="(price, index) in plate.prices"
                  :key="'price' + index"
                  class="price"
                >
                  <span>{{ price.price }}</span>
                  <span v-if="price.price !== ''" class="price_symbol">€</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <h2 v-else>Nenhum prato encontrado</h2>
      <button class="close" @click="closeDetail">
        <i class="far fa-times-circle"></i>
      </button>
    </div>
    <i v-else class="fas fa-spinner fa-spin"></i>
  </div>
</template>

<script>
export default {
  props: ["topic"],
  data: () => {
    return {
      show: false,
      item: {},
      hasMeasures: false
    };
  },
  methods: {
    fetchData() {
      this.item = this.topic;
      this.show = true;
    },
    closeDetail() {
      this.$emit("closeDetail");
    }
  },
  created() {
    this.fetchData();
    this.hasMeasures = "" === this.item.measures[0].name ? false : true;
  }
};
</script>

<style lang="scss" scoped>
.detail_bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px;
  background-size: cover;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.85)
  );
  .detail_view {
    position: relative;
    top: 165px;
    width: 100%;
    min-height: calc(100vh - 185px);
    padding: 15px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);

    .data {
      width: 100%;
      margin-bottom: 40px;
      .header {
        margin-bottom: 25px;
      }
      .content {
        .measures_container {
          display: flex;
          .measures_dummy,
          .measures {
            width: 50%;
          }
          .measures {
            display: flex;
            justify-content: flex-end;
            width: 50%;
            padding: 0;
            li {
              text-transform: uppercase;
              font-size: 0.8rem;
              font-family: "Rubik";
              font-weight: 300;
              letter-spacing: 3px;
              width: 50%;
              text-align: right;
              padding-left: 10px;
            }
          }
        }
        .plate_list {
          .plate_container {
            display: flex;
            border-bottom: 1px dotted #bbb;
            margin-bottom: 15px;
            .plate_title,
            .plate_prices {
              width: 50%;
            }
            .plate_title {
              h3 {
                margin: 5px 0;
                padding: 0;
                color: rgb(99, 100, 68);
              }
              p {
                font-family: "Rubik";
                font-weight: 300;
                color: #888;
                margin: 0 0 5px;
              }
            }
            .plate_prices {
              display: flex;
              justify-content: flex-end;
              padding: 0;
              margin: 0;
              li {
                color: #000;
                width: 50%;
                text-align: right;
                padding-left: 10px;
                padding-top: 5px;
                font-size: 1.15rem;
                .price_symbol {
                  font-size: 0.7rem;
                  margin-left: 2px;
                }
              }
            }
          }
        }
      }
    }

    .close {
      position: absolute;
      top: 15px;
      right: 15px;
      outline: none;
      border: none;
      border-radius: 50px;
      background: none;
      padding: 10px;
      font-size: 1rem;
      cursor: pointer;
      text-transform: uppercase;
      font-family: "Rubik";
      font-weight: 300;
    }
  }

  i {
    font-size: 2rem;
    color: #efefef;
  }
}
</style>
