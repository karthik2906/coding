<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <div
          v-for="product in products"
          :key="product.id"
          class="col-lg-3 col-md-4 col-sm-12 d-flex products"
        >
          <img
            class="product-image"
            :src="product.hero.href"
            :alt="product.name"
            @click="showModal(product)"
          />
          <div
            v-html="product.name"
            class="position-absolute product-name"
          ></div>
          <div class="position-absolute product-price">
            $
            {{
              (product.priceRange && product.priceRange.selling.high) ||
              product.price.selling
            }}
          </div>
        </div>
      </div>
      <div v-if="displayModal">
        <transition name="modal">
          <div class="modal-container">
            <div class="modal-wrapper">
              <div class="modal-dialog">
                <div class="modal-content">
                  <button
                    type="button"
                    class="close-btn"
                    data-dismiss="modal"
                    aria-label="Close"
                    @click="displayModal = false"
                  >
                    &times;
                  </button>
                  <b-carousel
                    id="image-carousel"
                    controls
                    indicators
                    background="#ababab"
                  >
                    <div v-for="(image, index) in images" :key="index">
                      <b-carousel-slide
                        :img-src="image.href"
                      ></b-carousel-slide>
                    </div>
                  </b-carousel>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      url:
        "https://www.westelm.com/services/catalog/v4/category/shop/new/all-new/index.json",
      products: [],
      displayModal: false,
    };
  },
  created() {
    axios
      .get(this.url)
      .then((res) => {
        this.products = res.data.groups;
      })
      .catch((error) => {
        console.log("error while fetching data", error);
      });
  },
  methods: {
    showModal: function (product) {
      this.displayModal = true;
      this.images = [...product.images, product.thumbnail];
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.products {
  margin: 10px 0px;
}

.product-image {
  width: 250px;
  height: auto;
  object-fit: contain;
  cursor: pointer;
}
.product-name {
  width: 250px;
  min-height: 40px;
  text-align: left;
  background: #dddddd;
  padding: 3px 5px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}

.product-price {
  bottom: 5%;
  background: #6b6565;
  color: white;
  font-weight: bold;
  padding: 3px 7px;
  margin-left: 15px;
  min-width: 50px;
}

.carousel-indicators li {
  height: 15px !important;
  width: 15px !important;
  border-radius: 100% !important;
}

.modal-container {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000080;
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.close-btn {
  position: absolute;
  right: 0;
  z-index: 2;
  background: none;
  border: 0;
  font-size: 25px;
}
</style>
