<template>
  <div v-if="currentProduct">
    <img :src="currentProduct.image" alt="" />
    <h1>{{ currentProduct.name }}</h1>
    <p>{{ currentProduct.description }}</p>
    <p>&#8358; {{ currentProduct.price }}</p>
  </div>
  <p v-else>
    Product not Found
    <router-link to="/products">Please go back to /products</router-link>
  </p>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      product: null,
    };
  },
  computed: {
    ...mapGetters(["currentProduct"]),
  },
  created() {
    const id = this.$route.params.id;
    this.$store.dispatch("setProduct", id);
  },
};
</script>

<style scoped>
img {
  max-width: 10rem;
}
</style>