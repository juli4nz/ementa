<template>
  <div>
    <div class="detail_header">
      <h2>{{ topics.single.name }}</h2>
    </div>
    <div class="detail_list">
      <!-- Header -->
      <div class="list_header" v-if="has_measures">
        <div class="header_dummy"></div>
        <ul class="measures">
          <li
            v-for="(measure, index) in topics.single.content.measures"
            :key="index + 'measure'"
            class="measure"
          >
            <span>{{ measure.name }}</span>
          </li>
        </ul>
      </div>
      <!-- List -->
      <div class="item_list">
        <div v-if="topics.single.content.plates">
          <!-- Plates -->
          <div
            v-for="(plate, index) in visible_plates"
            :key="index + 'plate'"
            class="item_container"
            @click="display_modal(plate)"
          >
            <!-- Plate Image -->
            <div class="item_image" v-if="plate.image">
              <div class="image_wrapper">
                <img
                  :src="plate.image.url"
                  :alt="plate.name"
                  class="image_content"
                />
              </div>
            </div>

            <!-- Plate Title -->
            <div class="item_title">
              <h3 v-html="plate.name"></h3>
              <p v-if="plate.description">{{ plate.description }}</p>
              <!-- Allergens Icons -->
              <ul class="item_allergens" v-if="has_allergens(plate.allergens)">
                <li
                  v-for="(allergen, index) in plate.allergens"
                  :key="index + 'allergen'"
                  class="allergen"
                >
                  <span :class="'icon-' + allergen.value"></span>
                </li>
              </ul>
            </div>

            <!-- Plate Prices -->
            <ul
              class="item_prices"
              :class="{ single: !has_measures && plate.prices.length == 1 }"
            >
              <li
                v-for="(price, index) in plate.prices"
                :key="index + 'price'"
                class="price"
              >
                <span v-if="price.price !== ''">{{
                  Number(price.price).toFixed(2)
                }}</span>
                <span v-if="price.price !== ''" class="price_symbol">€</span>
              </li>
            </ul>
          </div>
        </div>
        <div v-else>
          <!-- Drinks -->
          <div
            v-for="(drink, index) in visible_drinks"
            :key="index + 'drink'"
            class="item_container"
            @click="display_modal(drink)"
          >
            <!-- Drink Image -->
            <div class="item_image" v-if="drink.image">
              <div class="image_wrapper">
                <img
                  :src="drink.image.url"
                  :alt="drink.name"
                  class="image_content"
                />
              </div>
            </div>

            <!-- Drink Title -->
            <div class="item_title">
              <h3 v-html="drink.name"></h3>
              <p v-if="drink.description">{{ drink.description }}</p>
              <!-- Allergens Icons -->
              <ul class="item_allergens" v-if="has_allergens(drink.allergens)">
                <li
                  v-for="(allergen, index) in drink.allergens"
                  :key="index + 'allergen'"
                  class="allergen"
                >
                  <span :class="'icon-' + allergen.value"></span>
                </li>
              </ul>
            </div>

            <!-- Drink Prices -->
            <ul
              class="item_prices"
              :class="{ single: !has_measures && drink.prices.length == 1 }"
            >
              <li
                v-for="(price, index) in drink.prices"
                :key="index + 'price'"
                class="price"
              >
                <span v-if="price.price !== ''">{{
                  Number(price.price).toFixed(2)
                }}</span>
                <span v-if="price.price !== ''" class="price_symbol">€</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- END List -->
    </div>
    <!-- Modal -->
    <modal v-if="show_modal" @close="show_modal = false" class="item_modal">
      <img
        v-if="item.image"
        slot="header_image"
        :src="item.image.url"
        :alt="item.name"
        class="modal_image"
      />
      <h3 slot="title" class="modal_title">{{ item.name }}</h3>
      <ul class="modal_prices" slot="body">
        <li v-for="(price, index) in item.prices" :key="index + 'price'">
          <span v-if="price.price !== ''">{{
            Number(price.price).toFixed(2)
          }}</span>
          <span v-if="price.price !== ''" class="price_symbol">€</span>
        </li>
      </ul>
      <p v-if="item.description" slot="body">{{ item.description }}</p>
      <!-- Allergens Icons -->
      <ul
        slot="body"
        class="item_allergens"
        v-if="has_allergens(item.allergens)"
      >
        <li
          v-for="(allergen, index) in item.allergens"
          :key="index + 'allergen'"
          class="allergen"
        >
          <span :class="'icon-' + allergen.value"></span>
          <span class="allergen_name">{{ allergen.label }}</span>
        </li>
      </ul>
    </modal>
  </div>
