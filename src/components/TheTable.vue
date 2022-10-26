<script setup lang="ts">
const store = useDefaultStore()
store.getProducts()
</script>

<template>
  <div class="flex flex-col m-x-auto max-w-2xl">
    <table class="m-y-10">
      <tr>
        <th>Item</th>
        <th>Title</th>
        <th>Price</th>
      </tr>
      <tr
        v-for="item in store.productsData"
        :key="item.id"
      >
        <td>
          <img
            v-if="item.images"
            :src="item.images[0]"
            class="h-20"
          >
        </td>
        <td>
          {{ item.title }}
        </td>
        <td>
          {{ item.price }} USD
        </td>
        <td>
          <router-link
            v-if="store.accessToken"
            :to="`/products/${item.id}`"
            title="Edit Product"
            replace
          >
            <img src="https://img.icons8.com/ios-glyphs/30/000000/edit--v1.png">
          </router-link>
        </td>
      </tr>
    </table>
    <div class="btn-group m-x-auto">
      <button
        v-if="store.page > 1"
        class="btn btn-outline"
        @click="store.page--, store.getProducts()"
      >
        Previous
        page
      </button>
      -{{ store.page }}-
      <button
        class="btn btn-outline"
        @click="store.page++, store.getProducts()"
      >
        Next page
      </button>
    </div>
  </div>
</template>
