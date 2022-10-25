<script setup lang="ts">
import useVueLidate from '@vuelidate/core'
import { maxLength, minLength, numeric, required } from '@vuelidate/validators'

const store = useDefaultStore()
store.getCategories()
const rules = reactive({
  title: { required, minLength: minLength(3), maxLength: maxLength(64) },
  price: { required, numeric },
  description: { required, minLength: minLength(32), maxLength: maxLength(128) },
  categoryId: { required },
})

const newItem = reactive({
  title: store.product.title,
  price: store.product.price,
  description: store.product.description,
  categoryId: store.product.category?.id,
  images: store.product.images,
})

function saveItem() {
  store.status = 'sending'
  store.statusButton = 'SENDING...'
  fetch(`https://api.escuelajs.co/api/v1/products/${store.product.id}`
    , {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authentication': `Bearer ${store.accessToken}`,
      },
      body: JSON.stringify(store.product),
    })
    .then((response) => {
      setStatus(response)
    })
    .catch((error) => {
      console.error('Error:', error)
      catchError()
    })
}
function setStatus(response: Response) {
  if (response.status === 200) {
    store.status = 'success'
    store.statusButton = 'SUCCESS'
  }
  else {
    catchError()
  }
}
const v$ = useVueLidate(rules, newItem)

function catchError() {
  store.status = 'error'
  store.statusButton = 'ERROR'
}
</script>

<template>
  <div id="c-EditItem" class="c-theForm card w-md text-center flex flex-col mx-auto my-10 b-2 p-2">
    <h2>Edit Item</h2>
    <label for="title">Title</label>
    <input id="title" v-model="newItem.title" class="form-input text-center text-black" type="text" placeholder="Title"
      :class="{ red: v$.title.$error }" @blur="v$.title.$touch">
    <FormErrors :errors="v$.title.$errors" />
    
    <label for="description">Description</label>
    <input id="description" v-model="newItem.description" class="form-input text-center text-black" type="text"
      placeholder="Description" :class="{ red: v$.title.$error }" @blur="v$.description.$touch">
    <FormErrors :errors="v$.description.$errors" />
    
    <label for="price">Price</label>
    <input id="price" v-model="newItem.price" class="form-input text-center text-black" type="text" placeholder="Price"
      :class="{ red: v$.price.$error }" @blur="v$.price.$touch">
    <FormErrors :errors="v$.price.$errors" />
    
    <label for="category">Category</label>
    <select id="category" v-model="newItem.categoryId" class="form-input text-center text-black" placeholder="Category"
      :class="{ red: v$.title.$error }" @blur="v$.description.$touch">
      <option v-for="option in store.categories" :value="option.id" :key="option.id">
        {{ option.name }}
      </option>
    </select>
    <FormErrors :errors="v$.categoryId.$errors" />

    <button id="myBtn" :disabled="v$.$invalid" class="btn" :class="{
      error: store.status === 'error',
      sending: store.status === 'sending',
      success: store.status === 'success',
      def: store.status === '',
    }" type="button" @click="saveItem()">
      {{ store.statusButton }}
    </button>
  </div>
</template>
