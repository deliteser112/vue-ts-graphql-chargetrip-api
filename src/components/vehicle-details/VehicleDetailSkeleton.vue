<template>
  <div class="animate-pulse p-4 border rounded grid grid-cols-12 gap-4">
    <div class="col-span-12 lg:col-span-8">
      <div class="h-[48px] w-[110px] bg-gray-300 rounded mb-3"></div>
      <div class="h-[420px] w-full bg-gray-300 rounded"></div>
    </div>
    <div class="col-span-12 lg:col-span-4">
      <div v-for="i in 6" v-bind:key="i">
        <div class="h-[32px] bg-gray-300 rounded w-[4/6] mb-2"></div>
        <div class="h-[20px] bg-gray-300 rounded w-[4/6] mb-2"></div>
        <hr class="border-t-1 border-gray-300 mt-5" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VehicleDetailSkeleton',
  // other component options
})
</script>
