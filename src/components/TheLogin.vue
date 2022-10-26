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
      <input id="email" v-model="store.formData.email" class="inputLogin" type="email" placeholder="email">
      <input id="password" v-model="store.formData.password" class="inputLogin" type="password" placeholder="password">
      <button id="loginButton" class="btn" type="button" @click="store.getAuth">
        Login
      </button>
    </div>
    <div v-else class="flex flex-col md:flex-row">
      <h3 class="info m-2">
        Hello {{ store.formData.email }}
      </h3>
      <nav class="flex flex-row justify-end">
        <router-link to="/new" replace class="btn m-y-0">
          <button type="button" class="btn">
            Add Item
          </button>
        </router-link>
        <router-link to="/" replace class="btn m-y-0">
          <button type="button" class="btn">
            Main
          </button>
        </router-link>
        <button id="logoutButton" class="btn" type="button" @click="store.accessToken = ''">
          Logout
        </button>
      </nav>
    </div>
  </div>
</template>
