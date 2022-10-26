<script setup lang="ts">
const store = useDefaultStore()
store.getCategories()
</script>

<template>
  <main id="v-index">
    <TheTable />
  </main>
</template>
