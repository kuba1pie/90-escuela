<script setup lang="ts">
const store = useDefaultStore()
store.getCategories()
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

function catchError() {
  store.status = 'error'
  store.statusButton = 'ERROR'
}
</script>

<template>
  <div id="c-EditItem" class="c-theForm card w-md text-center flex flex-col mx-auto my-10 b-2 p-2">
    <h2>Edit Item</h2>
    <input id="login" v-model="store.product.title" class="form-input text-center text-black" type="text">
    <input id="login" v-model="store.product.description" class="form-input text-center text-black" type="text">
    <input id="login" v-model="store.product.price" class="form-input text-center text-black" type="text">
    <button id="myBtn" class="btn" :class="{
      error: store.status === 'error',
      sending: store.status === 'sending',
      success: store.status === 'success',
      def: store.status === '',
    }" type="button" @click="saveItem()">
      {{ store.statusButton }}
    </button>
  </div>
</template>
