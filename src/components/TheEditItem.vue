<script setup lang="ts">
import useVueLidate from '@vuelidate/core'
import { maxLength, minLength, numeric, required } from '@vuelidate/validators'

const store = useDefaultStore()
store.getCategories()
const showModal = ref(false)

const rules = reactive({
  title: { required, minLength: minLength(3), maxLength: maxLength(64) },
  price: { required, numeric },
  description: { required, minLength: minLength(32), maxLength: maxLength(128) },
  categoryId: { required },
})

const newItem = ref({ title: store.product.title, description: store.product.description, categoryId: store.product.category?.id, price: store.product.price })

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
      body: JSON.stringify(newItem),
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
    store.statusButton = 'Successfully edited product'
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
  <div id="c-EditItem" class="c-theForm card w-lg text-center flex flex-col mx-auto my-10 b-2 p-2">
    <h2>Edit Item</h2>
    <div class="form-control">
      <form action="#" class="flex flex-col">
        <label for="title">Title</label>
        <input
          id="title" v-model="newItem.title" class="input input-bordered  text-center" type="text"
          placeholder="Title" :class="{ red: v$.title.$error }" @blur="v$.title.$touch"
        >
        <FormErrors :errors="v$.title.$errors" />

        <label for="description">Description</label>
        <input
          id="description" v-model="newItem.description" class="input input-bordered  text-center" type="text"
          placeholder="Description" :class="{ red: v$.title.$error }" @blur="v$.description.$touch"
        >
        <FormErrors :errors="v$.description.$errors" />

        <label for="price">Price</label>
        <input
          id="price" v-model="newItem.price" class="input input-bordered  text-center" type="text"
          placeholder="Price" :class="{ red: v$.price.$error }" @blur="v$.price.$touch"
        >
        <FormErrors :errors="v$.price.$errors" />

        <label for="category">Category</label>
        <select
          id="category" v-model="newItem.categoryId" class="input input-bordered  text-center"
          placeholder="Category" :class="{ red: v$.title.$error }" @blur="v$.description.$touch"
        >
          <option v-for="option in store.categories" :key="option.id" :value="option.id">
            {{ option.name }}
          </option>
        </select>
        <FormErrors :errors="v$.categoryId.$errors" />

        <button
          id="myBtn" :disabled="v$.$invalid" class="btn" :class="{
            disabled: v$.disabled,
          }" type="button" @click="showModal = true"
        >
          Edit Item
        </button>
      </form>
      <Teleport to="body">
        <ConfirmModal
          :show="showModal" :content="`Save item with id ${store.product.id}?`"
          @close="showModal = false, store.status = '', store.statusButton = ''" @accept="saveItem()"
        />
      </Teleport>
    </div>
  </div>
</template>
