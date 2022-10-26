<script setup lang="ts">
const props = defineProps({
  show: Boolean,
  content: String,
})
defineEmits(['close', 'accept'])
</script>

<template>
  <Transition name="modal">
    <div
      v-if="props.show"
      class="modal-mask"
    >
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header flex justify-end">
            <button
              class="modal-button-close"
              @click="$emit('close')"
            >
              X
            </button>
          </div>
          <div class="modal-content flex flex-col">
            <span class=" m-y-8">
              {{props.content}}
            </span>
            <div class="flex flex-row justify-end">
              <button
                class="modal-button"
                @click="$emit('close')"
              >
                Cancel
              </button>
              <button
                class="modal-button"
                @click="$emit('accept')"
              >
                Accept
              </button>
            </div>
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
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  display: flex-column;
  color: #000;
}

.modal-button {
  border-radius: 28px;
  border: 1px solid #e5e5e5;
  display: inline-block;
  cursor: pointer;
  font-size: 17px;
  padding: 16px 31px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #a4d0a2;
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
