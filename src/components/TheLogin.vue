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
      <input id="email" v-model="store.formData.email" class="input text-center md:my-2" type="email"
        placeholder="email">
      <input id="password" v-model="store.formData.password" class="input text-center my-2 md:m-2" type="password"
        placeholder="password">
      <button id="loginButton" class="btn w-50 md:m-y-auto mx-auto" type="button" @click="store.getAuth">
        Login
      </button>
    </div>
    <div v-else class="flex justify-end flex-col md:flex-row">
      <div class="info m-2">
        Hello {{ store.formData.email }}
      </div>
      <button id="logoutButton" class="btn m-y-auto mx-auto w-50" type="button" @click="store.accessToken = ''">
        Logout
      </button>
      <router-link to="/new" replace class="btn m-y-auto mx-auto w-50">
        <button type="button" class="btn m-y-auto mx-auto w-50">Add Item</button>
      </router-link>
    </div>
  </div>
</template>
