<template>
  <div>
    <div class="detail_header">
      <h2>{{ topics.single.name }}</h2>
      <!--<div class="breadcrumb">{{ restaurant.breadcrumb }}</div>-->
    </div>
    <div class="detail_list">
      <div class="measures_container" v-if="has_measures">
        <div class="measures_dummy"></div>
        <ul class="measures">
          <li
            v-for="(measure, index) in topics.single.content.measures"
            :key="'scales' + index"
            class="measure"
          >
            <span>{{ measure.name }}</span>
          </li>
        </ul>
      </div>
      <div class="plate_list drink_list">
        <div v-if="topics.single.content.plates">
          <div
            v-for="(plate, index) in topics.single.content.plates"
            :key="'plate' + index"
            class="plate_container drink_container"
          >
            <div class="plate_title drink_title">
              <h3>{{ plate.name }}</h3>
              <p>{{ plate.description }}</p>
            </div>
            <ul class="plate_prices drink_prices">
              <li v-for="(price, index) in plate.prices" :key="'price' + index" class="price">
                <span v-if="price.price !== ''">{{ Number(price.price).toFixed(2) }}</span>
                <span v-if="price.price !== ''" class="price_symbol">€</span>
              </li>
            </ul>
          </div>
        </div>
        <div v-else>
          <div
            v-for="(drink, index) in topics.single.content.drinks"
            :key="'drink' + index"
            class="plate_container drink_container"
          >
            <div class="plate_title drink_title">
              <h3>{{ drink.name }}</h3>
              <p>{{ drink.description }}</p>
            </div>
            <ul class="plate_prices drink_prices">
              <li v-for="(price, index) in drink.prices" :key="'price' + index" class="price">
                <span v-if="price.price !== ''">{{ Number(price.price).toFixed(2) }}</span>
                <span v-if="price.price !== ''" class="price_symbol">€</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["topics"],
  data: () => {
    return {};
  },
  methods: {},
  computed: {
    has_measures() {
      const item = this.topics.single.content;
      if (item.measures.length > 0) {
        for (let i = 0; i < item.measures.length; i++) {
          if (item.measures[i]) return true;
        }
      }
      return false;
    }
  },
  created() {
    this.$emit("update");
    let size = { height: 200 };
    this.$emit("resize", size);
  }
};
</script>

<style lang="scss" scoped>
.detail_header {
  margin-bottom: 25px;
  h2 {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .breadcrumb {
    font-size: 0.9rem;
  }
}
.detail_list {
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
          color: #888;
          margin: 0 0 5px;
          font-size: 0.85rem;
        }
      }
      .plate_prices {
        display: flex;
        justify-content: flex-end;
        padding: 0;
        margin: 0;
        li {
          font-family: "Prata";
          font-weight: 400;
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
.close {
  position: fixed;
  top: 15px;
  left: 15px;
  outline: none;
  border: none;
  border-radius: 50px;
  background: rgba($color: #000000, $alpha: 0.5);
  padding: 8px 15px;
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
  i {
    font-size: 1rem;
    color: #efefef;
  }
}
</style>
