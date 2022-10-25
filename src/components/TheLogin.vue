<script setup lang="ts">
const store = useDefaultStore()
if (!store.accessToken) {
  onMounted(async () => {
    const input = document.getElementById('email') as HTMLInputElement
    const button = document.getElementById('myBtn') as HTMLButtonElement
    input.addEventListener('keypress', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        button.click()
      }
    })
  })
}
</script>

<template>
  <div class="h-auto m-2">
    <div v-if="!store.accessToken" class="flex flex-col md:flex-row">
      <input id="email" v-model="store.formData.email" class="form-input text-center text-red" type="text">
      <input id="password" v-model="store.formData.password" class="form-input text-center text-red" type="password">
      <button id="myBtn" class="button" type="button" @click="store.getWeather">
        Login
      </button>
    </div>
    <div v-else class="flex justify-end">
      <div class="info m-2">
        Hello {{ store.formData.email }}
      </div>
      <button id="myBtn" class="button" type="button" @click="store.accessToken = ''">
        Logout
      </button>
    </div>
  </div>
</template>
