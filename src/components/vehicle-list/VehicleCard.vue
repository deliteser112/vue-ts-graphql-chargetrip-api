<template>
  <div
    class="p-4 border rounded hover:bg-e5f0f5 cursor-pointer m-2 transition-all duration-200 hover:shadow-lg"
    v-on:click="goToDetail"
  >
    <img v-bind:src="vehicle.media.brand.thumbnail_url" alt="Brand Logo" />
    <h2>{{ vehicle.naming.make }} - {{ vehicle.naming.model }}</h2>
    <p>{{ vehicle.naming.version }}</p>
    <img
      v-bind:src="vehicle.media.image.thumbnail_url"
      class="transform transition-all duration-200 hover:scale-105"
      alt="Car Image"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'VehicleCard',
  props: {
    vehicle: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter()

    const detailPath = `/car/${props.vehicle.id}/${props.vehicle.naming.make}-${props.vehicle.naming.model}`

    const goToDetail = () => {
      router.push(detailPath)
    }

    return {
      goToDetail,
    }
  },
})
</script>
