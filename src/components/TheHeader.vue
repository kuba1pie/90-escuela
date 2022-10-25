<template>
  <header class="header flex flex-col md:flex-row md:justify-between w-full h-auto md:h-auto">
    <div class="pageLogo m-6">
      <router-link to="/" replace>
        <span class="border-5 border-blue-500/50 font-serif p-3">Escuela CRM</span>
      </router-link>
    </div>
    <TheLogin />
  </header>
</template>

<style lang="scss" scope>
.header {
  border-bottom: 2px solid #333c44;
}
</style>
