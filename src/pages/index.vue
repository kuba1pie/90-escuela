<script setup lang="ts">
const store = useDefaultStore()
store.getCategories()
</script>

<template>
  <main>
    <div id="v-index">
      <NewItem v-if="store.accessToken" />
      <TheTable />
    </div>
  </main>
</template>
