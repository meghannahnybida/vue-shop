<template>
  <div class="search-wrapper panel-heading col-sm-12">
    <input type="text" v-model="search" placeholder="Search" />
    <br />
    <br />
  </div>
  <section class="container">
    <range-selector :products="filteredProducts" v-model="max" />
    <product-list :products="filteredProducts" />
  </section>
</template>

<script>
import ProductList from '@/components/ProductList'
import RangeSelector from '@/components/RangeSelector'

export default {
  name: 'HomeView',
  data() {
    return {
      max: 50,
      cart: []
      // search: ''
    }
  },
  watch: {
    search: '',
    searchedProducts() {
      return this.products.filter(p => {
        return p.name.toLowerCase().indexOf(this.search.toLowerCase()) != -1
      })
    }
  },
  props: ['products'],
  components: {
    RangeSelector,
    ProductList
  },
  // emits: ['products'],
  computed: {
    filteredProducts() {
      return this.products.filter(item => item.price < Number(this.max))
    }
    // searchedProducts() {
    //   return this.products.filter(p => {
    //     return p.name.toLowerCase().indexOf(this.search.toLowerCase()) != -1
    //   })
    // }
  }
}
</script>
