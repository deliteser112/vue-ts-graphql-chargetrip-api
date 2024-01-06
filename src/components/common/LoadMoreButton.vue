<template>
  <button
    class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-[50px] mb-[100px]"
    v-on:click="loadMore"
  >
    Load More
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['load-more'],
  methods: {
    loadMore() {
      this.$emit('load-more')
    },
  },
})
</script>
