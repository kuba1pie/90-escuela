<script setup lang="ts">
const store = useDefaultStore()
const showModal = ref(false)

async function removeItem() {
  await fetch(`https://api.escuelajs.co/api/v1/products/${store.product.id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.status === 200) {
        store.status = 'success'
        store.statusButton = 'Deleted successfully'
      }
      else {
        store.status = 'error'
        store.statusButton = 'Error deleting product'
      }
      return response
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}
</script>

<template>
  <button id="show-modal" class="btn flex items-center min-w-sm justify-center" @click="showModal = true">
    Remove Item
    <img src="https://img.icons8.com/sf-black-filled/30/undefined/recycle-bin.png">
  </button>

  <Teleport to="body">
    <ConfirmModal
      :show="showModal" :content="`Delete item with id ${store.product.id}?`"
      @close="showModal = false, store.status = ''" @accept="removeItem()"
    />
  </Teleport>
</template>
