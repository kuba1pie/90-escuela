<script setup lang="ts">
const store = useDefaultStore()
store.getCategories()
</script>

<template>
  <main id="v-newItem">
    <div v-if="store.accessToken" class="flex flex-col items-center w-full min-h-lg">
      <TheNewItem />
    </div>
    <div v-else class="flex flex-col items-center">
      <AccessBanner />
    </div>
  </main>
</template>
