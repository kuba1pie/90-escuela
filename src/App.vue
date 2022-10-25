<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'App',
  meta: [{ name: 'description', content: 'App' }],
})
</script>

<template>
  <div
    id="wrapper"
    class="flex flex-col w-full h-full"
  >
    <TheHeader />
    <main>
      <RouterView />
    </main>
  </div>
</template>
