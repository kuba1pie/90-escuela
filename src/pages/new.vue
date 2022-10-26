<script setup lang="ts">
const store = useDefaultStore()
store.getCategories()
</script>

<template>
  <main>
    <div id="v-new">
      <NewItem v-if="store.accessToken" />
    </div>
  </main>
</template>
