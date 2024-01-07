<template>
  <transition name="slide-right">
    <div
      v-if="toast.state.message"
      class="fixed top-[100px] right-5 z-[1000] transition-all duration-500 ease-in-out flex items-center w-full max-w-xs p-4"
      v-bind:class="toastClass"
      role="alert"
    >
      <div
        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200"
      >
        <svg
          class="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"
          />
        </svg>
        <span class="sr-only">Fire icon</span>
      </div>
      <div class="ms-3 text-sm font-normal text-left">
        {{ toast.state.message }}
      </div>
      <button
        type="button"
        class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        aria-label="Close"
        v-on:click="toast.close"
      >
        <span class="sr-only">Close</span>
        <svg
          class="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, watch } from 'vue'
import { useToast } from '../../utils/useToast'

export default {
  setup() {
    const toast = useToast()

    const toastClass = computed(() => {
      switch (toast.state.type) {
        case 'info':
          return 'text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800'
        case 'error':
          return 'bg-red-500 text-white'
        default:
          return 'bg-gray-500 text-white'
      }
    })

    watch(
      () => toast.state.message,
      (newValue) => {
        if (newValue) {
          setTimeout(() => {
            toast.close()
          }, 3000)
        }
      },
    )

    return {
      toast,
      toastClass,
    }
  },
}
</script>

<style scoped>
.slide-right-enter-active {
  transition: all 0.2s ease;
}
.slide-right-enter-from {
  transform: translateX(100%);
}
.slide-right-enter-to {
  transform: translateX(0);
}
.slide-right-leave-active {
  transition: opacity 0.3s ease;
}
.slide-right-leave-to {
  opacity: 0;
}
</style>
