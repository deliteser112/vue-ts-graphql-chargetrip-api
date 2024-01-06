<template>
  <button
    class="mb-4 inline-flex items-center text-white bg-[#1f2937] hover:bg-[#2b3a4a] py-2 px-4 rounded"
    v-on:click="$router.back()"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="h-6 w-6 mr-1"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 19l-7-7 7-7"
      />
    </svg>
    Back
  </button>
</template>

<script lang="ts">
export default {
  name: 'BackButton',
}
</script>
