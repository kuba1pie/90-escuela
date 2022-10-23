<script setup lang="ts">
const store = useDefaultStore()

onMounted(async () => {
  const input = document.getElementById('login') as HTMLInputElement
  const button = document.getElementById('myBtn') as HTMLButtonElement
  input.addEventListener('keypress', (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      button.click()
    }
  })
})
</script>

<template>
  <div class="c-theForm card w-md text-center flex flex-col">
    <input id="login" v-model="store.email" class="form-input text-center text-red" type="text">
    <input id="password" v-model="store.password" class="form-input text-center text-red" type="password">
    <button id="myBtn" class="button" type="button" @click="store.getWeather">
      Login
    </button>
  </div>
</template>

<style lang="scss" scope>
button {
  font-size: 1.6em;
  padding: 0.3em;
}
</style>  
