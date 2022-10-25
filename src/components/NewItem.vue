<script setup lang="ts">import { Product } from '../types';


const store = useDefaultStore()
store.getCategories()

let newItem = {
  title: import.meta.env.VITE_ITEM_TITLE,
  price: import.meta.env.VITE_ITEM_PRICE,
  description: import.meta.env.VITE_ITEM_DESCRIPTION,
  categoryId: import.meta.env.VITE_ITEM_CATEGORY_ID,
  images: [import.meta.env.VITE_ITEM_IMAGES],
} as Product

function saveItem(content: Product) {
  store.status = 'sending'
  store.statusButton = 'SENDING...'
  fetch(`https://api.escuelajs.co/api/v1/products/`
    , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authentication': `Bearer ${store.accessToken}`,
      },
      body: JSON.stringify(content),
    })
    .then((response) => {
      if (response.status === 201) {
        store.status = 'success'
        store.statusButton = 'SUCCESS'
      }
      else {
        catchError()
      }
    })
    .catch((error) => {
      console.error('Error:', error)
      catchError()
    })
}

function catchError() {
  store.status = 'error'
  store.statusButton = 'ERROR'
}
</script>

<template>
  <div id="c-EditItem" class="c-theForm card w-md text-center flex flex-col mx-auto my-10 b-2 p-2">
    <h2>Create new Item</h2>
    <input id="login" v-model="newItem.title" class="form-input text-center text-black" type="text" placeholder="Title">
    <input id="login" v-model="newItem.description" class="form-input text-center text-black" type="text"
      placeholder="Description">
    <input id="login" v-model="newItem.price" class="form-input text-center text-black" type="text" placeholder="Price">
    <select v-model="newItem.categoryId" class="form-input text-center text-black" placeholder="Category">
      <option v-for="option in store.categories" :value="option.id">
        {{ option.name }}
      </option>
    </select>
    <button id="myBtn" class="btn" :class="{
      error: store.status === 'error',
      sending: store.status === 'sending',
      success: store.status === 'success',
      def: store.status === '',
    }" type="button" @click="saveItem(newItem)">
      {{ store.statusButton }}
    </button>
  </div>
</template>