</template>

<script>
import Modal from "./Modal.vue";
export default {
  props: ["topics"],
  components: {
    Modal
  },
  data: () => {
    return {
      show_modal: false,
      item: ""
    };
  },
  methods: {
    display_modal(item) {
      if (item.image.url || this.has_allergens(item)) {
        this.show_modal = true;
        this.item = item;
      }
    },
    has_allergens(item) {
      return Array.isArray(item) && item.length;
    }
  },
  computed: {
    has_measures() {
      const item = this.topics.single.content;
      if (item.measures.length > 0) {
        for (let i = 0; i < item.measures.length; i++) {
          if (item.measures[i].name.trim()) return true;
        }
      }
      return false;
    },
    visible_plates() {
      return this.topics.single.content.plates.filter(function(p) {
        return p.visible;
      });
    },
    visible_drinks() {
      return this.topics.single.content.drinks.filter(function(d) {
        return d.visible;
      });
    }
  },
  created() {
    this.$emit("update");
    let size = { height: 180 };
    this.$emit("resize", size);
  }
};
</script>

<style lang="scss" scoped>
$item_image_width: 75px;
$item_image_height: $item_image_width;
$item_image_pr: 10px;
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
  .list_header {
    display: flex;
    .header_dummy {
      flex: 1 1 auto;
    }
    .measures {
      display: flex;
      justify-content: flex-end;
      flex: 0 0 40%;
      padding: 0;
      li {
        text-transform: uppercase;
        font-size: 0.7rem;
        letter-spacing: 1px;
        flex: 1 1 50%;
        text-align: right;
        padding-left: 10px;
        &:first-child {
          padding-left: 0;
        }
      }
    }
  }
  .item_list {
    .item_container {
      display: flex;
      border-bottom: 1px dotted #bbb;
      margin-bottom: 15px;
      .item_title {
        flex: 1 1 auto;
        h3 {
          margin: 5px 0;
          padding: 0;
          color: rgb(99, 100, 68);
          font-size: 1.1rem;
        }
        p {
          color: #888;
          margin: 0 0 5px;
          font-size: 0.85rem;
        }
      }
      .item_allergens {
        margin: 5px 0;
        display: flex;
        flex-wrap: wrap;
        .allergen {
          margin-right: 5px;
          font-size: 22px;
        }
      }
      .item_prices {
        flex: 0 0 40%;
        display: flex;
        justify-content: flex-end;
        padding: 0;
        margin: 0;
        &.single {
          flex: 0 0 25%;
        }
        li {
          font-family: "Prata";
          font-weight: 400;
          color: #000;
          flex: 1 1 50%;
          text-align: right;
          padding-left: 10px;
          padding-top: 5px;
          font-size: 1rem;
          .price_symbol {
            font-size: 0.7rem;
            margin-left: 2px;
          }
        }
      }
      .item_image {
        flex: 0 0 $item_image_width;
        padding-right: $item_image_pr;
        .image_wrapper {
          width: $item_image_width;
          height: $item_image_height;
          outline: 1px solid rgba(0, 0, 0, 0.05);
          .image_content {
            width: $item_image_width;
            height: $item_image_height;
            object-fit: cover;
          }
        }
      }
    }
  }
}
.item_modal {
  .modal_image {
    width: 100%;
    //height: 200px;
    object-fit: cover;

    &:after {
      content: "";
      display: block;
      padding-bottom: 100%;
    }
  }

  .modal_title {
    margin-top: 0;
    color: rgb(99, 100, 68);
    font-size: 1.3rem;
  }
  .modal_prices {
    padding: 0;
    margin: 0;
    li {
      font-family: "Prata";
      font-weight: 400;
      color: #000;
      font-size: 1rem;
      .price_symbol {
        font-size: 0.8rem;
        margin-left: 3px;
      }
    }
  }
  .item_allergens {
    margin: 15px 0 5px;
    display: flex;
    flex-wrap: wrap;
    .allergen {
      margin-right: 15px;
      font-size: 22px;
      .allergen_name {
        margin-left: 5px;
        font-size: 16px;
      }
    }
  }
}
</style>
