<script setup lang="ts">
const props = defineProps({
  show: Boolean,
  content: String,
})
defineEmits(['close', 'accept'])
const store = useDefaultStore()
</script>

<template>
  <Transition name="modal">
    <div v-if="props.show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container b-2">
          <div class="modal-header flex justify-end">
            <button class="modal-button-close" @click="$emit('close')">
              X
            </button>
          </div>
          <div v-if="store.status === ''" class="modal-content flex flex-col">
            <span class="m-y-8 text-center text-6">
              {{ props.content }}
            </span>
            <div class="flex flex-row justify-end">
              <button class="btn m-x-2" @click="$emit('close')">
                Cancel
              </button>
              <button class="btn" @click="$emit('accept')">
                Accept
              </button>
            </div>
          </div>
          <div v-else class="modal-content flex flex-col">
            <span
              id="myBtn" class="p-2 my-2 text-center block" :class="{
                error: store.status === 'error',
                sending: store.status === 'sending',
                success: store.status === 'success',
                hidden: store.status === '',
              }" type="button"
            >
              {{ store.statusButton }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
  width: 100%;
}

.modal-container {
  max-width: 25rem;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #1e293d;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  display: flex-column;
  color: rgba(255, 255, 255, 0.4);
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
