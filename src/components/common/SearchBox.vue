<!-- SearchBox.vue -->
<template>
  <div class="relative max-w-md mx-auto mb-5 shadow-md">
    <input
      id="searchText"
      v-model="searchText"
      type="text"
      placeholder="Search for make, model or version"
      class="mt-1 block w-full pl-10 pr-10 py-2 rounded-md border-gray-300 shadow-sm"
      v-on:keyup.enter="applyFilter"
    />
    <div
      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
    >
      <svg
        class="h-5 w-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path>
      </svg>
    </div>
    <div class="absolute inset-y-0 right-0 flex items-center">
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded-r-md"
        v-on:click="applyFilter"
      >
        Apply Filter
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: '',
    }
  },
  methods: {
    applyFilter() {
      this.$emit('filter', this.searchText)
    },
  },
}
</script>
<style scoped>
input:focus {
  outline: none;
  border-color: #a0aec0;
}
</style>
