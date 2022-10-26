<script setup lang="ts">
const props = defineProps<{ id: string }>()
const store = useDefaultStore()

async function getProduct() {
  await fetch(`https://api.escuelajs.co/api/v1/products/${props.id}`,
  )
    .then((response) => {
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
  <main id="v-Id">
    <div v-if="store.accessToken" class="flex flex-col items-center w-full min-h-lg">
      <div v-if="store.product" id="success" class="w-full flex flex-col items-center">
        <TheEditItem />
        <TheRemoveItem />
      </div>
      <div v-else id="error" class="flex flex-col items-center">
        <div class="message">
          Cannot find product with id {{ props.id }}
        </div>
        <div class="button m-5 p-3">
          <router-link to="/" replace>
            <button id="backToMain" class="btn" type="button">
              Back to the main page
            </button>
          </router-link>
        </div>
      </div>
    </div>

    <div v-else id="error" class="flex flex-col items-center">
      <AccessBanner />
    </div>
  </main>
</template>
