<template>
  <nav-bar
    :cart="cart"
    :cart-total="cartTotal"
    :cart-qty="cartQty"
    @delete-item="deleteItem"
  />
  <div id="app">
    <!-- <div class="search-wrapper panel-heading col-sm-12">
      <input type="text" v-model="search" placeholder="Search" /> <br />
      <br />
    </div> -->
  </div>
  <div class="container">
    <home-view :products="products" />
    <router-view
      :cart="cart"
      @addItem="addItem"
      @delete-item="deleteItem"
      :cart-total="cartTotal"
    />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import HomeView from '@/views/HomeView'
export default {
  data: function () {
    return {
      cart: [],
      products: [],
      search: ''
    }
  },
  components: {
    NavBar,
    HomeView
  },
  created() {
    fetch('https://hplussport.com/api/products/order/price')
      .then(response => response.json())
      .then(data => {
        this.products = data
      })
  },
  methods: {
    addItem(product) {
      let whichProduct
      let existing = this.cart.filter(function (item, index) {
        if (item.product.id == Number(product.id)) {
          whichProduct = index
          return true
        } else {
          return false
        }
      })

      if (existing.length) {
        this.cart[whichProduct].qty++
      } else {
        this.cart.push({ product: product, qty: 1 })
      }
    },
    deleteItem: function (id) {
      if (this.cart[id].qty > 1) {
        this.cart[id].qty--
      } else {
        this.cart.splice(id, 1)
      }
    }
  },
  computed: {
    cartTotal() {
      let sum = 0
      for (let key in this.cart) {
        sum = sum + this.cart[key].product.price * this.cart[key].qty
      }
      return sum
    },
    cartQty: function () {
      let qty = 0
      for (let key in this.cart) {
        qty = qty + this.cart[key].qty
      }
      return qty
    }
    // filteredProducts() {
    //   return this.products.filter(p => {
    //     return p.name.toLowerCase().indexOf(this.search.toLowerCase()) != -1
    //   })
    // }
  }
}
</script>

<style lang="scss">
$primary: #6f42c1;
@import 'node_modules/bootstrap/scss/bootstrap';

@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

input[type='text'] {
  display: block;
  width: 350px;
  margin: 20px auto;
  padding: 10px 45px;
  background: white url('assets/search-icon.svg') no-repeat 15px center;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
</style>
