<script setup lang="ts">
const props = defineProps<{ id: string }>()
const store = useDefaultStore()
const showModal = ref(false)

async function removeItem() {
  await fetch(`https://api.escuelajs.co/api/v1/products/${props.id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.status === 200)
        store.status = 'success delete'

      else
        store.status = 'error'

      return response
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}
async function getProduct() {
  await fetch(`https://api.escuelajs.co/api/v1/products/${props.id}`,
  )
    .then((response) => {
      if (response.status === 200)
        store.status = 'success'

      else
        store.status = 'error'

      return response
    })
    .then(response => response.json())
    .then((data) => {
      store.product = data
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

getProduct()
</script>

<template>
  <div v-if="store.accessToken" id="v-Id" class="flex flex-col items-center w-full min-h-lg">
    <div v-if="store.status === 'success'" id="success" class="w-full flex flex-col items-center">
      <EditItem />
      <button
        id="show-modal" class="btn flex items-center" :class="{
          error: store.status === 'error',
          sending: store.status === 'sending',
          success: store.status === 'success',
          def: store.status === '',
        }" @click="showModal = true"
      >
        Remove Item
        <img src="https://img.icons8.com/sf-black-filled/30/undefined/recycle-bin.png">
      </button>

      <Teleport to="body">
        <TheModal
          :show="showModal" :content="`Delete item with id ${props.id}?`" @close="showModal = false"
          @accept="removeItem()"
        />
      </Teleport>
    </div>
    <div v-else-if="store.status === 'sending'">
      Please wait...
    </div>
    <div v-else id="error" class="flex flex-col items-center">
      <div class="message">
        Cannot find product with id {{ props.id }}
      </div>
      <div class="button m-5 p-3">
        <router-link to="/" replace>
          <button id="backToMain" class="button" type="button">
            Back to the main page
          </button>
        </router-link>
      </div>
    </div>
  </div>

  <div v-else id="error" class="flex flex-col items-center">
    <div class="message">
      Please login to see this page
    </div>
    <div class="button m-5 p-3">
      <router-link to="/" replace>
        <button id="backToMain" class="button" type="button">
          Back to the main page
        </button>
      </router-link>
    </div>
  </div>
</template>
