<template>
  <div
    v-if="toast.state.message"
    class="fixed bottom-0 left-0 right-0 p-4 z-10"
    v-bind:class="toastClass"
  >
    <div
      class="flex justify-between items-center max-w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden px-6 py-2"
    >
      <div class="text-sm text-black">
        {{ toast.state.message }}
      </div>
      <button
        class="text-xs font-semibold text-indigo-600 hover:text-indigo-500"
        v-on:click="toast.close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useToast } from '../../utils/useToast'

export default {
  setup() {
    const toast = useToast()

    const toastClass = computed(() => {
      switch (toast.state.type) {
        case 'info':
          return 'bg-[#1F2937] text-white'
        case 'error':
          return 'bg-red-500 text-white'
        default:
          return 'bg-gray-500 text-white'
      }
    })

    return {
      toast,
      toastClass,
    }
  },
}
</script>
